"use client"
import { useRef, useState } from "react"
import { UiPopover, UiPopoverTrigger, UiPopoverContent, UiPopoverClose } from "../own-ui-popover"
import { UiButton } from "../own-ui-button"
import { UiField } from "../own-ui-field"

export default function PopoverExample() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("我的视图")
  const container = useRef<HTMLDivElement>(null)
  return <div ref={container}>
    <UiPopover open={open} onOpenChange={setOpen}>
      <UiPopoverTrigger render={<UiButton variant="outline" />}>视图设置</UiPopoverTrigger>
      <UiPopoverContent title="视图设置" description="调整本地演示视图名称。" portalContainer={container}>
        <UiField label="视图名称" value={name} onChange={event => setName(event.target.value)} />
        <UiPopoverClose render={<UiButton />}>完成</UiPopoverClose>
      </UiPopoverContent>
    </UiPopover>
    <p>当前视图：{name}</p>
  </div>
}
