"use client"
import { useState } from "react"
import { UiCommandMenu } from "../own-ui-command-menu"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

const items = [{ id: "project", label: "创建项目", description: "从空白项目开始" }, { id: "components", label: "浏览组件", description: "找到下一块界面" }, { id: "theme", label: "编辑主题", description: "调整项目的颜色与圆角" }, { id: "publish", label: "发布项目", description: "当前账户没有发布权限", disabled: true }]
export default function CommandMenuExample() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("尚未执行命令")
  const [disabled, setDisabled] = useState(false)
  return <section className={styles.demo} aria-label="命令菜单演示"><div className={styles.demoPanel}><p className={styles.demoEyebrow}>Find. Choose. Go.</p><h3 className={styles.demoTitle}>下一步，直接找到。</h3><p className={styles.demoCopy}>搜索中文或描述，方向键切换，Enter 执行本地反馈。</p><UiButton onClick={() => setOpen(true)}>打开命令菜单</UiButton></div><p className={styles.demoCopy} role="status">{selected}</p><div className={styles.demoActions}><UiButton variant="ghost" onClick={() => setDisabled(!disabled)}>{disabled ? "恢复可用命令" : "将命令全部禁用"}</UiButton></div><UiCommandMenu open={open} onOpenChange={setOpen} items={disabled ? items.map(item => ({ ...item, disabled: true })) : items} onSelect={id => setSelected(`已选择：${items.find(item => item.id === id)?.label}`)} /></section>
}
