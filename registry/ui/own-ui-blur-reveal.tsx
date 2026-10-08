import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-effects.module.css"

export function UiBlurReveal({ visible, className, ...props }: HTMLAttributes<HTMLDivElement> & { visible: boolean }) {
  return <div {...props} className={cx(styles.blurReveal, className)} data-visible={visible} inert={!visible} aria-hidden={!visible} />
}
