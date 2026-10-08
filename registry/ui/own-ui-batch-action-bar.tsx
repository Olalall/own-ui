"use client"
import type { ReactNode } from "react"
import { UiButton } from "./own-ui-button"
import { UiNotice } from "./own-ui-notice"
import styles from "./own-ui.module.css"
export interface UiBatchActionBarProps { count: number; onClear: () => void; actions: ReactNode; busy?: boolean; error?: string }
export function UiBatchActionBar({ count, onClear, actions, busy, error }: UiBatchActionBarProps) {
  const selected = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0
  if (!selected) return null
  return <section aria-label="批量操作" aria-busy={busy || undefined} className={styles.panel}>
    <div className={styles.panel_header}><p role="status" className={styles.panel_copy}>已选择 {selected} 项{busy ? " · 处理中…" : ""}</p>
      <fieldset disabled={busy} className={styles.batch_controls}>{actions}<UiButton variant="ghost" onClick={onClear}>清除选择</UiButton></fieldset>
    </div>{error && <UiNotice tone="danger" role="alert">{error}</UiNotice>}
  </section>
}
