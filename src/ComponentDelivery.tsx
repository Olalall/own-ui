import { useEffect, useState } from "react"

type FileEntry = { target: string; content: string; sha256: string }
type Delivery = {
  id: string; version: string; status: string; source: string; sourceDigest: string
  dependencies: string[]; environments: string[]; files: FileEntry[]; example: string
  installUrl: string; exampleInstallUrl: string; archiveUrl: string
}

export function ComponentDelivery({ id, copyText }: { id: string; copyText: (text: string) => Promise<void> }) {
  const [delivery, setDelivery] = useState<Delivery | null>(null)
  const [error, setError] = useState("")
  const [tab, setTab] = useState<"example" | "source" | "install">("example")
  const [filename, setFilename] = useState("")
  useEffect(() => {
    const controller = new AbortController()
    setDelivery(null)
    setError("")
    setTab("example")
    fetch(`${import.meta.env.BASE_URL}delivery/${id}.json`, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error("未能读取交付文件，请重新生成后重试。")
      return response.json() as Promise<Delivery>
    }).then(result => {
      setDelivery(result)
      setFilename(result.files.find(file => file.target.endsWith(`own-ui-${id}.tsx`))?.target ?? result.files[0].target)
    }).catch(reason => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "读取失败。") })
    return () => controller.abort()
  }, [id])

  if (error) return <p role="alert">{error}</p>
  if (!delivery) return <p role="status">正在读取完整文件…</p>
  const file = delivery.files.find(item => item.target === (tab === "example" ? delivery.example : filename))
  const installUrl = new URL(`${import.meta.env.BASE_URL}r/${id}.json`, window.location.origin).href
  const exampleInstallUrl = new URL(`${import.meta.env.BASE_URL}r/${id}-example.json`, window.location.origin).href
  const command = `pnpm dlx shadcn@4.21.4 add ${installUrl}`
  return <section className="delivery-section" aria-label="组件交付">
    <div className="delivery-summary">
      <strong>v{delivery.version} · {delivery.status}</strong>
      <p>{delivery.environments.length ? delivery.environments.join("；") : "尚未完成独立目标环境验收。"}</p>
      <p>依赖：{delivery.dependencies.join("；")}</p>
      <p>来源：{delivery.source}</p>
    </div>
    <div className="delivery-tabs" aria-label="选择交付内容">
      {([ ["example", "完整示例"], ["source", "完整源码"], ["install", "安装"] ] as const).map(([value, label]) => <button key={value} aria-pressed={tab === value} onClick={() => setTab(value)}>{label}</button>)}
      <a className="copy-button" href={`${import.meta.env.BASE_URL}${delivery.archiveUrl.replace(/^\//, "")}`} download>下载全部文件 · tar.gz</a>
    </div>
    {tab === "install" ? <>
      <div className="code-heading"><span>安装组件</span><button className="copy-button" onClick={() => void copyText(command)}>复制命令</button></div>
      <pre className="code-block"><code>{command}</code></pre>
      <p className="delivery-help">目标项目需启用 CSS Module，并在 components.json 配置 ui 别名。只安装组件不含示例；要同时安装完整示例，使用下面命令。既有文件请先比较改动。</p>
      <pre className="code-block"><code>{`pnpm dlx shadcn@4.21.4 add ${exampleInstallUrl}`}</code></pre>
    </> : <>
      {tab === "source" && <label className="source-selector">文件<select value={filename} onChange={event => setFilename(event.target.value)}>{delivery.files.filter(item => item.target !== delivery.example).map(item => <option key={item.target} value={item.target}>{item.target}</option>)}</select></label>}
      <div className="code-heading"><code className="code-path">{file?.target}</code><button className="copy-button" disabled={!file} onClick={() => file && void copyText(file.content)}>复制当前文件</button></div>
      <pre className="code-block"><code>{file?.content}</code></pre>
      <p className="delivery-help">完整示例包含已定义的状态和本地回调。复制使用需带齐“完整源码”中的所有文件；下载包已包含它们。主题通过 --own-ui-* 映射到项目。</p>
    </>}
  </section>
}
