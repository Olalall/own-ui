"use client"
import { useState } from "react"
import { WorkspaceStatCard } from "../own-ui-workspace-stat"
import { UiSelect } from "../own-ui-select"
import { UiSkeleton } from "../own-ui-skeleton"
import { UiNotice } from "../own-ui-notice"

export default function WorkspaceStatExample() {
  const [state, setState] = useState("ready")
  return <div style={{ display: "grid", gap: 12 }}>
    <UiSelect label="指标状态" value={state} onChange={event => setState(event.target.value)}><option value="ready">已加载</option><option value="loading">加载中</option><option value="error">失败</option></UiSelect>
    {state === "error" ? <UiNotice tone="danger">指标加载失败。</UiNotice> : <WorkspaceStatCard label="本周任务" value={state === "loading" ? <UiSkeleton style={{ height: 32 }} /> : "128"} detail={state === "loading" ? "正在加载…" : "较上周增加 12 项"} aria-busy={state === "loading"} />}
  </div>
}
