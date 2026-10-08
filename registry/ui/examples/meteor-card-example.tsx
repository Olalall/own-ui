"use client"
import { useState } from "react"
import { UiMeteorCard } from "../own-ui-meteor-card"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"
import effects from "../own-ui-effects.module.css"

export default function MeteorCardExample() {
  const [active, setActive] = useState(true)
  const [saved, setSaved] = useState(false)
  return <section className={styles.demo} aria-label="流星背景演示"><UiMeteorCard active={active}><div className={styles.demoStage}><span className={effects.demoBadge}>✦ A space for your ideas</span><h3 className={effects.demoHeadline}>让想法，<br />划过这片留白。</h3><p className={styles.demoDescription}>八道轻量 CSS 光线作为装饰，内容仍然保持清楚。</p><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setSaved(!saved)}>{saved ? "取消收藏" : "收藏这个灵感"}</UiButton></div></div></UiMeteorCard><div className={styles.demoActions}><UiButton variant="ghost" onClick={() => setActive(!active)}>{active ? "暂停流星" : "播放流星"}</UiButton></div><p className={styles.demoStatus} role="status">{saved ? "已收藏到本地演示状态" : "尚未收藏"}</p></section>
}
