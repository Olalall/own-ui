"use client"
import { useState } from "react"
import { UiShineButton } from "../own-ui-shine-button"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

export default function ShineButtonExample() {
  const [count, setCount] = useState(0)
  const [disabled, setDisabled] = useState(false)
  return <section className={styles.demo} aria-label="流光按钮演示"><div className={styles.demoStage}><p className={styles.demoKicker}>A clear next step</p><h3 className={styles.demoTitle}>让重要操作，多一点光。</h3><p className={styles.demoDescription}>细光扫过按钮，点击后仍由项目的回调处理。</p><div className={styles.demoActions}><UiShineButton disabled={disabled} onClick={() => setCount(count + 1)}>开始整理 ↗</UiShineButton><UiButton variant="outline" onClick={() => setDisabled(!disabled)}>{disabled ? "启用流光按钮" : "禁用流光按钮"}</UiButton></div></div><p className={styles.demoStatus} role="status">已整理 {count} 次；{disabled ? "按钮不可用" : "可以继续操作"}</p></section>
}
