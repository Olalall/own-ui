import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export function UiCircularProgress({ value, label, className, ...props }: HTMLAttributes<HTMLDivElement> & { value?: number; label: string }) {
  const amount = typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : undefined
  const circumference = 2 * Math.PI * 44
  return <div {...props} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={amount} className={cx(styles.circularProgress, className)} data-indeterminate={amount === undefined}><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" className={styles.circleTrack} /><circle cx="50" cy="50" r="44" className={styles.circleValue} strokeDasharray={circumference} strokeDashoffset={circumference * (1 - (amount ?? 25) / 100)} /></svg><span aria-hidden="true">{amount === undefined ? "处理中" : `${Math.round(amount)}%`}</span></div>
}
