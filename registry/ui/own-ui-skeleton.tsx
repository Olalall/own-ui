import * as React from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export function UiSkeleton({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} aria-hidden="true" className={cx(styles.skeleton, className)} />
}
