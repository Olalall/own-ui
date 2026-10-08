import * as React from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export interface UiProgressProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  label: string
}

export function UiProgress({ label, className, value: rawValue, max: rawMax = 1, ...props }: UiProgressProps) {
  const max = Number.isFinite(Number(rawMax)) && Number(rawMax) > 0 ? Number(rawMax) : 1
  const value = rawValue === undefined || !Number.isFinite(Number(rawValue)) ? undefined : Math.min(max, Math.max(0, Number(rawValue)))
  const percentage = value === undefined ? undefined : Math.round(value / max * 100)
  return (
    <div className={styles.progress_wrap}>
      <div className={styles.progress_label}><span>{label}</span><span>{percentage === undefined ? "进行中" : `${percentage}%`}</span></div>
      <progress {...props} value={value} max={max} aria-label={props["aria-label"] ?? label} className={cx(styles.progress, className)} />
    </div>
  )
}
