"use client"
import { useState } from "react"
import { UiTextHighlight } from "../own-ui-text-highlight"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

export default function TextHighlightExample() {
  const [active, setActive] = useState(true)
  const [run, setRun] = useState(0)
  return <section className={styles.demo} aria-label="文字划线演示"><div className={styles.demoPanel}><p className={styles.demoEyebrow}>Make a point</p><h3 className={styles.demoTitle}>把时间留给<br /><UiTextHighlight key={run} active={active}>真正想做的事。</UiTextHighlight></h3><p className={styles.demoCopy}>柔和的标记从左侧展开。文字始终可读，强调使用 mark 语义。</p></div><div className={styles.demoActions}><UiButton variant="outline" onClick={() => { setActive(true); setRun(current => current + 1) }}>重播划线</UiButton><UiButton variant="ghost" aria-pressed={active} onClick={() => setActive(!active)}>{active ? "隐藏划线" : "显示划线"}</UiButton></div></section>
}
