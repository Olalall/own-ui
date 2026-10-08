"use client"
import { useState } from "react"
import { UiMarquee } from "../own-ui-marquee"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"
import effects from "../own-ui-effects.module.css"

const items = ["设计", "开发", "协作", "交付"].map((name, i) => ({ id: name, content: <div className={effects.demoLogo}><span aria-hidden="true">{["◇", "⌘", "↗", "✦"][i]}</span>{name}</div> }))
export default function MarqueeExample() {
  const [active, setActive] = useState(true)
  return <section className={styles.demo} aria-label="无缝滚动演示"><p className={styles.demoKicker}>Keep the work flowing</p><h3 className={styles.demoTitle}>一个连续流动的展示带。</h3><UiMarquee items={items} label="工作流程" active={active} /><p className={styles.demoDescription}>悬浮与键盘聚焦自动暂停；停用后以静态列表展示全部内容。</p><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setActive(!active)}>{active ? "改为静态展示" : "开启连续滚动"}</UiButton></div></section>
}
