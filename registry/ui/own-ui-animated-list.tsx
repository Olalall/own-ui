import type { HTMLAttributes, ReactNode } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-motion.module.css"

export function UiAnimatedList({ items, label = "动态列表", className, ...props }: Omit<HTMLAttributes<HTMLUListElement>, "children"> & { items: { id: string; content: ReactNode }[]; label?: string }) {
  return <ul {...props} className={cx(styles.list, className)} aria-label={label}>{items.map((item, index) => <li key={item.id} className={styles.listItem} style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}>{item.content}</li>)}</ul>
}
