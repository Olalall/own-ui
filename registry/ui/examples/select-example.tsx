"use client"
import { useState } from "react"
import { UiSelect } from "../own-ui-select"

export default function SelectExample() {
  const [value, setValue] = useState("")
  return <div style={{ display: "grid", gap: 16 }}>
    <UiSelect label="运行环境" value={value} onChange={event => setValue(event.target.value)} name="environment" required hint="请选择一个环境。" error={!value ? "尚未选择环境。" : undefined}>
      <option value="">请选择</option><option value="development">开发环境</option><option value="production">生产环境</option><option value="archived" disabled>已归档</option>
    </UiSelect>
    <UiSelect label="非受控环境" defaultValue="development"><option value="development">开发环境</option><option value="production">生产环境</option></UiSelect>
    <UiSelect label="禁用环境" disabled><option>暂不可更改</option></UiSelect>
    <p role="status">已选：{value || "无"}</p>
  </div>
}
