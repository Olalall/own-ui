"use client"
import { forwardRef, useRef, useState } from "react"
import { UiButton, type UiButtonProps } from "./own-ui-button"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-effects.module.css"

export const UiRippleButton = forwardRef<HTMLButtonElement, UiButtonProps>(function UiRippleButton({ className, children, onClick, ...props }, ref) {
  const sequence = useRef(0)
  const [ripple, setRipple] = useState<{ id: number; x: number; y: number; size: number } | null>(null)
  return <UiButton {...props} ref={ref} className={cx(styles.rippleButton, className)} onClick={event => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const bounds = event.currentTarget.getBoundingClientRect()
      setRipple({ id: ++sequence.current, x: event.detail ? event.clientX - bounds.left : bounds.width / 2, y: event.detail ? event.clientY - bounds.top : bounds.height / 2, size: Math.hypot(bounds.width, bounds.height) * 2 })
    }
    onClick?.(event)
  }}><span className={styles.buttonLabel}>{children}</span>{ripple && <span key={ripple.id} className={styles.rippleWave} aria-hidden="true" style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }} onAnimationEnd={() => setRipple(current => current?.id === ripple.id ? null : current)} />}</UiButton>
})
