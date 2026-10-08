"use client"
import { useState } from "react"
import { WorkspaceEmptyState } from "../own-ui-workspace-empty"
import { UiButton } from "../own-ui-button"

export default function WorkspaceEmptyExample() {
  const [query, setQuery] = useState("不存在的文件")
  const [created, setCreated] = useState(false)
  if (created) return <div><p>演示文件.md</p><UiButton variant="outline" onClick={() => setCreated(false)}>恢复空状态</UiButton></div>
  return <WorkspaceEmptyState title={query ? "没有匹配的文件" : "还没有文件"} description={query ? `未找到“${query}”` : "新建文件后可在这里管理。"} action={<UiButton onClick={() => query ? setQuery("") : setCreated(true)}>{query ? "清除筛选" : "新建演示文件"}</UiButton>} />
}
