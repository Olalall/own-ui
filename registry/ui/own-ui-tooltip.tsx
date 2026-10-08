"use client"
import { Tooltip } from "@base-ui/react/tooltip"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export const UiTooltipProvider = Tooltip.Provider
export const UiTooltip = Tooltip.Root
export const UiTooltipTrigger = Tooltip.Trigger

export interface UiTooltipContentProps extends Omit<Tooltip.Popup.Props, "className"> {
  className?: string
  side?: Tooltip.Positioner.Props["side"]
  portalContainer?: Tooltip.Portal.Props["container"]
}
export function UiTooltipContent({ children, className, side = "top", portalContainer, ...props }: UiTooltipContentProps) {
  return <Tooltip.Portal container={portalContainer}><Tooltip.Positioner side={side} sideOffset={8} className={styles.floating_positioner}>
    <Tooltip.Popup {...props} className={cx(styles.tooltip, className)}>{children}</Tooltip.Popup>
  </Tooltip.Positioner></Tooltip.Portal>
}
