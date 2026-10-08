"use client"
import { UiChoiceControl, type UiChoiceProps } from "./own-ui-combobox"
export interface UiMultiSelectProps extends UiChoiceProps { value: string[]; onValueChange: (value: string[]) => void }
export function UiMultiSelect(props: UiMultiSelectProps) { return <UiChoiceControl {...props} multiple onValueChange={value => props.onValueChange(Array.isArray(value) ? value : [])} /> }
