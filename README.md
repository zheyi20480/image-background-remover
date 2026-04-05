# QuickBG - 在线图片背景移除工具

一个基于 Next.js 构建的在线图片背景移除工具，使用 Remove.bg API 实现 AI 智能抠图。

## ✨ 功能特性

- 🖼️ **拖拽上传** - 支持拖拽或点击上传图片
- 🤖 **AI 智能抠图** - 基于 Remove.bg API，秒级完成背景移除
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🔍 **前后对比** - 滑块式对比，直观查看处理效果
- ⬇️ **一键下载** - 直接下载透明背景 PNG 图片
- 🎨 **现代 UI** - 简洁专业的界面设计
- 📋 **格式支持** - 支持 JPG、PNG、WebP 格式

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **API**: Remove.bg API
- **部署**: Vercel

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件，填入你的 Remove.bg API Key：

```env
REMOVE_BG_API_KEY=your_api_key_here
```

> 获取 API Key: [https://www.remove.bg/api](https://www.remove.bg/api)

### 3. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📁 项目结构

```
src/
├── app/
│   ├── layout.tsx          # 全局布局 + SEO Meta
│   ├── page.tsx            # 首页（主功能页面）
│   ├── globals.css         # 全局样式 + Tailwind
│   └── api/
│       └── remove-bg/
│           └── route.ts    # Remove.bg API 代理路由
├── components/
│   ├── Header.tsx          # 顶部导航
│   ├── Hero.tsx            # 首页英雄区域
│   ├── UploadZone.tsx      # 图片上传（拖拽+点击）
│   ├── ImagePreview.tsx    # 图片预览组件
│   ├── BeforeAfterSlider.tsx # 前后对比滑块
│   ├── ProcessButton.tsx   # 处理按钮
│   ├── DownloadButton.tsx  # 下载按钮
│   └── Footer.tsx          # 页脚
└── types/
    └── index.ts            # TypeScript 类型定义
```

## 🔑 环境变量

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `REMOVE_BG_API_KEY` | Remove.bg API 密钥 | ✅ |

## 🚢 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 在环境变量中配置 `REMOVE_BG_API_KEY`
4. 点击部署

```bash
# 或使用 Vercel CLI
npm i -g vercel
vercel
```

## 📝 License

MIT
