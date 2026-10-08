"use client"
import { useState } from "react"
import { UiAnimatedNumber } from "../own-ui-animated-number"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

export default function AnimatedNumberExample() {
  const [value, setValue] = useState(1280)
  return <section className={styles.demo} aria-label="滚动数字演示"><div className={styles.demoStage}><p className={styles.demoKicker}>This month</p><div className={styles.metric}><UiAnimatedNumber value={value} /><span className={styles.metricDelta}>已处理任务</span></div><p className={styles.demoDescription}>数值连续过渡，重复点击会从当前值继续。</p></div><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setValue(value + 128)}>增加 128</UiButton><UiButton variant="ghost" onClick={() => setValue(1280)}>重置数字</UiButton></div></section>
}
