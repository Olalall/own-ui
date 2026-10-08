import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export function UiBreadcrumb({ items, label = "面包屑", className, ...props }: HTMLAttributes<HTMLElement> & { items: { id: string; label: string; href?: string }[]; label?: string }) {
  return <nav {...props} aria-label={label} className={cx(styles.breadcrumb, className)}><ol>{items.map((item, i) => <li key={item.id}>{i > 0 && <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>}{i === items.length - 1 ? <span aria-current="page">{item.label}</span> : item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}</li>)}</ol></nav>
}
