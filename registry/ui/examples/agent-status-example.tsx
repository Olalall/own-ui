"use client"
import { useState } from "react"
import { AgentStatus, type AgentState } from "../own-ui-agent-status"
import { UiSelect } from "../own-ui-select"

export default function AgentStatusExample() {
  const [state, setState] = useState<AgentState>("queued")
  const states: AgentState[] = ["queued", "running", "approval", "stopping", "completed", "failed", "cancelled", "timed_out"]
  return <div style={{ display: "grid", gap: 12 }}>
    <UiSelect label="Agent 状态" value={state} onChange={event => setState(event.target.value as AgentState)}>{states.map(value => <option key={value}>{value}</option>)}</UiSelect>
    <AgentStatus state={state} />
  </div>
}
