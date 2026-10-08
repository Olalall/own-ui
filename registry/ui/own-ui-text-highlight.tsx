import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export function UiTextHighlight({ active = true, className, ...props }: HTMLAttributes<HTMLElement> & { active?: boolean }) {
  return <mark {...props} className={cx(styles.highlight, className)} data-active={active} />
}
