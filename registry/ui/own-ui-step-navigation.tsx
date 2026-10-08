"use client"
import type { HTMLAttributes } from "react"
import { UiButton } from "./own-ui-button"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export function UiStepNavigation({ steps, value, onValueChange, label, className, ...props }: Omit<HTMLAttributes<HTMLElement>, "children"> & { steps: { id: string; label: string; disabled?: boolean }[]; value: string; onValueChange: (value: string) => void; label: string }) {
  return <nav {...props} aria-label={label} className={cx(styles.steps, className)}><ol>{steps.map((step, i) => <li key={step.id}><UiButton variant="ghost" disabled={step.disabled} aria-current={step.id === value ? "step" : undefined} onClick={() => onValueChange(step.id)}><span className={styles.stepNumber} aria-hidden="true">{i + 1}</span>{step.label}</UiButton></li>)}</ol></nav>
}
