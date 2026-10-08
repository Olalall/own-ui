import { useState } from "react"
import deliveryIndex from "./delivery-index.json"
import { UiButton } from "../registry/ui/own-ui-button"
import { UiAnimatedNumber } from "../registry/ui/own-ui-animated-number"
import { UiBorderBeam } from "../registry/ui/own-ui-border-beam"
import { UiOrbitDisplay } from "../registry/ui/own-ui-orbit-display"
import { UiThinkingIndicator } from "../registry/ui/own-ui-thinking-indicator"
import { UiShineButton } from "../registry/ui/own-ui-shine-button"
import { UiCircularProgress } from "../registry/ui/own-ui-circular-progress"
import { UiCommandMenu } from "../registry/ui/own-ui-command-menu"

const repository = "https://github.com/Olalall/own-ui"
const base = import.meta.env.BASE_URL
const count = Object.keys(deliveryIndex).length
const version = deliveryIndex.button.version
const install = "pnpm dlx shadcn@4.21.4 add https://olalall.github.io/own-ui/r/shine-button-example.json"
const commands = [
  { id: "core", label: "按钮与表单", description: "从最常用的界面开始" },
  { id: "agent", label: "Agent 与工具", description: "消息、输入、状态与审批" },
  { id: "motion", label: "动效与视觉", description: "让细节多一点表现力" },
]
const orbitItems = [
  { id: "design", label: "统一设计", icon: "◇" },
  { id: "code", label: "完整源码", icon: "⌘" },
  { id: "motion", label: "细节动效", icon: "✦" },
  { id: "preview", label: "真实预览", icon: "◉" },
  { id: "reuse", label: "跨项目复用", icon: "↗" },
]

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
}

