import * as React from "react"
import { UiStatusBadge } from "./own-ui-status-badge"
import styles from "./own-ui.module.css"

export type ApprovalRisk = "low" | "medium" | "high" | "critical"

const riskLabels: Record<ApprovalRisk, string> = {
  low: "低风险",
  medium: "中风险",
  high: "高风险",
  critical: "关键操作",
}

export interface ToolApprovalPanelProps extends React.HTMLAttributes<HTMLElement> {
  toolName: string
  risk: ApprovalRisk
  description: string
  details?: React.ReactNode
  actions?: React.ReactNode
}

export function ToolApprovalPanel({
  toolName,
  risk,
  description,
  details,
  actions,
  className,
  ...props
}: ToolApprovalPanelProps) {
  const titleId = React.useId()
  return (
    <section
      {...props}
      className={[styles.panel, styles.approval, className].filter(Boolean).join(" ")}
      aria-labelledby={titleId}
    >
      <div className={styles.panel_header}>
        <h3 className={styles.panel_title} id={titleId}>{toolName}</h3>
        <UiStatusBadge tone={risk === "critical" || risk === "high" ? "danger" : "warning"}>
          {riskLabels[risk]} · 等待审批
        </UiStatusBadge>
      </div>
      <p className={styles.panel_copy}>{description}</p>
      {details && <div className={styles.panel_details}>{details}</div>}
      {actions ? (
        <div className={styles.approval_actions}>{actions}</div>
      ) : (
        <p className={styles.panel_hint}>审批操作由接入应用提供。</p>
      )}
    </section>
  )
}
