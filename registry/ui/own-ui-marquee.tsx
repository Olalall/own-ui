import type { HTMLAttributes, ReactNode } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-effects.module.css"

export function UiMarquee({ items, label, active = true, className, ...props }: HTMLAttributes<HTMLDivElement> & { items: { id: string; content: ReactNode }[]; label: string; active?: boolean }) {
  return <div {...props} className={cx(styles.marquee, className)} data-active={active}><div className={styles.marqueeTrack}><ul className={styles.marqueeGroup} aria-label={label}>{items.map(item => <li key={item.id}>{item.content}</li>)}</ul><div className={styles.marqueeGroup} aria-hidden="true" inert>{items.map(item => <div key={item.id}>{item.content}</div>)}</div></div></div>
}
