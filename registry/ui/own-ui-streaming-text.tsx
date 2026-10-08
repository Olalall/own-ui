import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-motion.module.css"

export function UiStreamingText({ text, streaming = false, className, ...props }: Omit<HTMLAttributes<HTMLDivElement>, "children"> & { text: string; streaming?: boolean }) {
  return <div {...props} className={cx(styles.stream, className)} aria-busy={streaming}>
    <span aria-hidden="true">{Array.from(text).map((character, index) => <span key={index} className={styles.streamCharacter}>{character}</span>)}{streaming && <span className={styles.cursor} />}</span>
    <span className={styles.srOnly} role="status">{streaming ? "正在生成内容" : text || "尚无内容"}</span>
  </div>
}
