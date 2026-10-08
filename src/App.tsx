import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType } from "react"
import { componentEntries, type ComponentEntry, type Group } from "./catalog"
import { ComponentDelivery } from "./ComponentDelivery"
import { matchesComponentSearch } from "./search"
import deliveryIndex from "./delivery-index.json"
import { Dialog } from "@base-ui/react/dialog"
import { UiDialog } from "../registry/ui/own-ui-dialog"

type View = "all" | Group
const examples = Object.fromEntries(Object.entries(import.meta.glob<{ default: ComponentType }>("../registry/ui/examples/*-example.tsx")).map(([path, load]) => [path, lazy(load)]))

function FullPreview({ id }: { id: string }) {
  const Preview = examples[`../registry/ui/examples/${id}-example.tsx`]
  return Preview ? <div className="complete-example"><Suspense fallback={<p role="status">正在加载组件…</p>}><Preview /></Suspense></div> : <p>完整示例准备中。</p>
}

const groupLabels: Record<Group, string> = {
  core: "基础与反馈",
  agent: "Agent 与工具",
  workspace: "工作台",
  motion: "动效与视觉",
}

const viewLabels: Record<View, string> = {
  all: "全部组件",
  ...groupLabels,
}

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const }
  if (name === "search") return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>
  if (name === "grid") return <svg {...common}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></svg>
  if (name === "spark") return <svg {...common}><path d="m12 3 1.7 6.3L20 11l-6.3 1.7L12 19l-1.7-6.3L4 11l6.3-1.7L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></svg>
  if (name === "layout") return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16M9 9h12" /></svg>
  if (name === "book") return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" /><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" /></svg>
  if (name === "copy") return <svg {...common}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
  if (name === "sun") return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
  return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>
}

