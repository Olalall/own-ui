import { motionEntries } from "./motion-catalog"
import { patternEntries } from "./pattern-catalog"

export type Group = "core" | "agent" | "workspace" | "motion"

export type ComponentEntry = {
  id: string
  name: string
  english: string
  group: Group
  description: string
  tags: string[]
  fit: string
  variants: string
  states: string
  accessibility: string
  dependencies: string
  importPath: string
  reference?: { name: string; url: string }
}

export const componentEntries: ComponentEntry[] = [
  ...patternEntries,
  ...motionEntries,
  {
    id: "settings-section", name: "设置区块", english: "UiSettingsSection / UiSettingsRow", group: "workspace", description: "统一设置标题、说明、右侧控件和补充区域。",
    tags: ["设置", "个人组件", "排版"], fit: "历史工作台中重复出现的设置行；控件的标签和校验仍由控件/宿主负责。", variants: "Section 的 title/description/children；Row 的 title/description/controls/footer。",
    states: "可编辑/禁用由插槽控件决定；窄容器上下排列；不额外套卡片。", accessibility: "有标题的 section；每个控件仍需独立 label；不将标题冒充输入标签。", dependencies: "React；共享 CSS Module。", importPath: "@/components/ui/own-ui-settings-section",
  },
  {
    id: "sidebar-nav", name: "侧栏导航", english: "UiSidebarNav", group: "workspace", description: "展示当前项目入口、数量补充和不可用项。",
    tags: ["侧栏", "导航", "个人组件"], fit: "有限数量的工作台/设置入口；路由、权限判断和树状导航由宿主负责。", variants: "label、唯一 items.id、value/onSelect、meta、disabled 和 footer。",
    states: "当前项、键盘 Tab/Enter、禁用、空列表；不含拖拽或自动持久化。", accessibility: "命名 nav、原生按钮与列表、aria-current；不把页面导航伪装成 tablist。", dependencies: "React；共享 CSS Module。", importPath: "@/components/ui/own-ui-sidebar-nav",
  },
  {
    id: "batch-action-bar", name: "批量操作栏", english: "UiBatchActionBar", group: "workspace", description: "展示选中数量、统一处理动作和失败反馈。",
    tags: ["批量", "选择", "数据"], fit: "列表批量操作；动作权限和真实业务执行由宿主负责。", variants: "count、onClear、actions 插槽、busy、error；零选择隐藏。",
    states: "选择、清除、处理中禁用、失败保留；示例翻页保留/刷新清空/成功清空。", accessibility: "有名称的操作区、状态文本、原生 fieldset 禁用动作、错误播报。", dependencies: "组件仅 React 与反馈；完整表格示例另需 @tanstack/react-table@8.21.3。", importPath: "@/components/ui/own-ui-batch-action-bar",
  },
  {
    id: "data-table", name: "数据表格", english: "UiDataTable", group: "workspace", description: "管理列表的列、排序、行选择与分页。",
    tags: ["表格", "数据", "管理列表"], fit: "普通分页管理列表；首轮不含虚拟化、单元格编辑或复杂数据网格。", variants: "TanStack ColumnDef；稳定 getRowId；sorting/selection/pagination 受控；client/server 模式，server 必须提供 rowCount。",
    states: "排序、跨页选择、选择本页、清除、加载、错误重试、无数据；刷新/筛选后的选择策略由宿主决定。", accessibility: "原生 table/caption/th、aria-sort；勾选有名称和混合状态；窄屏表格内滚动。", dependencies: "React；@tanstack/react-table@8.21.3；分页/反馈组件。", importPath: "@/components/ui/own-ui-data-table",
  },
  {
    id: "filter-bar", name: "筛选工具", english: "UiFilterBar", group: "workspace", description: "组合关键词、标签与日期，并一次清除筛选值。",
    tags: ["搜索", "筛选", "列表"], fit: "文件与管理列表；筛选计算、请求、页码及 URL 由宿主处理。", variants: "受控 {query,tags,range}；可选 tagOptions/showDateRange、disabled。",
    states: "关键词、标签、日期、清除全部、禁用；示例用本地数据实时筛选。", accessibility: "有名称的 search 区域，字段自身有标签；局部浮层主题继承。", dependencies: "React；@base-ui/react@1.8.0；现有字段、多选、日期与工具栏。", importPath: "@/components/ui/own-ui-filter-bar",
  },
  {
    id: "file-upload", name: "文件上传", english: "UiFileUpload", group: "core", description: "选择并校验单个文件，显示上传进度和可重试反馈。",
    tags: ["表单", "文件", "上传"], fit: "单文件上传；请求、鉴权和服务端校验由宿主处理，不含分片或拖放。", variants: "accept、maxBytes、disabled；onUpload(file,{signal,onProgress}) 返回 Promise。",
    states: "未选、类型/大小错误、处理中、成功、失败重试、取消保留；阻止重复请求。", accessibility: "原生文件输入、label、错误关联、进度语义和状态播报；取消按钮可达。", dependencies: "React；UiField / UiButton / UiProgress / UiNotice。", importPath: "@/components/ui/own-ui-file-upload",
  },
  {
    id: "date-range-picker", name: "日期范围", english: "UiDateRangePicker", group: "core", description: "用原生日期输入选择起止日期并校验范围。",
    tags: ["表单", "日期", "筛选"], fit: "日期型区间；显示样式和日历由浏览器提供，不包含时分秒。", variants: "受控 {start,end}，YYYY-MM-DD 字符串；min/max、name、required、disabled、error。",
    states: "起止、空值、清除、禁用、格式/顺序/边界错误；窄屏换行。", accessibility: "fieldset 分组与每项原生 label；错误关联，保留浏览器日期键盘行为。", dependencies: "React；UiField / UiFormGroup / UiButton。", importPath: "@/components/ui/own-ui-date-range-picker",
  },
  {
    id: "form-group", name: "表单分组", english: "UiFormGroup", group: "core", description: "将相关字段放在有标题、说明和错误的分组中。",
    tags: ["表单", "设置", "分组"], fit: "设置页、分步表单；不强制表单或校验库。", variants: "原生 fieldset 属性；title、description、error、children 插槽。",
    states: "正常、整组禁用、错误；提交与校验由宿主处理。", accessibility: "fieldset/legend 原生分组；说明和错误关联；字段自身保留 label。", dependencies: "React；共享 CSS Module。", importPath: "@/components/ui/own-ui-form-group",
  },
  {
    id: "combobox", name: "搜索选择", english: "UiCombobox", group: "core", description: "搜索选项并选择一个稳定标识。",
    tags: ["表单", "搜索", "选择"], fit: "中等规模选项；请求由宿主处理，不包含虚拟化。", variants: "受控 string|null；options、name、required、disabled、loading、error；onSearchChange 用于宿主筛选。",
    states: "搜索、已选、空结果、清空、禁用项、加载、错误。外部筛选保留所选标签由宿主负责。", accessibility: "combobox/listbox/option 语义、方向键与 Enter、label 和错误关联。", dependencies: "React；@base-ui/react@1.8.0；UiButton。", importPath: "@/components/ui/own-ui-combobox",
  },
  {
    id: "multi-select", name: "多选", english: "UiMultiSelect", group: "core", description: "搜索多个选项，显示已选标签并逐项移除。",
    tags: ["表单", "标签", "多选"], fit: "技术标签、成员等多值字段；沿用搜索选择的引擎。", variants: "受控 string[]，其余选项与 UiCombobox 一致；稳定且唯一的 value。",
    states: "搜索、多选、移除、清空、禁用、加载/错误；标签在窄屏换行。", accessibility: "Base UI 多选与 chip 键盘行为，每个移除按钮有名称；支持表单 name。", dependencies: "React；@base-ui/react@1.8.0；共享搜索选择实现。", importPath: "@/components/ui/own-ui-multi-select",
  },
  {
    id: "tooltip", name: "悬浮提示", english: "UiTooltip", group: "core", description: "通过悬浮或键盘焦点补充操作说明。",
    tags: ["提示", "快捷键", "定位"], fit: "简短补充信息；关键内容始终可见，提示不放交互控件。",
    variants: "Provider / Root / Trigger / Content；delay、受控 open、disabled 和 portalContainer。", states: "焦点或悬浮打开，Esc 关闭；禁用提示。",
    accessibility: "按 Base UI 1.8 约定作为视觉补充；触发位置必须有匹配的可访问名称，必要说明保持可见。触屏不依赖提示。", dependencies: "React；@base-ui/react@1.8.0。", importPath: "@/components/ui/own-ui-tooltip",
  },
  {
    id: "tabs", name: "页签", english: "UiTabs", group: "core", description: "在同一上下文切换关联的内容面板。",
    tags: ["切换", "设置", "导航"], fit: "少量相关面板；跨页面导航由宿主路由处理。", variants: "Root / List / Tab / Panel；value/onValueChange、水平/垂直、keepMounted。",
    states: "选中、禁用；默认方向键移动焦点，Enter/Space 激活；可 activateOnFocus。", accessibility: "tablist/tab/tabpanel 关联；方向键跳过禁用项。",
    dependencies: "React；@base-ui/react@1.8.0。", importPath: "@/components/ui/own-ui-tabs",
  },
  {
    id: "switch", name: "开关", english: "UiSwitch", group: "core", description: "显示和改变二选一的设置。",
    tags: ["表单", "设置", "开关"], fit: "启用/关闭的偏好；是否即时保存由宿主决定。", variants: "原生 input 属性、checked/defaultChecked、onChange、name、required、hint。",
    states: "开启、关闭、禁用、必填；原生 FormData 只包含勾选值。", accessibility: "原生 checkbox + switch 语义，label 关联，Space 操作。",
    dependencies: "React；共享 CSS Module。", importPath: "@/components/ui/own-ui-switch",
  },
  {
    id: "radio-group", name: "单选组", english: "UiRadioGroup", group: "core", description: "从互斥选项中选择一个值。",
    tags: ["表单", "设置", "单选"], fit: "少量可见选项，例如密度、保存方式。", variants: "受控 value/onValueChange，name、options、required、disabled、hint/error。",
    states: "已选、未选、禁用、必填、错误；支持原生表单提交。", accessibility: "fieldset/legend 分组与原生 radio；方向键切换，错误关联。",
    dependencies: "React；共享 CSS Module。", importPath: "@/components/ui/own-ui-radio-group",
  },
  {
    id: "toast", name: "临时通知", english: "UiToastHost", group: "core", description: "操作后显示可关闭的临时反馈。",
    tags: ["通知", "反馈", "宿主"], fit: "成功、失败等辅助反馈；重要错误同时留在页面。", variants: "显式 Provider + Host；useUiToast 的 add/close/update/promise；inline/fixed。",
    states: "成功、失败、关闭、数量上限、超时；同 id 更新，timeout=0 保留。", accessibility: "Base UI 播报与通知键盘行为；默认低优先级，每项有关闭按钮。",
    dependencies: "React；@base-ui/react@1.8.0；UiButton。", importPath: "@/components/ui/own-ui-toast",
  },
  {
    id: "alert-dialog", name: "确认框", english: "UiAlertDialog", group: "core",
    description: "确认高影响操作，等待异步结果并保留失败反馈。",
    tags: ["确认", "异步", "危险操作"], fit: "删除、覆盖等需要明确确认的操作；权限仍由宿主判断。",
    variants: "受控 open/onOpenChange 或内部状态；onConfirm 可返回 Promise。",
    states: "取消、确认、处理中、失败保留、成功关闭；处理中防止重复及关闭。",
    accessibility: "alertdialog 标题/说明关联；初始焦点在取消；关闭后返回触发位置。",
    dependencies: "React；@base-ui/react@1.8.0；UiButton。", importPath: "@/components/ui/own-ui-alert-dialog",
  },
  {
    id: "dropdown-menu", name: "操作菜单", english: "UiDropdownMenu", group: "core",
    description: "把一组动作放在可通过键盘操作的菜单中。",
    tags: ["菜单", "操作", "键盘"], fit: "行操作、文件操作等单层动作菜单。",
    variants: "Root/Trigger/Content/Item；受控开关、side/align、portalContainer。",
    states: "打开、关闭、键盘高亮、禁用、动作回调；首轮不封装子菜单。",
    accessibility: "menu/menuitem 语义、方向键导航、Esc 关闭与焦点返回；禁用项不执行。",
    dependencies: "React；@base-ui/react@1.8.0。", importPath: "@/components/ui/own-ui-dropdown-menu",
  },
  {
    id: "popover", name: "浮层", english: "UiPopover", group: "core",
    description: "在触发位置旁展示设置或补充内容。",
    tags: ["浮层", "设置", "定位"], fit: "少量设置、筛选或上下文说明；大量编辑使用对话框。",
    variants: "Root/Trigger/Content/Close；受控开关、side/align、portalContainer。",
    states: "打开、关闭、内容交互、点击外部或 Esc 关闭；定位自动避让。",
    accessibility: "必填标题与弹层关联；关闭按钮始终可达；允许指定初始/返回焦点。",
    dependencies: "React；@base-ui/react@1.8.0；UiButton。", importPath: "@/components/ui/own-ui-popover",
  },
  {
    id: "dialog", name: "对话框", english: "UiDialog", group: "core",
    description: "用于编辑与确认上下文，支持受控开关和嵌套弹层。",
    tags: ["弹层", "编辑", "焦点"], fit: "需要暂时集中注意力的表单或详情。",
    variants: "Root / Trigger / Content / Close；支持局部主题 portalContainer。",
    states: "打开、关闭、受控值、嵌套；焦点限制和返回由 Base UI 管理。",
    accessibility: "必填标题关联 dialog；Esc 关闭、焦点返回；始终提供可聚焦关闭按钮。",
    dependencies: "React；@base-ui/react@1.8.0；UiButton。",
    importPath: "@/components/ui/own-ui-dialog",
  },
  {
    id: "button", name: "按钮", english: "UiButton", group: "core",
    description: "用一致的层级和尺寸表达页面操作。",
    tags: ["操作", "变体", "基础"], fit: "页面动作、表单提交、危险操作。",
    variants: "primary / secondary / outline / ghost / danger；default / compact。",
    states: "正常、hover、focus-visible、disabled、busy。busy 自动禁用并暴露 aria-busy。",
    accessibility: "原生 button；默认 type=button，焦点可见。提交表单时明确指定 type=submit。",
    dependencies: "React；共享 own-ui.module.css。",
    importPath: "@/components/ui/own-ui-button",
  },
  {
    id: "field", name: "单行输入", english: "UiField", group: "core",
    description: "标签、提示和错误状态放在同一个表单契约里。",
    tags: ["表单", "输入", "校验"], fit: "文本、数字、日期等原生 input 类型。",
    variants: "继承 HTML input 属性；hint 与 error 二选一显示。",
    states: "正常、focus-visible、invalid、disabled、required。",
    accessibility: "自动生成 label/id 关联；提示和错误通过 aria-describedby 关联。",
    dependencies: "React；原生 input。",
    importPath: "@/components/ui/own-ui-field",
  },
  {
    id: "textarea", name: "多行输入", english: "UiTextarea", group: "core",
    description: "用于描述、备注和多行文本，保留原生调整高度能力。",
    tags: ["表单", "输入", "多行"], fit: "需要多行编辑但无需富文本工具栏的内容。",
    variants: "继承 HTML textarea 属性；支持 rows、maxLength、placeholder。",
    states: "正常、focus-visible、invalid、disabled；高度可纵向调整。",
    accessibility: "自动关联可见 label；hint/error 通过 aria-describedby 连接。",
    dependencies: "React；原生 textarea。",
    importPath: "@/components/ui/own-ui-textarea",
  },
  {
    id: "select", name: "原生选择框", english: "UiSelect", group: "core",
    description: "把标签、说明与浏览器原生选项行为收在同一外观里。",
    tags: ["表单", "选择", "原生"], fit: "选项数量有限、无需搜索的简单选择。",
    variants: "使用原生 option / optgroup；不伪装成自定义弹层。",
    states: "正常、focus-visible、invalid、disabled。",
    accessibility: "原生 select 与 label 关联，键盘和屏幕阅读器行为由平台提供。",
    dependencies: "React；原生 select。",
    importPath: "@/components/ui/own-ui-select",
  },
  {
    id: "checkbox", name: "勾选项", english: "UiCheckboxField", group: "core",
    description: "选项和说明保持在可点击标签区域中。",
    tags: ["表单", "选择", "偏好"], fit: "独立开关、同意选项和非互斥设置。",
    variants: "继承原生 checkbox 属性；hint 为可选说明。",
    states: "checked、unchecked、disabled、focus-visible。",
    accessibility: "原生 checkbox；整个文字标签可点击，提示通过 aria-describedby 关联。",
    dependencies: "React；原生 checkbox。",
    importPath: "@/components/ui/own-ui-checkbox",
  },
  {
    id: "status-badge", name: "语义状态标记", english: "UiStatusBadge", group: "core",
    description: "用语义色加文字区分状态，避免只靠颜色传达结果。",
    tags: ["状态", "颜色", "基础"], fit: "列表状态、摘要标签和结果标记。",
    variants: "neutral / success / warning / danger / info。",
    states: "纯展示；动态状态应配合 status/live region 选择播报频率。",
    accessibility: "状态文字始终保留；颜色只作辅助信息。",
    dependencies: "React；共享语义色 token。",
    importPath: "@/components/ui/own-ui-status-badge",
  },
  {
    id: "notice", name: "提示条", english: "UiNotice", group: "core",
    description: "为状态说明、操作反馈和风险提醒提供一致容器。",
    tags: ["反馈", "提示", "错误"], fit: "需要在页面流中保留的短消息；瞬时通知用 toast。",
    variants: "neutral / info / success / warning / danger；可加 title。",
    states: "静态提示；danger 默认 role=alert，其余默认 role=status。",
    accessibility: "可用 role 属性覆盖默认播报语义；避免把长篇正文设为 alert。",
    dependencies: "React；共享语义色 token。",
    importPath: "@/components/ui/own-ui-notice",
  },
  {
    id: "progress", name: "进度条", english: "UiProgress", group: "core",
    description: "用原生进度语义展示有明确总量的任务。",
    tags: ["反馈", "进度", "任务"], fit: "文件上传、批处理和有确定范围的任务。",
    variants: "继承 progress 的 value 与 max；省略 value 可表达不确定进度。",
    states: "0 至 max 的进度；标签和百分比同步显示。",
    accessibility: "原生 progress 有可访问名称；调用者提供明确 label。",
    dependencies: "React；原生 progress。",
    importPath: "@/components/ui/own-ui-progress",
  },
  {
    id: "skeleton", name: "骨架占位", english: "UiSkeleton", group: "core",
    description: "内容加载时维持布局轮廓，减少页面跳动。",
    tags: ["加载", "占位", "反馈"], fit: "已知内容形状的短暂加载状态。",
    variants: "通过 className 设置宽度和高度；本组件只负责单个装饰块。",
    states: "仅展示；不提供动画，避免动效覆盖系统减弱动画偏好。",
    accessibility: "aria-hidden；外层应提供合适的加载提示或 aria-busy。",
    dependencies: "React；CSS Module。",
    importPath: "@/components/ui/own-ui-skeleton",
  },
  {
    id: "agent-status", name: "Agent 状态", english: "AgentStatus", group: "agent",
    description: "把任务生命周期映射到固定文字和语义色。",
    tags: ["Agent", "状态", "任务"], fit: "Agent、后台任务和工具执行队列。",
    variants: "queued / running / approval / stopping / completed / failed / cancelled / timed_out；可覆写 labels。",
    states: "覆盖常见任务状态；未知状态需在应用边界归一化。",
    accessibility: "role=status、aria-live=polite；高频流式更新时由宿主控制播报策略。",
    dependencies: "UiStatusBadge 与共享样式。",
    importPath: "@/components/ui/own-ui-agent-status",
  },
  {
    id: "tool-call", name: "工具调用卡片", english: "ToolCallCard", group: "agent",
    description: "呈现工具名称、执行结果和可展开的补充内容。",
    tags: ["Agent", "工具", "结果"], fit: "对话中的单次工具执行或工具摘要。",
    variants: "queued / running / succeeded / failed；summary 与 details 可选。",
    states: "等待、执行、成功、失败；取消和审批需由宿主组合展示。",
    accessibility: "使用 article、标题和文本状态；动态变化需由页面播报策略协调。",
    dependencies: "UiStatusBadge 与共享样式。",
    importPath: "@/components/ui/own-ui-tool-call",
  },
  {
    id: "approval", name: "工具审批面板", english: "ToolApprovalPanel", group: "agent",
    description: "把操作范围、风险级别和宿主提供的审批按钮放在一起。",
    tags: ["Agent", "审批", "风险"], fit: "需要用户确认的外部操作或高影响工具调用。",
    variants: "low / medium / high / critical；details 与 actions 可组合。",
    states: "等待审批展示；授权、拒绝、超时和审计必须由业务层实现。",
    accessibility: "风险同时以文字说明；按钮焦点顺序与危险操作由宿主负责。",
    dependencies: "UiStatusBadge；操作按钮由宿主传入。",
    importPath: "@/components/ui/own-ui-approval",
  },
  {
    id: "agent-message", name: "Agent 消息", english: "AgentMessage", group: "agent",
    description: "统一 user、assistant 和 system 消息的内容与时间戳排布。",
    tags: ["Agent", "对话", "消息"], fit: "非流式或已经整理好的对话消息。",
    variants: "role=user / assistant / system；content 支持 ReactNode。",
    states: "静态展示；流式消息的更新节奏由宿主控制。",
    accessibility: "语义 article 与可见角色名称；调用者传入易懂的纯文本内容。",
    dependencies: "React；共享样式。",
    importPath: "@/components/ui/own-ui-agent-message",
  },
  {
    id: "agent-timeline", name: "任务时间线", english: "AgentTimeline", group: "agent",
    description: "按顺序说明 Agent 执行步骤、状态和结果摘要。",
    tags: ["Agent", "流程", "步骤"], fit: "可分阶段解释的工具执行任务。",
    variants: "每一步提供 id、title、state；description 和 time 可选。",
    states: "pending / running / completed / failed。",
    accessibility: "有序列表保留步骤顺序；状态同时显示文字。",
    dependencies: "React；共享样式。",
    importPath: "@/components/ui/own-ui-agent-timeline",
  },
  {
    id: "agent-composer", name: "Agent 输入栏", english: "AgentPromptComposer", group: "agent",
    description: "提供受控的文本提交入口，发送行为交由调用者处理。",
    tags: ["Agent", "输入", "提交"], fit: "简单单行 / 多行消息输入，不含附件或工具选择。",
    variants: "placeholder、sendLabel、busy；onSend 可返回 Promise，收到 trim 后文本。",
    states: "空内容禁用发送；异步处理中锁定输入；失败保留草稿并提示，成功才清空。",
    accessibility: "可见焦点、关联标签、支持 Enter 发送及 Shift+Enter 换行；跳过 IME 组合中的 Enter。",
    dependencies: "UiButton；React state。",
    importPath: "@/components/ui/own-ui-agent-composer",
  },
  {
    id: "workspace-header", name: "工作区页头", english: "WorkspaceHeader", group: "workspace",
    description: "对齐面包屑、页面标题、说明和页面级操作。",
    tags: ["工作台", "页面", "布局"], fit: "管理页和工具页的主内容区标题。",
    variants: "breadcrumbs、description、actions 可选；title 必填。",
    states: "静态布局；窄屏自动改为纵向排列。",
    accessibility: "主标题使用 h1；面包屑使用 nav 并提供可见名称。",
    dependencies: "React；共享样式。",
    importPath: "@/components/ui/own-ui-workspace-header",
  },
  {
    id: "list-toolbar", name: "列表工具栏", english: "ListToolbar", group: "workspace",
    description: "固定搜索、筛选和列表级动作的排列关系。",
    tags: ["工作台", "搜索", "筛选"], fit: "表格和卡片列表上方的控制区。",
    variants: "search、filters、actions 接受 ReactNode。",
    states: "自动换行；窄屏搜索单独占行。",
    accessibility: "调用者为输入、筛选和操作提供标签及按钮名称。",
    dependencies: "React；复用项目已有搜索与筛选控件。",
    importPath: "@/components/ui/own-ui-list-toolbar",
  },
  {
    id: "workspace-stat", name: "统计卡片", english: "WorkspaceStatCard", group: "workspace",
    description: "把标题、主数值和补充说明按固定层级呈现。",
    tags: ["工作台", "数据", "指标"], fit: "概览页的单项关键指标。",
    variants: "label、value 必填；detail 可选。",
    states: "静态数值；加载态使用 UiSkeleton，错误使用 UiNotice。",
    accessibility: "标题使用文本，不依赖颜色区分变化方向；数值保留可读格式。",
    dependencies: "React；共享样式。",
    importPath: "@/components/ui/own-ui-workspace-stat",
  },
  {
    id: "workspace-empty", name: "列表空状态", english: "WorkspaceEmptyState", group: "workspace",
    description: "在无数据时解释当前状态，并提供一个明确下一步。",
    tags: ["工作台", "空状态", "动作"], fit: "首次使用、搜索无结果和已清空列表。",
    variants: "title 必填；description 和 action 可选。",
    states: "用不同 title / description 区分首次为空与筛选无结果。",
    accessibility: "标题层级为 h2；动作由调用者提供原生可聚焦控件。",
    dependencies: "React；共享样式。",
    importPath: "@/components/ui/own-ui-workspace-empty",
  },
  {
    id: "workspace-pagination", name: "列表分页", english: "WorkspacePagination", group: "workspace",
    description: "提供上一页、当前页和下一页的最小分页控制。",
    tags: ["工作台", "列表", "导航"], fit: "小型列表的简单页码切换。",
    variants: "page、totalPages、onPageChange；页码从 1 开始。",
    states: "首尾页禁用对应方向；零结果禁用两方向；页码越界自动限制。",
    accessibility: "nav 有名称、更新页码使用 aria-live；按钮有可见文字。",
    dependencies: "React；分页数据请求由调用者负责。",
    importPath: "@/components/ui/own-ui-workspace-pagination",
  },
]

