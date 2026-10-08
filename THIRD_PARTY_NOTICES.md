# 第三方来源与许可

own-ui 源码采用根目录的 MIT 许可证。每个组件下载包与 registry 闭包带有 components/ui/LICENSE；复制和再分发时保留它。

## 运行依赖

| 依赖 | 用途 | 许可与源码 |
| --- | --- | --- |
| React / React DOM 19.3.0 | 宿主渲染与交互 | [React MIT License](https://github.com/facebook/react/blob/main/LICENSE) |
| Base UI 1.8.0 | 对话框、选择、折叠等交互基元 | [Base UI MIT License](https://github.com/mui/base-ui/blob/master/LICENSE) |
| TanStack Table 8.21.3 | 数据表格引擎 | [TanStack Table MIT License](https://github.com/TanStack/table/blob/main/LICENSE) |

组件源码从 npm 包导入这些依赖，未把其实现复制进 own-ui 的组件文件。目标项目安装依赖后，应保留相应 npm 包自带的许可与版权。

## 工具

shadcn 4.21.4 用于生成和安装 registry；TypeScript、Vite 与其 React 插件用于开发构建。相关包的许可保留在各自安装包中；源码发布包不包含 node_modules。

## 视觉与交互参考

部分自有组件参考 Beautiful UI、Magic UI、React Bits、Aceternity UI 的公开展示模式；组件详情和 registry/motion-references.json 保留对应链接。own-ui 采用独立 React / CSS Module 实现，未复制这些参考项目的实现源码，不承诺其 API 兼容。

Base UI 对应组件的语义与行为按其官方 API 接入。其他候选来源见 docs/open-source-libraries.md；收录链接不表示其代码或付费模板已纳入 MIT 交付范围。

公开源码包不包含历史项目的控件快照、私人分析或本机记录。
