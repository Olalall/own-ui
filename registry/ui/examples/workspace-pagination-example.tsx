"use client"
import { useState } from "react"
import { WorkspacePagination } from "../own-ui-workspace-pagination"
import { UiCheckboxField } from "../own-ui-checkbox"

export default function WorkspacePaginationExample() {
  const [page, setPage] = useState(1)
  const [empty, setEmpty] = useState(false)
  return <div style={{ display: "grid", gap: 12 }}>
    <UiCheckboxField label="模拟零结果" checked={empty} onChange={event => { setEmpty(event.target.checked); setPage(1) }} />
    <WorkspacePagination page={page} totalPages={empty ? 0 : 8} onPageChange={setPage} />
  </div>
}
