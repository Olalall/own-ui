"use client"
import { useState } from "react"
import { UiSettingsSection, UiSettingsRow } from "../own-ui-settings-section"
import { UiSwitch } from "../own-ui-switch"
import { UiSelect } from "../own-ui-select"
export default function SettingsSectionExample() {
  const [enabled, setEnabled] = useState(true)
  const [density, setDensity] = useState("normal")
  return <UiSettingsSection title="工作台偏好" description="标题、说明和控件对齐；窄容器自动上下排列。">
    <UiSettingsRow title="通知" description="在本地示例中改变开关。" controls={<UiSwitch label="启用通知" checked={enabled} onChange={event => setEnabled(event.target.checked)} />} />
    <UiSettingsRow title="信息密度" description="选项由调用方提供。" controls={<UiSelect label="密度" value={density} onChange={event => setDensity(event.target.value)}><option value="normal">舒适</option><option value="compact">紧凑</option></UiSelect>} footer={<span role="status">通知：{enabled ? "开" : "关"}；密度：{density === "normal" ? "舒适" : "紧凑"}</span>} />
  </UiSettingsSection>
}
