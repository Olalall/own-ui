"use client"
import { useState } from "react"
import { UiFileUpload } from "../own-ui-file-upload"
import { UiCheckboxField } from "../own-ui-checkbox"
export default function FileUploadExample() {
  const [fail, setFail] = useState(false)
  return <><UiCheckboxField label="模拟上传失败" checked={fail} onChange={event => setFail(event.target.checked)} /><UiFileUpload label="演示文件" accept=".txt,.md" maxBytes={2 * 1024 * 1024} onUpload={async (_file, { signal, onProgress }) => {
    // Local delay only. A real host should pass signal to fetch and validate again on the server.
    for (let value = 20; value <= 100; value += 20) {
      await new Promise<void>((resolve, reject) => {
        const abort = () => { clearTimeout(timer); signal.removeEventListener("abort", abort); reject(new DOMException("Cancelled", "AbortError")) }
        const timer = setTimeout(() => { signal.removeEventListener("abort", abort); resolve() }, 300)
        if (signal.aborted) abort(); else signal.addEventListener("abort", abort, { once: true })
      })
      onProgress(value)
    }
    if (fail) throw new Error("Local demo failure")
  }} /><p>仅模拟上传，不传输文件，不读取文件内容。</p></>
}
