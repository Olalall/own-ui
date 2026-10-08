"use client"
import { useRef } from "react"
import { ListToolbar } from "./own-ui-list-toolbar"
import { UiField } from "./own-ui-field"
import { UiButton } from "./own-ui-button"
import { UiMultiSelect } from "./own-ui-multi-select"
import { UiDateRangePicker, type UiDateRange } from "./own-ui-date-range-picker"
import type { UiChoiceOption } from "./own-ui-combobox"
import styles from "./own-ui.module.css"

export interface UiFilterValue { query: string; tags: string[]; range: UiDateRange }
export interface UiFilterBarProps {
  label: string; value: UiFilterValue; onValueChange: (value: UiFilterValue) => void
  tagOptions?: readonly UiChoiceOption[]; showDateRange?: boolean; disabled?: boolean
}
export function UiFilterBar({ label, value, onValueChange, tagOptions, showDateRange, disabled }: UiFilterBarProps) {
  const container = useRef<HTMLDivElement>(null)
  const empty = !value.query && !value.tags.length && !value.range.start && !value.range.end
  return <div ref={container} role="search" aria-label={label} className={styles.field}>
    <ListToolbar search={<UiField label={`${label}关键词`} type="search" value={value.query} disabled={disabled} onChange={event => onValueChange({ ...value, query: event.target.value })} />} actions={<UiButton variant="outline" disabled={disabled || empty} onClick={() => onValueChange({ query: "", tags: [], range: { start: "", end: "" } })}>清除全部筛选</UiButton>} />
    <div className={styles.filter_fields}>
      {tagOptions && <UiMultiSelect label={`${label}标签`} options={tagOptions} value={value.tags} onValueChange={tags => onValueChange({ ...value, tags })} disabled={disabled} portalContainer={container} />}
      {showDateRange && <UiDateRangePicker label={`${label}日期`} value={value.range} onValueChange={range => onValueChange({ ...value, range })} disabled={disabled} />}
    </div>
  </div>
}
