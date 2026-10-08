"use client"
import type { HTMLAttributes, ReactNode } from "react"
import { UiButton } from "./own-ui-button"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-effects.module.css"

export function UiDock({ items, label, value, onSelect, className, ...props }: Omit<HTMLAttributes<HTMLElement>, "onSelect"> & { items: { id: string; label: string; icon: ReactNode; disabled?: boolean }[]; label: string; value: string; onSelect: (id: string) => void }) {
  return <nav {...props} aria-label={label} className={cx(styles.dock, className)}>{items.length ? <ul>{items.map(item => <li key={item.id}><UiButton variant="ghost" aria-label={item.label} aria-current={item.id === value ? "page" : undefined} disabled={item.disabled} onClick={() => onSelect(item.id)}><span aria-hidden="true">{item.icon}</span><span className={styles.dockLabel} aria-hidden="true">{item.label}</span></UiButton></li>)}</ul> : <p className={styles.emptyDock}>暂无入口</p>}</nav>
}
