"use client"
import { useEffect, useRef, useState } from "react"
import { UiField } from "./own-ui-field"
import { UiButton } from "./own-ui-button"
import { UiProgress } from "./own-ui-progress"
import { UiNotice } from "./own-ui-notice"
import styles from "./own-ui.module.css"

export function validateUploadFile(file: Pick<File, "name" | "size" | "type">, accept: string, maxBytes: number): string | undefined {
  if (!Number.isFinite(maxBytes) || maxBytes <= 0) return "文件大小上限配置无效。"
  if (!Number.isFinite(file.size) || file.size < 0 || file.size > maxBytes) return "文件超过大小上限。"
  const allowed = accept.toLowerCase().split(",").map(value => value.trim()).filter(Boolean)
  if (allowed.length && !allowed.some(value => value.startsWith(".") ? file.name.toLowerCase().endsWith(value) : value.endsWith("/*") ? file.type.toLowerCase().startsWith(value.slice(0, -1)) : file.type.toLowerCase() === value)) return "文件类型不受支持。"
}
export interface UiFileUploadProps {
  label: string; accept?: string; maxBytes?: number; disabled?: boolean
  onUpload: (file: File, context: { signal: AbortSignal; onProgress: (value: number) => void }) => Promise<void>
}
export function UiFileUpload({ label, accept = "", maxBytes = 10 * 1024 * 1024, disabled, onUpload }: UiFileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<"idle" | "uploading" | "succeeded" | "failed" | "cancelled">("idle")
  const [progress, setProgress] = useState<number | undefined>()
  const [error, setError] = useState("")
  const request = useRef<AbortController | null>(null)
  const input = useRef<HTMLInputElement>(null)
  const cancelButton = useRef<HTMLButtonElement>(null)
  const uploadButton = useRef<HTMLButtonElement>(null)
  const wasPending = useRef(false)
  useEffect(() => () => { request.current?.abort(); request.current = null }, [])
  const validation = file ? validateUploadFile(file, accept, maxBytes) : undefined
  const pending = state === "uploading"
  useEffect(() => {
    if (pending) cancelButton.current?.focus()
    else if (wasPending.current && document.activeElement === document.body) uploadButton.current?.focus()
    wasPending.current = pending
  }, [pending])
  async function upload() {
    if (!file || disabled || validation || request.current) return
    const controller = new AbortController()
    request.current = controller
    setState("uploading"); setProgress(undefined); setError("")
    try {
      await onUpload(file, { signal: controller.signal, onProgress: value => { if (request.current === controller && !controller.signal.aborted) setProgress(value) } })
      if (request.current === controller) { setState("succeeded"); setProgress(100) }
    } catch {
      if (request.current === controller) {
        setState(controller.signal.aborted ? "cancelled" : "failed")
        if (!controller.signal.aborted) setError("上传失败，文件已保留，可重试。")
      }
    } finally { if (request.current === controller) request.current = null }
  }
  function cancel() { request.current?.abort(); request.current = null; setState("cancelled"); setError("") }
  return <div className={styles.field}>
    <UiField ref={input} label={label} type="file" accept={accept || undefined} disabled={disabled || pending} hint={`单文件；最多 ${(maxBytes / 1024 / 1024).toFixed(1)} MB。${accept ? `允许：${accept}` : ""}`} error={validation} onChange={event => {
      const chosen = event.target.files?.[0]
      if (chosen) { setFile(chosen); setState("idle"); setError(""); setProgress(undefined) }
    }} />
    {file && <p className={styles.panel_copy}>已选：{file.name}（{(file.size / 1024).toFixed(1)} KB）</p>}
    {pending && <UiProgress label="文件上传进度" value={progress} />}
    {error && <UiNotice tone="danger" role="alert">{error}</UiNotice>}
    <div className={styles.list_actions}>
      <UiButton ref={uploadButton} busy={pending} disabled={disabled || !file || Boolean(validation)} onClick={() => void upload()}>{pending ? "正在上传" : state === "failed" || state === "cancelled" ? "重试上传" : "上传文件"}</UiButton>
      {pending ? <UiButton ref={cancelButton} variant="outline" onClick={cancel}>取消上传</UiButton> : <UiButton variant="ghost" disabled={disabled || !file} onClick={() => { setFile(null); setState("idle"); setError(""); if (input.current) input.current.value = "" }}>清除文件</UiButton>}
    </div>
    <p role="status" className={styles.panel_hint}>{state === "succeeded" ? "上传完成。" : state === "cancelled" ? "已取消上传，文件已保留。" : state === "uploading" ? "正在上传…" : "真实上传由宿主提供。"}</p>
  </div>
}
