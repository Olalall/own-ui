"use client"
import { useState } from "react"
import { ListToolbar } from "../own-ui-list-toolbar"
import { UiField } from "../own-ui-field"
import { UiSelect } from "../own-ui-select"
import { UiButton } from "../own-ui-button"

export default function ListToolbarExample() {
  const [query, setQuery] = useState("")
  const [state, setState] = useState("all")
  const [result, setResult] = useState("")
  const files = [{ name: "README.md", state: "ready" }, { name: "项目计划.md", state: "draft" }, { name: "组件规范.md", state: "ready" }].filter(file => file.name.toLowerCase().includes(query.toLowerCase()) && (state === "all" || file.state === state))
  return <div>
    <ListToolbar search={<UiField label="搜索文件" value={query} onChange={event => setQuery(event.target.value)} placeholder="输入名称" />} filters={<UiSelect label="状态" value={state} onChange={event => setState(event.target.value)}><option value="all">全部</option><option value="ready">已就绪</option></UiSelect>} actions={<UiButton variant="outline" onClick={() => setResult(`已准备 ${files.length} 个文件的本地导出（演示）`)}>导出</UiButton>} />
    <ul>{files.map(file => <li key={file.name}>{file.name}</li>)}</ul>
    <p role="status">{result || `筛选状态：${state}；${files.length} 个结果`}</p>
  </div>
}
