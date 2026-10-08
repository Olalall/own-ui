"use client"
import { useId, type CSSProperties, type HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-motion.module.css"

export type ReasoningStep = { id: string; label: string; detail?: string; state: "pending" | "running" | "completed" | "failed" }
const stateLabels = { pending: "待处理", running: "进行中", completed: "已完成", failed: "失败" }
export function UiReasoningPanel({ title = "处理过程", steps, open, onOpenChange, className, ...props }: Omit<HTMLAttributes<HTMLDivElement>, "children"> & { steps: ReasoningStep[]; open: boolean; onOpenChange: (open: boolean) => void }) {
  const id = useId()
  return <div {...props} className={cx(styles.trace, className)}>
    <button type="button" className={styles.traceTrigger} aria-expanded={open} aria-controls={id} onClick={() => onOpenChange(!open)}><strong>{title}</strong><span>{steps.filter(step => step.state === "completed").length} / {steps.length}</span><svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button>
    <div id={id} className={styles.traceReveal} data-open={open} aria-hidden={!open} inert={!open}><div className={styles.traceBody}>
      <ol className={styles.traceList} aria-label={`${title}步骤`}>{steps.map((step, index) => <li key={step.id} className={styles.traceStep} data-state={step.state} style={{ animationDelay: `${Math.min(index * 40, 400)}ms` } as CSSProperties}>
        <span className={styles.stepIcon} aria-hidden="true">{step.state === "completed" ? "✓" : step.state === "failed" ? "!" : step.state === "pending" ? "·" : null}</span>
        <div><strong>{step.label}<span className={styles.srOnly}>，{stateLabels[step.state]}</span></strong>{step.detail && <p>{step.detail}</p>}</div>
      </li>)}</ol>
    </div></div>
  </div>
}
