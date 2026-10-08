"use client"
import { useState } from "react"
import { UiFilterBar, type UiFilterValue } from "../own-ui-filter-bar"
const rows = [{ id: "plan", name: "项目计划", tag: "docs", date: "2026-10-01" }, { id: "button", name: "按钮组件", tag: "ui", date: "2026-10-08" }, { id: "field", name: "字段组件", tag: "ui", date: "2026-10-07" }]
export default function FilterBarExample() {
  const [value, setValue] = useState<UiFilterValue>({ query: "", tags: [], range: { start: "", end: "" } })
  const filtered = rows.filter(row => row.name.includes(value.query) && (!value.tags.length || value.tags.includes(row.tag)) && (!value.range.start || row.date >= value.range.start) && (!value.range.end || row.date <= value.range.end))
  return <><UiFilterBar label="文件筛选" value={value} onValueChange={setValue} tagOptions={[{ value: "docs", label: "文档" }, { value: "ui", label: "组件" }]} showDateRange /><ul>{filtered.map(row => <li key={row.id}>{row.name} · {row.date}</li>)}</ul><p role="status">筛选结果：{filtered.length} 项</p></>
}
