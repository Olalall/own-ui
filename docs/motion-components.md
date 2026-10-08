# 动效与参考组件 / 2026-10-08

首批增加8个动效组件，续增10个，本版增加轨道与文字划线；当前动效共20项、全目录69项。网页分类提供完整操作示例；卡片与详情附参考链接，也可以搜索 Beautiful UI、Magic UI、React Bits 或 Aceternity UI。

## 已落地内容

| 组件 | 动效与操作 | 参考 |
| --- | --- | --- |
| UiThinkingIndicator | 轨道旋转、图标呼吸、文字流光；可完成/重新思考 | [Beautiful UI](https://www.beautifului.dev/) 的 Thinking |
| UiStreamingText | 新文字从模糊中显现、生成光标；可暂停/继续/重新生成 | [Beautiful UI](https://www.beautifului.dev/) 的 Streaming Text |
| UiReasoningPanel | 受控展开、步骤入场、进行中图标；可推进/重新开始 | [Beautiful UI](https://www.beautifului.dev/) 的可展开处理摘要 |
| UiAnimatedNumber | 从当前数值过渡到目标值，支持连续更新 | [Magic UI Number Ticker](https://magicui.design/docs/components/number-ticker) |
| UiShimmerText | 文字流光，可播放/暂停 | [Magic UI Animated Shiny Text](https://magicui.design/docs/components/animated-shiny-text) |
| UiBorderBeam | 光束沿边框流动，可播放/暂停 | [Magic UI Border Beam](https://magicui.design/docs/components/border-beam) |
| UiSpotlightCard | 指针光斑、键盘焦点高亮、触摸静态展示 | [React Bits Spotlight Card](https://reactbits.dev/components/spotlight-card) |
| UiAnimatedList | 顺序入场、追加、清空；演示保留最近3项 | [Magic UI Animated List](https://magicui.design/docs/components/animated-list) |
| UiShineButton | 细光扫过按钮；沿用UiButton回调、ref、busy/disabled和原生提交语义 | [Magic UI Shiny Button](https://magicui.design/docs/components/shiny-button) |
| UiRippleButton | 鼠标点击位置、键盘中心涟漪；单次400ms，可连续操作 | [Magic UI Ripple Button](https://magicui.design/docs/components/ripple-button) |
| UiGradientText | 主题渐变文字，可播放/暂停 | [Magic UI Animated Gradient Text](https://magicui.design/docs/components/animated-gradient-text) |
| UiRotatingText | text更新时300ms入场；示例可轮换、暂停、手动切换 | [React Bits Rotating Text](https://reactbits.dev/text-animations/rotating-text) |
| UiBlurReveal | visible受控显现/隐藏，保留位置，隐藏内容inert | [React Bits Blur Text](https://reactbits.dev/text-animations/blur-text) 的模糊显现模式 |
| UiTiltCard | 指针轻微倾斜、离开回正、停用、键盘静态高亮 | [React Bits Tilted Card](https://reactbits.dev/components/tilted-card) |
| UiMarquee | 连续滚动、悬浮/聚焦暂停，停用与减少动态时全部静态展示 | [Magic UI Marquee](https://magicui.design/docs/components/marquee) |
| UiCompareSlider | 受控0—100分界线、方向键/Home/End、禁用、重置 | [Aceternity UI Compare](https://ui.aceternity.com/components/compare) |
| UiDock | 图标放大、相邻响应、焦点名称、受控选中、禁用/空列表 | [Magic UI Dock](https://magicui.design/docs/components/dock) |
| UiMeteorCard | 8道确定位置的CSS光线，播放/暂停和内容插槽 | [Magic UI Meteors](https://magicui.design/docs/components/meteors) |
| UiOrbitDisplay | 缓慢环绕、悬浮/受控暂停；2—8项环绕，其余静态排列 | [Magic UI Orbiting Circles](https://magicui.design/docs/components/orbiting-circles) |
| UiTextHighlight | 单次划线、隐藏与重播；原生mark语义 | [Magic UI Highlighter](https://magicui.design/docs/components/highlighter) |

本版还有终端日志、头像组、环形进度与轮播，参考 Magic UI / Aceternity UI 对应模式，分别归入基础与工作台分类。折叠面板采用 [Base UI Accordion](https://base-ui.com/react/components/accordion) 的官方 API。每项参考见网页详情与 registry/motion-references.json。

这些是 own-ui 的独立 React / CSS Module 实现，参考上述视觉与交互模式，未复制第三方源码。没有新增动画运行时、Tailwind 或业务请求依赖。参考与自有源码分别标识；其他来源目录仍是候选资料，不计入可复制组件数。

Beautiful UI 首批检查固定到 [05dab2d2b5f1f3e40029776e339a486d70491079](https://github.com/TurboKach/ai-native-react-components/tree/05dab2d2b5f1f3e40029776e339a486d70491079)，读取了 components/thinking.tsx、streaming-text.tsx、task-rows.tsx 与 LICENSE。上游使用内置演示序列和 Tailwind；本库组件接受实际 props，定时演示放在 examples 中。Magic UI、React Bits 和 Aceternity UI 参考的是对应官方组件页面，不承诺第三方API兼容。

## 接入

沿用详情中的“完整源码 / 下载全部文件 / 安装”：每项带齐本地依赖文件、CSS Module 和主题变量。组件条目与完整示例条目分别安装。覆盖已有文件前比较源码；网络、数据、真实任务状态与权限由项目提供。

- Thinking：传入 active / label / description。
- Streaming：把当前已收到的纯文本传入 text，用 streaming 表示是否仍在生成；组件不发请求。
- Reasoning：传入稳定 steps.id 与受控 open/onOpenChange，只展示可公开的处理摘要。
- Number：value 非有限数字回退为0；decimals 限定0—6；duration 限定0—2000ms；卸载取消动画。
- List：调用方提供稳定且唯一的 items.id；组件只负责入场，删除立即完成。
- 所有 CSS 动效支持 prefers-reduced-motion；数字组件同时检查系统偏好；触摸输入不追光。
- Shine/Ripple：沿用UiButton属性；波纹只负责点击反馈，回调照常执行。减少动态时不创建波纹；不使用额外定时器。
- Rotating：传入当前text，不内置自动轮换；示例1800ms轮换，可暂停，卸载清理计时器，减少动态时停止自动轮换。
- Blur：visible控制显现，隐藏不折叠布局；需要折叠的内容继续使用已有推理面板等组件。
- Tilt：active控制倾斜；外层测量、内层变换，角度限制±6度；触摸保持静态，减少动态不旋转。
- Marquee：items使用稳定唯一id；重复层inert/aria-hidden；适合短展示项。默认22秒循环，可通过active停用；停用和减少动态时换行展示全部内容。
- Compare：before/after仅放静态图文，两个视觉层inert/aria-hidden；无障碍说明放在label/beforeLabel/afterLabel中。value非有限数回退50，其余限制0—100。组件不监听全局拖拽，使用原生range，支持触摸与键盘。
- Dock：少量入口、稳定唯一id；受控value/onSelect；路由和权限留在宿主。列表可换行，不包含桌面窗口管理或拖拽排序。
- Meteor：固定8道确定位置的CSS装饰，SSR与客户端一致；active暂停，减少动态时隐藏装饰。

## 验证边界

历史47项与57项版本运行过主站构建、Vite完整复制与CLI安装构建、Next.js生产构建/SSR、交付一致性和边界断言；浏览器检查新增批次的交互、390px、白色画布与减少动态。本版的实际范围见[发布说明](release-0.3.0.md)与[验证记录](verification.json)。

未进行低性能手机实机测量或Firefox/Safari检查；不承诺第三方API兼容。WebGL/复杂粒子、付费模板与其他未适配来源仍未收录。验证宿主一次导入全目录会产生大块提示；实际主站按示例分块，宿主项目应按需复制和导入。
