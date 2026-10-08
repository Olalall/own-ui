"use client"
import { useState } from "react"
import { UiRippleButton } from "../own-ui-ripple-button"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

export default function RippleButtonExample() {
  const [count, setCount] = useState(0)
  return <section className={styles.demo} aria-label="点击涟漪演示"><div className={styles.demoStage}><p className={styles.demoKicker}>Every click matters</p><h3 className={styles.demoTitle}>从点击位置，向外扩散。</h3><p className={styles.demoDescription}>鼠标与触摸使用点击位置；Enter、空格从按钮中心响应。</p><div className={styles.demoActions}><UiRippleButton onClick={() => setCount(count + 1)}>同步组件</UiRippleButton><UiRippleButton variant="outline" disabled>暂不可用</UiRippleButton><UiButton variant="ghost" onClick={() => setCount(0)}>清零次数</UiButton></div></div><p className={styles.demoStatus} role="status">同步 {count} 次 · 不发出网络请求</p></section>
}
