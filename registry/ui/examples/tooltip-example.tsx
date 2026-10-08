"use client"
import { useRef } from "react"
import { UiTooltipProvider, UiTooltip, UiTooltipTrigger, UiTooltipContent } from "../own-ui-tooltip"
import { UiButton } from "../own-ui-button"
import { UiField } from "../own-ui-field"
export default function TooltipExample() {
  const container = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  return <div ref={container}><UiTooltipProvider delay={300}>
    <UiTooltip><UiTooltipTrigger aria-label="搜索：聚焦下方输入框" render={<UiButton variant="outline" onClick={() => input.current?.focus()} />}>搜索</UiTooltipTrigger><UiTooltipContent portalContainer={container}>搜索：聚焦下方输入框</UiTooltipContent></UiTooltip>
    <UiField ref={input} label="提示演示搜索" hint="点击搜索按钮聚焦输入框；重要信息始终可见。" />
  </UiTooltipProvider></div>
}
