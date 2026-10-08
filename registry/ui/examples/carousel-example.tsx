"use client"
import { useState } from "react"
import { UiCarousel } from "../own-ui-carousel"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

export default function CarouselExample() {
  const [value, setValue] = useState(0)
  const [empty, setEmpty] = useState(false)
  const [saved, setSaved] = useState("")
  const items = ["从灵感开始", "沿着细节打磨", "让界面成为作品"].map((title, i) => ({ id: String(i), title, content: <div className={styles.demoSlide} data-tone={i + 1}><p className={styles.demoEyebrow}>Collection / 0{i + 1}</p><h3 className={styles.demoTitle}>{title}</h3><p className={styles.demoCopy}>手动翻页，内容自然切换。每一张都可以承载真实操作。</p><UiButton variant="outline" onClick={() => setSaved(`已收藏：${title}`)}>收藏这一张</UiButton></div> }))
  return <section className={styles.demo} aria-label="轮播演示"><UiCarousel label="灵感轮播" items={empty ? [] : items} value={value} onValueChange={setValue} /><p className={styles.demoCopy} role="status">{saved || "轮播不会自动播放；隐藏页面的按钮不会进入 Tab 顺序。"}</p><div className={styles.demoActions}><UiButton variant="ghost" onClick={() => setEmpty(!empty)}>{empty ? "恢复轮播内容" : "显示空轮播"}</UiButton></div></section>
}
