import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-motion.module.css"

export function UiBorderBeam({ active = true, children, className, ...props }: HTMLAttributes<HTMLDivElement> & { active?: boolean }) {
  return <div {...props} className={cx(styles.beamCard, className)} data-active={active}><div className={styles.beamContent}>{children}</div></div>
}
