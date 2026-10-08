"use client"
import { forwardRef } from "react"
import { UiButton, type UiButtonProps } from "./own-ui-button"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-effects.module.css"

export const UiShineButton = forwardRef<HTMLButtonElement, UiButtonProps>(function UiShineButton({ className, children, ...props }, ref) {
  return <UiButton {...props} ref={ref} className={cx(styles.shineButton, className)}><span className={styles.buttonLabel}>{children}</span></UiButton>
})
