"use client"
import { useState } from "react"
import { UiOrbitDisplay } from "../own-ui-orbit-display"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

const items = [{ id: "design", label: "设计", icon: "✦" }, { id: "code", label: "源码", icon: "⌘" }, { id: "theme", label: "主题", icon: "◐" }, { id: "preview", label: "预览", icon: "▧" }, { id: "reuse", label: "复用", icon: "↗" }]
export default function OrbitDisplayExample() {
  const [active, setActive] = useState(true)
  const [many, setMany] = useState(false)
  return <section className={styles.demo} aria-label="轨道展示演示"><UiOrbitDisplay center="Own" label="组件库能力" active={active} items={many ? [...items, ...["检索", "复制", "下载", "安装"].map((label, i) => ({ id: `extra-${i}`, label, icon: "◇" }))] : items} /><div className={styles.demoActions}><UiButton variant="outline" aria-pressed={!active} onClick={() => setActive(!active)}>{active ? "暂停轨道" : "播放轨道"}</UiButton><UiButton variant="ghost" onClick={() => setMany(!many)}>{many ? "恢复环绕展示" : "展示更多能力"}</UiButton></div><p className={styles.demoCopy}>悬浮暂停；超过 8 项改为静态排列；系统减少动态时保持静止。</p></section>
}
