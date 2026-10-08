import * as React from "react"
import styles from "./own-ui.module.css"

export type AgentMessageRole = "user" | "assistant" | "system"

export interface AgentMessageProps extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  role: AgentMessageRole
  name: string
  timestamp?: string
  content: React.ReactNode
}

export function AgentMessage({ role, name, timestamp, content, className, ...props }: AgentMessageProps) {
  return (
    <article {...props} className={[styles.panel, styles.message, styles[`message_${role}`], className].filter(Boolean).join(" ")}>
      <header className={styles.message_header}>
        <strong className={styles.panel_title}>{name}</strong>
        {timestamp && <time className={styles.message_time}>{timestamp}</time>}
      </header>
      <div className={styles.message_content}>{content}</div>
    </article>
  )
}
