"use client"
import { useState } from "react"
import { UiTiltCard } from "../own-ui-tilt-card"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"
import effects from "../own-ui-effects.module.css"

export default function TiltCardExample() {
  const [active, setActive] = useState(true)
  const [opened, setOpened] = useState(false)
  return <section className={styles.demo} aria-label="倾斜卡片演示"><UiTiltCard active={active}><div className={effects.demoCardMark}><strong>own / ui</strong><span>INTERACTIVE OBJECT · 01</span></div><h3 className={effects.demoHeadline}>有层次的界面，<br />从一张卡片开始。</h3><p className={styles.demoDescription} style={{ marginBlock: "16px 24px" }}>移动指针轻微倾斜；触摸设备保持静态。</p><UiButton variant="outline" onClick={() => setOpened(!opened)}>查看卡片信息</UiButton></UiTiltCard><div className={styles.demoActions}><UiButton variant="ghost" onClick={() => setActive(!active)}>{active ? "关闭倾斜" : "开启倾斜"}</UiButton></div><p className={styles.demoStatus} role="status">{opened ? "这张卡片可以装入你的标题、内容和操作。" : "移动指针或聚焦卡片内的按钮"}</p></section>
}
