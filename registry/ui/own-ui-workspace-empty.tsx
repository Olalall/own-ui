import * as React from "react"
import styles from "./own-ui.module.css"

export interface WorkspaceEmptyStateProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  description?: string
  action?: React.ReactNode
}

export function WorkspaceEmptyState({ title, description, action, className, ...props }: WorkspaceEmptyStateProps) {
  return (
    <section {...props} className={[styles.panel, styles.empty, className].filter(Boolean).join(" ")}>
      <span className={styles.empty_mark} aria-hidden="true">—</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action && <div className={styles.empty_action}>{action}</div>}
    </section>
  )
}
