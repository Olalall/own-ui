"use client"
import { useRef, useState } from "react"
import { UiDropdownMenu, UiDropdownMenuTrigger, UiDropdownMenuContent, UiDropdownMenuItem } from "../own-ui-dropdown-menu"
import { UiButton } from "../own-ui-button"

export default function DropdownMenuExample() {
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState("")
  const container = useRef<HTMLDivElement>(null)
  return <div ref={container}>
    <UiDropdownMenu open={open} onOpenChange={setOpen}>
      <UiDropdownMenuTrigger render={<UiButton variant="outline" />}>文件操作</UiDropdownMenuTrigger>
      <UiDropdownMenuContent portalContainer={container}>
        <UiDropdownMenuItem onClick={() => setAction("重命名（演示）")}>重命名</UiDropdownMenuItem>
        <UiDropdownMenuItem onClick={() => setAction("复制文件（演示）")}>复制文件</UiDropdownMenuItem>
        <UiDropdownMenuItem disabled>删除（不可用）</UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
    <p role="status">{action}</p>
  </div>
}
