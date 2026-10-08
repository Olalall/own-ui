"use client"
import { useState } from "react"
import { UiGradientText } from "../own-ui-gradient-text"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"
import effects from "../own-ui-effects.module.css"

export default function GradientTextExample() {
  const [active, setActive] = useState(true)
  return <section className={styles.demo} aria-label="渐变文字演示"><div className={styles.demoStage}><p className={styles.demoKicker}>Ideas in motion</p><h3 className={effects.demoHeadline}><UiGradientText active={active}>让每一个想法，<br />都有自己的颜色。</UiGradientText></h3><p className={styles.demoDescription}>绿色、蓝色沿文字缓慢流动；色彩从主题变量取得。</p></div><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setActive(!active)}>{active ? "暂停渐变" : "播放渐变"}</UiButton></div></section>
}
