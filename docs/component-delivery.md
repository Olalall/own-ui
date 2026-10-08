# 组件交付

当前版本：0.3.0。维护 69 个组件、69 份完整示例，另有 3 个原有兼容入口，共 141 个 registry 条目。

## 文件与来源

| 内容 | 源文件或生成位置 |
| --- | --- |
| 组件实现、示例、局部样式与主题 | registry/ui/ |
| 组件元数据 | src/catalog.tsx、motion-catalog.ts、pattern-catalog.ts |
| 分发清单 | registry/items.mjs |
| 参考链接 | registry/motion-references.json |
| 完整交付 JSON | public/delivery/ |
| shadcn registry | public/r/ |
| 组件下载包 | public/downloads/ |
| 按源码摘要匹配的验证记录 | docs/verification.json |

后三个 public 目录和 registry.json、delivery-index.json 由构建生成。维护源文件后重新构建；不手改生成结果。

## 完整复制

每个组件递归收集静态相对 import 和 CSS @import，带齐所需文件、主题、工具函数和 MIT 许可证。完整示例条目再加入状态与本地回调；它能独立编译，不依赖展示站。

网页的源码、交付 JSON、tar.gz、registry 和官方 CLI 安装结果进行逐文件比对。Vite 的 rsc=false 安装可能由 shadcn 移除顶层 use client 指令，此项属于已记录的 CLI 转换；其余正文保持一致。

解析器限定已维护源码中的静态 import；扩展为动态路径或其他语法时需升级收集规则。文件必须位于 registry/ui，不接受任意外部路径。

## 验证证据

验证信息和完整交付的 SHA-256 摘要绑定；源码或依赖闭包变化后，旧证据不会自动标为当前版本已验证。

公共验证包含展示站构建、Vite 完整复制、Vite 官方 CLI 安装、Next.js 生产构建与 SSR、数值边界、转义、旧导出、目录一致性、许可证和公开文件范围。可见操作由浏览器逐批检查，覆盖本批新增内容、390px、减少动态与深浅主题。

历史项目的私有材料与本机运行记录保留在本地，未进入公开源码。历史批次结果不表示所有浏览器、全部旧项目或真实桌面宿主已验证。实际结果详见 [验证记录](verification.json) 与 [发布说明](release-0.3.0.md)。

## 更新策略

按需复制到目标项目后，由目标项目维护代码。更新时比较组件及共享依赖文件，再执行目标项目相关检查。安装条目不携带业务服务、路由、鉴权或持久化策略。

公开源码包通过 release:prepare 显式收集公共文件；新建导出目录，保留已有导出。CI 与 Pages 配置随源码交付；只有实际运行成功才记录相应结果。
