"use client"
import { useState } from "react"
import { AgentTimeline, type AgentStepState } from "../own-ui-agent-timeline"
import { UiSelect } from "../own-ui-select"

export default function AgentTimelineExample() {
  const [state, setState] = useState<AgentStepState>("running")
  return <div style={{ display: "grid", gap: 12 }}>
    <UiSelect label="当前步骤状态" value={state} onChange={event => setState(event.target.value as AgentStepState)}>{["pending", "running", "completed", "failed"].map(value => <option key={value}>{value}</option>)}</UiSelect>
    <AgentTimeline steps={[{ id: "scan", title: "扫描文件", state: "completed", time: "10:41" }, { id: "review", title: "整理可复用组件", state, description: state === "failed" ? "整理失败，请重新运行。" : "检查依赖、样式入口和交付路径。" }]} />
  </div>
}
