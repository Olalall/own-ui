"use client"
import * as React from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export interface SidebarNavItem { id: string; label: string; meta?: React.ReactNode; disabled?: boolean }
export interface UiSidebarNavProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  label: string
  items: SidebarNavItem[]
  value: string | null
  onSelect: (id: string) => void
  footer?: React.ReactNode
}

export function UiSidebarNav({ label, items, value, onSelect, footer, className, ...props }: UiSidebarNavProps) {
  return <nav {...props} aria-label={label} className={cx(styles.sidebar_nav, className)}>
    <div className={styles.field_label}>{label}</div>
    {items.length ? <ul className={styles.sidebar_items}>{items.map(item => <li key={item.id}><button type="button" className={styles.sidebar_item} disabled={item.disabled} aria-current={item.id === value ? "page" : undefined} onClick={() => onSelect(item.id)}><span>{item.label}</span>{item.meta && <span className={styles.panel_hint}>{item.meta}</span>}</button></li>)}</ul> : <p className={styles.panel_hint}>暂无导航项。</p>}
    {footer}
  </nav>
}
