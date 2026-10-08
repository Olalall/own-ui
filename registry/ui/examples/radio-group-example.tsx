"use client"
import { useState } from "react"
import { UiRadioGroup } from "../own-ui-radio-group"
import { UiButton } from "../own-ui-button"
export default function RadioGroupExample() {
  const [value, setValue] = useState("comfortable")
  const [saved, setSaved] = useState("")
  return <form onSubmit={event => { event.preventDefault(); setSaved(String(new FormData(event.currentTarget).get("density"))) }}>
    <UiRadioGroup label="界面密度" name="density" required value={value} onValueChange={setValue} hint="由宿主映射为控件尺寸。" options={[{ value: "comfortable", label: "舒适" }, { value: "compact", label: "紧凑" }, { value: "auto", label: "自动（不可用）", disabled: true }]} />
    <UiButton type="submit" variant="outline">保存密度</UiButton><p role="status">{saved && `已保存：${saved}`}</p>
  </form>
}
