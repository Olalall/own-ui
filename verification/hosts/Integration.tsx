"use client"
import { useEffect, useReducer, useRef, useState, type ComponentType } from "react"
import { UiField } from "./components/ui/own-ui-field"
import { UiSwitch } from "./components/ui/own-ui-switch"
import { UiCheckboxField } from "./components/ui/own-ui-checkbox"
import { UiButton } from "./components/ui/own-ui-button"
import { UiNotice } from "./components/ui/own-ui-notice"
import { UiSettingsSection, UiSettingsRow } from "./components/ui/own-ui-settings-section"
import { UiSidebarNav } from "./components/ui/own-ui-sidebar-nav"
import { UiFilterBar, type UiFilterValue } from "./components/ui/own-ui-filter-bar"
import { UiDataTable, type ColumnDef, type SortingState, type RowSelectionState, type PaginationState } from "./components/ui/own-ui-data-table"
import { UiBatchActionBar } from "./components/ui/own-ui-batch-action-bar"
import { AgentPromptComposer } from "./components/ui/own-ui-agent-composer"
import { AgentMessage } from "./components/ui/own-ui-agent-message"
import { ToolApprovalPanel } from "./components/ui/own-ui-approval"
import { ToolCallCard } from "./components/ui/own-ui-tool-call"
import { AgentTimeline } from "./components/ui/own-ui-agent-timeline"

export type Settings = { name: string; enabled: boolean }
export type NameControlProps = { value: string; onChange: (value: string) => void; disabled: boolean; error: string }
export function validateName(value: string) { return !value.trim() ? "项目名称不能为空。" : value.trim().length > 40 ? "项目名称最多 40 个字符。" : "" }
function NameControl({ value, onChange, disabled, error }: NameControlProps) { return <UiField label="项目名称" name="name" value={value} onChange={event => onChange(event.target.value)} disabled={disabled} error={error} /> }

// Host composition only: no router, request library or persistence in component source.
export function SettingsPanel({ value, onChange, onSave, canEdit, NameInput = NameControl }: { value: Settings; onChange: (value: Settings) => void; onSave: (value: Settings) => Promise<void>; canEdit: boolean; NameInput?: ComponentType<NameControlProps> }) {
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [pending, setPending] = useState(false)
  const saving = useRef(false)
  async function save() {
    if (!canEdit || saving.current) return
    const invalid = validateName(value.name)
    setError(invalid); setMessage("")
    if (invalid) return
    saving.current = true; setPending(true)
    try { await onSave({ ...value, name: value.name.trim() }); setMessage("设置已保存。") }
    catch { setMessage("保存失败，修改已保留。") }
    finally { saving.current = false; setPending(false) }
  }
  return <form noValidate onSubmit={event => { event.preventDefault(); void save() }}>
    <UiSettingsSection title="项目设置" description="业务校验、权限和保存由宿主负责。">
      <UiSettingsRow title="名称" description="保留输入草稿，保存时去除首尾空白。" controls={<NameInput value={value.name} onChange={name => { onChange({ ...value, name }); setError(""); setMessage("") }} disabled={!canEdit || pending} error={error} />} />
      <UiSettingsRow title="通知" description="保存时一起提交。" controls={<UiSwitch label="项目通知" name="enabled" checked={value.enabled} disabled={!canEdit || pending} onChange={event => onChange({ ...value, enabled: event.target.checked })} />} />
    </UiSettingsSection>
    <UiButton type="submit" busy={pending} disabled={!canEdit}>{pending ? "保存中" : "保存设置"}</UiButton>
    {!canEdit && <UiNotice role="note">只读权限；宿主拒绝写入。</UiNotice>}
    <p role="status">{message}</p>
  </form>
}

