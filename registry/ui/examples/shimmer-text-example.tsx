"use client"
import { useState } from "react"
import { UiShimmerText } from "../own-ui-shimmer-text"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

export default function ShimmerTextExample() {
  const [active, setActive] = useState(true)
  return <section className={styles.demo} aria-label="流光文字演示"><div className={styles.demoStage}><p className={styles.demoKicker}>A little more presence</p><h3 className={styles.demoTitle}><UiShimmerText active={active}>把灵感，变成你的下一步。</UiShimmerText></h3><p className={styles.demoDescription}>细微的光线掠过文字，用在生成提示、标题或重点说明。</p></div><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setActive(!active)}>{active ? "暂停流光" : "播放流光"}</UiButton></div></section>
}
