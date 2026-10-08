import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import { UiShimmerText } from "./own-ui-shimmer-text"
import styles from "./own-ui-motion.module.css"

export function UiThinkingIndicator({ active = true, label = "正在思考", description, className, ...props }: HTMLAttributes<HTMLDivElement> & { active?: boolean; label?: string; description?: string }) {
  return <div {...props} className={cx(styles.thinking, className)} data-active={active} role="status">
    <span className={styles.orb} aria-hidden="true">{active ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" /></svg> : "✓"}</span>
    <div className={styles.thinkingCopy}><strong><UiShimmerText active={active}>{label}</UiShimmerText></strong>{description && <p>{description}</p>}</div>
  </div>
}
