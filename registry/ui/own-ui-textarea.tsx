"use client"

import * as React from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export interface UiTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
  error?: string
}

export const UiTextarea = React.forwardRef<HTMLTextAreaElement, UiTextareaProps>(
  function UiTextarea({
    id,
    label,
    hint,
    error,
    className,
    "aria-describedby": describedBy,
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
        <textarea
          {...props}
          ref={ref}
          id={fieldId}
          className={cx(styles.field_input, styles.textarea, className)}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={descriptionIds || undefined}
        />
        {hintId && <p className={styles.field_hint} id={hintId}>{hint}</p>}
        {errorId && <p className={styles.field_error} id={errorId} role="alert">{error}</p>}
      </div>
    )
  }
)
