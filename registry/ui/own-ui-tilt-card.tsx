"use client"
import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-effects.module.css"

export function UiTiltCard({ active = true, className, children, onPointerMove, onPointerLeave, ...props }: HTMLAttributes<HTMLDivElement> & { active?: boolean }) {
  return <div {...props} className={cx(styles.tiltFrame, className)} data-active={active} onPointerMove={event => {
    if (active && event.pointerType !== "touch") {
      const bounds = event.currentTarget.getBoundingClientRect()
      if (bounds.width && bounds.height) {
        const x = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5))
        const y = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5))
        event.currentTarget.style.setProperty("--tilt-x", `${-y * 12}deg`)
        event.currentTarget.style.setProperty("--tilt-y", `${x * 12}deg`)
      }
    }
    onPointerMove?.(event)
  }} onPointerLeave={event => { event.currentTarget.style.removeProperty("--tilt-x"); event.currentTarget.style.removeProperty("--tilt-y"); onPointerLeave?.(event) }}><div className={styles.tiltSurface}>{children}</div></div>
}
