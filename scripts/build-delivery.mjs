import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, existsSync } from "node:fs"
import { resolve, dirname, relative, extname, join, sep } from "node:path"
import { tmpdir } from "node:os"
import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"
import assert from "node:assert/strict"
import { components, groups } from "../registry/items.mjs"

const root = resolve(import.meta.dirname, "..")
const version = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version
const registryBase = (process.env.OWN_UI_REGISTRY_URL ?? "http://127.0.0.1:5173").replace(/\/$/, "")
const packages = { react: "宿主提供 React / React DOM 19.3.0（当前验收版本）", "@base-ui/react": "@base-ui/react@1.8.0", "@tanstack/react-table": "@tanstack/react-table@8.21.3" }
const evidence = existsSync(join(root, "docs/verification.json")) ? JSON.parse(readFileSync(join(root, "docs/verification.json"), "utf8")) : {}

// ponytail: only static relative imports in maintained files; add a parser if source syntax expands.
export function collectFiles(entries) {
  const files = new Map()
  const dependencies = new Set()
  function visit(file) {
    const absolute = resolve(root, file)
    assert(absolute.startsWith(join(root, "registry", "ui") + sep), `Outside component source: ${file}`)
    if (files.has(file)) return
    const content = readFileSync(absolute, "utf8")
    const target = file.replace(/^registry\//, "components/")
    files.set(file, { path: file, target, content, sha256: createHash("sha256").update(content).digest("hex") })
    const imports = [...content.matchAll(/(?:\bfrom\s*|\bimport\s*|@import\s*)["']([^"']+)["']/g)].map(match => match[1])
    for (const name of imports) {
      if (name.startsWith(".")) {
        const base = resolve(dirname(absolute), name)
        const path = [base, `${base}.tsx`, `${base}.ts`].find(existsSync)
        assert(path, `Unresolved import ${name} in ${file}`)
        visit(relative(root, path).split(sep).join("/"))
      } else {
        const pkg = name.startsWith("@") ? name.split("/").slice(0, 2).join("/") : name.split("/")[0]
        assert(packages[pkg], `Undeclared package: ${pkg}`)
        dependencies.add(packages[pkg])
      }
    }
  }
  entries.forEach(visit)
  visit("registry/ui/LICENSE")
  return { files: [...files.values()].sort((a, b) => a.target.localeCompare(b.target)), dependencies: [...dependencies].sort() }
}

function registryFiles(files) {
  return files.map(({ path, target }) => ({ path, type: extname(path) === ".tsx" ? "registry:ui" : "registry:file", target: target.replace(/^components\/ui\//, "@ui/") }))
}

mkdirSync(join(root, "public/delivery"), { recursive: true })
mkdirSync(join(root, "public/downloads"), { recursive: true })
const items = []
const index = {}
for (const component of components) {
  assert(existsSync(join(root, component.example)), `Missing full example: ${component.id}`)
  const implementation = collectFiles([component.source])
  const complete = collectFiles([component.source, component.example])
  const sourceDigest = createHash("sha256").update(JSON.stringify(complete.files.map(({ target, sha256 }) => [target, sha256]))).digest("hex")
  const verified = evidence[component.id]?.sourceDigest === sourceDigest ? evidence[component.id].environments : []
  const payload = { id: component.id, title: component.title, version, sourceDigest, dependencies: complete.dependencies, environments: verified, status: verified.length ? "已验证" : "已适配，待独立验证", source: "own-ui 自有实现" + (complete.dependencies.some(dep => dep.startsWith("@base-ui")) ? "；交互基元 Base UI 1.8.0（MIT）" : "") + (complete.dependencies.some(dep => dep.startsWith("@tanstack")) ? "；表格引擎 TanStack Table 8.21.3（MIT）" : "") + (component.reference ? `；视觉/交互参考 ${component.reference.name}（${component.reference.url}）；独立实现，未复制上游源码` : ""), files: complete.files, example: component.example.replace(/^registry\//, "components/"), installUrl: `${registryBase}/r/${component.id}.json`, exampleInstallUrl: `${registryBase}/r/${component.id}-example.json`, archiveUrl: `/downloads/${component.id}.tar.gz` }
  writeFileSync(join(root, `public/delivery/${component.id}.json`), JSON.stringify(payload, null, 2) + "\n")
  index[component.id] = { version, sourceDigest, status: payload.status, environments: verified }
  for (const [name, result] of [[component.id, implementation], [`${component.id}-example`, complete]]) {
    items.push({ name, type: "registry:ui", title: component.title + (name.endsWith("-example") ? " Example" : ""), description: `own-ui ${version}; React + CSS Module; complete local source.`, dependencies: result.dependencies.filter(dep => !dep.startsWith("宿主提供")), files: registryFiles(result.files) })
  }
  const tempRoot = resolve(tmpdir(), "own-ui-delivery")
  mkdirSync(tempRoot, { recursive: true })
  const staging = mkdtempSync(join(tempRoot, `${component.id}-`))
  try {
    for (const file of complete.files) {
      const target = join(staging, file.target)
      mkdirSync(dirname(target), { recursive: true })
      writeFileSync(target, file.content)
    }
    writeFileSync(join(staging, "README.md"), `# ${component.title} / own-ui ${version}\n\nCopy components/ui into your React project. Import the example from ${payload.example}.\nKeep CSS Modules enabled. The host provides React/React DOM; additional dependencies: ${payload.dependencies.join(", ")}.\nOverride --own-ui-* in your project theme. Existing files should be compared before replacing.\nLicense: MIT; keep components/ui/LICENSE with copied source.\nSource: ${payload.source}.\nValidated environments: ${verified.join(", ") || "pending independent validation"}.\nSource digest: ${sourceDigest}\n`)
    execFileSync("tar", ["-czf", join(root, `public/downloads/${component.id}.tar.gz`), "-C", staging, "README.md", "components"])
  } finally {
    assert(resolve(staging).startsWith(tempRoot + sep) && resolve(staging) !== tempRoot)
    rmSync(staging, { recursive: true })
  }
}
for (const group of groups) {
  const result = collectFiles([group.source])
  items.push({ name: group.id, type: "registry:ui", title: group.title, description: `Compatibility entry; own-ui ${version}`, dependencies: result.dependencies.filter(dep => !dep.startsWith("宿主提供")), files: registryFiles(result.files) })
}
writeFileSync(join(root, "registry.json"), JSON.stringify({ $schema: "https://ui.shadcn.com/schema/registry.json", name: "own-ui", homepage: registryBase, items }, null, 2) + "\n")
writeFileSync(join(root, "src/delivery-index.json"), JSON.stringify(index, null, 2) + "\n")
console.log(`Generated ${components.length} complete deliveries and ${items.length} registry entries (${version}).`)