export type SourceCategory = "primitives" | "react" | "vue" | "agent" | "catalogs"

export type SourceEntry = {
  id: string
  name: string
  category: SourceCategory
  description: string
  stack: string
  delivery: string
  license: string
  status: string
  fit: string
  caveat: string
  href: string
  repo?: string
  terms?: string
  install?: string
}

export const sourceCategories: Record<SourceCategory, string> = {
  primitives: "交互基元",
  react: "React 完整体系",
  vue: "Vue 完整体系",
  agent: "AI / Agent",
  catalogs: "源码目录与视觉素材",
}

// License labels distinguish verified repository licenses from item-level terms.
export const sourceEntries: SourceEntry[] = [
  { id: "base-ui", name: "Base UI", category: "primitives", description: "面向 React 的无样式、可组合交互基元。", stack: "React", delivery: "runtime 基元", license: "MIT（仓库）", status: "完整体系候选", fit: "新建 React 产品，需要自定皮肤并复用弹层、菜单、选择器等行为。", caveat: "需要自行设计；复杂交互仍需按官方指南组合与验证。", href: "https://base-ui.com/react/overview/about", repo: "https://github.com/mui/base-ui" },
  { id: "radix", name: "Radix Primitives", category: "primitives", description: "带无障碍行为的无样式 React 原语。", stack: "React", delivery: "runtime 基元", license: "MIT（仓库）", status: "现有项目优先沿用", fit: "项目已使用 Radix 或 shadcn/ui，继续封装为自己的 token 和组件。", caveat: "避免同一个项目额外再引入第二套同类基元。", href: "https://www.radix-ui.com/primitives/docs/overview/introduction", repo: "https://github.com/radix-ui/primitives" },
  { id: "react-aria", name: "React Aria Components", category: "primitives", description: "Adobe 提供的可组合无障碍 React 组件。", stack: "React", delivery: "runtime 基元", license: "Apache-2.0（仓库）", status: "无障碍参考 / 候选", fit: "复杂键盘交互、国际化和屏幕阅读器行为要求较高的 React 产品。", caveat: "视觉需自行实现；API 组合方式与其他 primitive 不同。", href: "https://react-aria.adobe.com/", repo: "https://github.com/adobe/react-spectrum" },
  { id: "ark", name: "Ark UI", category: "primitives", description: "由状态机驱动、支持多框架的无样式可访问控件。", stack: "React / Vue / Solid / Svelte", delivery: "runtime 基元", license: "MIT（仓库）", status: "多框架项目候选", fit: "需要跨框架复用组件行为模型的设计系统。", caveat: "仍需分别编写各框架实现与视觉层。", href: "https://ark-ui.com/", repo: "https://github.com/chakra-ui/ark" },
  { id: "ariakit", name: "Ariakit", category: "primitives", description: "可组合、无障碍优先的 React 交互组件。", stack: "React", delivery: "runtime 基元", license: "MIT（包）", status: "基元候选", fit: "需要较低层级、可渐进样式化的菜单、对话框或复合控件。", caveat: "先确认具体控件 API、版本和样式策略。", href: "https://ariakit.org/", repo: "https://github.com/ariakit/ariakit" },
  { id: "headless-ui", name: "Headless UI", category: "primitives", description: "Tailwind Labs 的无样式可访问控件，支持 React 与 Vue。", stack: "React / Vue", delivery: "runtime 基元", license: "MIT（仓库）", status: "Tailwind 项目候选", fit: "已有 Tailwind 体系，希望使用较少的头部控件。", caveat: "控件覆盖与组合方式需按目标场景评估。", href: "https://headlessui.com/", repo: "https://github.com/tailwindlabs/headlessui" },
  { id: "zag", name: "Zag.js", category: "primitives", description: "将复杂控件交互建模为框架无关状态机。", stack: "框架无关核心 + 适配器", delivery: "行为状态机", license: "MIT（仓库）", status: "复杂交互底层", fit: "需要跨框架复用复杂控件状态行为或自研组件库。", caveat: "抽象层低，需要自行构建框架组件和皮肤。", href: "https://zagjs.com/", repo: "https://github.com/chakra-ui/zag" },
  { id: "antd", name: "Ant Design", category: "react", description: "企业产品常用的完整 React 组件体系。", stack: "React", delivery: "完整 runtime", license: "MIT（仓库）", status: "整体方案候选", fit: "从零搭建数据密集、约定统一的管理后台。", caveat: "视觉和组件 API 决策较完整；已上线项目迁移成本高。", href: "https://ant.design/", repo: "https://github.com/ant-design/ant-design" },
  { id: "mui", name: "MUI", category: "react", description: "覆盖广、文档完整的 React 组件体系。", stack: "React", delivery: "完整 runtime", license: "MIT 核心；X 按产品核验", status: "整体方案候选", fit: "需要通用组件、材料设计基础或完整主题系统的 React 应用。", caveat: "MUI X 不同产品许可不同，Data Grid 高级功能逐项核对。", href: "https://mui.com/", repo: "https://github.com/mui/material-ui" },
  { id: "mantine", name: "Mantine", category: "react", description: "组件、hooks、表单和主题能力较全的 React 工具箱。", stack: "React", delivery: "完整 runtime", license: "MIT（仓库）", status: "整体方案候选", fit: "希望一套体系同时覆盖应用控件与常用 hooks。", caveat: "引入主题和依赖体系；与本库源码复制模式差异较大。", href: "https://mantine.dev/", repo: "https://github.com/mantinedev/mantine" },
  { id: "chakra", name: "Chakra UI", category: "react", description: "重视主题与组合 API 的 React 组件系统。", stack: "React", delivery: "完整 runtime", license: "MIT（仓库）", status: "整体方案候选", fit: "新 React 项目，希望用主题 API 构建一致控件。", caveat: "涉及 Emotion、Ark UI 等运行时依赖；先比对现有样式栈。", href: "https://chakra-ui.com/", repo: "https://github.com/chakra-ui/chakra-ui" },
  { id: "heroui", name: "HeroUI", category: "react", description: "基于 React Aria 与 Tailwind CSS v4 的 React 组件体系。", stack: "React", delivery: "完整 runtime", license: "待复核（仓库标记不一致）", status: "新建 React 项目候选", fit: "希望以 Tailwind 为主并需要较完整可访问控件的项目。", caveat: "接入前核实目标包对应的 LICENSE；使用其整体主题和 Tailwind v4 约定，避免与其他体系混搭。", href: "https://heroui.com/", repo: "https://github.com/heroui-inc/heroui" },
  { id: "fluent", name: "Fluent UI React", category: "react", description: "Microsoft Fluent 风格的 React 组件和设计系统实现。", stack: "React", delivery: "完整 runtime", license: "MIT（仓库）", status: "品牌体系候选", fit: "微软生态产品或明确采用 Fluent 视觉语言的产品。", caveat: "产品视觉风格鲜明；不要为个别控件临时叠加。", href: "https://react.fluentui.dev/", repo: "https://github.com/microsoft/fluentui" },
  { id: "carbon", name: "Carbon Design System", category: "react", description: "IBM 的完整设计系统，覆盖组件、模式与规范。", stack: "React / Web Components 等", delivery: "完整设计系统", license: "Apache-2.0（仓库）", status: "企业设计规范参考", fit: "需要详细、稳定且文档化的企业设计标准。", caveat: "概念和视觉体系较完整；移植单个控件不如整套使用一致。", href: "https://carbondesignsystem.com/", repo: "https://github.com/carbon-design-system/carbon" },
  { id: "prime-react", name: "PrimeReact", category: "react", description: "覆盖广泛的 React 组件集，面向应用与数据页面。", stack: "React", delivery: "完整 runtime", license: "MIT 核心；高级项核验", status: "数据页面候选", fit: "需要大量现成控件和数据可视化集成。", caveat: "组件主题、付费模板和附加产品分别核对许可。", href: "https://primereact.org/", repo: "https://github.com/primefaces/primereact" },
  { id: "shadcn", name: "shadcn/ui", category: "react", description: "基于 registry 的源码分发与组件实现集合。", stack: "React / Tailwind", delivery: "复制源码 / registry", license: "MIT（仓库；第三方另查）", status: "本库分发格式参考", fit: "希望审阅后把组件源码带入自己仓库并自行维护。", caveat: "registry 是分发格式；community registry 需审源码、许可和依赖。", href: "https://ui.shadcn.com/docs", repo: "https://github.com/shadcn-ui/ui" },
  { id: "coss", name: "coss/ui", category: "react", description: "基于 Base UI、Tailwind 的可复制 React 组件体系。", stack: "React / Tailwind v4 / Base UI", delivery: "复制源码 / registry", license: "源目录逐项确认", status: "Base UI 生态候选", fit: "选择 Base UI 并希望用现成的一致视觉配方。", caveat: "仓库为多应用结构；复制前确认源文件所在目录和许可。", href: "https://coss.com/ui/", repo: "https://github.com/cosscom/coss" },
  { id: "arco-react", name: "Arco Design React", category: "react", description: "字节跳动开源的企业级 React 组件库。", stack: "React", delivery: "完整 runtime", license: "MIT（仓库）", status: "后台方案候选", fit: "数据后台从零搭建，或需要成套表格、表单和主题能力。", caveat: "视觉与 API 属于完整体系；与 Vue 版仓库分别维护。", href: "https://arco.design/react/docs/start", repo: "https://github.com/arco-design/arco-design" },
  { id: "arco-vue", name: "Arco Design Vue", category: "vue", description: "基于 Arco Design 规范的 Vue 3 企业组件库。", stack: "Vue 3", delivery: "完整 runtime", license: "MIT（仓库）", status: "Vue 后台候选", fit: "从零搭建 Vue 后台，或希望与 Arco React 共享设计规范。", caveat: "组件 API 与 React 版分开；为每个框架单独维护。", href: "https://arco.design/vue/docs/start", repo: "https://github.com/arco-design/arco-design-vue" },
  { id: "element-plus", name: "Element Plus", category: "vue", description: "成熟完整的 Vue 3 组件库和后台产品体系。", stack: "Vue 3", delivery: "完整 runtime", license: "MIT（仓库）", status: "Vue 后台候选", fit: "Vue 管理后台需要成熟控件和广泛文档。", caveat: "已有项目统一外观时可先映射 token，不必整体替换。", href: "https://element-plus.org/", repo: "https://github.com/element-plus/element-plus" },
  { id: "naive", name: "Naive UI", category: "vue", description: "TypeScript 编写、主题可定制的 Vue 3 组件库。", stack: "Vue 3", delivery: "完整 runtime", license: "MIT（仓库）", status: "Vue 项目候选", fit: "希望使用可树摇、支持主题覆盖的 Vue 组件。", caveat: "第三方图形等资产可能有单独许可，逐项检查。", href: "https://www.naiveui.com/", repo: "https://github.com/tusen-ai/naive-ui" },
  { id: "vuetify", name: "Vuetify", category: "vue", description: "Material Design 风格的 Vue 组件与应用框架。", stack: "Vue", delivery: "完整组件 / 应用体系", license: "MIT 核心；付费产品另核", status: "Material 项目候选", fit: "Vue 产品明确采用 Material Design，需要较完整体系。", caveat: "风格和框架集成边界较强，按核心与附加产品分别确认。", href: "https://vuetifyjs.com/", repo: "https://github.com/vuetifyjs/vuetify" },
  { id: "prime-vue", name: "PrimeVue", category: "vue", description: "覆盖大量业务控件的 Vue 组件体系。", stack: "Vue", delivery: "完整 runtime", license: "MIT 核心；高级项核验", status: "Vue 数据页候选", fit: "需要丰富业务控件、主题和数据交互。", caveat: "模板和高级附加功能可能有不同授权。", href: "https://primevue.org/", repo: "https://github.com/primefaces/primevue" },
  { id: "nuxt-ui", name: "Nuxt UI", category: "vue", description: "Nuxt / Vue 产品的组件与应用主题工具集。", stack: "Nuxt / Vue", delivery: "组件 runtime", license: "MIT（仓库）", status: "Nuxt 项目候选", fit: "从零搭建 Nuxt 产品并沿用 Nuxt 生态集成。", caveat: "检查所需 Nuxt、Tailwind 与版本约束。", href: "https://ui.nuxt.com/", repo: "https://github.com/nuxt/ui" },
  { id: "shadcn-vue", name: "shadcn-vue", category: "vue", description: "将 shadcn 的源码所有权模式移植到 Vue。", stack: "Vue / Tailwind / Radix Vue", delivery: "复制源码 / CLI", license: "MIT（仓库）", status: "Vue 源码目录候选", fit: "Vue 项目希望复制源码并按自己的风格维护。", caveat: "适配目标 Vue 组件 API；React 的组件代码不可直接复用。", href: "https://www.shadcn-vue.com/", repo: "https://github.com/unovue/shadcn-vue" },
  { id: "tdesign-vue", name: "TDesign Vue Next", category: "vue", description: "腾讯 TDesign 的 Vue 组件与设计规范实现。", stack: "Vue 3", delivery: "完整 runtime", license: "MIT（仓库）", status: "企业 Vue 体系候选", fit: "需要组件覆盖和较明确的企业产品设计规范。", caveat: "接入时跟随同一版本设计 token 和控件约定。", href: "https://tdesign.tencent.com/vue-next/overview", repo: "https://github.com/Tencent/tdesign-vue-next" },
  { id: "vant", name: "Vant", category: "vue", description: "轻量、可定制并支持主题的 Vue 移动网页组件库。", stack: "Vue 2 / Vue 3 / Nuxt", delivery: "完整 runtime", license: "MIT（仓库）", status: "移动端完整方案", fit: "Vue H5 / 移动网页需要成熟控件、暗色主题与本地化支持。", caveat: "设计为移动产品；桌面后台不要照搬它的尺寸和密度。", href: "https://vant-ui.github.io/vant/", repo: "https://github.com/youzan/vant" },
  { id: "quasar", name: "Quasar", category: "vue", description: "面向 Web、移动、桌面和扩展程序的 Vue 跨平台框架。", stack: "Vue 3", delivery: "UI 框架 / 应用框架", license: "MIT（仓库）", status: "跨平台从零搭建", fit: "希望以 Vue 统一交付 SPA、SSR、PWA、桌面或混合移动应用。", caveat: "范围超出组件库；引入应用框架约定前先确认构建和部署需求。", href: "https://quasar.dev/", repo: "https://github.com/quasarframework/quasar" },
  { id: "ai-elements", name: "Vercel AI Elements", category: "agent", description: "面向 AI 对话的消息、推理、代码和工具展示组件。", stack: "React / Next.js / AI SDK / Tailwind", delivery: "shadcn registry 源码", license: "Apache-2.0（仓库）", status: "匹配技术栈时单项可搬", fit: "采用 Next.js、AI SDK 和 shadcn 变量的 Agent 产品。", caveat: "其他栈需要改造导入、样式与状态连接。", href: "https://ai-sdk.dev/elements/overview", repo: "https://github.com/vercel/ai-elements" },
  { id: "assistant-ui", name: "assistant-ui", category: "agent", description: "完整 React 对话界面、组件、runtime 与状态连接方案。", stack: "React Web / Native / terminal", delivery: "runtime + registry", license: "MIT（仓库）", status: "复杂 Agent 候选", fit: "新建完整对话产品，需要消息状态管理与运行时组合。", caveat: "引入整体 runtime 成本；单个展示卡片不需要整套安装。", href: "https://www.assistant-ui.com/docs/", repo: "https://github.com/assistant-ui/assistant-ui" },
  { id: "beautiful-ui", name: "Beautiful UI", category: "agent", description: "包含推理、流式文本、工具调用和审批的 AI 组件目录。", stack: "React / Tailwind v4 / shadcn registry", delivery: "单项源码 registry", license: "MIT（仓库）", status: "先审单项源码", fit: "快速查看 AI 状态组件样例并逐项复制。", caveat: "部分示例以循环演示为主；改为真实状态前需适配。", href: "https://www.beautifului.dev/", repo: "https://github.com/TurboKach/ai-native-react-components" },
  { id: "prompt-kit", name: "Prompt Kit", category: "agent", description: "AI 对话所需的消息、输入和工具调用组件集合。", stack: "React / Tailwind / shadcn", delivery: "复制源码", license: "MIT（仓库）", status: "候选素材", fit: "需要补齐对话区和 composer 的 React 产品。", caveat: "逐项追踪 shadcn、图标和动效依赖，并映射本库 token。", href: "https://prompt-kit.com/", repo: "https://github.com/ibelick/prompt-kit" },
  { id: "copilotkit", name: "CopilotKit", category: "agent", description: "将应用数据、动作与生成式 UI 接入助手体验的框架。", stack: "React / Next.js", delivery: "应用框架 + UI", license: "MIT 核心；商业功能核验", status: "Agent 产品整合候选", fit: "助手需要访问应用状态并调用受控前端动作。", caveat: "是产品集成层，不只是可搬的样式组件。", href: "https://www.copilotkit.ai/", repo: "https://github.com/CopilotKit/CopilotKit" },
  { id: "kibo", name: "Kibo UI", category: "agent", description: "基于 shadcn 生态的复杂组件和业务展示样例。", stack: "React / shadcn / Tailwind", delivery: "复制源码 / registry", license: "逐文件核对", status: "逐项评估", fit: "寻找高级图表、编辑器、拖放和 AI 相关模式。", caveat: "按具体源码文件核对许可证、依赖和更新状态。", href: "https://www.kibo-ui.com/docs", repo: "https://github.com/shadcnblocks/kibo" },
  { id: "magic-ui", name: "Magic UI", category: "catalogs", description: "面向营销页和产品展示的动效区块与组件。", stack: "React / Tailwind / Motion", delivery: "复制源码", license: "MIT（仓库；素材另查）", status: "视觉参考", fit: "需要官网 hero、动效和展示区块灵感。", caveat: "动效与营销风格不适合默认套进高密度工作台。", href: "https://magicui.design/", repo: "https://github.com/magicuidesign/magicui" },
  { id: "aceternity", name: "Aceternity UI", category: "catalogs", description: "提供 React / Tailwind 视觉效果与营销页面片段。", stack: "React / Tailwind / Motion", delivery: "复制源码", license: "条目条款核对", status: "视觉参考", fit: "寻找鲜明的展示页、特效和落地页区块。", caveat: "逐条检查商业许可与依赖；不是后台组件规范。", href: "https://ui.aceternity.com/" },
  { id: "react-bits", name: "React Bits", category: "catalogs", description: "可复制的 React 动效和视觉组件集合。", stack: "React / CSS / Motion 等", delivery: "复制源码", license: "MIT（仓库）", status: "视觉参考", fit: "快速查找可逐步简化的动效实现。", caveat: "查看实现依赖，减少工具 UI 中不必要的动态效果。", href: "https://reactbits.dev/", repo: "https://github.com/DavidHDev/react-bits" },
  { id: "motion-primitives", name: "Motion Primitives", category: "catalogs", description: "基于 Motion 的 React 动效组件与模式。", stack: "React / Motion / Tailwind", delivery: "复制源码", license: "MIT（仓库）", status: "动效参考", fit: "需要统一转场、布局动画或滚动展示。", caveat: "对减弱动态偏好、性能和键盘交互逐项审核。", href: "https://motion-primitives.com/", repo: "https://github.com/ibelick/motion-primitives" },
  { id: "origin-ui", name: "Origin UI", category: "catalogs", description: "基于 shadcn 风格的表单控件和应用界面示例。", stack: "React / Tailwind / shadcn", delivery: "复制源码", license: "MIT（仓库）", status: "页面与表单参考", fit: "查找登录、设置、表单和后台页面细节。", caveat: "只复制适配项，保持当前项目的 token 与表单行为。", href: "https://originui.com/", repo: "https://github.com/origin-space/originui" },
  { id: "flowbite", name: "Flowbite React", category: "catalogs", description: "基于 Tailwind 的可安装 React 组件库和主题素材。", stack: "React / Tailwind", delivery: "runtime + 可复制片段", license: "MIT 核心；模板另查", status: "组件与页面参考", fit: "Tailwind 项目需要成套现成控件或示例。", caveat: "完整主题与本库风格不同；付费模板按自身许可使用。", href: "https://flowbite-react.com/", repo: "https://github.com/themesberg/flowbite-react" },
  { id: "21st", name: "21st.dev", category: "catalogs", description: "按用途检索多个作者和 registry 的组件发现平台。", stack: "多来源 React / shadcn", delivery: "聚合目录 / 单项安装", license: "逐作者、逐条目核对", status: "检索入口", fit: "先用截图、关键词和作者作品发现组件候选。", caveat: "平台收录不等于统一许可证、代码质量或可商用授权。", href: "https://21st.dev/", terms: "https://docs.21st.dev/terms" },
  { id: "registry-directory", name: "shadcn Registry Directory", category: "catalogs", description: "官方列出的社区 registry 检索入口。", stack: "多来源", delivery: "发现与 registry", license: "第三方逐项核对", status: "官方发现目录", fit: "定位可安装的社区 registry 和设计资源。", caveat: "官方明确第三方内容需安装前审阅，不代表官方质量背书。", href: "https://ui.shadcn.com/docs/directory" },
  { id: "shadcn-io", name: "shadcn.io", category: "catalogs", description: "围绕 shadcn 生态的社区组件和资源目录。", stack: "React / shadcn / 多来源", delivery: "社区目录", license: "逐条核对", status: "社区检索入口", fit: "寻找 AI、SaaS 和后台方向的社区实现。", caveat: "逐条核验作者、来源、依赖、许可和维护情况。", href: "https://www.shadcn.io/" },
  { id: "lobe-ui", name: "Lobe UI", category: "catalogs", description: "LobeHub 开源 AI 产品中的组件与视觉实现。", stack: "React / Ant Design / Emotion 等", delivery: "源码仓库", license: "MIT（仓库；资源另查）", status: "AI 产品参考", fit: "观察 AI 产品中的对话、模型选择与工作区组合。", caveat: "产品代码有自身架构和依赖；优先参考模式而非整包复用。", href: "https://ui.lobehub.com/", repo: "https://github.com/lobehub/lobe-ui" },
]

