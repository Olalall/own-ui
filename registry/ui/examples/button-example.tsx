"use client"

import { useState } from "react"
import { UiButton } from "../own-ui-button"

export default function ButtonExample() {
  const [count, setCount] = useState(0)
  return (
    <section style={{ display: "grid", gap: 12 }} aria-label="按钮示例">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(["primary", "secondary", "outline", "ghost", "danger"] as const).map(variant =>
          <UiButton key={variant} variant={variant} onClick={() => setCount(count + 1)}>{variant}</UiButton>)}
        <UiButton size="compact" onClick={() => setCount(0)}>重置</UiButton>
        <UiButton disabled>已禁用</UiButton>
        <UiButton busy>处理中</UiButton>
      </div>
      <p role="status">已操作 {count} 次</p>
    </section>
  )
}
