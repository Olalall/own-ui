"use client"
import { useState } from "react"
import { ToolApprovalPanel, type ApprovalRisk } from "../own-ui-approval"
import { UiButton } from "../own-ui-button"
import { UiSelect } from "../own-ui-select"

export default function ApprovalExample() {
  const [risk, setRisk] = useState<ApprovalRisk>("high")
  const [decision, setDecision] = useState("")
  return <div style={{ display: "grid", gap: 12 }}>
    <UiSelect label="风险级别" value={risk} onChange={event => { setRisk(event.target.value as ApprovalRisk); setDecision("") }}>{["low", "medium", "high", "critical"].map(value => <option key={value}>{value}</option>)}</UiSelect>
    <ToolApprovalPanel toolName="清理临时文件" risk={risk} description="仅演示操作范围和选择，不执行删除。" details={<p>范围：3 个临时文件</p>} actions={<>
      <UiButton variant="outline" disabled={!!decision} onClick={() => setDecision("已拒绝")}>拒绝</UiButton>
      <UiButton disabled={!!decision} onClick={() => setDecision("已允许一次（演示）")}>允许一次</UiButton>
      {decision && <UiButton variant="ghost" onClick={() => setDecision("")}>重新演示</UiButton>}
    </>} />
    <p role="status">{decision}</p>
  </div>
}
