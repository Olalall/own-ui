"use client"
import { useState } from "react"
import { UiAccordion } from "../own-ui-accordion"
import styles from "../own-ui-patterns.module.css"

const items = [
  { id: "source", title: "组件源码归谁？", content: "源码复制进你的项目，由你管理和修改。下载包包含共享样式、依赖文件与 MIT 许可证。" },
  { id: "theme", title: "如何保持项目的风格？", content: "通过 --own-ui-* 映射字体、颜色与圆角。组件使用局部 CSS Module，避免依赖展示网站的样式。" },
  { id: "later", title: "更多接入方案", content: "后续方案", disabled: true },
]
export default function AccordionExample() {
  const [value, setValue] = useState<string | null>("source")
  return <section className={styles.demo} aria-label="折叠面板演示"><div><p className={styles.demoEyebrow}>A little more clarity</p><h3 className={styles.demoTitle}>答案，逐一展开。</h3></div><UiAccordion items={items} value={value} onValueChange={setValue} /><p className={styles.demoCopy}>一次展开一项；Tab 聚焦，Enter 或空格展开与收起。</p></section>
}
