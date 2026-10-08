"use client"
import { useState } from "react"
import { UiDataTable, type ColumnDef, type SortingState, type RowSelectionState, type PaginationState } from "../own-ui-data-table"
import { UiSelect } from "../own-ui-select"
import { UiButton } from "../own-ui-button"
import { UiStatusBadge } from "../own-ui-status-badge"
type RecordRow = { id: string; name: string; status: string; count: number }
const records: RecordRow[] = [{ id: "b", name: "按钮", status: "ready", count: 8 }, { id: "d", name: "对话框", status: "ready", count: 3 }, { id: "f", name: "字段", status: "draft", count: 6 }, { id: "m", name: "菜单", status: "ready", count: 2 }, { id: "p", name: "分页", status: "draft", count: 4 }]
const columns: ColumnDef<RecordRow, any>[] = [{ accessorKey: "name", header: "名称" }, { accessorKey: "status", header: "状态", cell: context => <UiStatusBadge tone={context.getValue() === "ready" ? "success" : "neutral"}>{context.getValue() === "ready" ? "已就绪" : "草稿"}</UiStatusBadge> }, { accessorKey: "count", header: "数量" }]
const getRowId = (row: RecordRow) => row.id
export default function DataTableExample() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [selection, setSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 2 })
  const [state, setState] = useState("ready")
  const [mode, setMode] = useState<"client" | "server">("client")
  // Local simulation of a server response: sort the full data before selecting its page.
  const ordered = [...records].sort((left, right) => {
    const rule = sorting[0]
    if (!rule) return 0
    const a = left[rule.id as keyof RecordRow], b = right[rule.id as keyof RecordRow]
    const compared = typeof a === "number" ? a - Number(b) : String(a).localeCompare(String(b), "zh-CN")
    return rule.desc ? -compared : compared
  })
  const pageRows = ordered.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize)
  return <><UiSelect label="表格处理方式" value={mode} onChange={event => { setMode(event.target.value as "client" | "server"); setSelection({}); setPagination(page => ({ ...page, pageIndex: 0 })) }}><option value="client">本地处理</option><option value="server">模拟服务端处理</option></UiSelect>
    <UiSelect label="表格状态" value={state} onChange={event => { setState(event.target.value); setSelection({}); setPagination(page => ({ ...page, pageIndex: 0 })) }}><option value="ready">已加载</option><option value="loading">加载中</option><option value="error">失败</option><option value="empty">无数据</option></UiSelect>
    <UiDataTable caption="组件维护列表" data={state === "empty" ? [] : mode === "server" ? pageRows : records} mode={mode} rowCount={state === "empty" ? 0 : records.length} columns={columns} getRowId={getRowId} getRowLabel={row => row.name} isRowSelectable={row => row.status === "ready"} sorting={sorting} onSortingChange={updater => { setSorting(updater); setPagination(page => ({ ...page, pageIndex: 0 })) }} selection={selection} onSelectionChange={setSelection} pagination={pagination} onPaginationChange={setPagination} loading={state === "loading"} error={state === "error" ? "本地模拟连接失败。" : undefined} onRetry={() => setState("ready")} />
    <p role="status">已选行：{Object.keys(selection).filter(id => selection[id]).join("、") || "无"}；翻页保留，状态切换清空。草稿禁止选择。</p><UiButton variant="ghost" disabled={!Object.values(selection).some(Boolean)} onClick={() => setSelection({})}>清除表格选择</UiButton>
  </>
}
