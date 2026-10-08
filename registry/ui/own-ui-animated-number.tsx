"use client"
import { useEffect, useRef, useState, type HTMLAttributes } from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-motion.module.css"

export function UiAnimatedNumber({ value, decimals = 0, duration = 650, className, ...props }: Omit<HTMLAttributes<HTMLSpanElement>, "children"> & { value: number; decimals?: number; duration?: number }) {
  const target = Number.isFinite(value) ? value : 0
  const precision = Number.isFinite(decimals) ? Math.max(0, Math.min(6, Math.trunc(decimals))) : 0
  const milliseconds = Number.isFinite(duration) ? Math.max(0, Math.min(2000, duration)) : 650
  const current = useRef(0)
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const from = current.current
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = reduced.matches || milliseconds === 0 ? 1 : Math.min(1, (now - started) / milliseconds)
      current.current = from + (target - from) * (1 - Math.pow(1 - progress, 3))
      setDisplay(current.current)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, milliseconds])
  const format = (number: number) => number.toLocaleString("zh-CN", { minimumFractionDigits: precision, maximumFractionDigits: precision })
  return <span {...props} className={cx(styles.number, className)} aria-label={props["aria-label"] ?? format(target)}><span aria-hidden="true">{format(display)}</span></span>
}
