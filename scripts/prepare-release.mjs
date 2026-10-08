import { copyFileSync, readFileSync, mkdirSync, mkdtempSync } from "node:fs"
import { resolve, join, dirname, sep } from "node:path"
import { execFileSync } from "node:child_process"
import assert from "node:assert/strict"
import { listReleaseFiles } from "./release-files.mjs"

const root = resolve(import.meta.dirname, "..")
execFileSync(process.execPath, [join(root, "scripts/check-release.mjs"), root], { stdio: "inherit" })
const version = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version
assert(/^\d+\.\d+\.\d+$/.test(version), "Release version must be numeric")
const output = join(root, "release")
mkdirSync(output, { recursive: true })
const folder = mkdtempSync(join(output, `own-ui-${version}-`))
assert(folder.startsWith(output + sep))
const files = listReleaseFiles(root)
for (const file of files) {
  const target = resolve(folder, file)
  assert(target.startsWith(folder + sep), `Export escaped its folder: ${file}`)
  mkdirSync(dirname(target), { recursive: true })
  copyFileSync(join(root, file), target)
}
execFileSync(process.execPath, [join(root, "scripts/check-release.mjs"), folder], { stdio: "inherit" })
const archive = `${folder}.tar.gz`
execFileSync("tar", ["-czf", archive, "-C", folder, "."])
assert.equal(execFileSync("tar", ["-xOf", archive, "./LICENSE"], { encoding: "utf8" }), readFileSync(join(root, "LICENSE"), "utf8"))
console.log(`Public source: ${folder}\nArchive: ${archive}`)
