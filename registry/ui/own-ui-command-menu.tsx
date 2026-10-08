"use client"
import { useEffect, useId, useRef, useState } from "react"
import { UiDialog, UiDialogContent } from "./own-ui-dialog"
import { UiField } from "./own-ui-field"
import styles from "./own-ui-patterns.module.css"

export type CommandItem = { id: string; label: string; description?: string; disabled?: boolean }
export function UiCommandMenu({ open, onOpenChange, items, onSelect, title = "命令菜单" }: { open: boolean; onOpenChange: (open: boolean) => void; items: CommandItem[]; onSelect: (id: string) => void; title?: string }) {
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  useEffect(() => { if (!open) { setQuery(""); setActiveId(null) } }, [open])
  const filtered = items.filter(item => `${item.label} ${item.description ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()))
  const enabled = filtered.filter(item => !item.disabled)
  const active = enabled.find(item => item.id === activeId) ?? enabled[0]
  function select(item: CommandItem) { if (!item.disabled) { onSelect(item.id); onOpenChange(false) } }
  return <UiDialog open={open} onOpenChange={onOpenChange}><UiDialogContent title={title} description="输入搜索，方向键选择，Enter 执行，Esc 关闭。" initialFocus={searchRef}>
    <UiField ref={searchRef} label="搜索命令" value={query} onChange={event => { setQuery(event.currentTarget.value); setActiveId(null) }} role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls={listId} aria-activedescendant={active ? `${listId}-${filtered.indexOf(active)}` : undefined} onKeyDown={event => {
      if (event.nativeEvent.isComposing) return
      if ((event.key === "ArrowDown" || event.key === "ArrowUp") && enabled.length) { event.preventDefault(); const index = active ? enabled.indexOf(active) : 0; setActiveId(enabled[(index + (event.key === "ArrowDown" ? 1 : -1) + enabled.length) % enabled.length].id) }
      if (event.key === "Enter" && active) { event.preventDefault(); select(active) }
    }} />
    <ul id={listId} role="listbox" aria-label="可用命令" className={styles.commandList}>{filtered.map((item, i) => <li key={item.id} role="option" id={`${listId}-${i}`} aria-selected={item.id === active?.id} aria-disabled={item.disabled} className={styles.commandItem} onPointerMove={() => { if (!item.disabled) setActiveId(item.id) }} onMouseDown={event => event.preventDefault()} onClick={() => select(item)}><strong>{item.label}</strong>{item.description && <span>{item.description}</span>}{item.disabled && <small>不可用</small>}</li>)}</ul>
    <p className={styles.muted} role="status">{filtered.length ? `${enabled.length} 个可用命令` : "没有匹配命令"}</p>
  </UiDialogContent></UiDialog>
}
