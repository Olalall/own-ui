"use client"
import { useState, type HTMLAttributes } from "react"
import { UiButton } from "./own-ui-button"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export function UiTerminal({ title, lines, className, ...props }: Omit<HTMLAttributes<HTMLDivElement>, "title"> & { title: string; lines: { id: string; text: string; tone?: "neutral" | "success" | "error" }[] }) {
  const [message, setMessage] = useState("")
  async function copy() { try { await navigator.clipboard.writeText(lines.map(line => line.text).join("\n")); setMessage("已复制日志") } catch { setMessage("复制失败，可选中文字手动复制") } }
  return <div {...props} className={cx(styles.terminal, className)}><div className={styles.terminalHeader}><span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span><strong>{title}</strong><UiButton variant="ghost" size="compact" disabled={!lines.length} onClick={() => void copy()}>复制日志</UiButton></div><div role="log" aria-label={title} aria-live="polite" aria-relevant="additions" className={styles.terminalLog}>{lines.map(line => <p key={line.id} data-tone={line.tone ?? "neutral"}>{line.text}</p>)}{!lines.length && <p className={styles.muted}>暂无日志</p>}</div><p className={styles.terminalStatus} role="status">{message}</p></div>
}
