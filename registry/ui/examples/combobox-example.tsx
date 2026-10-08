"use client"
import { useRef, useState } from "react"
import { UiCombobox } from "../own-ui-combobox"
import { UiSelect } from "../own-ui-select"
export default function ComboboxExample() {
  const [value, setValue] = useState<string | null>(null)
  const [state, setState] = useState("ready")
  const container = useRef<HTMLDivElement>(null)
  return <div ref={container}>
    <UiSelect label="选项来源状态" value={state} onChange={event => setState(event.target.value)}><option value="ready">已加载</option><option value="loading">加载中</option><option value="error">失败</option><option value="disabled">禁用</option></UiSelect>
    <UiCombobox label="项目选择" value={value} onValueChange={setValue} name="project" loading={state === "loading"} error={state === "error" ? "连接失败，请重试。" : undefined} disabled={state === "disabled"} portalContainer={container} options={[{ value: "library", label: "组件库" }, { value: "office", label: "办公工作台" }, { value: "archived", label: "归档项目（不可用）", disabled: true }]} />
    <p role="status">已选项目：{value ?? "无"}</p>
  </div>
}
