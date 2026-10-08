import { readFileSync, existsSync } from "node:fs"
import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"
import { resolve, join } from "node:path"
import assert from "node:assert/strict"
import { components, groups } from "../registry/items.mjs"

const root = resolve(import.meta.dirname, "..")
const read = file => readFileSync(join(root, file), "utf8")
const normalize = text => text.replaceAll("\r\n", "\n")
const registry = JSON.parse(read("registry.json"))
const catalog = read("src/catalog.tsx").split("export const componentEntries")[1].split("export type")[0] + read("src/motion-catalog.ts") + read("src/pattern-catalog.ts")
const ids = [...catalog.matchAll(/\bid: "([\w-]+)"/g)].map(match => match[1]).filter(id => components.some(c => c.id === id))
assert.deepEqual(ids.sort(), components.map(c => c.id).sort(), "Catalog and maintained entries differ")
assert.equal(new Set(registry.items.map(item => item.name)).size, registry.items.length)
for (const component of components) {
  const payload = JSON.parse(read(`public/delivery/${component.id}.json`))
  assert(payload.files.some(file => file.target === payload.example), "Missing complete example")
  assert.equal(payload.files.find(file => file.target === "components/ui/LICENSE")?.content, read("LICENSE"), "Missing MIT notice")
  for (const file of payload.files) {
    const content = read(file.path)
    assert.equal(file.content, content, `${file.path}: delivery changed`)
    assert.equal(file.sha256, createHash("sha256").update(content).digest("hex"))
    const archived = execFileSync("tar", ["-xOf", join(root, `public/downloads/${component.id}.tar.gz`), file.target], { encoding: "utf8" })
    assert.equal(archived, content, `${file.target}: archive differs`)
  }
  for (const name of [component.id, `${component.id}-example`]) {
    const item = JSON.parse(read(`public/r/${name}.json`))
    for (const file of item.files) assert.equal(normalize(file.content), normalize(read(file.path)), `${name}: registry content differs`)
  }
  const copied = join(root, "verification/vite-copy", payload.example)
  if (existsSync(copied)) assert.equal(readFileSync(copied, "utf8"), payload.files.find(file => file.target === payload.example).content)
}
for (const group of groups) assert(registry.items.some(item => item.name === group.id), `Lost compatibility entry ${group.id}`)
for (const target of ["vite-copy", "vite-registry", "next-copy"]) {
  const deps = JSON.parse(read(`verification/${target}/package.json`)).dependencies
  for (const [pkg, version] of [["react", "19.3.0"], ["react-dom", "19.3.0"], ["@base-ui/react", "1.8.0"], ["@tanstack/react-table", "8.21.3"]]) assert.equal(deps[pkg], version, `${target}: missing direct dependency ${pkg}; do not fall back to the library's node_modules`)
}
for (const { id } of components) {
  const item = JSON.parse(read(`public/r/${id}-example.json`))
  for (const file of item.files) {
    const installed = file.target.replace(/^@ui\//, "components/ui/")
    // shadcn can remove a leading client directive for rsc=false; dependent files can retain it.
    const expected = normalize(file.content)
    const actual = normalize(read(`verification/vite-registry/${installed}`))
    assert(actual === expected || actual === expected.replace(/^["']use client["'];?\n\s*/, ""), `${id}: CLI install changed source beyond its Vite client-directive transform`)
  }
}
console.log(`PASS: ${components.length} deliveries; canonical source = source view = archive = registry; CLI files match after documented Vite directive transform.`)
