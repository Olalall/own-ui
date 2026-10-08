"use client"
import type { HTMLAttributes } from "react"
import { UiButton } from "./own-ui-button"
import { cx } from "./own-ui-utils"
import styles from "./own-ui-patterns.module.css"

export type FileTreeNode = { id: string; name: string; children?: FileTreeNode[]; disabled?: boolean }
function Nodes({ nodes, value, onSelect }: { nodes: FileTreeNode[]; value: string | null; onSelect: (id: string) => void }) {
  return <ul className={styles.treeNodes}>{nodes.map(node => <li key={node.id}>{node.children ? <details><summary aria-disabled={node.disabled || undefined} tabIndex={node.disabled ? -1 : undefined} onClick={event => { if (node.disabled) event.preventDefault() }}><span aria-hidden="true">▱</span>{node.name}</summary><Nodes nodes={node.children} value={value} onSelect={onSelect} /></details> : <UiButton variant="ghost" disabled={node.disabled} aria-pressed={value === node.id} onClick={() => onSelect(node.id)}><span aria-hidden="true">▧</span>{node.name}</UiButton>}</li>)}</ul>
}
export function UiFileTree({ nodes, value, onSelect, label, className, ...props }: Omit<HTMLAttributes<HTMLElement>, "onSelect"> & { nodes: FileTreeNode[]; value: string | null; onSelect: (id: string) => void; label: string }) {
  return <nav {...props} aria-label={label} className={cx(styles.fileTree, className)}>{nodes.length ? <Nodes nodes={nodes} value={value} onSelect={onSelect} /> : <p className={styles.muted}>没有文件</p>}</nav>
}
