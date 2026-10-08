"use client"
import { useState } from "react"
import { UiSplitPane } from "../own-ui-split-pane"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

export default function SplitPaneExample() {
  const [value, setValue] = useState(45)
  const [disabled, setDisabled] = useState(false)
  return <section className={styles.demo} aria-label="可调分栏演示"><UiSplitPane label="调整左右比例" value={value} onValueChange={setValue} disabled={disabled} first={<div className={styles.demoSplitContent}><strong>导航</strong><p>组件<br />主题<br />我的收藏</p><p className={styles.muted}>左侧保留上下文。</p></div>} second={<div className={styles.demoSplitContent}><strong>内容</strong><p>每个项目都有自己的工作方式。</p><p className={styles.muted}>让空间随着任务调整。</p></div>} /><div className={styles.demoActions}><UiButton variant="outline" disabled={disabled} onClick={() => setValue(50)}>均分空间</UiButton><UiButton variant="ghost" onClick={() => setDisabled(!disabled)}>{disabled ? "解锁比例" : "锁定比例"}</UiButton></div><p className={styles.demoCopy}>拖动下方滑块，或用方向键、Home、End 调整；范围 25%—75%。</p></section>
}
