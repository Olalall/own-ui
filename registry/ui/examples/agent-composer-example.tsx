"use client"

import { useState } from "react"
import { AgentPromptComposer } from "../own-ui-agent-composer"
import { UiCheckboxField } from "../own-ui-checkbox"

export default function AgentComposerExample() {
  const [fail, setFail] = useState(false)
  const [sent, setSent] = useState("")
  return (
    <section style={{ display: "grid", gap: 12 }} aria-label="Agent 输入示例">
      <UiCheckboxField label="模拟发送失败" checked={fail} onChange={event => setFail(event.target.checked)} />
      <AgentPromptComposer onSend={async message => {
        await new Promise(resolve => setTimeout(resolve, 600))
        if (fail) throw new Error("本地模拟失败")
        setSent(message)
      }} />
      <p role="status">{sent ? `最近发送：${sent}` : "输入消息后发送；失败时草稿保留。"}</p>
    </section>
  )
}
