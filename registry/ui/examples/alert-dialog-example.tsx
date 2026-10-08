"use client"
import { useState } from "react"
import { UiAlertDialog } from "../own-ui-alert-dialog"
import { UiCheckboxField } from "../own-ui-checkbox"

export default function AlertDialogExample() {
  const [fail, setFail] = useState(false)
  const [count, setCount] = useState(0)
  return <div style={{ display: "grid", gap: 12 }}>
    <UiCheckboxField label="模拟确认失败" checked={fail} onChange={event => setFail(event.target.checked)} />
    <UiAlertDialog title="清理演示缓存？" description="只更新本地演示计数，不删除真实文件。" triggerLabel="清理演示缓存" confirmLabel="确认清理" onConfirm={async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
      if (fail) throw new Error("模拟失败")
      setCount(count + 1)
    }} />
    <p role="status">已完成 {count} 次演示清理</p>
  </div>
}
