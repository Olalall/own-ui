"use client"
import { useState } from "react"
import { UiFormGroup } from "../own-ui-form-group"
import { UiField } from "../own-ui-field"
import { UiSwitch } from "../own-ui-switch"
import { UiButton } from "../own-ui-button"
export default function FormGroupExample() {
  const [name, setName] = useState("")
  const [attempted, setAttempted] = useState(false)
  const [saved, setSaved] = useState("")
  const error = attempted && name.trim().length < 2 ? "名称至少 2 个字符。" : undefined
  return <form noValidate onSubmit={event => { event.preventDefault(); setAttempted(true); if (name.trim().length >= 2) setSaved(name.trim()) }}>
    <UiFormGroup title="项目偏好" description="这些设置只保存到演示状态。" error={error}>
      <UiField label="分组项目名称" required value={name} onChange={event => setName(event.target.value)} error={error} />
      <UiSwitch label="自动保存分组设置" defaultChecked />
    </UiFormGroup><UiButton type="submit">保存分组</UiButton><p role="status">{saved && `已保存：${saved}`}</p>
  </form>
}
