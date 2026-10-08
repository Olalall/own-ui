"use client"
import { useState } from "react"
import { UiNotice } from "../own-ui-notice"
import { UiButton } from "../own-ui-button"

export default function NoticeExample() {
  const [saved, setSaved] = useState(false)
  return <div style={{ display: "grid", gap: 12 }}>
    <UiNotice title="说明" role="note">这是静态说明，避免作为实时状态反复播报。</UiNotice>
    <UiNotice tone="warning" title="请确认" role="note">继续操作前请确认文件范围。</UiNotice>
    <UiNotice tone="danger" title="错误" role="note">连接暂时不可用，已有内容不会丢失。</UiNotice>
    <UiNotice tone="neutral" title="未开始" role="note">等待你准备输入。</UiNotice>
    <UiButton onClick={() => setSaved(!saved)}>切换保存状态</UiButton>
    <div aria-live="polite">{saved && <UiNotice tone="success" title="已保存" role="status">本地演示设置已保存。</UiNotice>}</div>
  </div>
}
