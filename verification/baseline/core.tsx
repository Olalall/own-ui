import * as React from "react"

import styles from "./own-ui.module.css"

const cx = (...names: Array<string | undefined | false>) =>
  names.filter(Boolean).join(" ")

export interface UiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "default" | "compact"
  busy?: boolean
}

export const UiButton = React.forwardRef<HTMLButtonElement, UiButtonProps>(
  function UiButton(
    {
      className,
      variant = "primary",
      size = "default",
      busy = false,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={cx(
          styles.button,
          styles[`button_${variant}`],
          size === "compact" && styles.button_compact,
          className
        )}
        disabled={disabled || busy}
        aria-busy={busy || undefined}
      />
    )
  }
)

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

export type UiTone = "neutral" | "success" | "warning" | "danger" | "info"

export interface UiStatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: UiTone
}

export function UiStatusBadge({
  tone = "neutral",
  className,
  children,
  ...props
}: UiStatusBadgeProps) {
  return (
    <span
      {...props}
      className={cx(styles.badge, styles[`badge_${tone}`], className)}
      data-tone={tone}
    >
      <span className={styles.badge_dot} aria-hidden="true" />
      {children}
    </span>
  )
}

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

export interface UiSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  hint?: string
  error?: string
}

export const UiSelect = React.forwardRef<HTMLSelectElement, UiSelectProps>(
  function UiSelect({ id, label, hint, error, className, children, ...props }, ref) {
    const generatedId = React.useId()
    const fieldId = id ?? `own-ui-${generatedId.replaceAll(":", "")}`
    const hintId = hint && !error ? `${fieldId}-hint` : undefined
    const errorId = error ? `${fieldId}-error` : undefined
    const descriptionIds = [props["aria-describedby"], hintId, errorId].filter(Boolean).join(" ")
    return (
      <div className={styles.field}>
        <label className={styles.field_label} htmlFor={fieldId}>
          {label}
          {props.required && <span className={styles.required}> *</span>}
        </label>
        <select
          {...props}
          ref={ref}
          id={fieldId}
          className={cx(styles.field_input, styles.select, className)}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={descriptionIds || undefined}
        >{children}</select>
        {hintId && <p className={styles.field_hint} id={hintId}>{hint}</p>}
        {errorId && <p className={styles.field_error} id={errorId} role="alert">{error}</p>}
      </div>
    )
  }
)

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

export interface UiNoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: UiTone
  title?: string
}

export function UiNotice({ tone = "info", title, className, children, ...props }: UiNoticeProps) {
  return (
    <div {...props} className={cx(styles.notice, styles[`notice_${tone}`], className)} role={props.role ?? (tone === "danger" ? "alert" : "status")}>
      {title && <strong className={styles.notice_title}>{title}</strong>}
      <div>{children}</div>
    </div>
  )
}

export interface UiProgressProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  label: string
}

export function UiProgress({ label, className, ...props }: UiProgressProps) {
  const value = props.value === undefined ? undefined : Number(props.value)
  const max = Number(props.max ?? 1)
  const percentage = value === undefined ? undefined : max > 0 ? Math.round(Math.min(1, Math.max(0, value / max)) * 100) : 0
  return (
    <div className={styles.progress_wrap}>
      <div className={styles.progress_label}><span>{label}</span><span>{percentage === undefined ? "进行中" : `${percentage}%`}</span></div>
      <progress {...props} aria-label={props["aria-label"] ?? label} className={cx(styles.progress, className)} />
    </div>
  )
}

export function UiSkeleton({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} aria-hidden="true" className={cx(styles.skeleton, className)} />
}