export default function Promo() {
  const [motion, setMotion] = useState(true)
  const [ideas, setIdeas] = useState(8)
  const [finished, setFinished] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [selectedCommand, setSelectedCommand] = useState("")
  const [copyStatus, setCopyStatus] = useState("")
  async function copyInstall() {
    try { await navigator.clipboard.writeText(install); setCopyStatus("安装命令已复制") }
    catch { setCopyStatus("复制未成功，请选中下方命令手动复制") }
  }
  return <div className="promo-page" data-motion={motion}>
    <a className="promo-skip" href="#main">跳到主要内容</a>
    <header className="promo-nav">
      <a className="brand" href="#top" aria-label="own-ui 宣传页首页"><span className="brand-mark"><span /></span><span className="brand-copy"><strong>own / ui</strong><small>MAKE IT YOURS.</small></span></a>
      <nav aria-label="宣传页导航"><a href="#collection">组件合集</a><a href="#start">开始使用</a><a className="promo-github" href={repository} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></nav>
    </header>
    <main id="main">
      <section id="top" className="promo-hero promo-wrap" aria-labelledby="hero-title">
        <div className="promo-hero-copy">
          <a className="promo-release" href={repository + "/releases/tag/v" + version}><span />v{version} · MIT 开源 <span aria-hidden="true">↗</span></a>
          <p className="promo-eyebrow">A GOOD INTERFACE IS A GOOD START.</p>
          <h1 id="hero-title">好看的 UI，<br /><span>拿走就用。</span><i aria-hidden="true">✳</i></h1>
          <p className="promo-lead">把反复调整界面的时间，留给你的下一个想法。<br className="promo-desktop-break" />从按钮到工作台，从细微动效到 Agent 对话，<br className="promo-desktop-break" />找到喜欢的组件，让源码成为项目的一部分。</p>
          <div className="promo-actions"><a className="promo-button promo-primary" href={base}>探索 {count} 个组件 <Arrow /></a><a className="promo-text-link" href={repository} target="_blank" rel="noreferrer">查看源码 <span aria-hidden="true">↗</span></a></div>
          <p className="promo-compat"><span>React</span><span>TypeScript</span><span>CSS Modules</span><span>shadcn registry</span></p>
        </div>
        <section className="promo-board" aria-label="组件实时演示">
          <div className="promo-board-caption"><span><i />REAL COMPONENTS. REAL INTERACTIONS.</span><button onClick={() => setMotion(!motion)} aria-pressed={!motion} aria-label={motion ? "暂停持续动效" : "恢复持续动效"}>{motion ? "暂停动效" : "恢复动效"}</button></div>
          <div className="promo-demo-grid">
            <UiBorderBeam active={motion} className="promo-demo promo-number-demo">
              <div className="promo-demo-label">SMALL IDEAS, BIG POSSIBILITIES <span>01</span></div>
              <p>今天，又多一个好想法。</p>
              <div className="promo-number-line"><UiAnimatedNumber value={ideas} /><span>个灵感</span><UiButton variant="outline" size="compact" aria-label="增加一个演示灵感" onClick={() => setIdeas(ideas + 1)}>+</UiButton></div>
              <small>点击 + 试试 · 本地交互演示</small>
            </UiBorderBeam>
            <div className="promo-demo promo-orbit-demo"><div className="promo-demo-label">YOUR NEXT INTERFACE <span>02</span></div><UiOrbitDisplay center={<span>own<span className="promo-orbit-slash">/</span>ui</span>} items={orbitItems} label="组件库的五种能力" active={motion} /></div>
            <div className="promo-demo promo-status-demo">
              <div className="promo-demo-label">A LITTLE MORE FEELING <span>03</span></div>
              <UiThinkingIndicator active={!finished} label={finished ? "灵感已经准备好" : "正在整理下一个想法"} description="状态、文字与动效，保持同一种语言。" />
              <UiShineButton onClick={() => setFinished(!finished)}>{finished ? "再演示一次" : "让灵感就绪"} <Arrow /></UiShineButton>
            </div>
          </div>
          <div className="promo-board-bottom"><span>这就是库里的组件。可以操作，也可以带走。</span><span aria-hidden="true">↗</span></div>
        </section>
      </section>
      <section className="promo-facts promo-wrap" aria-label="组件库概览">
        <div><strong>{count}</strong><p>可交互组件</p></div>
        <div><strong>20</strong><p>动效与视觉组件</p></div>
        <div><strong>{count}</strong><p>完整示例，带齐依赖文件</p></div>
        <div><strong className="promo-fact-mit">MIT</strong><p>自由使用、修改与分发</p></div>
      </section>
      <section id="collection" className="promo-collection promo-wrap" aria-labelledby="collection-title">
        <div className="promo-section-heading"><div><p className="promo-eyebrow">THE DETAILS MAKE THE DIFFERENCE.</p><h2 id="collection-title">从日常，到让人记住。</h2></div><p>同一套设计语言，<br />装下不同项目里的好界面。</p></div>
        <div className="promo-collection-grid">
          <article className="promo-collection-item promo-core">
            <div className="promo-category-top"><span>01 / EVERYDAY ESSENTIALS</span><span>28 组件</span></div>
            <div className="promo-core-preview" aria-label="基础组件预览"><span className="promo-status-pill">● 为细节而设计</span><h3>下一步，清楚一点。</h3><div><UiButton onClick={() => setIdeas(ideas + 1)}>记录灵感 <Arrow /></UiButton><UiButton variant="outline" onClick={() => setIdeas(8)}>重置演示</UiButton></div><p role="status">已记录 {ideas} 个演示灵感</p></div>
            <div className="promo-category-copy"><h3>每一天都会用到的基础。</h3><p>按钮、表单、弹层、通知与选择。常用状态和键盘操作，一起交付。</p><a href={base + "?q=UiButton"}>看看基础组件 <Arrow /></a></div>
          </article>
          <article className="promo-collection-item promo-workspace">
            <div className="promo-category-top"><span>02 / WORKSPACE & AGENTS</span><span>21 组件</span></div>
            <div className="promo-workspace-preview" aria-label="工作台组件预览"><div><span className="promo-tiny-symbol" aria-hidden="true">⌘</span><span><strong>你的工作区</strong><small>把复杂操作，放在手边。</small></span></div><UiButton variant="outline" onClick={() => setCommandOpen(true)}>搜索一个操作 <Arrow /></UiButton><p role="status">{selectedCommand || "点击打开真实命令菜单"}</p></div>
            <div className="promo-category-copy"><h3>让复杂界面，有条有理。</h3><p>表格、筛选、文件树与分栏，配上 Agent 消息、工具状态和审批。</p><a href={base + "?q=UiCommandMenu"}>看看工作台组件 <Arrow /></a></div>
          </article>
          <article className="promo-collection-item promo-motion">
            <div className="promo-category-top"><span>03 / A LITTLE MAGIC</span><span>20 组件</span></div>
            <div className="promo-motion-preview" aria-label="动效组件预览"><UiCircularProgress value={finished ? 100 : 72} label="灵感准备进度（演示）" /><span><strong>{finished ? "准备好了。" : "让界面，多一点感觉。"}</strong><small>细微动效 · 清晰反馈</small></span><button aria-label="切换进度演示" onClick={() => setFinished(!finished)}><Arrow /></button></div>
            <div className="promo-category-copy"><h3>那些刚刚好的表现力。</h3><p>流光、涟漪、轨道、Dock、滚动与文字强调。支持系统减少动态设置。</p><a href={base + "?q=UiShineButton"}>看看动效组件 <Arrow /></a></div>
          </article>
        </div>
      </section>
      <section className="promo-ownership promo-wrap" aria-labelledby="ownership-title">
        <div className="promo-ownership-word" aria-hidden="true">own<span>/</span>ui<span className="promo-word-star">✳</span></div>
        <div><p className="promo-eyebrow">YOUR PRODUCT. YOUR SOURCE.</p><h2 id="ownership-title">设计保持统一。<br />源码，握在你手里。</h2><p>每个组件都有真实预览、完整示例和依赖文件。复制到项目里，按你的产品继续打磨；颜色、圆角和间距，用同一套变量调整。</p><ul><li><span>01</span><strong>从零开始</strong><p>挑选需要的组件，组合属于你的页面。</p></li><li><span>02</span><strong>替换已有 UI</strong><p>对接原有状态与回调，逐项换上统一界面。</p></li><li><span>03</span><strong>接入复杂项目</strong><p>在项目层适配业务，按模块安排迁移。</p></li></ul></div>
      </section>
      <section id="start" className="promo-start promo-wrap" aria-labelledby="start-title">
        <div><p className="promo-eyebrow">ONE COMPONENT AWAY.</p><h2 id="start-title">下一个好界面，<br />从这里开始。</h2><p>React + Vite 或 Next.js，共用同一份组件源码。<br />按需安装，也可以在组件详情里直接下载全部文件。</p><a className="promo-button promo-primary" href={base}>去挑一个喜欢的 <Arrow /></a></div>
        <div className="promo-install"><div className="promo-install-top"><span>01 / TAKE THE SOURCE</span><UiButton variant="ghost" size="compact" onClick={copyInstall}>复制命令</UiButton></div><h3>试一个有光的按钮。</h3><p>在已配置 shadcn 和 ui 别名的 React 项目中运行：</p><pre tabIndex={0} aria-label="安装示例命令"><code>{install}</code></pre><p className="promo-install-note">完整示例会带齐依赖文件。无需 Tailwind；部分组件按需安装 Base UI 或 TanStack Table。</p><span className="promo-copy-status" role="status">{copyStatus}</span><a href={base + "docs/integration.md"}>查看完整接入说明 <Arrow /></a></div>
      </section>
    </main>
    <footer className="promo-footer promo-wrap"><a className="brand" href="#top"><span className="brand-mark"><span /></span><span className="brand-copy"><strong>own / ui</strong><small>MAKE IT YOURS.</small></span></a><p>一个好组件，让下一次创造轻一点。</p><div><a href={base}>组件目录</a><a href={repository} target="_blank" rel="noreferrer">GitHub ↗</a><a href={repository + "/blob/main/LICENSE"}>MIT License</a></div></footer>
    <UiCommandMenu open={commandOpen} onOpenChange={setCommandOpen} items={commands} onSelect={id => setSelectedCommand("已选择：" + commands.find(item => item.id === id)?.label)} />
  </div>
}
