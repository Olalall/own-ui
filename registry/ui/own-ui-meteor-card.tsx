import type { CSSProperties, HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-effects.module.css"

export function UiMeteorCard({ active = true, children, className, ...props }: HTMLAttributes<HTMLDivElement> & { active?: boolean }) {
  return <div {...props} className={cx(styles.meteorCard, className)} data-active={active}><div className={styles.meteorSky} aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span key={i} className={styles.meteor} style={{ "--meteor-left": `${12 + i * 13}%`, "--meteor-delay": `${-i * .7}s` } as CSSProperties} />)}</div><div className={styles.meteorContent}>{children}</div></div>
}
