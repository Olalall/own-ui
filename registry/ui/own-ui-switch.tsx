"use client"
import { forwardRef, useId, type InputHTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export interface UiSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role"> { label: string; hint?: string }
export const UiSwitch = forwardRef<HTMLInputElement, UiSwitchProps>(function UiSwitch({ label, hint, id, className, "aria-describedby": describedBy, ...props }, ref) {
  const generatedId = useId()
  const fieldId = id ?? `own-ui-${generatedId}`
  const hintId = hint ? `${fieldId}-hint` : undefined
  return <div className={styles.choice}>
    <label htmlFor={fieldId} className={styles.choice_label}><input {...props} ref={ref} id={fieldId} type="checkbox" role="switch" className={cx(styles.switch, className)} aria-describedby={[describedBy, hintId].filter(Boolean).join(" ") || undefined} /><span>{label}{props.required && <span className={styles.required}> *</span>}</span></label>
    {hintId && <p id={hintId} className={styles.field_hint}>{hint}</p>}
  </div>
})
