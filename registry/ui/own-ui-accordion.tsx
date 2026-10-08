"use client"
import type { HTMLAttributes, ReactNode } from "react"
import { Accordion } from "@base-ui/react/accordion"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export function UiAccordion({ items, value, onValueChange, className, ...props }: Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> & { items: { id: string; title: string; content: ReactNode; disabled?: boolean }[]; value: string | null; onValueChange: (value: string | null) => void }) {
  return <Accordion.Root<string> {...props} value={value === null ? [] : [value]} onValueChange={values => onValueChange(values[0] ?? null)} className={cx(styles.accordion, className)}>{items.map(item => <Accordion.Item key={item.id} value={item.id} disabled={item.disabled} className={styles.accordionItem}><Accordion.Header className={styles.accordionHeader}><Accordion.Trigger className={styles.accordionTrigger}>{item.title}<span aria-hidden="true">+</span></Accordion.Trigger></Accordion.Header><Accordion.Panel className={styles.accordionPanel}><div className={styles.accordionContent}>{item.content}</div></Accordion.Panel></Accordion.Item>)}</Accordion.Root>
}
