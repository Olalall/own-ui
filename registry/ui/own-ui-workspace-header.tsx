import * as React from "react"
import styles from "./own-ui.module.css"

export interface WorkspaceHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  description?: string
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
}

export function WorkspaceHeader({
  title,
  description,
  actions,
  breadcrumbs,
  className,
  ...props
}: WorkspaceHeaderProps) {
  return (
    <header {...props} className={[styles.workspace_header, className].filter(Boolean).join(" ")}>
      <div className={styles.workspace_heading}>
        {breadcrumbs && <nav className={styles.workspace_breadcrumbs} aria-label="面包屑">{breadcrumbs}</nav>}
        <h1 className={styles.workspace_title}>{title}</h1>
        {description && <p className={styles.workspace_description}>{description}</p>}
      </div>
      {actions && <div className={styles.workspace_actions}>{actions}</div>}
    </header>
  )
}
