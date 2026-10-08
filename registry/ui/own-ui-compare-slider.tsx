"use client"
import { useId, type HTMLAttributes, type ReactNode } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-effects.module.css"

export function UiCompareSlider({ before, after, label, beforeLabel = "调整前", afterLabel = "调整后", value, onValueChange, disabled, className, ...props }: Omit<HTMLAttributes<HTMLElement>, "children"> & { before: ReactNode; after: ReactNode; label: string; beforeLabel?: string; afterLabel?: string; value: number; onValueChange: (value: number) => void; disabled?: boolean }) {
  const inputId = useId()
  const position = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 50
  return <figure {...props} className={cx(styles.compare, className)}><div className={styles.compareStage}>
    <div className={styles.compareLayer} aria-hidden="true" inert>{after}</div>
    <div className={styles.compareLayer} aria-hidden="true" inert style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>{before}</div>
    <div className={styles.compareDivider} aria-hidden="true" style={{ left: `${position}%` }}><span>↔</span></div>
    <span className={styles.compareBefore}>{beforeLabel}</span><span className={styles.compareAfter}>{afterLabel}</span>
  </div><figcaption><label htmlFor={inputId}>{label}</label><span>{Math.round(position)}%</span></figcaption><input id={inputId} type="range" min={0} max={100} step={1} value={position} disabled={disabled} aria-valuetext={`${beforeLabel} ${Math.round(position)}% / ${afterLabel} ${Math.round(100 - position)}%`} onChange={event => onValueChange(event.currentTarget.valueAsNumber)} /></figure>
}
