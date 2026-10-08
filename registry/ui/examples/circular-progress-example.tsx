"use client"
import { useState } from "react"
import { UiCircularProgress } from "../own-ui-circular-progress"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

export default function CircularProgressExample() {
  const [value, setValue] = useState(64)
  const [indeterminate, setIndeterminate] = useState(false)
  return <section className={styles.demo} aria-label="环形进度演示"><div className={styles.demoMetric}><UiCircularProgress label="组件准备进度" value={indeterminate ? undefined : value} /><div><strong>{indeterminate ? "正在计算" : value === 100 ? "准备完成" : "正在准备"}</strong><p className={styles.demoCopy}>让进度清楚可见。</p></div></div><div className={styles.demoActions}><UiButton variant="outline" disabled={indeterminate || value === 100} onClick={() => setValue(Math.min(100, value + 12))}>增加进度</UiButton><UiButton variant="ghost" onClick={() => { setValue(0); setIndeterminate(false) }}>归零</UiButton><UiButton variant="ghost" onClick={() => setIndeterminate(!indeterminate)}>{indeterminate ? "显示确定进度" : "显示未知进度"}</UiButton></div><p className={styles.demoCopy}>数值由项目提供；不模拟真实下载或上传。</p></section>
}
