import assert from "node:assert/strict"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { createServer } from "vite"
import react from "@vitejs/plugin-react"
import { components } from "../registry/items.mjs"
import { readFileSync } from "node:fs"

const server = await createServer({ configFile: false, plugins: [react()], server: { middlewareMode: true, watch: null }, appType: "custom" })
try {
  const { UiAnimatedNumber } = await server.ssrLoadModule("/registry/ui/own-ui-animated-number.tsx")
  for (const [value, decimals, expected] of [[NaN, Infinity, "0"], [Infinity, -5, "0"], [-12.5, 1, "-12.5"], [1280, 0, "1,280"], [1.25, 99, "1.250000"]]) {
    const html = renderToStaticMarkup(createElement(UiAnimatedNumber, { value, decimals }))
    assert(html.includes(`aria-label="${expected}"`), html)
    assert(!html.includes("NaN") && !html.includes("Infinity"), html)
  }
  const { UiStreamingText } = await server.ssrLoadModule("/registry/ui/own-ui-streaming-text.tsx")
  const streamed = renderToStaticMarkup(createElement(UiStreamingText, { text: "<script>😀", streaming: true }))
  assert(streamed.includes('aria-busy="true"') && streamed.includes("正在生成内容") && !streamed.includes("<script>"), streamed)
  const { UiReasoningPanel } = await server.ssrLoadModule("/registry/ui/own-ui-reasoning-panel.tsx")
  const closedTrace = renderToStaticMarkup(createElement(UiReasoningPanel, { open: false, onOpenChange() {}, steps: [{ id: "f", label: "执行失败", state: "failed" }] }))
  assert(closedTrace.includes('aria-expanded="false"') && closedTrace.includes('aria-hidden="true"') && closedTrace.includes('inert=""') && closedTrace.includes("失败"), closedTrace)
  const { UiCompareSlider } = await server.ssrLoadModule("/registry/ui/own-ui-compare-slider.tsx")
  for (const [value, expected] of [[NaN, 50], [Infinity, 50], [-20, 0], [150, 100], [25.5, 25.5]]) {
    const html = renderToStaticMarkup(createElement(UiCompareSlider, { value, label: "对比位置", before: "<before>", after: "<after>", onValueChange() {} }))
    assert(html.includes(`value="${expected}"`) && html.includes(`inset(0 ${100 - expected}% 0 0)`), html)
    assert.equal((html.match(/inert=""/g) ?? []).length, 2)
    assert(!html.includes("NaN") && !html.includes("Infinity") && !html.includes("<before>"), html)
  }
  const { UiBlurReveal } = await server.ssrLoadModule("/registry/ui/own-ui-blur-reveal.tsx")
  for (const visible of [false, true]) {
    const html = renderToStaticMarkup(createElement(UiBlurReveal, { visible }, createElement("button", {}, "操作")))
    assert.equal(html.includes('inert=""'), !visible)
    assert(html.includes(`aria-hidden="${!visible}"`), html)
  }
  for (const [id, title] of [["shine-button", "UiShineButton"], ["ripple-button", "UiRippleButton"]]) {
    const leaf = await server.ssrLoadModule(`/registry/ui/own-ui-${id}.tsx`)
    const html = renderToStaticMarkup(createElement(leaf[title], { busy: true, type: "submit", className: "host-button" }, "同步"))
    assert(html.includes('disabled=""') && html.includes('aria-busy="true"') && html.includes('type="submit"') && html.includes("host-button"), html)
  }
  const { UiDock } = await server.ssrLoadModule("/registry/ui/own-ui-dock.tsx")
  assert(renderToStaticMarkup(createElement(UiDock, { label: "入口", items: [], value: "", onSelect() {} })).includes("暂无入口"))
  const dock = renderToStaticMarkup(createElement(UiDock, { label: "入口", items: [{ id: "a", label: "首页", icon: "A" }, { id: "b", label: "不可用", icon: "B", disabled: true }], value: "a", onSelect() {} }))
  assert(dock.includes('aria-current="page"') && dock.includes('disabled=""') && dock.includes('aria-label="不可用"'), dock)
  const { UiMarquee } = await server.ssrLoadModule("/registry/ui/own-ui-marquee.tsx")
  const marquee = renderToStaticMarkup(createElement(UiMarquee, { label: "流程", items: [{ id: "a", content: "内容" }], active: false }))
  assert(marquee.includes('data-active="false"') && marquee.includes('aria-label="流程"') && marquee.includes('aria-hidden="true" inert=""'), marquee)
  const { UiMeteorCard } = await server.ssrLoadModule("/registry/ui/own-ui-meteor-card.tsx")
  const meteor = () => renderToStaticMarkup(createElement(UiMeteorCard, { active: false }, "内容"))
  assert.equal(meteor(), meteor(), "Meteor decoration must be deterministic for hydration")
  assert.equal((meteor().match(/--meteor-left:/g) ?? []).length, 8)
  const { UiRotatingText } = await server.ssrLoadModule("/registry/ui/own-ui-rotating-text.tsx")
  assert(renderToStaticMarkup(createElement(UiRotatingText, { text: "<script>😀" })).includes("&lt;script&gt;😀"))
  const motionComponents = components.filter(component => component.group === "motion")
  assert.equal(motionComponents.length, 20)
  for (const component of motionComponents) assert(component.reference.name && new URL(component.reference.url).protocol === "https:")
  for (const [group, entry] of [["core", "core"], ["agent", "agent"], ["workspace", "workspace"]]) {
    const legacy = await server.ssrLoadModule(`/registry/ui/own-ui-${entry}.tsx`)
    const original = readFileSync(new URL(`../verification/baseline/${entry}.tsx`, import.meta.url), "utf8")
    const names = [...original.matchAll(/^export (?:const|function) (\w+)/gm)].map(match => match[1])
    for (const name of names) {
      const component = components.find(item => item.title === name)
      assert(component, `Lost original entry ${name}`)
      const leaf = await server.ssrLoadModule(`/${component.source}`)
      assert.equal(legacy[component.title], leaf[component.title], `Lost old export: ${component.title}`)
    }
  }
  const { UiProgress } = await server.ssrLoadModule("/registry/ui/own-ui-progress.tsx")
  for (const [value, max, text, normalized] of [[-10, 100, "0%", 0], [150, 100, "100%", 100], [0.5, 1, "50%", 0.5], [NaN, 100, "进行中", undefined], [Infinity, 100, "进行中", undefined], [undefined, 100, "进行中", undefined], [0.5, 0, "50%", 0.5]]) {
    const html = renderToStaticMarkup(createElement(UiProgress, { label: "进度边界", value, max }))
    assert(html.includes(text), html)
    assert(!html.includes("NaN") && !html.includes("Infinity"))
    assert.equal(/<progress[^>]*\bvalue=/.test(html), normalized !== undefined)
    if (normalized !== undefined) assert(html.includes(`value="${normalized}"`), html)
  }
  const { WorkspacePagination } = await server.ssrLoadModule("/registry/ui/own-ui-workspace-pagination.tsx")
  for (const [page, totalPages, text, disabled] of [[1, 8, "第 1 / 8 页", 1], [8, 8, "第 8 / 8 页", 1], [99, 8, "第 8 / 8 页", 1], [-1, 8, "第 1 / 8 页", 1], [NaN, 8, "第 1 / 8 页", 1], [2.8, 8, "第 2 / 8 页", 0], [1, 0, "无结果", 2], [1, Infinity, "无结果", 2], [1, -2, "无结果", 2]]) {
    const html = renderToStaticMarkup(createElement(WorkspacePagination, { page, totalPages, onPageChange() {} }))
    assert(html.includes(text), html)
    assert.equal((html.match(/disabled=""/g) ?? []).length, disabled, html)
  }
  const { getDateRangeError } = await server.ssrLoadModule("/registry/ui/own-ui-date-range-picker.tsx")
  for (const [start, end, min, max, invalid] of [["", "", undefined, undefined, false], ["2024-02-29", "2024-03-01", undefined, undefined, false], ["2023-02-29", "", undefined, undefined, true], ["2026-10-09", "2026-10-08", undefined, undefined, true], ["2026-01-01", "", "2026-02-01", undefined, true], ["", "2026-12-31", undefined, "2026-12-01", true], ["2026-10-08", "2026-10-08", "2026-10-08", "2026-10-08", false], ["2026-1-1", "", undefined, undefined, true], ["0000-01-01", "", undefined, undefined, true], ["", "", "2026-12-31", "2026-01-01", true]]) {
    assert.equal(Boolean(getDateRangeError({ start, end }, min, max)), invalid, `Date range ${start}/${end}/${min}/${max}`)
  }
  const { validateUploadFile } = await server.ssrLoadModule("/registry/ui/own-ui-file-upload.tsx")
  for (const [name, size, type, accept, max, invalid] of [["note.TXT", 10, "", ".txt", 10, false], ["image.png", 10, "image/png", "image/*", 10, false], ["a.pdf", 10, "application/pdf", "text/plain,.md", 10, true], ["note.txt", 11, "text/plain", ".txt", 10, true], ["empty.md", 0, "", ".md", 10, false], ["note.txt", 10, "text/plain", "", Infinity, true]]) {
    assert.equal(Boolean(validateUploadFile({ name, size, type }, accept, max)), invalid, `File ${name}/${size}/${accept}/${max}`)
  }
  const { normalizeTablePagination, validateTableRows } = await server.ssrLoadModule("/registry/ui/own-ui-data-table.tsx")
  for (const [pageIndex, pageSize, total, expected] of [[99, 2, 5, { pageIndex: 2, pageSize: 2 }], [-1, 0, 0, { pageIndex: 0, pageSize: 1 }], [NaN, Infinity, 10, { pageIndex: 0, pageSize: 10 }], [1, 2, NaN, { pageIndex: 0, pageSize: 2 }]]) assert.deepEqual(normalizeTablePagination({ pageIndex, pageSize }, total), expected)
  assert.equal(validateTableRows([{ id: "a" }, { id: "b" }], row => row.id), undefined)
  assert(validateTableRows([{ id: "a" }, { id: "a" }], row => row.id))
  assert(validateTableRows([{ id: " " }], row => row.id))
  const { validateName } = await server.ssrLoadModule("/verification/vite-copy/Integration.tsx")
  const { UiRadioGroup } = await server.ssrLoadModule("/registry/ui/own-ui-radio-group.tsx")
  const radio = renderToStaticMarkup(createElement(UiRadioGroup, { label: "选择", name: "choice", value: "a", onValueChange() {}, options: [{ value: "a", label: "A" }], className: "host-custom", "aria-describedby": "host-hint", hint: "附加提示", "aria-invalid": true }))
  assert(radio.includes("host-custom")); assert.match(radio, /aria-describedby="host-hint [^"]+"/); assert(radio.includes('aria-invalid="true"'))
  for (const [value, invalid] of [["", true], ["   ", true], [" 工作台 ", false], ["a".repeat(40), false], ["a".repeat(41), true]]) assert.equal(Boolean(validateName(value)), invalid)
  const { matchesComponentSearch } = await server.ssrLoadModule("/src/search.ts")
  const { componentEntries } = await server.ssrLoadModule("/src/catalog.tsx")
  assert.deepEqual(componentEntries.map(entry => entry.id).sort(), components.map(component => component.id).sort())
  for (const [reference, count] of [["Beautiful UI", 3], ["Magic UI", 15], ["React Bits", 4], ["Aceternity UI", 2]]) assert.equal(componentEntries.filter(entry => matchesComponentSearch(entry, reference)).length, count)
  const tableEntry = componentEntries.find(entry => entry.id === "data-table")
  for (const query of ["UiDataTable", "data table", " DATA   TABLE ", "表格", "TanStack", ""]) assert(matchesComponentSearch(tableEntry, query), `Search lost ${query}`)
  assert(!matchesComponentSearch(tableEntry, "不存在的组件xyz"))
  const { UiCarousel } = await server.ssrLoadModule("/registry/ui/own-ui-carousel.tsx")
  const slides = [0, 1, 2].map(i => ({ id: String(i), title: `第${i}张`, content: createElement("button", {}, `操作${i}`) }))
  for (const [value, expected] of [[NaN, 0], [Infinity, 0], [-1, 0], [99, 2], [1.9, 1]]) {
    const html = renderToStaticMarkup(createElement(UiCarousel, { items: slides, value, label: "轮播", onValueChange() {} }))
    assert(html.includes(`translateX(${-expected * 100}%)`), html)
    assert.equal((html.match(/inert=""/g) ?? []).length, 2)
    assert(!html.includes("NaN") && !html.includes("Infinity"), html)
  }
  assert(renderToStaticMarkup(createElement(UiCarousel, { items: [], value: -1, label: "轮播", onValueChange() {} })).includes("没有可展示内容"))
  const { UiCircularProgress } = await server.ssrLoadModule("/registry/ui/own-ui-circular-progress.tsx")
  for (const [value, expected] of [[undefined, undefined], [NaN, undefined], [Infinity, undefined], [-1, 0], [120, 100], [52.5, 52.5]]) {
    const html = renderToStaticMarkup(createElement(UiCircularProgress, { value, label: "环形进度" }))
    assert.equal(html.includes('data-indeterminate="true"'), expected === undefined)
    assert.equal(html.includes("aria-valuenow="), expected !== undefined)
    if (expected !== undefined) assert(html.includes(`aria-valuenow="${expected}"`), html)
    assert(!html.includes("NaN") && !html.includes("Infinity"), html)
  }
  const { UiSplitPane } = await server.ssrLoadModule("/registry/ui/own-ui-split-pane.tsx")
  for (const [value, expected] of [[NaN, 50], [Infinity, 50], [-1, 25], [99, 75], [41.5, 41.5]]) {
    const html = renderToStaticMarkup(createElement(UiSplitPane, { first: "<left>", second: "<right>", label: "比例", value, disabled: true, onValueChange() {} }))
    assert(html.includes(`--split-first:${expected}fr`) && html.includes(`value="${expected}"`) && html.includes('disabled=""'), html)
    assert(!html.includes("NaN") && !html.includes("Infinity") && !html.includes("<left>"), html)
  }
  const { UiOrbitDisplay } = await server.ssrLoadModule("/registry/ui/own-ui-orbit-display.tsx")
  for (const count of [0, 1, 2, 8, 9]) {
    const items = Array.from({ length: count }, (_, i) => ({ id: String(i), label: `能力${i}`, icon: "◇" }))
    const render = () => renderToStaticMarkup(createElement(UiOrbitDisplay, { items, label: "能力", center: "中心", active: false }))
    const html = render()
    assert.equal(render(), html, "Orbit must render deterministically")
    assert(html.includes(`data-layout="${count >= 2 && count <= 8 ? "orbit" : "static"}"`), html)
    assert.equal((html.match(/<li /g) ?? []).length, count)
    assert(!html.includes("NaN") && !html.includes("Infinity"), html)
  }
  const { UiAvatarGroup } = await server.ssrLoadModule("/registry/ui/own-ui-avatar-group.tsx")
  const avatars = renderToStaticMarkup(createElement(UiAvatarGroup, { label: "成员", items: [{ id: "emoji", name: "😀成员" }, { id: "empty", name: " " }] }))
  assert(avatars.includes("😀</span>") && avatars.includes("?</span>"), avatars)
  const { UiBreadcrumb } = await server.ssrLoadModule("/registry/ui/own-ui-breadcrumb.tsx")
  const breadcrumb = renderToStaticMarkup(createElement(UiBreadcrumb, { items: [{ id: "a", label: "前页", href: "#previous" }, { id: "b", label: "<当前页>", href: "#ignored" }] }))
  assert.equal((breadcrumb.match(/aria-current="page"/g) ?? []).length, 1)
  assert(breadcrumb.includes('href="#previous"') && !breadcrumb.includes('href="#ignored"') && !breadcrumb.includes("<当前页>"), breadcrumb)
  const { UiFileTree } = await server.ssrLoadModule("/registry/ui/own-ui-file-tree.tsx")
  assert(renderToStaticMarkup(createElement(UiFileTree, { nodes: [], value: null, label: "文件", onSelect() {} })).includes("没有文件"))
  const tree = renderToStaticMarkup(createElement(UiFileTree, { nodes: [{ id: "folder", name: "folder", children: [{ id: "file", name: "<file>", disabled: true }] }], value: "file", label: "文件", onSelect() {} }))
  assert(tree.includes("<details>") && tree.includes('disabled=""') && tree.includes('aria-pressed="true"') && !tree.includes("<file>"), tree)
  const { UiTextHighlight } = await server.ssrLoadModule("/registry/ui/own-ui-text-highlight.tsx")
  assert(renderToStaticMarkup(createElement(UiTextHighlight, { active: false }, "重点")).includes('data-active="false"'))
  const { UiTerminal } = await server.ssrLoadModule("/registry/ui/own-ui-terminal.tsx")
  const terminal = renderToStaticMarkup(createElement(UiTerminal, { title: "日志", lines: [{ id: "1", text: "<script>文本" }] }))
  assert(terminal.includes('role="log"') && !terminal.includes("<script>"), terminal)
  assert(renderToStaticMarkup(createElement(UiTerminal, { title: "日志", lines: [] })).includes('disabled=""'))
  console.log(`PASS: ${components.length} catalog entries; motion, carousel/progress/split/orbit, text escaping, list semantics, old exports, date/file/table/host boundaries.`)
} finally {
  await server.close()
}
