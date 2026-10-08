"use client"
import { useState } from "react"
import { UiCheckboxField } from "../own-ui-checkbox"

export default function CheckboxExample() {
  const [checked, setChecked] = useState(false)
  return <div style={{ display: "grid", gap: 16 }}>
    <UiCheckboxField label="完成后通知我" checked={checked} onChange={event => setChecked(event.target.checked)} hint="受控值由宿主管理。" />
    <UiCheckboxField label="启用自动保存" defaultChecked name="autosave" />
    <UiCheckboxField label="同意条款" name="agreement" required />
    <UiCheckboxField label="禁用设置" defaultChecked disabled />
    <p role="status">通知：{checked ? "启用" : "关闭"}</p>
  </div>
}
