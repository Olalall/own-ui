import * as React from "react"
import styles from "./own-ui.module.css"

export interface ListToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  search?: React.ReactNode
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function ListToolbar({
  search,
  filters,
  actions,
  className,
  ...props
}: ListToolbarProps) {
  return (
    <div {...props} className={[styles.list_toolbar, className].filter(Boolean).join(" ")}>
      {search && <div className={styles.list_search}>{search}</div>}
      {filters && <div className={styles.list_filters}>{filters}</div>}
      {actions && <div className={styles.list_actions}>{actions}</div>}
    </div>
  )
}
