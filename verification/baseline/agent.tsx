import * as React from "react"

import { UiButton, UiStatusBadge, type UiStatusBadgeProps, type UiTone } from "./own-ui-core"
import styles from "./own-ui.module.css"

export type AgentState =
  | "queued"
  | "running"
  | "approval"
  | "stopping"
  | "completed"
  | "failed"
  | "cancelled"
  | "timed_out"

const agentStates: Record<AgentState, { label: string; tone: UiTone }> = {
  queued: { label: "排队中", tone: "neutral" },
  running: { label: "运行中", tone: "info" },
  approval: { label: "等待审批", tone: "warning" },
  stopping: { label: "停止中", tone: "warning" },
  completed: { label: "已完成", tone: "success" },
  failed: { label: "失败", tone: "danger" },
  cancelled: { label: "已取消", tone: "neutral" },
  timed_out: { label: "已超时", tone: "danger" },
}

export interface AgentStatusProps extends Omit<UiStatusBadgeProps, "tone"> {
  state: AgentState
  labels?: Partial<Record<AgentState, string>>
}

export function AgentStatus({ state, labels, ...props }: AgentStatusProps) {
  const status = agentStates[state]
  return (
    <UiStatusBadge {...props} tone={status.tone} role="status" aria-live="polite">
      {labels?.[state] ?? status.label}
    </UiStatusBadge>
  )
}

export type ToolCallState = "queued" | "running" | "succeeded" | "failed"

const toolCallStates: Record<ToolCallState, { label: string; tone: UiTone }> = {
  queued: { label: "等待执行", tone: "neutral" },
  running: { label: "执行中", tone: "info" },
  succeeded: { label: "已完成", tone: "success" },
  failed: { label: "执行失败", tone: "danger" },
}

export interface ToolCallCardProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  state: ToolCallState
  summary?: string
  details?: React.ReactNode
}

export function ToolCallCard({
  name,
  state,
  summary,
  details,
  className,
  ...props
}: ToolCallCardProps) {
  const status = toolCallStates[state]
  return (
    <article {...props} className={[styles.panel, className].filter(Boolean).join(" ")}>
      <div className={styles.panel_header}>
        <h3 className={styles.panel_title}>{name}</h3>
        <UiStatusBadge tone={status.tone} role="status" aria-live="polite">{status.label}</UiStatusBadge>
      </div>
      {summary && <p className={styles.panel_copy}>{summary}</p>}
      {details && <div className={styles.panel_details}>{details}</div>}
    </article>
  )
}

export type ApprovalRisk = "low" | "medium" | "high" | "critical"

const riskLabels: Record<ApprovalRisk, string> = {
  low: "低风险",
  medium: "中风险",
  high: "高风险",
  critical: "关键操作",
}

export interface ToolApprovalPanelProps extends React.HTMLAttributes<HTMLElement> {
  toolName: string
  risk: ApprovalRisk
  description: string
  details?: React.ReactNode
  actions?: React.ReactNode
}

export function ToolApprovalPanel({
  toolName,
  risk,
  description,
  details,
  actions,
  className,
  ...props
}: ToolApprovalPanelProps) {
  const titleId = React.useId()
  return (
    <section
      {...props}
      className={[styles.panel, styles.approval, className].filter(Boolean).join(" ")}
      aria-labelledby={titleId}
    >
      <div className={styles.panel_header}>
        <h3 className={styles.panel_title} id={titleId}>{toolName}</h3>
        <UiStatusBadge tone={risk === "critical" || risk === "high" ? "danger" : "warning"}>
          {riskLabels[risk]} · 等待审批
        </UiStatusBadge>
      </div>
      <p className={styles.panel_copy}>{description}</p>
      {details && <div className={styles.panel_details}>{details}</div>}
      {actions ? (
        <div className={styles.approval_actions}>{actions}</div>
      ) : (
        <p className={styles.panel_hint}>审批操作由接入应用提供。</p>
      )}
    </section>
  )
}

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

export type AgentStepState = "pending" | "running" | "completed" | "failed"

export interface AgentTimelineStep {
  id: string
  title: string
  state: AgentStepState
  description?: string
  time?: string
}

export interface AgentTimelineProps extends React.OlHTMLAttributes<HTMLOListElement> {
  steps: AgentTimelineStep[]
}

const stepLabels: Record<AgentStepState, string> = {
  pending: "未开始",
  running: "进行中",
  completed: "已完成",
  failed: "失败",
}

export function AgentTimeline({ steps, className, ...props }: AgentTimelineProps) {
  return (
    <ol {...props} className={[styles.timeline, className].filter(Boolean).join(" ")}>
      {steps.map((step) => (
        <li key={step.id} className={[styles.timeline_item, styles[`timeline_${step.state}`]].join(" ")}>
          <span className={styles.timeline_marker} aria-hidden="true" />
          <div className={styles.timeline_body}>
            <div className={styles.timeline_heading}>
              <strong>{step.title}</strong>
              <span>{stepLabels[step.state]}</span>
            </div>
            {step.description && <p>{step.description}</p>}
            {step.time && <time>{step.time}</time>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export interface AgentPromptComposerProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSend: (message: string) => void
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
  const inputId = `own-ui-agent-${React.useId().replaceAll(":", "")}`
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = message.trim()
    if (!trimmed || busy) return
    onSend(trimmed)
    setMessage("")
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
        disabled={busy}
        onKeyDown={(event) => {
          onInputKeyDown?.(event)
          if (event.defaultPrevented || event.nativeEvent.isComposing || event.key !== "Enter" || event.shiftKey) return
          event.preventDefault()
          event.currentTarget.form?.requestSubmit()
        }}
      />
      <div className={styles.composer_footer}>
        <span className={styles.panel_hint}>Enter 发送 · Shift + Enter 换行</span>
        <UiButton type="submit" size="compact" busy={busy} disabled={!message.trim()}>{busy ? "发送中" : sendLabel}</UiButton>
      </div>
    </form>
  )
}
