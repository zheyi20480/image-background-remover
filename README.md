# QuickBG - 在线图片背景移除工具

> 🚀 AI 驱动的在线抠图工具，一键移除图片背景，无需安装任何软件。

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)](https://tailwindcss.com/)

## ✨ 功能特性

- 🖼️ **一键抠图** — 上传图片，AI 自动识别并移除背景
- 📐 **滑块对比** — 拖动滑块实时对比原图与抠图效果
- 🎨 **多格式下载** — PNG 透明背景 / JPG 自定义背景色
- 📱 **响应式设计** — 桌面端、平板、手机自适应
- 👤 **用户系统** — 注册登录、额度管理、处理历史
- 💰 **灵活定价** — 免费版 / 专业版 / 企业版三档方案

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Next.js](https://nextjs.org/) | 16 | React 全栈框架（App Router） |
| [React](https://react.dev/) | 19 | UI 组件库 |
| [TypeScript](https://www.typescriptlang.org/) | 5 | 类型安全 |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | 原子化 CSS |
| [Lucide React](https://lucide.dev/) | - | 图标库 |
| [Remove.bg API](https://www.remove.bg/api) | - | AI 抠图服务 |

## 🚀 快速开始

### 前置条件

- Node.js 18+
- Remove.bg API Key（[免费获取](https://www.remove.bg/api)）

### 安装

```bash
git clone https://github.com/zheyi20480/image-background-remover.git
cd image-background-remover
npm install
```

### 配置

```bash
# 创建环境变量文件
cp .env.example .env.local

# 编辑 .env.local，填入你的 API Key
REMOVE_BG_API_KEY=your_api_key_here
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建

```bash
npm run build
npm run start
```

## 📁 项目结构

```
├── app/                # 页面与 API 路由
│   ├── page.tsx       # 首页
│   ├── remove/        # 抠图工具
│   ├── pricing/       # 定价方案
│   ├── login/         # 登录
│   ├── register/      # 注册
│   ├── dashboard/     # 用户仪表盘
│   └── api/           # 后端 API
├── components/         # React 组件
├── lib/               # 工具函数与类型
├── docs/              # 项目文档
└── public/            # 静态资源
```

## 📖 文档

- [需求文档](./docs/REQUIREMENTS.md) — 完整的产品需求与技术规格

## 📄 License

MIT
