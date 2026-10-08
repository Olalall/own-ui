import { AgentMessage } from "../own-ui-agent-message"

export default function AgentMessageExample() {
  return <div style={{ display: "grid", gap: 12 }}>
    <AgentMessage role="user" name="我" timestamp="10:41" content="整理本周项目变更。" />
    <AgentMessage role="assistant" name="助手" timestamp="10:42" content={<p>已完成扫描，找到 3 个可复用入口。内容由宿主提供，不在组件内转换 HTML 或 Markdown。</p>} />
    <AgentMessage role="system" name="系统" content="此处使用本地演示数据。" />
  </div>
}
