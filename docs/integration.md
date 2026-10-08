# 接入说明

## 从零开始

1. 目标项目启用 React、TypeScript 和 CSS Module。
2. 下载某个组件的全部文件，复制 `components/ui/`，保留 LICENSE。
3. 安装详情中列出的直接依赖；宿主提供 React/React DOM。
4. 引用完整示例确认接入，再替换为实际数据与回调。
5. 用 `--own-ui-*` 映射项目主题。

完整设置、列表与 Agent 接入演示的源文件是 `verification/hosts/Integration.tsx`，生成验证工程后可在其 `/integration` 页面运行。

## 官方 CLI

`components.json` 的核心设置：

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": { "config": "", "css": "src/host.css", "baseColor": "neutral", "cssVariables": true },
  "aliases": { "components": "@/components", "ui": "@/components/ui", "utils": "@/lib/utils", "lib": "@/lib", "hooks": "@/hooks" }
}
```

目标项目的 `@` 别名需要指向实际源文件目录。Next.js 使用 `rsc: true`。此配置满足 CLI 解析要求，own-ui 的运行样式不依赖 Tailwind。

```sh
pnpm dlx shadcn@4.21.4 add http://127.0.0.1:5173/r/command-menu-example.json
```

条目声明 Base UI / TanStack 的固定版本；安装后在目标 package.json 核对直接依赖。已有同名文件先比较改动，勿对真实项目无条件使用 --overwrite。

## 已有项目

先把当前控件的契约写清楚：

| 现有能力 | 接入处理 |
| --- | --- |
| value 与更新事件 | 保留原来的状态来源，映射为受控 props |
| error / hint / required | 保留字段关联与原有校验 |
| disabled / permission | 权限判断留在业务层，组件显示对应状态 |
| ref / focus / submit | 按实际调用者逐项核对 |
| loading / retry / cancel | 保留异步结果、错误与草稿 |
| 路由、存储、桌面桥接 | 项目适配层处理 |

先替换一个字段或一个区域，检查主题、焦点、键盘、草稿与业务动作。需要回退时恢复原组件，业务状态仍由项目管理。

## 多套 UI 共存

限定新组件使用的模块；全局样式只映射主题变量，局部样式由 CSS Module 隔离。对话框、菜单等 portal 默认挂到页面根部；局部主题需要覆盖 portal 容器或在根部提供相同变量。

不要为每个库同时新增全局 reset。共享字体与主题语义，逐步统一基础交互。复杂数据转换放在项目层，组件只接受明确数据与回调。

## Next.js

交互文件保留 `"use client"`；静态组件可在服务端页面使用。由客户端宿主管理事件和状态。浏览器 API 仅在事件或 effect 中使用，首屏输出保持确定。

## 本地验证

```sh
pnpm verify:release
pnpm --dir verification/vite-copy dev
pnpm --dir verification/next-copy dev
```

Vite 复制、Vite CLI 和 Next.js 工程由脚本生成，不依赖展示站源码或根工程的组件文件。完整目录验证会一次导入所有组件；实际产品应按需导入。
