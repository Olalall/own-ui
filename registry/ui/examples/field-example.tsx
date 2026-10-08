"use client"

import { useState } from "react"
import { UiField } from "../own-ui-field"
import { UiButton } from "../own-ui-button"

export default function FieldExample() {
  const [name, setName] = useState("我的工作区")
  const [result, setResult] = useState("")
  const error = name.length > 80 ? "名称不能超过 80 个字符。" : undefined
  return (
    <form style={{ display: "grid", gap: 16 }} onSubmit={event => {
      event.preventDefault()
      if (!error) setResult(`已保存：${new FormData(event.currentTarget).get("name")}`)
    }}>
      <UiField label="项目名称（受控）" name="name" value={name} onChange={event => setName(event.target.value)} required hint="最多 80 个字符。" error={error} />
      <UiField label="邮箱（非受控）" name="email" type="email" defaultValue="demo@example.com" required />
      <UiField label="只读字段" value="由管理员管理" readOnly />
      <UiField label="禁用字段" defaultValue="暂不可编辑" disabled />
      <UiButton type="submit" disabled={!!error}>保存字段</UiButton>
      <p role="status">{result}</p>
    </form>
  )
}
