"use client"

import { useRef, useState } from "react"
import { UiDialog, UiDialogTrigger, UiDialogContent, UiDialogClose } from "../own-ui-dialog"
import { UiButton } from "../own-ui-button"
import { UiField } from "../own-ui-field"

export default function DialogExample() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState("")
  const themeContainer = useRef<HTMLDivElement>(null)
  return (
    <div ref={themeContainer}>
      <UiDialog open={open} onOpenChange={setOpen}>
        <UiDialogTrigger render={<UiButton variant="outline" />}>编辑工作区</UiDialogTrigger>
        <UiDialogContent title="编辑工作区" description="修改本地演示名称，不调用外部接口。" portalContainer={themeContainer}>
          <form style={{ display: "grid", gap: 16 }} onSubmit={event => {
            event.preventDefault()
            setResult(String(new FormData(event.currentTarget).get("name")))
            setOpen(false)
          }}>
            <UiField label="工作区名称" name="name" defaultValue="我的工作区" required />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <UiButton type="submit">保存名称</UiButton>
              <UiDialogClose render={<UiButton variant="outline" />}>取消</UiDialogClose>
            </div>
          </form>
          <UiDialog>
            <UiDialogTrigger render={<UiButton variant="ghost" />}>查看嵌套说明</UiDialogTrigger>
            <UiDialogContent title="嵌套对话框" description="关闭后焦点返回上一层触发按钮。" portalContainer={themeContainer}>
              <UiDialogClose render={<UiButton />}>返回编辑</UiDialogClose>
            </UiDialogContent>
          </UiDialog>
        </UiDialogContent>
      </UiDialog>
      <p role="status">{result && `已保存：${result}`}</p>
    </div>
  )
}
