import * as React from "react"
import styles from "./own-ui.module.css"

export type AgentStepState = "pending" | "running" | "completed" | "failed"

export interface AgentTimelineStep {
  id: string
  title: string
  state: AgentStepState
  description?: string
  time?: string
}

export interface AgentTimelineProps extends React.OlHTMLAttributes<HTMLOListElement> {
  steps: AgentTimelineStep[]
}

const stepLabels: Record<AgentStepState, string> = {
  pending: "未开始",
  running: "进行中",
  completed: "已完成",
  failed: "失败",
}

export function AgentTimeline({ steps, className, ...props }: AgentTimelineProps) {
  return (
    <ol {...props} className={[styles.timeline, className].filter(Boolean).join(" ")}>
      {steps.map((step) => (
        <li key={step.id} className={[styles.timeline_item, styles[`timeline_${step.state}`]].join(" ")}>
          <span className={styles.timeline_marker} aria-hidden="true" />
          <div className={styles.timeline_body}>
            <div className={styles.timeline_heading}>
              <strong>{step.title}</strong>
              <span>{stepLabels[step.state]}</span>
            </div>
            {step.description && <p>{step.description}</p>}
            {step.time && <time>{step.time}</time>}
          </div>
        </li>
      ))}
    </ol>
  )
}
