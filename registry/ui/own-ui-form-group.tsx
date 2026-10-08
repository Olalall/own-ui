"use client"
import { useId, type FieldsetHTMLAttributes, type ReactNode } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"
export interface UiFormGroupProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "title"> { title: ReactNode; description?: ReactNode; error?: string }
export function UiFormGroup({ title, description, error, children, className, "aria-describedby": describedBy, ...props }: UiFormGroupProps) {
  const id = useId()
  const descriptionId = description || error ? `${id}-description` : undefined
  return <fieldset {...props} className={cx(styles.form_group, className)} aria-describedby={[describedBy, descriptionId].filter(Boolean).join(" ") || undefined} aria-invalid={error ? true : undefined}>
    <legend className={styles.panel_title}>{title}</legend>
    {descriptionId && <p id={descriptionId} className={error ? styles.field_error : styles.field_hint} role={error ? "alert" : undefined}>{error || description}</p>}
    {children}
  </fieldset>
}
