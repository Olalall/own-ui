"use client"
import { useState } from "react"
import { UiBorderBeam } from "../own-ui-border-beam"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

export default function BorderBeamExample() {
  const [active, setActive] = useState(true)
  return <section className={styles.demo} aria-label="边框光束演示"><UiBorderBeam active={active}><p className={styles.demoKicker}>Workspace intelligence</p><h3 className={styles.demoTitle} style={{ marginTop: 14 }}>每一次改变，都有迹可循。</h3><svg className={styles.demoGraph} viewBox="0 0 360 70" fill="none" aria-hidden="true"><path d="M0 58h360M0 30h360" stroke="currentColor" opacity=".08" /><path d="M0 60C22 60 20 34 48 39S70 58 96 31s36 24 65-7 36 8 59-7 35 24 56 0 35 14 84-12" stroke="currentColor" strokeWidth="2" /></svg><p className={styles.demoDescription}>流动边框可以强调正在处理的卡片；内容和按钮由项目提供。</p></UiBorderBeam><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setActive(!active)}>{active ? "暂停光束" : "播放光束"}</UiButton></div></section>
}
