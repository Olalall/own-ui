import { UiStatusBadge, type UiStatusBadgeProps, type UiTone } from "./own-ui-status-badge"

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
