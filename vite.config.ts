import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, ".", "").OWN_UI_BASE_PATH ?? "/",
  server: { watch: { ignored: ["**/verification/**", "**/.design/**"] } },
  plugins: [react()],
  build: { rolldownOptions: { input: { gallery: "index.html", intro: "intro/index.html" } } },
}))
