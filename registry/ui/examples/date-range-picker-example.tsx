"use client"
import { useState } from "react"
import { UiDateRangePicker, type UiDateRange } from "../own-ui-date-range-picker"
import { UiCheckboxField } from "../own-ui-checkbox"
export default function DateRangePickerExample() {
  const [value, setValue] = useState<UiDateRange>({ start: "2026-10-01", end: "2026-10-08" })
  const [disabled, setDisabled] = useState(false)
  return <><UiCheckboxField label="禁用日期范围" checked={disabled} onChange={event => setDisabled(event.target.checked)} /><UiDateRangePicker label="统计日期" name="reportRange" value={value} onValueChange={setValue} min="2026-01-01" max="2026-12-31" disabled={disabled} /><p role="status">日期值：{value.start || "空"} 至 {value.end || "空"}</p></>
}
