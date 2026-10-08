"use client"
import { useState } from "react"
import { UiBlurReveal } from "../own-ui-blur-reveal"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"
import effects from "../own-ui-effects.module.css"

export default function BlurRevealExample() {
  const [visible, setVisible] = useState(true)
  const [selected, setSelected] = useState(false)
  return <section className={styles.demo} aria-label="模糊入场演示"><p className={styles.demoKicker}>Come into focus</p><UiBlurReveal visible={visible}><div className={effects.demoPanel}><span className={effects.demoBadge}>✦ 新的灵感</span><h3 className={styles.demoTitle}>从模糊，到清晰。</h3><p className={styles.demoDescription}>内容保留原本的位置，隐藏时内部按钮退出键盘顺序。</p><UiButton variant="outline" onClick={() => setSelected(!selected)}>{selected ? "取消选用" : "选用这个组件"}</UiButton></div></UiBlurReveal><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setVisible(!visible)}>{visible ? "隐藏内容" : "显示内容"}</UiButton></div><p className={styles.demoStatus} role="status">{visible ? "内容可见" : "内容已隐藏"} · {selected ? "已选用" : "未选用"}</p></section>
}
