"use client"
import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export function UiAvatarGroup({ items, label, className, ...props }: HTMLAttributes<HTMLUListElement> & { items: { id: string; name: string; src?: string }[]; label: string }) {
  return <ul {...props} aria-label={label} className={cx(styles.avatarGroup, className)}>{items.map(item => <li key={item.id} className={styles.avatar} aria-label={item.name} title={item.name}><span aria-hidden="true">{Array.from(item.name.trim())[0] || "?"}</span>{item.src && <img src={item.src} alt="" loading="lazy" decoding="async" onError={event => { event.currentTarget.style.opacity = "0" }} onLoad={event => { event.currentTarget.style.opacity = "1" }} />}</li>)}</ul>
}
