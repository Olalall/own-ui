"use client"
import { useState } from "react"
import { UiStepNavigation } from "../own-ui-step-navigation"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-patterns.module.css"

const steps = [{ id: "choose", label: "选组件" }, { id: "theme", label: "调主题" }, { id: "preview", label: "看预览" }, { id: "release", label: "待发布", disabled: true }]
export default function StepNavigationExample() {
  const [value, setValue] = useState("choose")
  const index = steps.findIndex(step => step.id === value)
  return <section className={styles.demo} aria-label="步骤导航演示"><UiStepNavigation label="组件接入步骤" steps={steps} value={value} onValueChange={setValue} /><div className={styles.demoPanel}><p className={styles.demoEyebrow}>One step at a time</p><h3 className={styles.demoTitle}>{steps[index].label}</h3><p className={styles.demoCopy}>{["挑选需要的组件，复制完整文件。", "将语义变量映射到自己的项目主题。", "检查交互、窄屏与键盘使用体验。"][index]}</p></div><div className={styles.demoActions}><UiButton variant="outline" disabled={index === 0} onClick={() => setValue(steps[index - 1].id)}>上一步</UiButton><UiButton disabled={index === 2} onClick={() => setValue(steps[index + 1].id)}>下一步</UiButton></div></section>
}
