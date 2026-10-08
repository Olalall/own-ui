"use client"
import { useState } from "react"
import { UiProgress } from "../own-ui-progress"

export default function ProgressExample() {
  const [value, setValue] = useState(40)
  return <div style={{ display: "grid", gap: 16 }}>
    <label>进度<input type="range" min="0" max="100" value={value} onChange={event => setValue(Number(event.target.value))} /></label>
    <UiProgress label="上传进度" value={value} max={100} />
    <UiProgress label="扫描文件（不确定进度）" />
  </div>
}
