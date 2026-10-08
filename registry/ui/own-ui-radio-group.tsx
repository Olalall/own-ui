"use client"
import { useId, type FieldsetHTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export interface UiRadioOption { value: string; label: string; disabled?: boolean }
export interface UiRadioGroupProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  label: string; name: string; options: readonly UiRadioOption[]; value: string
  onValueChange: (value: string) => void; required?: boolean; hint?: string; error?: string
}
export function UiRadioGroup({ label, name, options, value, onValueChange, required, hint, error, className, "aria-describedby": describedBy, "aria-invalid": invalid, ...props }: UiRadioGroupProps) {
  const id = useId()
  const descriptionId = hint || error ? `${id}-description` : undefined
  return <fieldset {...props} className={cx(styles.form_group, className)} aria-describedby={[describedBy, descriptionId].filter(Boolean).join(" ") || undefined} aria-invalid={error ? true : invalid}>
    <legend className={styles.field_label}>{label}{required && <span className={styles.required}> *</span>}</legend>
    <div className={styles.choice}>{options.map(option => <label key={option.value} className={styles.choice_label}>
      <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onValueChange(option.value)} disabled={option.disabled} required={required} className={styles.checkbox} /><span>{option.label}</span>
    </label>)}</div>
    {descriptionId && <p id={descriptionId} className={error ? styles.field_error : styles.field_hint} role={error ? "alert" : undefined}>{error || hint}</p>}
  </fieldset>
}
