"use client"
import { useEffect, useState } from "react"
import { UiRotatingText } from "../own-ui-rotating-text"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"
import effects from "../own-ui-effects.module.css"

const words = ["代码", "界面", "体验"]
export default function RotatingTextExample() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  useEffect(() => {
    if (!playing) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const stopOnReduce = () => { if (media.matches) setPlaying(false) }
    stopOnReduce()
    const timer = media.matches ? undefined : window.setInterval(() => setIndex(current => (current + 1) % words.length), 1800)
    media.addEventListener("change", stopOnReduce)
    return () => { window.clearInterval(timer); media.removeEventListener("change", stopOnReduce) }
  }, [playing])
  return <section className={styles.demo} aria-label="轮换文字演示"><div className={styles.demoStage}><p className={styles.demoKicker}>One library, many possibilities</p><h3 className={effects.demoHeadline}>一起打磨<br />更好的 <UiRotatingText text={words[index]} />。</h3><p className={styles.demoDescription}>代码 · 界面 · 体验。轮换定时器只存在于这个示例。</p></div><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setPlaying(!playing)}>{playing ? "暂停轮换" : "播放轮换"}</UiButton><UiButton variant="ghost" onClick={() => { setPlaying(false); setIndex((index + 1) % words.length) }}>切换下一词</UiButton></div></section>
}
