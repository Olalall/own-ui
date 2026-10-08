"use client"

import * as React from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

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
