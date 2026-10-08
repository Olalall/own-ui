"use client"
import { useState } from "react"
import { UiBreadcrumb } from "../own-ui-breadcrumb"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

export default function BreadcrumbExample() {
  const [deep, setDeep] = useState(false)
  const items = [{ id: "library", label: "组件库", href: "#top" }, { id: "collection", label: "我的收藏", href: "#breadcrumb-example-current" }, ...(deep ? [{ id: "folder", label: "工作台 / 项目中的导航与布局参考", href: "#breadcrumb-example-current" }] : []), { id: "current", label: "组件详情" }]
  return <section className={styles.demo} aria-label="面包屑演示"><UiBreadcrumb items={items} /><div id="breadcrumb-example-current" className={styles.demoPanel}><p className={styles.demoEyebrow}>Know where you are</p><h3 className={styles.demoTitle}>当前位置，清楚可见。</h3><p className={styles.demoCopy}>最后一项标记当前页面。示例链接只跳转到本页，实际地址由项目提供。</p></div><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setDeep(!deep)}>{deep ? "恢复短路径" : "增加路径层级"}</UiButton></div></section>
}
