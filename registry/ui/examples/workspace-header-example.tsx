"use client"
import { useState } from "react"
import { WorkspaceHeader } from "../own-ui-workspace-header"
import { UiButton } from "../own-ui-button"

export default function WorkspaceHeaderExample() {
  const [count, setCount] = useState(0)
  return <div>
    <WorkspaceHeader title="项目文件" description="管理当前工作区中的文件。" breadcrumbs={<span>工作区 / 文件</span>} actions={<UiButton onClick={() => setCount(count + 1)}>新建演示文件</UiButton>} />
    <p role="status">已新建 {count} 个演示文件</p>
  </div>
}
