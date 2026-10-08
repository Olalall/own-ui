"use client"
import { useState } from "react"
import { UiDock } from "../own-ui-dock"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

const items = [{ id: "home", label: "首页", icon: "⌂" }, { id: "files", label: "文件", icon: "▧" }, { id: "ideas", label: "灵感", icon: "✦" }, { id: "settings", label: "设置", icon: "⚙" }, { id: "archive", label: "归档", icon: "▤", disabled: true }]
export default function DockExample() {
  const [value, setValue] = useState("home")
  const [empty, setEmpty] = useState(false)
  return <section className={styles.demo} aria-label="悬浮 Dock 演示"><div className={styles.demoStage}><p className={styles.demoKicker}>Your tools, within reach</p><h3 className={styles.demoTitle}>常用入口，在手边。</h3><p className={styles.demoDescription}>悬浮放大当前入口；Tab 聚焦显示名称；归档暂不可用。</p></div><UiDock label="快捷工作区" items={empty ? [] : items} value={value} onSelect={setValue} /><p className={styles.demoStatus} role="status">当前入口：{items.find(item => item.id === value)?.label}</p><div className={styles.demoActions}><UiButton variant="ghost" onClick={() => setEmpty(!empty)}>{empty ? "恢复 Dock 入口" : "显示空 Dock"}</UiButton></div></section>
}
