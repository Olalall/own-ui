"use client"
import type { HTMLAttributes, ReactNode } from "react"
import { UiButton } from "./own-ui-button"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export function UiCarousel({ items, value, onValueChange, label, className, ...props }: HTMLAttributes<HTMLDivElement> & { items: { id: string; title: string; content: ReactNode }[]; value: number; onValueChange: (value: number) => void; label: string }) {
  const index = Number.isFinite(value) ? Math.max(0, Math.min(items.length - 1, Math.trunc(value))) : 0
  return <div {...props} role="region" aria-roledescription="轮播" aria-label={label} className={cx(styles.carousel, className)}>{items.length ? <><div className={styles.carouselStage}><div className={styles.carouselTrack} style={{ transform: `translateX(${-index * 100}%)` }}>{items.map((item, i) => <div key={item.id} role="group" aria-roledescription="幻灯片" aria-label={`${i + 1} / ${items.length} · ${item.title}`} aria-hidden={i !== index} inert={i !== index} className={styles.carouselSlide}>{item.content}</div>)}</div></div><div className={styles.carouselControls}><UiButton variant="outline" size="compact" disabled={index === 0} onClick={() => onValueChange(index - 1)}>上一张</UiButton><span role="status">{index + 1} / {items.length}</span><UiButton variant="outline" size="compact" disabled={index === items.length - 1} onClick={() => onValueChange(index + 1)}>下一张</UiButton></div></> : <p className={styles.muted}>没有可展示内容</p>}</div>
}
