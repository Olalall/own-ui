"use client"
import { UiFormGroup } from "./own-ui-form-group"
import { UiField } from "./own-ui-field"
import { UiButton } from "./own-ui-button"
import styles from "./own-ui.module.css"

export interface UiDateRange { start: string; end: string }
function validDate(value: string) {
  if (!/^(?!0000)\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}
export function getDateRangeError({ start, end }: UiDateRange, min?: string, max?: string): string | undefined {
  if ([start, end, min, max].some(value => value && !validDate(value))) return "日期须为有效的 YYYY-MM-DD。"
  if (min && max && min > max) return "日期下限不能晚于上限。"
  if (start && end && start > end) return "结束日期不能早于开始日期。"
  if ([start, end].some(value => value && ((min && value < min) || (max && value > max)))) return "日期超出允许范围。"
}
export interface UiDateRangePickerProps {
  label: string; value: UiDateRange; onValueChange: (value: UiDateRange) => void
  name?: string; min?: string; max?: string; disabled?: boolean; required?: boolean; error?: string
}
export function UiDateRangePicker({ label, value, onValueChange, name = "range", min, max, disabled, required, error }: UiDateRangePickerProps) {
  const rangeError = error || getDateRangeError(value, min, max)
  const validStart = validDate(value.start) ? value.start : ""
  const validEnd = validDate(value.end) ? value.end : ""
  const startMax = validEnd && (!max || validEnd < max) ? validEnd : max
  const endMin = validStart && (!min || validStart > min) ? validStart : min
  return <UiFormGroup title={label} disabled={disabled} error={rangeError} description="日期按 YYYY-MM-DD 保存，不转换为时区时间。">
    <div className={styles.date_range}>
      <UiField label="开始日期" type="date" name={`${name}.start`} value={validStart} min={min} max={startMax} required={required} aria-invalid={rangeError ? true : undefined} onChange={event => onValueChange({ ...value, start: event.target.value })} />
      <UiField label="结束日期" type="date" name={`${name}.end`} value={validEnd} min={endMin} max={max} required={required} aria-invalid={rangeError ? true : undefined} onChange={event => onValueChange({ ...value, end: event.target.value })} />
    </div><UiButton variant="ghost" disabled={!value.start && !value.end} onClick={() => onValueChange({ start: "", end: "" })}>清除日期</UiButton>
  </UiFormGroup>
}