export type Recipe = {
  id: string
  title: string
  summary: string
  steps: string[]
  architecture: string
  decision: string
  pitfalls: string[]
  stack: string
}

export const recipes: Recipe[] = [
  {
    id: "adopt",
    title: "已有项目：逐步统一或替换",
    summary: "先找重复的视觉问题，再沿用项目现有交互引擎，以小批量组件迁移方式收敛外观。",
    steps: ["盘点现有组件、页面、状态和项目 token。", "把颜色、字号、控件高、圆角、间距映射到 own-ui 语义变量。", "先迁移一个组件家族与一页，保留校验、路由、权限和数据行为。", "截图对照后继续同类页面；只有整体迁移有明确收益时才换完整套件。"],
    architecture: "业务页面 → 项目现有交互引擎 → own-ui 视觉薄封装 / token。",
    decision: "只统一视觉时保留原控件；需要改菜单、弹层行为时，再按组件选 Base UI、Radix、React Aria 或项目已有实现。",
    pitfalls: ["不要在同一页面叠装多套 Select / Dialog / Table。", "不要同时改文案、布局、业务行为，导致差异无法定位。", "迁移结果逐页视觉确认，构建通过不代表设计接受。"],
    stack: "已有 React、Vue 或其他框架；组件代码按对应框架复刻。",
  },
  {
    id: "greenfield",
    title: "从零搭建：先选一条主体系",
    summary: "按产品复杂度选择 copy-paste 源码库、无样式交互基元或完整 UI 系统。",
    steps: ["确定框架、页面类型、目标平台和主题需求。", "选一个主交互引擎：Base UI、Radix、React Aria 或完整组件套件。", "以 own-ui token 定义项目颜色、字体、密度、间距和状态。", "先组合基础控件与 1 个真实业务页，再复制到其他页面。"],
    architecture: "页面 / 业务状态 → own-ui 展示组件 → 单一交互引擎 → 框架与 token。",
    decision: "要快速定制源码用 shadcn registry；要大面积企业控件用 Ant Design、Mantine、Arco 等完整体系；复杂无样式交互只选一个 primitive。",
    pitfalls: ["shadcn registry 是源码交付方式，不是统一运行时包。", "不为所有场景预装 full UI、Radix 和 Base UI。", "状态语义要统一，数据请求和权限留在业务层。"],
    stack: "React + CSS Module 是本库当前已实现的路径；Vue 目录只提供选型入口。",
  },
  {
    id: "complex",
    title: "复杂项目：按边界组合，不强求同一运行时",
    summary: "多框架、多产品模块和 Agent 功能共享稳定 token 与规范，复杂交互由对应子系统的成熟库承担。",
    steps: ["定义跨项目 tokens、状态词典、间距和排版规范。", "按框架为组件做薄适配，不复用错误的框架代码。", "每个产品或子系统指定唯一主交互引擎和表格/编辑器归属。", "借用外部实现前留上游链接、commit、许可证、依赖和本地适配记录。"],
    architecture: "Design tokens / 规范 → React、Vue 等独立实现 → 各模块自己的 UI engine → 业务服务。",
    decision: "复杂表格、树、日历、编辑器和 Agent runtime 优先选成熟专用方案；own-ui 负责共享外观和项目特定模式。",
    pitfalls: ["共享色值和排版，不强行共享 React / Vue 组件 API。", "社区 registry 发现后先审依赖图与许可证，再考虑合入。", "升级上游时固定来源版本并比较 diff，避免丢失本地行为修复。"],
    stack: "多框架 / monorepo / 微前端；每个子项目单独记录。",
  },
]

export const designTokens = [
  { name: "语义色", tokens: ["--own-ui-bg", "--own-ui-fg", "--own-ui-primary", "--own-ui-muted", "--own-ui-border", "--own-ui-ring", "--own-ui-danger", "--own-ui-success", "--own-ui-warning", "--own-ui-info"], description: "组件读语义角色；项目主题提供亮色和暗色映射。" },
  { name: "尺寸与间距", tokens: ["--own-ui-control-height", "--own-ui-space-1", "--own-ui-space-2", "--own-ui-space-3", "--own-ui-space-4", "--own-ui-space-6"], description: "桌面控件基准 40px；窄屏控件提升到 44px。间距以 4px 为步进。" },
  { name: "文字与圆角", tokens: ["--own-ui-font-size-xs", "--own-ui-font-size-sm", "--own-ui-font-size-lg", "--own-ui-radius", "--own-ui-card-radius"], description: "中文默认系统无衬线；状态、金额和技术键值适合使用等宽数字。" },
]
