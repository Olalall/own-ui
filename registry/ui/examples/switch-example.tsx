"use client"
import { useState } from "react"
import { UiSwitch } from "../own-ui-switch"
import { UiButton } from "../own-ui-button"
export default function SwitchExample() {
  const [checked, setChecked] = useState(true)
  const [saved, setSaved] = useState("")
  return <form onSubmit={event => { event.preventDefault(); setSaved(new FormData(event.currentTarget).has("notifications") ? "已开启" : "已关闭") }}>
    <UiSwitch label="接收任务通知" hint="本地偏好，不发送外部通知。" name="notifications" checked={checked} onChange={event => setChecked(event.target.checked)} />
    <UiSwitch label="强制通知（不可用）" disabled />
    <UiButton type="submit" variant="outline">保存开关</UiButton><p role="status">{saved}</p>
  </form>
}
