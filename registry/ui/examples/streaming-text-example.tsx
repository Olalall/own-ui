"use client"
import { useEffect, useState } from "react"
import { UiStreamingText } from "../own-ui-streaming-text"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

const content = "已为你整理这周的项目进展：8 个组件可以直接复用，3 个交互需要统一。先保留项目的数据与业务逻辑，再逐项替换展示层。"
export default function StreamingTextExample() {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(true)
  const streaming = running && count < content.length
  useEffect(() => {
    if (!streaming) return
    const timer = setTimeout(() => setCount(value => value + 1), 55)
    return () => clearTimeout(timer)
  }, [count, streaming])
  return <section className={styles.demo} aria-label="流式文本演示"><div className={styles.demoStage}><p className={styles.demoKicker}>Live response</p><UiStreamingText text={content.slice(0, count)} streaming={streaming} /></div><div className={styles.demoActions}><UiButton variant="outline" onClick={() => { setCount(0); setRunning(true) }}>重新生成</UiButton><UiButton variant="ghost" disabled={count >= content.length} onClick={() => setRunning(!running)}>{running ? "暂停生成" : "继续生成"}</UiButton></div><p className={styles.demoStatus}>本地文字演示；实际内容由项目传入。</p></section>
}
