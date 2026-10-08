"use client"
import { useState } from "react"
import { UiCompareSlider } from "../own-ui-compare-slider"
import { UiButton } from "../own-ui-button"
import styles from "../own-ui-motion.module.css"
import effects from "../own-ui-effects.module.css"

export default function CompareSliderExample() {
  const [value, setValue] = useState(50)
  const [disabled, setDisabled] = useState(false)
  return <section className={styles.demo} aria-label="前后对比演示"><p className={styles.demoKicker}>A visible difference</p><UiCompareSlider label="界面调整对比位置" value={value} onValueChange={setValue} disabled={disabled} before={<div className={effects.demoCompare} data-variant="before"><strong>我的工作区</strong><span /><span /><span /></div>} after={<div className={effects.demoCompare} data-variant="after"><strong>我的工作区 ✦</strong><span /><span /><span /></div>} /><p className={styles.demoDescription}>拖动滑块或使用方向键，查看两份静态内容；预览不加载外部图片。</p><div className={styles.demoActions}><UiButton variant="outline" onClick={() => setValue(50)}>恢复中间位置</UiButton><UiButton variant="ghost" onClick={() => setDisabled(!disabled)}>{disabled ? "启用对比滑块" : "禁用对比滑块"}</UiButton></div></section>
}
