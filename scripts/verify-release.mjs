import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { resolve, join } from "node:path"
import { existsSync, realpathSync } from "node:fs"
import { createServer } from "node:http"
import { components } from "../registry/items.mjs"

const root = resolve(import.meta.dirname, "..")
const pnpm = process.env.npm_execpath
assert(pnpm && existsSync(pnpm), "Run with pnpm verify:release")
// pnpm 11 may be a standalone executable; JavaScript entry points run with the selected Node runtime.
const command = /\.(?:c?js|mjs)$/.test(pnpm) ? process.execPath : pnpm
const prefix = command === process.execPath ? [pnpm] : []
function run(args, cwd = root) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, [...prefix, ...args], { cwd, stdio: "inherit", shell: false, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" } })
    child.on("error", reject)
    child.on("exit", code => code === 0 ? resolveRun() : reject(new Error(`${args.join(" ")} exited ${code}`)))
  })
}
await run(["build"])
for (const target of ["vite-copy", "vite-registry", "next-copy"]) {
  const prepared = spawn(process.execPath, [join(root, "scripts/prepare-verification.mjs"), target], { cwd: root, stdio: "inherit" })
  await new Promise((resolveRun, reject) => { prepared.on("error", reject); prepared.on("exit", code => code === 0 ? resolveRun() : reject(new Error(`Prepare ${target} exited ${code}`))) })
  await run(["install", "--no-frozen-lockfile"], join(root, "verification", target))
}
// Serve generated registry JSON only; no dependency on a user-owned preview port.
const registry = createServer(async (request, response) => {
  try {
    const name = new URL(request.url, "http://localhost").pathname.match(/^\/r\/([\w-]+)\.json$/)?.[1]
    if (!name) { response.writeHead(404).end(); return }
    const { readFile } = await import("node:fs/promises")
    const content = await readFile(join(root, "public/r", `${name}.json`))
    response.writeHead(200, { "Content-Type": "application/json" }).end(content)
  } catch { response.writeHead(404).end() }
})
await new Promise((resolveRun, reject) => { registry.once("error", reject); registry.listen(0, "127.0.0.1", resolveRun) })
try {
  const address = registry.address()
  assert(address && typeof address !== "string")
  const base = `http://127.0.0.1:${address.port}`
  const installed = join(root, "verification/vite-registry")
  assert.equal(realpathSync(installed), join(realpathSync(root), "verification", "vite-registry"), "CLI overwrite must stay in generated fixture")
  await run(["dlx", "shadcn@4.21.4", "add", ...components.map(component => `${base}/r/${component.id}-example.json`), "--yes", "--overwrite"], installed)
  for (const target of ["vite-copy", "vite-registry", "next-copy"]) await run(["build"], join(root, "verification", target))
  for (const check of ["check:delivery", "check:boundaries", "check:release"]) await run([check])
  console.log("PASS: release builds, complete copy, official CLI, Next SSR and all public checks.")
} finally {
  await new Promise(resolveClose => registry.close(resolveClose))
}
