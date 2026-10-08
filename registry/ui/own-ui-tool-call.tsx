import * as React from "react"
import { UiStatusBadge, type UiTone } from "./own-ui-status-badge"
import styles from "./own-ui.module.css"

export type ToolCallState = "queued" | "running" | "succeeded" | "failed"

const toolCallStates: Record<ToolCallState, { label: string; tone: UiTone }> = {
  queued: { label: "等待执行", tone: "neutral" },
  running: { label: "执行中", tone: "info" },
  succeeded: { label: "已完成", tone: "success" },
  failed: { label: "执行失败", tone: "danger" },
}

export interface ToolCallCardProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  state: ToolCallState
  summary?: string
  details?: React.ReactNode
}

export function ToolCallCard({
  name,
  state,
  summary,
  details,
  className,
  ...props
}: ToolCallCardProps) {
  const status = toolCallStates[state]
  return (
    <article {...props} className={[styles.panel, className].filter(Boolean).join(" ")}>
      <div className={styles.panel_header}>
        <h3 className={styles.panel_title}>{name}</h3>
        <UiStatusBadge tone={status.tone} role="status" aria-live="polite">{status.label}</UiStatusBadge>
      </div>
      {summary && <p className={styles.panel_copy}>{summary}</p>}
      {details && <div className={styles.panel_details}>{details}</div>}
    </article>
  )
}
