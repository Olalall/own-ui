import * as React from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export type UiTone = "neutral" | "success" | "warning" | "danger" | "info"

export interface UiStatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: UiTone
}

export function UiStatusBadge({
  tone = "neutral",
  className,
  children,
  ...props
}: UiStatusBadgeProps) {
  return (
    <span
      {...props}
      className={cx(styles.badge, styles[`badge_${tone}`], className)}
      data-tone={tone}
    >
      <span className={styles.badge_dot} aria-hidden="true" />
      {children}
    </span>
  )
}
