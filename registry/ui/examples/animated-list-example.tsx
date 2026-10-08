"use client"
import { useState } from "react"
import { UiAnimatedList } from "../own-ui-animated-list"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

const tasks = ["设计稿已更新", "组件已同步", "项目构建完成", "变更记录已整理"]
export default function AnimatedListExample() {
  const [count, setCount] = useState(2)
  const items = Array.from({ length: Math.min(count, 3) }, (_, offset) => count - Math.min(count, 3) + offset)
  return <section className={styles.demo} aria-label="动态列表演示"><p className={styles.demoKicker}>Activity feed</p><UiAnimatedList label="动态通知" items={items.map(index => ({ id: String(index), content: <div className={styles.demoRow}><span className={styles.demoGlyph} aria-hidden="true">{index % 2 ? "↗" : "✓"}</span><div><strong>{tasks[index % tasks.length]}</strong><small>工作区 · 本地演示</small></div><small>刚刚</small></div> }))} /><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setCount(count + 1)}>添加通知</UiButton><UiButton variant="ghost" onClick={() => setCount(0)}>清空通知</UiButton></div><p className={styles.demoStatus} role="status">{items.length ? `显示最近 ${items.length} 条通知` : "还没有通知"}</p></section>
}
