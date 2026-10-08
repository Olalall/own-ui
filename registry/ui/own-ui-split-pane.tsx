"use client"
import { useId, type CSSProperties, type HTMLAttributes, type ReactNode } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export function UiSplitPane({ first, second, value, onValueChange, label, disabled, className, style, ...props }: HTMLAttributes<HTMLDivElement> & { first: ReactNode; second: ReactNode; value: number; onValueChange: (value: number) => void; label: string; disabled?: boolean }) {
  const id = useId()
  const ratio = Number.isFinite(value) ? Math.max(25, Math.min(75, value)) : 50
  return <div {...props} className={cx(styles.splitPane, className)} style={{ ...style, "--split-first": `${ratio}fr`, "--split-second": `${100 - ratio}fr` } as CSSProperties}><div className={styles.splitColumns}><div>{first}</div><div>{second}</div></div><label htmlFor={id} className={styles.splitLabel}>{label}<span>{Math.round(ratio)} : {Math.round(100 - ratio)}</span></label><input id={id} type="range" min={25} max={75} value={ratio} disabled={disabled} aria-valuetext={`左侧 ${Math.round(ratio)}%，右侧 ${Math.round(100 - ratio)}%`} onChange={event => onValueChange(event.currentTarget.valueAsNumber)} /></div>
}
