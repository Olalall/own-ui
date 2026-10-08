"use client"
import { useState } from "react"
import { UiSpotlightCard } from "../own-ui-spotlight-card"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

export default function SpotlightCardExample() {
  const [opened, setOpened] = useState(false)
  return <section className={styles.demo} aria-label="聚光卡片演示"><UiSpotlightCard><div className={styles.demoGlyph} style={{ marginBottom: 24 }} aria-hidden="true">↗</div><p className={styles.demoKicker}>Your next project</p><h3 className={styles.demoTitle} style={{ marginBlock: "14px 12px" }}>从一个好组件开始。</h3><p className={styles.demoDescription}>移动鼠标，光线会跟随；键盘聚焦按钮时也有高亮反馈。</p><div style={{ marginTop: 24 }}><UiButton variant="outline" onClick={() => setOpened(!opened)}>{opened ? "关闭本地预览" : "打开本地预览"}</UiButton></div></UiSpotlightCard><p className={styles.demoStatus} role="status">{opened ? "本地预览已打开" : "可用鼠标或键盘操作"}</p></section>
}
