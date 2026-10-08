import { cp, mkdir } from "node:fs/promises"
import { publicDocs } from "./release-files.mjs"

await mkdir("dist/docs", { recursive: true })
await Promise.all([
  ...["README.md", "LICENSE", "THIRD_PARTY_NOTICES.md"].map(file => cp(file, `dist/${file}`)),
  ...publicDocs.map(file => cp(`docs/${file}`, `dist/docs/${file}`)),
])
