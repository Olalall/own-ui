"use client"
import { useState } from "react"
import { UiThinkingIndicator } from "../own-ui-thinking-indicator"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

export default function ThinkingIndicatorExample() {
  const [active, setActive] = useState(true)
  return <section className={styles.demo} aria-label="思考状态演示"><div className={styles.demoStage}><p className={styles.demoKicker}>Agent activity</p><UiThinkingIndicator active={active} label={active ? "正在整理你的工作区" : "整理完成"} description={active ? "阅读文件 · 比较变更 · 汇总结果" : "已找到 8 个可以复用的组件。"} /></div><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setActive(!active)}>{active ? "完成思考" : "重新思考"}</UiButton></div></section>
}
