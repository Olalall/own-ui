import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve, dirname, join } from "node:path"
import assert from "node:assert/strict"
import { components } from "../registry/items.mjs"

const target = process.argv[2]
assert(["vite-copy", "vite-registry", "next-copy"].includes(target), "Use vite-copy, vite-registry or next-copy")
const root = resolve(import.meta.dirname, "..")
const folder = join(root, "verification", target)
const next = target.startsWith("next")
const installedRegistryDependencies = target === "vite-registry" && existsSync(join(folder, "package.json")) ? JSON.parse(readFileSync(join(folder, "package.json"), "utf8")).dependencies : {}
const prefix = next ? "../" : "./"
const json = value => JSON.stringify(value, null, 2) + "\n"
function write(file, content) { const path = join(folder, file); mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content) }
if (target.endsWith("copy")) {
  for (const component of components) {
    const delivery = JSON.parse(readFileSync(join(root, `public/delivery/${component.id}.json`), "utf8"))
    delivery.files.forEach(file => write(file.target, file.content))
  }
}
write("package.json", json({ name: `own-ui-${target}-verification`, private: true, version: "0.0.0", type: "module", scripts: next ? { build: "next build", dev: "next dev --hostname 127.0.0.1 --port 5175", start: "next start --hostname 127.0.0.1 --port 5175" } : { build: "tsc --noEmit && vite build", dev: `vite --host 127.0.0.1 --port ${target === "vite-copy" ? 5174 : 5176}`, preview: `vite preview --host 127.0.0.1 --strictPort --port ${target === "vite-copy" ? 5174 : 5176}` }, dependencies: { ...installedRegistryDependencies, react: "19.3.0", "react-dom": "19.3.0", "@base-ui/react": "1.8.0", ...(target.endsWith("copy") ? { "@tanstack/react-table": "8.21.3" } : {}), ...(next ? { next: "16.4.0" } : {}) }, devDependencies: { typescript: "7.0.2", "@types/react": "19.2.0", "@types/react-dom": "19.2.0", "@types/node": "24.10.1", ...(!next ? { vite: "8.3.1", "@vitejs/plugin-react": "6.1.1" } : {}) } }))
write("Integration.tsx", readFileSync(join(root, "verification/hosts/Integration.tsx"), "utf8"))
write("tsconfig.json", json({ compilerOptions: { target: "ES2022", lib: ["DOM", "DOM.Iterable", "ES2022"], strict: true, noEmit: true, module: "ESNext", moduleResolution: "Bundler", jsx: "react-jsx", skipLibCheck: true, esModuleInterop: true, resolveJsonModule: true, isolatedModules: true, ...(next ? { plugins: [{ name: "next" }] } : { types: ["vite/client"] }), paths: { "@/*": ["./*"] } }, include: ["**/*.ts", "**/*.tsx", ...(next ? [".next/types/**/*.ts"] : [])], exclude: ["node_modules"] }))
write("components.json", json({ $schema: "https://ui.shadcn.com/schema.json", style: "new-york", rsc: next, tsx: true, tailwind: { config: "", css: "host.css", baseColor: "neutral", cssVariables: true }, aliases: { components: "@/components", ui: "@/components/ui", utils: "@/lib/utils", lib: "@/lib", hooks: "@/hooks" } }))
write("host.css", `:root { font-family: "Segoe UI", "Microsoft YaHei UI", system-ui, sans-serif; --own-ui-radius: 16px; --own-ui-card-radius: 16px; --own-ui-primary: #365675; }\n:root[data-theme="dark"] { color-scheme: dark; color: #eee; background: #191919; --own-ui-bg: #242424; --own-ui-fg: #eee; --own-ui-muted: #333; --own-ui-muted-fg: #bbb; --own-ui-border: #555; --own-ui-primary: #a8c8e8; --own-ui-primary-fg: #162637; --own-ui-danger: #fa9b91; --own-ui-warning: #e4b773; --own-ui-success: #91c9a6; --own-ui-info: #acc5db; }\n#dialog { --own-ui-card-radius: 20px; }\nbody { margin: 0; } main { max-width: 760px; margin: auto; padding: 24px; } .specimen { border-top: 1px solid var(--own-ui-border); padding-block: 24px; min-width: 0; } h2 { font-size: 20px; }\n`)
const available = components
// ponytail: this verification page intentionally imports the full inventory; production hosts import only needed items.
const imports = available.map((c, i) => `import Example${i} from "${prefix}components/ui/examples/${c.id}-example"`).join("\n")
const sections = available.map((c, i) => `<section id="${c.id}" className="specimen"><h2>${c.title}</h2><Example${i} /></section>`).join("\n")
const showcase = `"use client"\nimport { useEffect, useState } from "react"\n${imports}\n\nexport default function Showcase() {\n const [dark, setDark] = useState(false)\n useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light" }, [dark])\n return <main><h1>独立交付验证 / ${target}</h1><a href="/integration">完整接入样例</a><button onClick={() => setDark(!dark)}>切换主题</button>${sections}</main>\n}\n`
if (next) {
  write("next.config.mjs", 'import { fileURLToPath } from "node:url"\nexport default { turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) } }\n')
  write("app/Client.tsx", showcase)
  write("app/layout.tsx", 'import "../host.css"\nimport type { ReactNode } from "react"\nexport default function Layout({ children }: { children: ReactNode }) { return <html lang="zh-CN"><body>{children}</body></html> }\n')
  write("app/page.tsx", 'import Showcase from "./Client"\nexport default function Page() { return <Showcase /> }\n')
  write("app/integration/page.tsx", 'import Integration from "../../Integration"\nexport default function Page() { return <Integration /> }\n')
  write("app/server/page.tsx", 'import { UiStatusBadge } from "../../components/ui/own-ui-status-badge"\nimport { UiNotice } from "../../components/ui/own-ui-notice"\nimport { AgentMessage } from "../../components/ui/own-ui-agent-message"\nimport { ToolApprovalPanel } from "../../components/ui/own-ui-approval"\nexport default function Page() { return <main><h1>服务端静态组件</h1><UiStatusBadge tone="success">服务端渲染</UiStatusBadge><UiNotice role="note">静态说明</UiNotice><AgentMessage role="assistant" name="助手" content="服务端内容" /><ToolApprovalPanel toolName="本地演示" risk="low" description="没有跨服务端传入回调" /></main> }\n')
} else {
  write("App.tsx", showcase)
  write("main.tsx", `import { createRoot } from "react-dom/client"\nimport App from "./App"\nimport Integration from "./Integration"\nimport "./host.css"\nconst Page = location.pathname === "/integration" ? Integration : App\ncreateRoot(document.getElementById("root")!).render(<Page />)\n`)
  write("index.html", '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>\n')
  write("vite.config.ts", 'import { defineConfig } from "vite"\nimport react from "@vitejs/plugin-react"\nexport default defineConfig({ plugins: [react()] })\n')
}
console.log(`Prepared ${target}: ${available.length} complete examples; no imports back to the library.`)
