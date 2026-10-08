"use client"
import { Toast } from "@base-ui/react/toast"
import { UiButton } from "./own-ui-button"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export const UiToastProvider = Toast.Provider
export const useUiToast = Toast.useToastManager

// One explicit host per provider. Inline hosts also work inside modal/local theme containers.
export function UiToastHost({ placement = "fixed" }: { placement?: "fixed" | "inline" }) {
  const { toasts } = useUiToast()
  return <Toast.Viewport className={cx(styles.toast_viewport, placement === "fixed" && styles.toast_fixed)}>
    {toasts.map(toast => <Toast.Root key={toast.id} toast={toast} className={styles.toast}>
      <Toast.Content>
        <div className={styles.panel_header}><Toast.Title className={styles.panel_title} />
          <Toast.Close render={<UiButton variant="ghost" size="compact" aria-label="关闭通知" />}>×</Toast.Close></div>
        <Toast.Description className={styles.panel_copy} />
        {toast.actionProps && <Toast.Action render={<UiButton variant="outline" size="compact" />} />}
      </Toast.Content>
    </Toast.Root>)}
  </Toast.Viewport>
}
