"use client"
import { useState } from "react"
import { UiAvatarGroup } from "../own-ui-avatar-group"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

const people = [{ id: "a", name: "小林" }, { id: "b", name: "Maya" }, { id: "c", name: "小陈" }, { id: "d", name: "Alex" }, { id: "e", name: "😀 设计伙伴" }, { id: "f", name: "小周" }]
export default function AvatarGroupExample() {
  const [expanded, setExpanded] = useState(false)
  return <section className={styles.demo} aria-label="头像组演示"><div><p className={styles.demoEyebrow}>Made together</p><h3 className={styles.demoTitle}>一起做，更有默契。</h3></div><UiAvatarGroup label="项目成员" items={expanded ? people : people.slice(0, 4)} /><p className={styles.demoCopy}>没有图片时显示名字首字。每位成员保留名称，悬浮可查看；示例不请求外部头像。</p><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setExpanded(!expanded)}>{expanded ? "收起成员" : "展示更多成员"}</UiButton></div></section>
}
