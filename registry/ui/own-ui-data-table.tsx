"use client"
import { useMemo } from "react"
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, type ColumnDef, type SortingState, type RowSelectionState, type PaginationState, type OnChangeFn } from "@tanstack/react-table"
import { UiButton } from "./own-ui-button"
import { UiNotice } from "./own-ui-notice"
import { WorkspacePagination } from "./own-ui-workspace-pagination"
import { WorkspaceEmptyState } from "./own-ui-workspace-empty"
import styles from "./own-ui.module.css"

export type { ColumnDef, SortingState, RowSelectionState, PaginationState } from "@tanstack/react-table"
export interface UiDataTableProps<T> {
  caption: string; data: T[]; columns: ColumnDef<T, any>[]; getRowId: (row: T) => string
  getRowLabel?: (row: T) => string; isRowSelectable?: (row: T) => boolean
  sorting: SortingState; onSortingChange: OnChangeFn<SortingState>
  selection: RowSelectionState; onSelectionChange: OnChangeFn<RowSelectionState>
  pagination: PaginationState; onPaginationChange: OnChangeFn<PaginationState>
  mode?: "client" | "server"; rowCount?: number; loading?: boolean; error?: string; onRetry?: () => void
  emptyDescription?: string
}
export function validateTableRows<T>(data: readonly T[], getRowId: (row: T) => string): string | undefined {
  const ids = data.map(getRowId)
  if (ids.some(id => typeof id !== "string" || !id.trim()) || new Set(ids).size !== ids.length) return "行标识必须是唯一且非空的字符串。"
}
export function normalizeTablePagination(pagination: PaginationState, totalRows: number): PaginationState {
  const pageSize = Number.isFinite(pagination.pageSize) ? Math.max(1, Math.floor(pagination.pageSize)) : 10
  const lastIndex = Math.max(0, Math.ceil((Number.isFinite(totalRows) ? Math.max(0, Math.floor(totalRows)) : 0) / pageSize) - 1)
  const pageIndex = Number.isFinite(pagination.pageIndex) ? Math.max(0, Math.min(lastIndex, Math.floor(pagination.pageIndex))) : 0
  return { pageSize, pageIndex }
}
// ponytail: ordinary paginated management lists; add virtualization/grid features only for measured scale or explicit editing needs.
export function UiDataTable<T>({ caption, data, columns, getRowId, getRowLabel, isRowSelectable, sorting, onSortingChange, selection, onSelectionChange, pagination, onPaginationChange, mode = "client", rowCount, loading, error, onRetry, emptyDescription }: UiDataTableProps<T>) {
  const identityError = useMemo(() => validateTableRows(data, getRowId), [data, getRowId])
  const configurationError = mode === "server" && (!Number.isFinite(rowCount) || rowCount! < 0) ? "服务端模式需要非负 rowCount。" : identityError
  const total = mode === "server" ? Number.isFinite(rowCount) ? Math.max(0, Math.floor(rowCount!)) : 0 : data.length
  const normalized = normalizeTablePagination(pagination, total)
  const activeError = error || configurationError
  const locked = Boolean(loading || activeError)
  const table = useReactTable({
    data: configurationError ? [] : data, columns, getRowId,
    state: { sorting, rowSelection: selection, pagination: normalized },
    onSortingChange, onRowSelectionChange: onSelectionChange, onPaginationChange,
    enableRowSelection: row => !locked && (!isRowSelectable || isRowSelectable(row.original)),
    enableMultiSort: false, enableSorting: !locked, autoResetPageIndex: false,
    manualSorting: mode === "server", manualPagination: mode === "server", rowCount: total,
    getCoreRowModel: getCoreRowModel(), getSortedRowModel: mode === "client" ? getSortedRowModel() : undefined,
    getPaginationRowModel: mode === "client" ? getPaginationRowModel() : undefined,
  })
  const rows = table.getRowModel().rows
  return <div className={styles.field} aria-busy={loading || undefined}>
    {activeError && <UiNotice title="列表加载失败" tone="danger" role="alert">{activeError}{onRetry && <UiButton variant="outline" onClick={onRetry}>重试加载</UiButton>}</UiNotice>}
    {loading && <p role="status" className={styles.panel_hint}>正在加载列表…</p>}
    <div className={styles.table_scroll} role="region" aria-label={`${caption}滚动区域`} tabIndex={0}>
      <table className={styles.table}>
        <caption>{caption}</caption>
        <thead>{table.getHeaderGroups().map(group => <tr key={group.id}>
          <th scope="col"><input type="checkbox" className={styles.checkbox} aria-label="选择本页全部可选行" aria-checked={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected() ? "mixed" : table.getIsAllPageRowsSelected()} checked={table.getIsAllPageRowsSelected()} disabled={locked || !rows.some(row => row.getCanSelect())} ref={element => { if (element) element.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected() }} onChange={table.getToggleAllPageRowsSelectedHandler()} /></th>
          {group.headers.map(header => <th key={header.id} scope="col" colSpan={header.colSpan} aria-sort={header.column.getIsSorted() === "asc" ? "ascending" : header.column.getIsSorted() === "desc" ? "descending" : undefined}>
            {!header.isPlaceholder && (header.column.getCanSort() ? <button type="button" onClick={header.column.getToggleSortingHandler()} className={styles.table_sort}>{flexRender(header.column.columnDef.header, header.getContext())}<span aria-hidden="true">{header.column.getIsSorted() === "asc" ? " ↑" : header.column.getIsSorted() === "desc" ? " ↓" : " ↕"}</span></button> : flexRender(header.column.columnDef.header, header.getContext()))}
          </th>)}
        </tr>)}</thead>
        <tbody>{rows.map(row => <tr key={row.id} data-selected={row.getIsSelected() || undefined}>
          <td><input type="checkbox" className={styles.checkbox} aria-label={`选择 ${getRowLabel?.(row.original) ?? row.id}`} checked={row.getIsSelected()} disabled={!row.getCanSelect()} onChange={row.getToggleSelectedHandler()} /></td>
          {row.getVisibleCells().map(cell => <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
        </tr>)}</tbody>
      </table>
    </div>
    {!rows.length && !loading && !activeError && <WorkspaceEmptyState title="暂无数据" description={emptyDescription} />}
    <fieldset disabled={locked} className={styles.form_group}><WorkspacePagination page={normalized.pageIndex + 1} totalPages={Math.ceil(total / normalized.pageSize)} onPageChange={page => onPaginationChange({ ...normalized, pageIndex: page - 1 })} /></fieldset>
  </div>
}
