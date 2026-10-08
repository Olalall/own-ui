"use client"
import { useState } from "react"
import { UiSkeleton } from "../own-ui-skeleton"
import { UiButton } from "../own-ui-button"

export default function SkeletonExample() {
  const [loading, setLoading] = useState(true)
  return <div style={{ display: "grid", gap: 12 }}>
    <UiButton variant="outline" onClick={() => setLoading(!loading)}>切换加载</UiButton>
    <section aria-busy={loading} aria-label="文件列表" style={{ display: "grid", gap: 12 }}>
      {loading ? <><UiSkeleton style={{ height: 22, width: "60%" }} /><UiSkeleton /><UiSkeleton style={{ width: "80%" }} /></> : <p>项目文件已加载。</p>}
    </section>
    <p role="status">{loading ? "正在加载文件…" : "加载完成"}</p>
  </div>
}
