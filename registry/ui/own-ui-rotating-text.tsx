import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-effects.module.css"

export function UiRotatingText({ text, className, ...props }: Omit<HTMLAttributes<HTMLSpanElement>, "children"> & { text: string }) {
  return <span {...props} className={cx(styles.rotatingText, className)}><span key={text} className={styles.rotatingWord}>{text}</span></span>
}
