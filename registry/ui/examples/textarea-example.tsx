"use client"
import { useState } from "react"
import { UiTextarea } from "../own-ui-textarea"

export default function TextareaExample() {
  const [value, setValue] = useState("")
  return <div style={{ display: "grid", gap: 16 }}>
    <UiTextarea label="任务说明" value={value} onChange={event => setValue(event.target.value)} required rows={4} hint="至少输入 10 个字符。" error={value && value.length < 10 ? "说明太短，请再补充一些内容。" : undefined} />
    <UiTextarea label="非受控备注" defaultValue="可以调整字段高度。" />
    <UiTextarea label="禁用备注" disabled defaultValue="暂不可编辑" />
  </div>
}
