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

export interface WorkspacePaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function WorkspacePagination({ page, totalPages, onPageChange, className, ...props }: WorkspacePaginationProps) {
  const pageCount = Math.max(1, Math.floor(totalPages))
  const currentPage = Math.min(pageCount, Math.max(1, Math.floor(page)))
  return (
    <nav {...props} className={[styles.pagination, className].filter(Boolean).join(" ")} aria-label={props["aria-label"] ?? "分页"}>
      <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>上一页</button>
      <span aria-live="polite">第 {currentPage} / {pageCount} 页</span>
      <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= pageCount}>下一页</button>
    </nav>
  )
}
