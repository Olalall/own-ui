import * as React from "react"
import { cx } from "./own-ui-utils"
import type { UiTone } from "./own-ui-status-badge"
import styles from "./own-ui.module.css"

export interface UiNoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: UiTone
  title?: string
}

export function UiNotice({ tone = "info", title, className, children, ...props }: UiNoticeProps) {
  return (
    <div {...props} className={cx(styles.notice, styles[`notice_${tone}`], className)} role={props.role ?? (tone === "danger" ? "alert" : "status")}>
      {title && <strong className={styles.notice_title}>{title}</strong>}
      <div>{children}</div>
    </div>
  )
}
