"use client"
import { useId, useMemo } from "react"
import { Combobox } from "@base-ui/react/combobox"
import { UiButton } from "./own-ui-button"
import styles from "./own-ui.module.css"

export interface UiChoiceOption { value: string; label: string; disabled?: boolean }
export interface UiChoiceProps {
  label: string; options: readonly UiChoiceOption[]; name?: string; placeholder?: string
  disabled?: boolean; required?: boolean; loading?: boolean; error?: string; hint?: string
  onSearchChange?: (query: string) => void
  portalContainer?: Combobox.Portal.Props["container"]
}
export interface UiComboboxProps extends UiChoiceProps { value: string | null; onValueChange: (value: string | null) => void }

// Shared selection engine for single and multiple values; remote requests stay in the host.
export function UiChoiceControl({ label, options, name, placeholder = "输入搜索", disabled, required, loading, error, hint, onSearchChange, portalContainer, multiple = false, value, onValueChange }: UiChoiceProps & { multiple?: boolean; value: string | string[] | null; onValueChange: (value: string | string[] | null) => void }) {
  const id = useId()
  const descriptionId = `${id}-description`
  const items = useMemo(() => Combobox.createItems(loading || error ? [] : options, { getValue: item => item.value, getLabel: item => item.label }), [options, loading, error])
  const labelFor = (selected: string) => options.find(option => option.value === selected)?.label ?? selected
  return <div className={styles.field}>
    <Combobox.Root items={items} multiple={multiple} value={value} onValueChange={onValueChange} itemToStringLabel={labelFor} name={name} required={required} disabled={disabled} modal={false} onInputValueChange={onSearchChange ? query => onSearchChange(query) : undefined} filter={onSearchChange ? null : undefined}>
      <label htmlFor={id} className={styles.field_label}>{label}{required && <span className={styles.required}> *</span>}</label>
      <Combobox.InputGroup className={styles.combo_group}>
        {multiple && <Combobox.Chips className={styles.chips}><Combobox.Value>{(selected: string[]) => selected.map(item => <Combobox.Chip key={item} className={styles.chip}><span>{labelFor(item)}</span><Combobox.ChipRemove aria-label={`移除 ${labelFor(item)}`} render={<UiButton variant="ghost" size="compact" />}>×</Combobox.ChipRemove></Combobox.Chip>)}</Combobox.Value></Combobox.Chips>}
        <Combobox.Input id={id} aria-label={label} placeholder={placeholder} className={styles.combo_input} aria-invalid={error ? true : undefined} aria-describedby={descriptionId} />
        <Combobox.Clear aria-label={`清除${label}`} render={<UiButton variant="ghost" size="compact" />}>×</Combobox.Clear>
        <Combobox.Trigger aria-label={`打开${label}选项`} render={<UiButton variant="ghost" size="compact" />}>⌄</Combobox.Trigger>
      </Combobox.InputGroup>
      <p id={descriptionId} className={error ? styles.field_error : styles.field_hint} role={error ? "alert" : loading ? "status" : undefined}>{error || (loading ? "正在加载选项…" : hint || "输入搜索，方向键选择，Enter 确认。")}</p>
      <Combobox.Portal container={portalContainer}><Combobox.Positioner sideOffset={6} className={styles.floating_positioner}><Combobox.Popup className={styles.combo_popup}>
        <Combobox.Empty className={styles.panel_hint}>{error ? "选项加载失败" : loading ? "正在加载选项…" : "没有匹配选项"}</Combobox.Empty>
        <Combobox.List>{(option: UiChoiceOption) => <Combobox.Item key={option.value} value={option.value} disabled={option.disabled} className={styles.menu_item}><Combobox.ItemIndicator>✓ </Combobox.ItemIndicator>{option.label}</Combobox.Item>}</Combobox.List>
      </Combobox.Popup></Combobox.Positioner></Combobox.Portal>
    </Combobox.Root>
  </div>
}
export function UiCombobox(props: UiComboboxProps) { return <UiChoiceControl {...props} onValueChange={value => props.onValueChange(typeof value === "string" ? value : null)} /> }
