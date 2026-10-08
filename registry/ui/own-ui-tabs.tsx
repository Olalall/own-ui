"use client"
import { Tabs } from "@base-ui/react/tabs"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export const UiTabs = Tabs.Root
export function UiTabsList({ className, ...props }: Omit<Tabs.List.Props, "className"> & { className?: string }) {
  return <Tabs.List {...props} className={cx(styles.tabs_list, className)} />
}
export function UiTab({ className, ...props }: Omit<Tabs.Tab.Props, "className"> & { className?: string }) {
  return <Tabs.Tab {...props} className={cx(styles.tab, className)} />
}
export function UiTabPanel({ className, ...props }: Omit<Tabs.Panel.Props, "className"> & { className?: string }) {
  return <Tabs.Panel {...props} className={cx(styles.tab_panel, className)} />
}