function LocalSettingsHost() {
  const [value, setValue] = useState<Settings>({ name: "个人工作台", enabled: true })
  const [saved, setSaved] = useState<Settings | null>(null)
  const [fail, setFail] = useState(false)
  const [canEdit, setCanEdit] = useState(true)
  const permission = useRef(canEdit)
  permission.current = canEdit
  return <><UiCheckboxField label="设置保存失败" checked={fail} onChange={event => setFail(event.target.checked)} /><UiCheckboxField label="允许编辑设置" checked={canEdit} onChange={event => setCanEdit(event.target.checked)} />
    <SettingsPanel value={value} onChange={setValue} canEdit={canEdit} onSave={async next => { await new Promise(resolve => setTimeout(resolve, 400)); if (fail) throw new Error("local failure"); if (!permission.current) throw new Error("read only"); setSaved(next) }} />
    <p>已保存：{saved ? `${saved.name} / ${saved.enabled ? "通知开" : "通知关"}` : "无"}</p>
  </>
}

type Task = { id: string; name: string; status: string; date: string }
const tasks: Task[] = [{ id: "a", name: "整理按钮", status: "ready", date: "2026-10-08" }, { id: "b", name: "检查表单", status: "ready", date: "2026-10-09" }, { id: "c", name: "整理文件", status: "locked", date: "2026-10-10" }]
const columns: ColumnDef<Task, any>[] = [{ accessorKey: "name", header: "任务名称" }, { accessorKey: "status", header: "权限状态" }, { accessorKey: "date", header: "日期" }]
function ManagementHost() {
  const [rows, setRows] = useState(tasks)
  const [filter, setFilter] = useState<UiFilterValue>({ query: "", tags: [], range: { start: "", end: "" } })
  const [sorting, setSorting] = useState<SortingState>([])
  const [selection, setSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 2 })
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState(false)
  const [error, setError] = useState("")
  const processing = useRef(false)
  const visible = rows.filter(row => row.name.includes(filter.query.trim()) && (!filter.tags.length || filter.tags.includes(row.status)) && (!filter.range.start || row.date >= filter.range.start) && (!filter.range.end || row.date <= filter.range.end))
  const selected = Object.keys(selection).filter(id => selection[id])
  async function complete() {
    if (processing.current) return
    const permitted = rows.filter(row => selected.includes(row.id) && row.status === "ready").map(row => row.id)
    if (!permitted.length) return
    processing.current = true; setBusy(true); setError("")
    try { await new Promise(resolve => setTimeout(resolve, 400)); if (fail) throw new Error("local failure"); setRows(previous => previous.filter(row => !permitted.includes(row.id))); setSelection({}); setPagination(previous => ({ ...previous, pageIndex: 0 })) }
    catch { setError("批量处理失败，选择已保留。") }
    finally { processing.current = false; setBusy(false) }
  }
  return <div style={{ display: "grid", gap: 16 }}>
    <UiFilterBar label="任务筛选" value={filter} disabled={busy} tagOptions={[{ value: "ready", label: "可处理" }, { value: "locked", label: "只读" }]} showDateRange onValueChange={next => { setFilter(next); setSelection({}); setPagination(previous => ({ ...previous, pageIndex: 0 })) }} />
    <UiCheckboxField label="列表批量失败" checked={fail} disabled={busy} onChange={event => setFail(event.target.checked)} />
    <UiDataTable caption="项目任务" data={visible} columns={columns} getRowId={row => row.id} getRowLabel={row => row.name} isRowSelectable={row => row.status === "ready"} sorting={sorting} onSortingChange={setSorting} selection={selection} onSelectionChange={setSelection} pagination={pagination} onPaginationChange={setPagination} loading={busy} />
    <UiBatchActionBar count={selected.length} busy={busy} error={error} onClear={() => setSelection({})} actions={<UiButton onClick={() => void complete()}>完成所选任务</UiButton>} />
    <UiButton variant="outline" disabled={busy} onClick={() => { setRows(tasks); setSelection({}); setPagination(previous => ({ ...previous, pageIndex: 0 })); setError("") }}>重置本地任务</UiButton>
    <p role="status">筛选后 {visible.length} 项；翻页保留选择，筛选/重置清空；只读任务拒绝处理。</p>
  </div>
}

