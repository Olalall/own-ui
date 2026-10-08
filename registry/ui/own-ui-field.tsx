"use client"

import * as React from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export interface UiFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string
  hint?: string
  error?: string
}

export const UiField = React.forwardRef<HTMLInputElement, UiFieldProps>(
  function UiField({
    id,
    label,
    hint,
    error,
    className,
    "aria-describedby": describedBy,
    "aria-invalid": invalid,
    ...props
  }, ref) {
    const generatedId = React.useId()
    const fieldId = id ?? `own-ui-${generatedId.replaceAll(":", "")}`
    const hintId = hint && !error ? `${fieldId}-hint` : undefined
    const errorId = error ? `${fieldId}-error` : undefined
    const descriptionIds = [describedBy, hintId, errorId].filter(Boolean).join(" ")

    return (
      <div className={styles.field}>
        <label className={styles.field_label} htmlFor={fieldId}>
          {label}
          {props.required && <span className={styles.required}> *</span>}
        </label>
        <input
          {...props}
          ref={ref}
          id={fieldId}
          className={cx(styles.field_input, className)}
          aria-invalid={error ? true : invalid}
          aria-describedby={descriptionIds || undefined}
        />
        {hintId && <p className={styles.field_hint} id={hintId}>{hint}</p>}
        {errorId && <p className={styles.field_error} id={errorId} role="alert">{error}</p>}
      </div>
    )
  }
)
