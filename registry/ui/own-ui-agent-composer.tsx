"use client"

import * as React from "react"
import { UiButton } from "./own-ui-button"
import styles from "./own-ui.module.css"

export interface AgentPromptComposerProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSend: (message: string) => void | Promise<void>
  onInputKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
  placeholder?: string
  busy?: boolean
  sendLabel?: string
}

export function AgentPromptComposer({
  onSend,
  onInputKeyDown,
  placeholder = "向 Agent 发送消息…",
  busy = false,
  sendLabel = "发送",
  className,
  ...props
}: AgentPromptComposerProps) {
  const [message, setMessage] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState("")
  const sending = React.useRef(false)
  const locked = busy || pending
  const inputId = `own-ui-agent-${React.useId().replaceAll(":", "")}`
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = message.trim()
    if (!trimmed || busy || sending.current) return
    sending.current = true
    setPending(true)
    setError("")
    try {
      await onSend(trimmed)
      setMessage("")
    } catch {
      setError("发送失败，草稿已保留，请重试。")
    } finally {
      sending.current = false
      setPending(false)
    }
  }
  return (
    <form {...props} className={[styles.panel, styles.composer, className].filter(Boolean).join(" ")} onSubmit={submit}>
      <label className={styles.sr_only} htmlFor={inputId}>Agent 消息</label>
      <textarea
        id={inputId}
        className={styles.composer_input}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder={placeholder}
        rows={3}
        disabled={locked}
        aria-describedby={error ? `${inputId}-error` : undefined}
        onKeyDown={(event) => {
          onInputKeyDown?.(event)
          if (event.defaultPrevented || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229 || event.key !== "Enter" || event.shiftKey) return
          event.preventDefault()
          event.currentTarget.form?.requestSubmit()
        }}
      />
      {error && <p className={styles.field_error} id={`${inputId}-error`} role="alert">{error}</p>}
      <div className={styles.composer_footer}>
        <span className={styles.panel_hint}>Enter 发送 · Shift + Enter 换行</span>
        <UiButton type="submit" size="compact" busy={locked} disabled={!message.trim()}>{locked ? "发送中" : sendLabel}</UiButton>
      </div>
    </form>
  )
}
