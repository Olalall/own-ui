"use client"
import { useState } from "react"
import { UiSidebarNav } from "../own-ui-sidebar-nav"
import { UiCheckboxField } from "../own-ui-checkbox"
export default function SidebarNavExample() {
  const [value, setValue] = useState<string | null>("settings")
  const [empty, setEmpty] = useState(false)
  return <><UiCheckboxField label="显示空导航" checked={empty} onChange={event => setEmpty(event.target.checked)} /><UiSidebarNav label="项目导航" items={empty ? [] : [{ id: "settings", label: "设置" }, { id: "files", label: "文件", meta: "12" }, { id: "admin", label: "管理", disabled: true }]} value={value} onSelect={setValue} footer={<p role="status">当前：{value === "files" ? "文件" : "设置"}</p>} /></>
}
