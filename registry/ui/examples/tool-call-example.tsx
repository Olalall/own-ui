"use client"
import { useState } from "react"
import { ToolCallCard, type ToolCallState } from "../own-ui-tool-call"
import { UiSelect } from "../own-ui-select"

export default function ToolCallExample() {
  const [state, setState] = useState<ToolCallState>("queued")
  return <div style={{ display: "grid", gap: 12 }}>
    <UiSelect label="工具状态" value={state} onChange={event => setState(event.target.value as ToolCallState)}>{["queued", "running", "succeeded", "failed"].map(value => <option key={value}>{value}</option>)}</UiSelect>
    <ToolCallCard name="读取项目文件" state={state} summary={state === "failed" ? "读取失败，请检查路径。" : "本地状态演示，不执行实际工具。"} details={<details><summary>执行详情</summary><pre style={{ whiteSpace: "pre-wrap" }}>示例文件：README.md</pre></details>} />
  </div>
}
