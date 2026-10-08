"use client"

import type { ReactNode } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { UiButton } from "./own-ui-button"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export const UiDialog = Dialog.Root
export const UiDialogTrigger = Dialog.Trigger
export const UiDialogClose = Dialog.Close

export interface UiDialogContentProps extends Omit<Dialog.Popup.Props, "title" | "className"> {
  title: ReactNode
  description?: ReactNode
  className?: string
  portalContainer?: Dialog.Portal.Props["container"]
}

export function UiDialogContent({ title, description, children, className, portalContainer, ...props }: UiDialogContentProps) {
  return (
    <Dialog.Portal container={portalContainer}>
      <Dialog.Backdrop className={styles.dialog_backdrop} />
      <Dialog.Popup {...props} className={cx(styles.dialog_popup, className)}>
        <div className={styles.panel_header}>
          <Dialog.Title className={styles.dialog_title}>{title}</Dialog.Title>
          <Dialog.Close render={<UiButton variant="ghost" size="compact" aria-label="关闭对话框" />}>×</Dialog.Close>
        </div>
        {description && <Dialog.Description className={styles.panel_copy}>{description}</Dialog.Description>}
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  )
}