function AgentHost() {
  const [messages, setMessages] = useState<string[]>([])
  const [fail, setFail] = useState(false)
  const [approval, setApproval] = useState<"waiting" | "approved" | "rejected">("waiting")
  return <div style={{ display: "grid", gap: 16 }}>
    <UiCheckboxField label="Agent 发送失败" checked={fail} onChange={event => setFail(event.target.checked)} />
    <AgentMessage role="assistant" name="本地助手" content="只有本地回显；审批不会执行命令。" />
    {messages.map((message, index) => <AgentMessage key={index} role="user" name="我" content={message} />)}
    {approval === "waiting" ? <ToolApprovalPanel toolName="读取演示目录" risk="low" description="审批只更新本地状态。" actions={<><UiButton onClick={() => setApproval("approved")}>允许演示</UiButton><UiButton variant="outline" onClick={() => setApproval("rejected")}>拒绝演示</UiButton></>} /> : <UiNotice role="status">审批结果：{approval === "approved" ? "允许" : "拒绝"}</UiNotice>}
    <ToolCallCard name="演示工具" state={approval === "approved" ? "succeeded" : "queued"} summary="未调用文件系统或网络。" />
    <AgentTimeline steps={[{ id: "review", title: "检查审批", state: approval === "waiting" ? "running" : approval === "rejected" ? "failed" : "completed" }]} />
    <AgentPromptComposer onSend={async message => { await new Promise(resolve => setTimeout(resolve, 400)); if (fail) throw new Error("local failure"); setMessages(previous => [...previous, message]) }} />
    <UiButton variant="ghost" onClick={() => setApproval("waiting")}>重置演示审批</UiButton>
  </div>
}

function ComplexSettingsHost() {
  const [value, dispatch] = useReducer((_: Settings, next: Settings) => next, { name: "", enabled: false })
  const [request, reload] = useReducer((count: number) => count + 1, 0)
  const [fail, setFail] = useState(false)
  const [state, setState] = useState("loading")
  useEffect(() => {
    let cancelled = false
    setState("loading")
    // ponytail: local timer simulates one response; replace this host effect with the project's request/cache client.
    const timer = setTimeout(() => { if (cancelled) return; if (fail) setState("error"); else { dispatch({ name: "远端结构的本地映射", enabled: true }); setState("ready") } }, 400)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [request, fail])
  return <><p>同一个 SettingsPanel：useReducer + 异步宿主映射；组件不导入数据服务。</p><UiCheckboxField label="复杂宿主加载失败" checked={fail} onChange={event => setFail(event.target.checked)} /><UiButton variant="outline" onClick={() => reload()}>重新加载模拟数据</UiButton>
    {state === "loading" ? <UiNotice role="status">模拟加载中。</UiNotice> : state === "error" ? <UiNotice role="alert">模拟加载失败，请关闭失败开关并重试。</UiNotice> : <SettingsPanel value={value} onChange={dispatch} canEdit onSave={async next => { await new Promise(resolve => setTimeout(resolve, 400)); dispatch({ name: next.name, enabled: next.enabled }) }} />}
  </>
}

export default function Integration() {
  const [page, setPage] = useState("settings")
  const [dark, setDark] = useState(false)
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light" }, [dark])
  return <main><h1>三类宿主接入 / 本地组合</h1><UiButton variant="outline" onClick={() => setDark(!dark)}>切换接入主题</UiButton>
    <div style={{ display: "grid", gap: 24, marginTop: 24 }}><UiSidebarNav label="接入样例" value={page} onSelect={setPage} items={[{ id: "settings", label: "从零：设置" }, { id: "list", label: "从零：管理列表" }, { id: "agent", label: "从零：Agent" }, { id: "complex", label: "复杂：宿主状态映射" }]} />
      <section aria-label="宿主内容">{page === "settings" ? <LocalSettingsHost /> : page === "list" ? <ManagementHost /> : page === "agent" ? <AgentHost /> : <ComplexSettingsHost />}</section>
    </div>
  </main>
}
