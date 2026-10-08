"use client"
import type { HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-motion.module.css"

export function UiSpotlightCard({ className, onPointerMove, onPointerLeave, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx(styles.spotlight, className)} onPointerMove={event => {
    if (event.pointerType !== "touch") {
      const bounds = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`)
      event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`)
    }
    onPointerMove?.(event)
  }} onPointerLeave={event => { event.currentTarget.style.removeProperty("--spot-x"); event.currentTarget.style.removeProperty("--spot-y"); onPointerLeave?.(event) }} />
}
