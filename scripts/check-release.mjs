import assert from "node:assert/strict"
import { readFileSync, existsSync } from "node:fs"
import { resolve, join } from "node:path"
import { components } from "../registry/items.mjs"
import { listReleaseFiles } from "./release-files.mjs"

const root = process.argv[2] ? resolve(process.argv[2]) : resolve(import.meta.dirname, "..")
const read = path => readFileSync(join(root, path), "utf8")
const pkg = JSON.parse(read("package.json"))
assert.equal(pkg.name, "own-ui")
assert.equal(pkg.license, "MIT")
assert.match(read("LICENSE"), /Copyright \(c\) 2026 own-ui contributors/)
assert.equal(read("registry/ui/LICENSE"), read("LICENSE"))
assert(read(".gitattributes").includes("text=auto eol=lf"), "Public source must keep stable line endings across CI platforms")
const files = listReleaseFiles(root)
assert.equal(new Set(files).size, files.length)
for (const path of files) {
  assert(existsSync(join(root, path)), `Missing public source: ${path}`)
  const bytes = readFileSync(join(root, path))
  if (path.endsWith(".jpg")) { assert(bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255])) && bytes.length < 2_000_000, `Invalid public image: ${path}`); continue }
  const content = bytes.toString("utf8")
  assert(!/\b[A-Z]:[\\/]/.test(content), `Local Windows path in public source: ${path}`)
  assert(!/(?:github_pat_|gh[pousr]_)[A-Za-z0-9_]{30,}/.test(content), `GitHub credential in public source: ${path}`)
}
assert(!files.some(path => /^(?:\.design|release|node_modules|dist)\//.test(path)))
assert(!files.some(path => path.startsWith("public/") && !path.startsWith("public/brand/")))
assert(files.includes("intro/index.html") && files.includes("src/Promo.tsx") && files.includes("public/brand/cover.svg"))
assert(read("intro/index.html").includes('property="og:image"') && read("src/Promo.tsx").includes("https://github.com/Olalall/own-ui"))
assert(!files.some(path => /verification\/(?:vite-|next-|hosts\/legacy)/.test(path)))
assert(read("README.md").includes(`${components.length} 个组件`))
for (const component of components) assert(files.includes(component.source) && files.includes(component.example), `Undelivered component: ${component.id}`)
assert(!read(".github/workflows/pages.yml").includes("push:"), "Pages must remain manual")
console.log(`PASS: ${files.length} public files, ${components.length} complete components, MIT notices and public scope.`)
