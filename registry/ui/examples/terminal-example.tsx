"use client"
import { useRef, useState } from "react"
import { UiTerminal } from "../own-ui-terminal"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

const initial = [{ id: "start", text: "$ pnpm build" }, { id: "source", text: "✓ 组件源码已准备", tone: "success" as const }, { id: "done", text: "✓ 本地预览已就绪", tone: "success" as const }]
export default function TerminalExample() {
  const [lines, setLines] = useState(initial)
  const nextId = useRef(0)
  return <section className={styles.demo} aria-label="终端日志演示"><UiTerminal title="own-ui / 本地日志" lines={lines} /><div className={styles.demoActions}><UiButton variant="outline" onClick={() => { nextId.current += 1; setLines(current => [...current, { id: `new-${nextId.current}`, text: `✓ 已完成第 ${nextId.current} 次本地任务`, tone: "success" as const }].slice(-8)) }}>追加日志</UiButton><UiButton variant="ghost" onClick={() => setLines([])}>清空日志</UiButton><UiButton variant="ghost" onClick={() => setLines(initial)}>恢复日志</UiButton></div><p className={styles.demoCopy}>纯文本显示与复制；任务由调用者执行，示例不运行命令。</p></section>
}
