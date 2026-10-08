"use client"

import { useRef, useState, type ReactNode } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { UiButton } from "./own-ui-button"
import styles from "./own-ui.module.css"

export interface UiAlertDialogProps {
  title: ReactNode
  description: ReactNode
  triggerLabel: string
  confirmLabel?: string
  onConfirm: () => void | Promise<void>
  open?: boolean
  onOpenChange?: (open: boolean) => void
  portalContainer?: AlertDialog.Portal.Props["container"]
}

export function UiAlertDialog({ title, description, triggerLabel, confirmLabel = "确认", onConfirm, open, onOpenChange, portalContainer }: UiAlertDialogProps) {
  const [localOpen, setLocalOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const locked = useRef(false)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  function change(next: boolean) {
    if (open === undefined) setLocalOpen(next)
    onOpenChange?.(next)
  }
  async function confirm() {
    if (locked.current) return
    locked.current = true
    popupRef.current?.focus()
    setPending(true)
    setError("")
    try {
      await onConfirm()
    } catch {
      setError("操作失败，请检查后重试。")
      return
    } finally {
      locked.current = false
      setPending(false)
    }
    change(false)
  }
  return <AlertDialog.Root open={open ?? localOpen} onOpenChange={(next, details) => {
    if (locked.current) { details.cancel(); return }
    if (next) setError("")
    change(next)
  }}>
    <AlertDialog.Trigger render={<UiButton variant="outline" />}>{triggerLabel}</AlertDialog.Trigger>
    <AlertDialog.Portal container={portalContainer}>
      <AlertDialog.Backdrop className={styles.dialog_backdrop} />
      <AlertDialog.Popup ref={popupRef} className={styles.dialog_popup} initialFocus={cancelRef}>
        <AlertDialog.Title className={styles.dialog_title}>{title}</AlertDialog.Title>
        <AlertDialog.Description className={styles.panel_copy}>{description}</AlertDialog.Description>
        {error && <p role="alert" className={styles.field_error}>{error}</p>}
        <div className={styles.approval_actions}>
          <AlertDialog.Close render={<UiButton ref={cancelRef} variant="outline" disabled={pending} />}>取消</AlertDialog.Close>
          <UiButton variant="danger" busy={pending} onClick={() => void confirm()}>{pending ? "处理中" : confirmLabel}</UiButton>
        </div>
      </AlertDialog.Popup>
    </AlertDialog.Portal>
  </AlertDialog.Root>
}
