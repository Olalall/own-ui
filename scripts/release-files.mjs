import { readdirSync } from "node:fs"
import { join } from "node:path"
import assert from "node:assert/strict"

export const publicDocs = ["architecture.md", "integration.md", "component-delivery.md", "open-source-libraries.md", "motion-components.md", "release-0.2.0.md", "release-0.3.0.md", "verification.json"]

export function listReleaseFiles(root) {
  const files = [".gitattributes", ".gitignore", "README.md", "LICENSE", "THIRD_PARTY_NOTICES.md", "CONTRIBUTING.md", "CHANGELOG.md", "package.json", "pnpm-lock.yaml", "index.html", "intro/index.html", "tsconfig.json", "vite.config.ts", "verification/hosts/Integration.tsx", "verification/files/ui-upload-demo.md", ...publicDocs.map(file => `docs/${file}`)]
  const generated = new Set(["src/delivery-index.json", "scripts/check-browser.mjs"])
  function visit(folder) {
    for (const entry of readdirSync(join(root, folder), { withFileTypes: true })) {
      const path = `${folder}/${entry.name}`
      assert(!entry.isSymbolicLink(), `Release sources cannot be symlinks: ${path}`)
      if (generated.has(path)) continue
      if (entry.isDirectory()) visit(path)
      else { assert(entry.isFile(), `Unsupported source: ${path}`); files.push(path) }
    }
  }
  for (const folder of ["registry", "src", "scripts", ".github", "verification/baseline", "public/brand"]) visit(folder)
  return files.sort()
}
