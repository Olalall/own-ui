"use client"
import { useState } from "react"
import { UiReasoningPanel } from "../own-ui-reasoning-panel"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"

const steps = [{ id: "read", label: "阅读项目文件", detail: "已确认 React、样式入口与组件依赖。" }, { id: "compare", label: "比较界面模式", detail: "归纳设置、列表和 Agent 对话里的共同结构。" }, { id: "deliver", label: "生成组件清单", detail: "保留源码、示例和接入说明。" }]
export default function ReasoningPanelExample() {
  const [open, setOpen] = useState(true)
  const [stage, setStage] = useState(1)
  return <section className={styles.demo} aria-label="推理展开演示"><p className={styles.demoKicker}>Visible progress</p><UiReasoningPanel title="整理过程" open={open} onOpenChange={setOpen} steps={steps.map((step, index) => ({ ...step, state: index < stage ? "completed" : index === stage ? "running" : "pending" }))} /><div className={styles.demoActions}><UiButton variant="outline" disabled={stage === steps.length} onClick={() => setStage(stage + 1)}>推进一步</UiButton><UiButton variant="ghost" onClick={() => { setStage(0); setOpen(true) }}>重新开始</UiButton></div><p className={styles.demoStatus} role="status">{stage === steps.length ? "全部步骤完成" : `已完成 ${stage} 个步骤`}</p></section>
}
