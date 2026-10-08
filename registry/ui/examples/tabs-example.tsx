"use client"
import { useState } from "react"
import { UiTabs, UiTabsList, UiTab, UiTabPanel } from "../own-ui-tabs"
export default function TabsExample() {
  const [value, setValue] = useState<unknown>("general")
  return <UiTabs value={value} onValueChange={setValue}><UiTabsList aria-label="工作区设置">
    <UiTab value="general">常规</UiTab><UiTab value="members">成员</UiTab><UiTab value="billing" disabled>账单（不可用）</UiTab>
  </UiTabsList><UiTabPanel value="general">常规设置：配置名称和通知。</UiTabPanel><UiTabPanel value="members">成员设置：管理本地演示成员。</UiTabPanel></UiTabs>
}
