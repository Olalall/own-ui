"use client"
import { useRef, useState } from "react"
import { UiBatchActionBar } from "../own-ui-batch-action-bar"
import { UiDataTable, type ColumnDef, type SortingState, type RowSelectionState, type PaginationState } from "../own-ui-data-table"
import { UiButton } from "../own-ui-button"
import { UiCheckboxField } from "../own-ui-checkbox"
type Task = { id: string; name: string }
const records: Task[] = [{ id: "draft-a", name: "设计任务" }, { id: "draft-b", name: "实现任务" }, { id: "draft-c", name: "审查任务" }]
const columns: ColumnDef<Task, any>[] = [{ accessorKey: "name", header: "任务名称" }]
const getRowId = (row: Task) => row.id
export default function BatchActionBarExample() {
  const [selection, setSelection] = useState<RowSelectionState>({ "draft-a": true, "draft-b": true })
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 2 })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [fail, setFail] = useState(false)
  const [revision, setRevision] = useState(0)
  const [result, setResult] = useState("")
  const lock = useRef(false)
  const ids = Object.keys(selection).filter(id => selection[id])
  async function apply() {
    if (lock.current || !ids.length) return
    lock.current = true; setBusy(true); setError("")
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      if (fail) throw new Error("Local demo failure")
      setResult(`已处理 ${ids.length} 项本地演示任务`); setSelection({})
    } catch { setError("批量操作失败，选择已保留，可重试。") }
    finally { lock.current = false; setBusy(false) }
  }
  return <><UiCheckboxField label="模拟批量失败" checked={fail} onChange={event => setFail(event.target.checked)} />
    <UiDataTable caption="批量任务列表" data={revision % 2 ? records.slice(0, 2) : records} columns={columns} getRowId={getRowId} getRowLabel={row => row.name} selection={selection} onSelectionChange={setSelection} sorting={sorting} onSortingChange={setSorting} pagination={pagination} onPaginationChange={setPagination} loading={busy} />
    <UiBatchActionBar count={ids.length} busy={busy} error={error} onClear={() => { setSelection({}); setError("") }} actions={<UiButton onClick={() => void apply()}>处理选中项</UiButton>} />
    <UiButton variant="outline" disabled={busy} onClick={() => { setRevision(revision + 1); setSelection({}); setError(""); setPagination(page => ({ ...page, pageIndex: 0 })) }}>刷新列表并清空选择</UiButton><p role="status">{result || "翻页保留选择；刷新清空选择；失败保留，成功清空。"}</p>
  </>
}
