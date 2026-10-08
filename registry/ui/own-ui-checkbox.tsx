"use client"

import * as React from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export interface UiCheckboxFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string
  hint?: string
}

export const UiCheckboxField = React.forwardRef<HTMLInputElement, UiCheckboxFieldProps>(
  function UiCheckboxField({ id, label, hint, className, "aria-describedby": describedBy, ...props }, ref) {
    const generatedId = React.useId()
    const fieldId = id ?? `own-ui-${generatedId.replaceAll(":", "")}`
    const hintId = hint ? `${fieldId}-hint` : undefined
    const descriptionIds = [describedBy, hintId].filter(Boolean).join(" ")
    return (
      <div className={styles.choice}>
        <label className={styles.choice_label} htmlFor={fieldId}>
          <input {...props} ref={ref} id={fieldId} type="checkbox" className={cx(styles.checkbox, className)} aria-describedby={descriptionIds || undefined} />
          <span>{label}{props.required && <span className={styles.required}> *</span>}</span>
        </label>
        {hintId && <p className={styles.field_hint} id={hintId}>{hint}</p>}
      </div>
    )
  }
)
