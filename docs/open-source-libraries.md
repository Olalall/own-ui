# 开源 UI 库与 Registry 参考

调研日期：2026-09-30。用途是给自己的库选基础和找可复用模式，不是给每个项目同时装多套 UI 库。开源不等于风格适合，也不等于某个 community registry 经过生产审计。

仓库保留 **44 条外部来源调研记录**，包含交互基元、完整组件体系、AI / Agent、源码目录与视觉素材；其中也有商业目录和灵感站点，不代表都能直接复制。网页仅展示已适配组件，来源记录保留在文档与 src/catalog.tsx 中。

来源记录使用一致字段：用途简介、技术栈、交付方式、许可状态、接入成熟度、适合场景、接入前核对项、官方主页和源码仓库（如有）。许可状态标为“仓库”只说明上游项目公开了该许可证，不代表每个附属模板、图标、示例或商业功能都相同；`逐项核对` 表示不应直接复制后投入产品。

## 2026-10-08 实际采用的固定版本

| 工具或依赖 | 本轮用途与来源 | 状态 |
| --- | --- | --- |
| shadcn 4.21.4 | [官方 registry 格式](https://ui.shadcn.com/docs/registry/registry-item-json)；build 与本地 add 验证 | 开发/分发工具；69组件+69完整示例+3兼容入口=141条目 |
| Base UI 1.8.0（MIT） | [官方接入](https://base-ui.com/react/overview/quick-start)；对话框、菜单、浮层、提示、页签、通知及搜索选择 | npm依赖按条目安装，未复制其实现源码；Tooltip 是视觉补充，关键提示另行可见 |
| TanStack Table 8.21.3（MIT） | [v8 排序](https://tanstack.com/table/v8/docs/guide/sorting)、[分页](https://tanstack.com/table/v8/docs/guide/pagination) | 普通管理表格；上游9.2.6已核实，未为追新迁移当前API |

这份44条来源目录与69项可交付组件分别统计。来源级许可说明不替代具体文件许可核对。部分视觉与交互参考已做成独立实现与网页操作示例，详见[组件说明](motion-components.md)；卡片保留对应链接。

## 按用途筛选的主要来源

| 需要 | 首选比较 | 用途与边界 |
| --- | --- | --- |
| 自己掌握组件源码和分发 | [shadcn/ui Registry](https://ui.shadcn.com/docs/registry)、[shadcn-vue](https://www.shadcn-vue.com/) | Registry / CLI 是源码分发形式；React 和 Vue 实现彼此不同。适合把 own-ui 代码复制到项目后自行维护。 |
| 复杂但要自定视觉的 React 控件 | [Base UI](https://base-ui.com/react/overview/about)、[Radix](https://www.radix-ui.com/primitives/docs/overview/introduction)、[React Aria](https://react-aria.adobe.com/) | 都能提供交互行为基础；单个应用选一套主要引擎，再包上 own-ui 样式。 |
| React 多框架复用交互 | [Ark UI](https://ark-ui.com/)、[Zag.js](https://zagjs.com/) | 同一项目可有多个框架实现，但 CSS、API 和应用行为仍需按框架落地。 |
| 从零搭建 React 后台 | [Ant Design](https://ant.design/)、[Mantine](https://mantine.dev/)、[Arco Design React](https://arco.design/react/docs/start)、[MUI](https://mui.com/) | 选一个完整体系承担表单、数据页面和基础交互；整套使用通常比逐个组件移植更统一。 |
| 从零搭建 Vue 后台 / 跨端项目 | [Element Plus](https://element-plus.org/)、[Naive UI](https://www.naiveui.com/)、[PrimeVue](https://primevue.org/)、[Arco Design Vue](https://arco.design/vue/docs/start)、[Quasar](https://quasar.dev/) | Vue 应用优先评估原生 Vue 组件体系；Quasar 已扩展为应用框架，先确认是否需要跨端构建。桌面端和移动端页面密度分别评估。 |
| Vue 移动网页 | [Vant](https://vant-ui.github.io/vant/) | 适合 H5 控件；移动端控件尺寸与布局规范不应直接套到桌面后台。 |
| AI 聊天和 Agent 状态 | [assistant-ui](https://www.assistant-ui.com/docs/)、[AI Elements](https://ai-sdk.dev/elements/overview)、[Beautiful UI](https://www.beautifului.dev/)、[Prompt Kit](https://prompt-kit.com/) | 先区分完整 runtime、可单项安装的源码和纯预览素材。审批权限、执行器、数据访问仍由宿主业务提供。 |
| 找区块和视觉样例 | [21st.dev](https://21st.dev/)、[shadcn Registry Directory](https://ui.shadcn.com/docs/directory)、[Magic UI](https://magicui.design/)、[React Bits](https://reactbits.dev/) | 用于查找，不以目录数量作为质量或许可结论；复制前追到作者源码、许可和实际依赖。 |

## 收录状态怎么读

| 调研状态 | 含义 | 可以做什么 |
| --- | --- | --- |
| **已确认许可 / 成熟候选** | 已找到上游仓库或官方许可说明；组件适用性还要结合项目判断。 | 评估引入；保留来源和版本。 |
| **完整体系候选** | 一整套 runtime / tokens / API 设计。 | 新项目比较；不要只摘一半控件混装到另一体系。 |
| **单项候选** | 上游可按需复制或安装源码。 | 单个条目审 diff、依赖、许可、键盘行为和移动端后再决定。 |
| **视觉参考 / 检索入口** | 聚合目录、演示站或营销页素材。 | 看布局或交互思路；须定位具体作者与来源后才谈复制。 |
| **需逐项核对** | 许可、来源、依赖或可维护性不能由目录级信息确认。 | 仅检索，不直接作为可商用源码。 |

网站的“可复制”状态只用于本库自有 React 组件；第三方条目不会显示成已适配或本库所有。

## 三种项目情形的选法

| 情形 | 建议组合 | 原因与边界 |
| --- | --- | --- |
| 已有应用只统一控件和排版 | 项目现有底层 + 本库 `core` | 不为颜色和字号切换 Radix/Base UI、表单、路由或数据层；先统一 token 和薄封装，再逐页验证。 |
| 新建 React Agent / 工具应用 | Base UI + 本库 `agent-ui`，按需参考 SureUI 或 Notra | Base UI 提供无样式 React 基元；本库补个人视觉和 Agent 状态。审批策略仍由应用实现。Notra 适合参考一套 AI 对话产品皮肤，SureUI 的 Base UI 依赖须和项目匹配。 |
| 数据管理 / 管理后台 | 本库 `workspace-ui` + 现有表格；新项目按框架从 Arco 或 Ant Design 二选一 | `workspace-ui` 只统一页头和工具栏。复杂表格留给项目现有方案。要完整后台套件时整套采用一个体系，不要混搭不同库的表单和弹层。 |

## 基础库清单

| 项目 | 类型 | 对你的用途 | 成本 / 注意 |
| --- | --- | --- | --- |
| [shadcn/ui Registry](https://ui.shadcn.com/docs/registry) | 源码分发工具 | 最适合承载“你自己的”组件、token、模板和项目约定；registry 可以从本地代码构建，也可把 GitHub 仓库作为 registry。 | 它是分发方式，不是所有框架共用的运行时组件包；每个条目依然要审源码、依赖、目标路径和许可证。 |
| [Base UI](https://base-ui.com/react/overview/about) | React 无样式组件基元 | 新 React 项目需要自定视觉、但不想自己重做菜单、弹层等键盘和 ARIA 行为时选它。 | 需要自己维护样式和产品外观；已使用其他引擎的项目无需为视觉统一迁移。 |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | React 无样式组件基元 | 继续维护已有 Radix 项目；从现有 primitive 逐个封装到本库。 | 与 Base UI 都是底层行为组件，项目选定一套即可，不要在同一应用里只为统一视觉叠装两套。 |
| [React Aria Components](https://react-aria.adobe.com/) | React 无样式可组合组件 | 作为复杂输入、键盘操作、屏幕阅读器状态的参考；需要强自定义时列入选型。 | 要自行完成视觉层；应用 API 前先检查项目是否适合 React Aria 的组合方式。 |
| [Arco Design](https://github.com/arco-design/arco-design) | 完整 React 组件体系 | 新的数据密集型 React 后台可参考其组件覆盖和主题定制；同组织也维护 Vue 版本。 | 视觉决策更完整、切换成本更高；适合新建或有明确整体换库需求的项目，不是复制单个按钮的首选。 |
| [Ant Design](https://github.com/ant-design/ant-design) | 完整 React 设计系统 | 需要成熟、约定明确的企业级后台和完整文档时比较它。 | 风格和交互约定较强。整套用时一致；和本库混搭时要明确哪些组件及 token 归谁管理。 |
| [Mantine](https://mantine.dev/) | 完整 React 组件与 Hooks | React 产品需要大量现成控件、Hook、主题和 CSS Module/响应式能力时纳入比较。 | React 专用；完整运行时依赖与主题体系比源码复制型组件更重。 |

## 三组方案横向比较

| 组合 | 上游成熟度 | 统一度 / 定制 | 移动端 | 引入成本 | 长期维护风险 |
| --- | --- | --- | --- | --- | --- |
| 已有项目底层 + 本库薄封装 | 使用项目已有组件引擎；本库提供57项React组件与语义token，按项取用 | 统一度高；颜色、字号、尺寸和密度可按项目映射 | 继承当前项目能力；接入页面仍需实测 | 低 | 中：源码复制后比较own-ui更新；复杂条目明确声明引擎依赖 |
| Base UI + 本库 Agent + 可选社区模式 | Base UI 有完整官方组件/无障碍规范；社区条目需单独审查 | 统一度高；Base UI 无预设外观，本库掌握皮肤 | 需要覆盖窄屏、软键盘、长消息和审批操作 | 中 | 中：新增一个 React primitive 层；SureUI 等条目还带自己的依赖与状态契约 |
| Arco / Ant Design / Mantine 完整体系 | 上游组件库成熟，覆盖面广 | 单库内统一度高；视觉和交互约定更强 | 响应式组件不等于业务页已适配；仍需按真实屏幕验证 | 高 | 中：整套主题、组件 API、升级节奏需归同一套体系管理 |

这是按官方文档和已读源码做的架构级定性判断，不是对所有控件、浏览器、版本和项目的生产验收。本库实际复制、安装、构建与浏览器验证范围见 verification.json；窄屏浏览器检查不等于低性能手机实机通过，视觉接受仍由用户审查。

## AI 界面与可复制组件来源

以下是适合继续收录的候选目录。可安装表示上游提供单项源码安装入口，不代表能不改代码直接进入所有项目。

| 来源 | 可收录内容 | 许可证 / 技术条件 | 本库状态 |
| --- | --- | --- | --- |
| [Beautiful UI](https://www.beautifului.dev/) / [源码仓库](https://github.com/TurboKach/ai-native-react-components) | 思考中、流式文本、审批卡、工具状态、任务行、表格、搜索等 Agent 组件。仓库列出 19 个 shadcn registry 条目；网站目录另列 Flowchart 和 Agent Screen，不能把它们算作该仓库当前可安装条目。 | 仓库标 MIT；依赖 Tailwind CSS v4。每个组件可用 shadcn CLI 单独安装，但源码说明所有组件自带循环演示状态；接入业务前要改成受控 props，并接入真实状态。 | **单项可搬**：React + Tailwind v4 项目可按组件搬；本库 React/CSS Module 项目先适配 token 和样式，不整批原样复制。 |
| [Vercel AI Elements](https://github.com/vercel/ai-elements) | 对话、消息、代码块、推理过程等 AI 界面组件，支持 CLI 或 shadcn registry 单项添加。 | Apache-2.0；官方仓库要求 Next.js、AI SDK、shadcn/ui 和 Tailwind CSS 变量模式。 | **单项可搬**：适合符合其技术栈的新 React Agent 项目；不作为旧项目的通用替换底座。 |
| [assistant-ui](https://www.assistant-ui.com/docs/) / [CLI](https://github.com/assistant-ui/assistant-ui/blob/main/packages/cli/README.md) | 完整生产级 React AI 对话、runtime、registry 组件；CLI 可添加组件，也支持 Next.js、React Native、终端模板。 | MIT；有 runtime、状态管理和多项依赖。基础控件提供 Radix / Base UI 变体。 | **完整方案候选**：从零搭建复杂 Agent 对话时评估；只需要一个卡片时不引入全套 runtime。 |
| [Prompt Kit](https://github.com/ibelick/prompt-kit) | AI 聊天常用的消息、输入、工具调用等 React/shadcn 组件。 | MIT；采用 Tailwind 和 shadcn 风格，复制前逐项确认组件依赖。 | **候选**：用于补充对话细节，先在目标项目预览。 |
| [Kibo UI](https://www.kibo-ui.com/docs) / [源码仓库](https://github.com/shadcnblocks/kibo) | 面向 shadcn 的可组合组件与较复杂模式，可用于数据、编辑器和 AI 相关界面。 | 依赖 shadcn CSS 变量和生态。仓库有 `license.md`；复制前按该文件及目标组件依赖核对许可证。 | **候选**：只挑目标项目需要的组件；许可证和依赖确认后再标为可搬。 |
| [21st.dev](https://21st.dev/) | 组件作者与 registry 聚合站，便于按视觉和用途发现案例；平台宣传可检索 12,000+ 组件。 | 聚合内容不等于统一开源；遵守平台条款并逐项检查作者源码、许可证、署名和依赖。 | **仅作检索参考**：不要把站点数量当作可自由复制的开源数量。 |
| [shadcn/ui Registry Directory](https://ui.shadcn.com/docs/directory) | 官方 community registry 目录，CLI 可发现并安装条目。 | 官方明确这些 registry 由第三方维护，要求安装前审阅代码。 | **入口目录**：发现后按上述流程筛选；目录上榜不等于质量或适用性背书。 |
| [Aceternity UI](https://ui.aceternity.com/) | React/Tailwind 页面组件、效果和区块，适合查找视觉灵感及官网部分。 | 与数据工具和 Agent 控件用途不同；部分内容可能有不同授权方式，复制前看条目说明。 | **参考**：优先用于营销页或动效灵感，不作为本库工具 UI 默认风格。 |

**怎样决定直接搬还是适配：** Beautiful UI 的单个组件若项目已满足 Tailwind v4，可用仓库 README 提供的 raw registry 地址按需添加，例如把 `records-table.json` 换成仓库列表中的文件名。AI Elements 只在目标项目符合 Next.js、AI SDK、shadcn 和 Tailwind CSS 变量条件时用其 CLI；assistant-ui 属于完整对话 runtime，按 React Web、React Native 或终端等目标运行环境评估，不当作单个视觉组件引入。其余情况复制到本库前先映射语义 token、移除演示状态、确认无障碍与窄屏行为，再收录适配后的版本。

表中上游来源按 2026-09-30 可访问的默认分支记录，未固定到某个 tag 或 commit。真正安装或复制时要记录所用 tag / commit；Beautiful UI 和 AI Elements 可从 [shadcn CLI](https://ui.shadcn.com/docs/cli) 的 `view`、`--dry-run`、`--diff` 入口先检查文件。

同一模式可保留两个链接：上游地址用于查更新和许可证，本库内的适配实现用于跨项目直接用。这样“能搬”不会等同于把不同依赖、样式和 API 的代码塞进一个无法升级的总包。架构细节见[本库架构与接入规则](architecture.md)。

### 三套可选方案的结论

1. **已有项目：不迁移底层。** 共用规则和视觉交给本库，交互行为继续使用项目原有组件引擎。适用于 React 项目；其他框架先取用文档和 token 规则，再用原生控件实现。
2. **新建 React Agent：Base UI + 本库 Agent 展示件。** 参考 SureUI 的审批状态分类、Notra 的对话结构；不要直接复制带有特定模型品牌的整套界面。
3. **新建数据后台：先选现有框架，再决定本库轻薄组合或完整体系。** React/Vue 项目可比较 Arco；React 管理后台可比较 Ant Design / Mantine。只选一个主体系，复杂表格另按项目数据量和功能选型。

## shadcn/ui 2026-09-29 Registry 变化

[指定 commit `08ab84f7d1952cc1f36055aa8931213a86b01bbd`](https://github.com/shadcn-ui/ui/commit/08ab84f7d1952cc1f36055aa8931213a86b01bbd) 的提交说明为新增 10 个 community registries；改动集中在 registry directory，不是 shadcn 核心组件 API 的改版。这个目录可发现社区项目，但官方文档也要求安装前审查第三方 registry 的文件、依赖和外部 registry 引用，并建议固定 GitHub ref。[GitHub Registry 审查指引](https://ui.shadcn.com/docs/registry/github)

| Registry | 本次筛选结论 |
| --- | --- |
| `@aayurt` | 有 Agent / 工具执行模式思路，但源码检查发现输入错误提示的数据形状不匹配、条件式 `useId` 调用和 `failed` 步骤缺少视觉分支；可以看结构，不放进基础层。 |
| `@balick` | 共享页面区块和容器适合官网/营销页；纵向留白偏宽，不作工具后台默认。 |
| `@notra` | AI 对话组件围绕 ChatGPT、Claude、Gemini 等品牌系列；只参考一个系列，不能拼接几套品牌 token。Composer 还需要应用接好真实发送、停止和附件行为。 |
| `@soldevelo` | 搜索、Workspace、状态、分页有数据管理参考价值；表格条目依赖版本与目标项目确认后再决定，不替换旧表格层。 |
| `@sureui` | 工具审批包含风险等级和确认范围，适合作流程状态参考；它要求 Base UI，接入前确认项目引擎、依赖、许可证及真实审批行为。 |
| `@neobrutal-ui` | 粗边框和错位硬阴影就是它的核心风格；适合作为独立产品皮肤参考，不符合本库默认的克制工具界面方向。 |
| `@stacklyui`、`@watermelon`、`@velora`、`@videocn` | 上次检查时文档站不可用，现有证据不足以判断可维护性和可用范围。先记入待复核名单，不据 registry 目录项数作质量结论。 |

## 来源

- [shadcn/ui：自建 Registry](https://ui.shadcn.com/docs/registry)
- [shadcn/ui：GitHub Registry 及安装前审查](https://ui.shadcn.com/docs/registry/github)
- [shadcn/ui：CLI 的 `--dry-run`、`--diff`、`--view`](https://ui.shadcn.com/docs/cli)
- [Beautiful UI AI-native React Components](https://github.com/TurboKach/ai-native-react-components)
- [Vercel AI Elements](https://github.com/vercel/ai-elements)
- [assistant-ui CLI](https://github.com/assistant-ui/assistant-ui/blob/main/packages/cli/README.md)
- [21st.dev 服务条款](https://docs.21st.dev/terms)
- [Prompt Kit](https://github.com/ibelick/prompt-kit)
- [Base UI：定位与无样式/可组合设计](https://base-ui.com/react/overview/about)
- [Radix：样式与 data-state 指引](https://www.radix-ui.com/primitives/docs/guides/styling)
- [React Aria](https://react-aria.adobe.com/)
- [Arco Design React](https://github.com/arco-design/arco-design)
- [Ant Design](https://github.com/ant-design/ant-design)
- [Mantine](https://mantine.dev/)