function App() {
  const [activeView, setActiveView] = useState<View>("all")
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get("q") ?? "")
  const [selected, setSelected] = useState<ComponentEntry | null>(null)
  const [copied, setCopied] = useState(false)
  const [toastMessage, setToastMessage] = useState("已复制到剪贴板")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        if (document.querySelector('[role="dialog"], dialog[open]')) return
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const filteredComponents = useMemo(() => componentEntries.filter((entry) => {
    const matchesView = activeView === "all" || entry.group === activeView
    return matchesView && matchesComponentSearch(entry, query)
  }), [activeView, query])

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setToastMessage("已复制到剪贴板")
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setToastMessage("复制失败，请检查浏览器剪贴板权限")
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    }
  }

  function selectView(view: View) {
    setActiveView(view)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function viewCount(view: View) {
    if (view === "all") return componentEntries.length
    return componentEntries.filter((entry) => entry.group === view).length
  }

  const categories: { view: View; icon: string }[] = [
    { view: "all", icon: "grid" },
    { view: "motion", icon: "spark" },
    { view: "core", icon: "book" },
    { view: "agent", icon: "spark" },
    { view: "workspace", icon: "layout" },
  ]

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="组件库首页" onClick={() => selectView("all")}>
          <span className="brand-mark"><span /></span>
          <span className="brand-copy"><strong>own / ui</strong><small>PERSONAL COMPONENT LIBRARY</small></span>
        </a>
        <div className="sidebar-rule" />
        <div className="nav-group">
          <p className="nav-caption">组件分类</p>
          <nav className="side-nav" aria-label="组件分类">
            {categories.map(({ view, icon }) => <button key={view} className={`nav-item ${activeView === view ? "is-active" : ""}`} aria-current={activeView === view ? "page" : undefined} onClick={() => selectView(view)}>
              <Icon name={icon} size={17} />
              <span>{viewLabels[view]}</span>
              <span className="nav-count">{String(viewCount(view)).padStart(2, "0")}</span>
            </button>)}
          </nav>
        </div>
        <div className="sidebar-bottom"><span className="online-dot" /><span>组件目录</span><span className="version-pill">v{deliveryIndex.button.version}</span></div>
      </aside>

      <main id="top" className="main-panel">
        <header className="topbar">
          <div className="breadcrumbs"><span>own-ui 组件库</span><Icon name="chevron" size={14} /><strong>{viewLabels[activeView]}</strong></div>
          <div className="topbar-actions">
            <a className="local-badge" href={import.meta.env.BASE_URL + "intro/"}>关于 own-ui <span aria-hidden="true">↗</span></a>
            <button className="icon-button theme-button" aria-label={theme === "light" ? "切换深色主题" : "切换浅色主题"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}><Icon name="sun" size={17} /></button>
          </div>
        </header>

        <div className="content-wrap">
          <section className="intro-block"><h1>own-ui 组件库</h1><p>检索组件、操作示例，取得完整源码或按需安装。</p></section>

          <section className="catalog-toolbar" aria-label="搜索组件">
            <label className="search-box">
              <Icon name="search" size={18} />
              <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索组件名称、用途、状态或依赖…" aria-label="搜索组件" />
              <kbd>⌘ K</kbd>
            </label>
          </section>

          <div className="section-heading">
            <div><p className="section-kicker">COMPONENT CATALOG</p><h2>{viewLabels[activeView]}</h2></div>
            <p className="result-count"><strong>{String(filteredComponents.length).padStart(2, "0")}</strong> 个组件</p>
          </div>

          {filteredComponents.length > 0 && <>
            <div className="group-label"><span>组件列表</span><i />可预览 · 可复制</div>
            <div className="component-grid">
              {filteredComponents.map((entry) => <article key={entry.id} className="component-card">
                <div className="card-topline"><span className={`group-pill group-${entry.group}`}>{groupLabels[entry.group]}</span><span className="component-ready">{deliveryIndex[entry.id as keyof typeof deliveryIndex]?.environments.length ? "已验证" : "待验证"}</span><button className="more-button" aria-label={`查看${entry.name}详情`} onClick={() => setSelected(entry)}><Icon name="arrow" size={17} /></button></div>
                <div className={`component-preview preview-${entry.id}`}><FullPreview id={entry.id} /></div>
                <div className="component-meta">
                  <div><h3>{entry.name}</h3><span className="component-en">{entry.english}</span></div>
                  <p>{entry.description}</p>
                  {entry.reference && <a className="component-reference" href={entry.reference.url} target="_blank" rel="noreferrer">参考 {entry.reference.name} <span aria-hidden="true">↗</span></a>}
                  <div className="card-footer"><div className="tag-list">{entry.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div><button className="text-action" onClick={() => setSelected(entry)}>组件详情 <Icon name="chevron" size={14} /></button></div>
                </div>
              </article>)}
            </div>
          </>}

          {filteredComponents.length === 0 && <div className="empty-state"><span><Icon name="search" size={22} /></span><h3>没有找到组件</h3><p>试试组件名称、用途、状态或依赖关键词。</p><button onClick={() => setQuery("")}>清除搜索</button></div>}

          <footer className="page-footer">
            <div className="footer-sign"><span className="brand-mark brand-mark-small"><span /></span><span>OWN UI / PERSONAL COMPONENTS</span></div>
            <p>{componentEntries.length} 个组件 · React / TypeScript</p>
          </footer>
        </div>
      </main>

      <UiDialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null) }}><Dialog.Portal><Dialog.Backdrop className="detail-backdrop" /><Dialog.Popup className="detail-dialog">
        {selected && <div className="dialog-content">
          <div className="dialog-header"><div><span className={`group-pill group-${selected.group}`}>{groupLabels[selected.group]}</span><Dialog.Title render={<h2 />}>{selected.name}</Dialog.Title><Dialog.Description>{selected.description}</Dialog.Description></div><Dialog.Close className="close-button" aria-label="关闭详情">×</Dialog.Close></div>
          <div className="detail-meta"><div><span>导入入口</span><code>{selected.importPath}</code></div><div><span>依赖</span><p>{selected.dependencies}</p></div><div><span>兼容范围</span><p>React Web / CSS Module；实际环境见交付记录</p></div></div>
          <div className="dialog-preview"><span className="dialog-label">完整可操作示例</span><FullPreview id={selected.id} /></div>
          {selected.reference && <p className="reference-note">视觉与交互参考 <a href={selected.reference.url} target="_blank" rel="noreferrer">{selected.reference.name} ↗</a>；此处为 own-ui 的 React / CSS Module 独立实现。</p>}
          <div className="detail-contract"><div><h3>用途</h3><p>{selected.fit}</p></div><div><h3>变体与状态</h3><p>{selected.variants}<br />{selected.states}</p></div><div><h3>无障碍与接入</h3><p>{selected.accessibility}</p></div></div>
          <ComponentDelivery key={selected.id} id={selected.id} copyText={copyText} />
          <p className="copy-feedback" role="status">{copied ? toastMessage : ""}</p>
        </div>}
      </Dialog.Popup></Dialog.Portal></UiDialog>

    </div>
  )
}

export default App
