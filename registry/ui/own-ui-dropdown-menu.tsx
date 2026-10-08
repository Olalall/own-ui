"use client"

import { Menu } from "@base-ui/react/menu"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export const UiDropdownMenu = Menu.Root
export const UiDropdownMenuTrigger = Menu.Trigger

export interface UiDropdownMenuContentProps extends Omit<Menu.Popup.Props, "className"> {
  className?: string
  side?: Menu.Positioner.Props["side"]
  align?: Menu.Positioner.Props["align"]
  portalContainer?: Menu.Portal.Props["container"]
}

export function UiDropdownMenuContent({ className, side = "bottom", align = "start", portalContainer, ...props }: UiDropdownMenuContentProps) {
  return <Menu.Portal container={portalContainer}>
    <Menu.Positioner side={side} align={align} sideOffset={6} className={styles.floating_positioner}>
      <Menu.Popup {...props} className={cx(styles.menu_popup, className)} />
    </Menu.Positioner>
  </Menu.Portal>
}

export function UiDropdownMenuItem({ className, ...props }: Omit<Menu.Item.Props, "className"> & { className?: string }) {
  return <Menu.Item {...props} className={cx(styles.menu_item, className)} />
}
