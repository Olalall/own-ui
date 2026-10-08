import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-motion.module.css"

export function UiShimmerText({ active = true, className, ...props }: HTMLAttributes<HTMLSpanElement> & { active?: boolean }) {
  return <span {...props} className={cx(styles.shimmer, className)} data-active={active} />
}
