"use client"

import * as React from "react"
import styles from "./own-ui.module.css"

export interface WorkspacePaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function WorkspacePagination({ page, totalPages, onPageChange, className, ...props }: WorkspacePaginationProps) {
  const pageCount = Number.isFinite(totalPages) ? Math.max(0, Math.floor(totalPages)) : 0
  const currentPage = pageCount === 0 ? 0 : Math.min(pageCount, Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1)
  return (
    <nav {...props} className={[styles.pagination, className].filter(Boolean).join(" ")} aria-label={props["aria-label"] ?? "分页"}>
      <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>上一页</button>
      <span aria-live="polite">{pageCount === 0 ? "无结果" : `第 ${currentPage} / ${pageCount} 页`}</span>
      <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= pageCount}>下一页</button>
    </nav>
  )
}
