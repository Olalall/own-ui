import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-effects.module.css"

export function UiGradientText({ active = true, className, ...props }: HTMLAttributes<HTMLSpanElement> & { active?: boolean }) {
  return <span {...props} className={cx(styles.gradientText, className)} data-active={active} />
}
