"use client"
import { useState } from "react"
import { UiFileTree, type FileTreeNode } from "../own-ui-file-tree"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

const nodes: FileTreeNode[] = [{ id: "src", name: "src", children: [{ id: "components", name: "components", children: [{ id: "button", name: "button.tsx" }, { id: "card", name: "card.tsx" }] }, { id: "app", name: "App.tsx" }] }, { id: "docs", name: "docs", children: [{ id: "guide", name: "接入指南.md" }] }, { id: "readme", name: "README.md" }, { id: "lock", name: "pnpm-lock.yaml", disabled: true }]
export default function FileTreeExample() {
  const [value, setValue] = useState<string | null>("readme")
  const [empty, setEmpty] = useState(false)
  return <section className={styles.demo} aria-label="文件树演示"><UiFileTree label="示例项目文件" nodes={empty ? [] : nodes} value={value} onSelect={setValue} /><p className={styles.demoCopy} role="status">{value ? `当前文件：${value}` : "未选择文件"}</p><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setValue(null)}>清除选择</UiButton><UiButton variant="ghost" onClick={() => setEmpty(!empty)}>{empty ? "恢复文件树" : "显示空文件树"}</UiButton></div><p className={styles.demoCopy}>原生文件夹展开与嵌套列表；没有读取本机文件或执行文件操作。</p></section>
}
