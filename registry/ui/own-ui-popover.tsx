"use client"

import type { ReactNode } from "react"
import { Popover } from "@base-ui/react/popover"
import { UiButton } from "./own-ui-button"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export const UiPopover = Popover.Root
export const UiPopoverTrigger = Popover.Trigger
export const UiPopoverClose = Popover.Close

export interface UiPopoverContentProps extends Omit<Popover.Popup.Props, "title" | "className"> {
  title: ReactNode
  description?: ReactNode
  className?: string
  side?: Popover.Positioner.Props["side"]
  align?: Popover.Positioner.Props["align"]
  portalContainer?: Popover.Portal.Props["container"]
}

export function UiPopoverContent({ title, description, className, children, side = "bottom", align = "start", portalContainer, ...props }: UiPopoverContentProps) {
  return <Popover.Portal container={portalContainer}>
    <Popover.Positioner side={side} align={align} sideOffset={8} className={styles.floating_positioner}>
      <Popover.Popup {...props} className={cx(styles.popover_popup, className)}>
        <div className={styles.panel_header}><Popover.Title className={styles.panel_title}>{title}</Popover.Title><Popover.Close render={<UiButton variant="ghost" size="compact" aria-label="关闭浮层" />}>×</Popover.Close></div>
        {description && <Popover.Description className={styles.panel_copy}>{description}</Popover.Description>}
        {children}
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
}
