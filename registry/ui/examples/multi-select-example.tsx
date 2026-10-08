"use client"
import { useRef, useState } from "react"
import { UiMultiSelect } from "../own-ui-multi-select"
export default function MultiSelectExample() {
  const [value, setValue] = useState<string[]>(["react"])
  const container = useRef<HTMLDivElement>(null)
  return <div ref={container}><UiMultiSelect label="技术标签" value={value} onValueChange={setValue} name="tags" portalContainer={container} options={[{ value: "react", label: "React" }, { value: "typescript", label: "TypeScript" }, { value: "css", label: "CSS Modules" }, { value: "next", label: "Next.js" }, { value: "pending", label: "尚未支持（不可用）", disabled: true }]} /><p role="status">已选标签：{value.join("、") || "无"}</p></div>
}
