import { UiStatusBadge } from "../own-ui-status-badge"

export default function StatusBadgeExample() {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
    <UiStatusBadge>待处理</UiStatusBadge><UiStatusBadge tone="success">已完成</UiStatusBadge><UiStatusBadge tone="warning">待确认</UiStatusBadge><UiStatusBadge tone="danger">失败</UiStatusBadge><UiStatusBadge tone="info">进行中</UiStatusBadge>
  </div>
}
