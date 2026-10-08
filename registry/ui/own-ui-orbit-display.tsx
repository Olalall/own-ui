import type { HTMLAttributes, ReactNode } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export function UiOrbitDisplay({ items, center, label, active = true, className, ...props }: HTMLAttributes<HTMLDivElement> & { items: { id: string; label: string; icon: ReactNode }[]; center: ReactNode; label: string; active?: boolean }) {
  const orbiting = items.length > 1 && items.length <= 8
  return <div {...props} className={cx(styles.orbit, className)} data-active={active} data-layout={orbiting ? "orbit" : "static"}><div className={styles.orbitCenter}>{center}</div><ul className={styles.orbitList} aria-label={label}>{items.map((item, i) => <li key={item.id} aria-label={item.label} title={item.label} style={orbiting ? { transform: `rotate(${i * 360 / items.length}deg) translateX(86px) rotate(${-i * 360 / items.length}deg)` } : undefined}><span className={styles.orbitIcon} aria-hidden="true">{item.icon}</span></li>)}</ul></div>
}
