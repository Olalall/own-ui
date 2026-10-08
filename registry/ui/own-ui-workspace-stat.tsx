import * as React from "react"
import styles from "./own-ui.module.css"

export interface WorkspaceStatCardProps extends React.HTMLAttributes<HTMLElement> {
  label: string
  value: React.ReactNode
  detail?: string
}

export function WorkspaceStatCard({ label, value, detail, className, ...props }: WorkspaceStatCardProps) {
  return (
    <article {...props} className={[styles.panel, styles.stat_card, className].filter(Boolean).join(" ")}>
      <span className={styles.stat_label}>{label}</span>
      <strong className={styles.stat_value}>{value}</strong>
      {detail && <span className={styles.stat_detail}>{detail}</span>}
    </article>
  )
}
