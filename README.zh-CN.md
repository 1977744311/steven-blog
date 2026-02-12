# Steven Blog

一个使用 Next.js 和 Notion 作为 CMS 构建的现代博客。基于 [thegesturs/notion-blogs](https://github.com/thegesturs/notion-blogs) 改造，增强了 UI 和功能。

## 新增功能

- **分页** — 首页每页展示 6 篇文章，支持 URL 分页导航（`/?page=2`）
- **搜索** — `Cmd+K` / `Ctrl+K` 打开搜索框，支持按标题、描述、标签、分类筛选
- **吸顶导航栏** — 毛玻璃效果，集成搜索按钮和暗色模式切换
- **卡片优化** — 无封面图时显示渐变色占位，卡片高度统一
- **增强 Footer** — 博客信息 + 回到顶部按钮
- **部署按钮** — 一键触发 Vercel 部署，支持密钥验证

## 技术栈

- **框架**: Next.js 15 (App Router)
- **CMS**: Notion
- **样式**: Tailwind CSS v4 + shadcn/ui
- **主题**: next-themes（明/暗模式）

## 快速开始

### 环境要求

- Node.js 18.17+
- pnpm
- Notion 账号

### 1. 克隆 & 安装

```bash
git clone git@github.com:1977744311/steven-blog.git
cd steven-blog
pnpm install
```

### 2. 配置 Notion

1. 复制此 [Notion 模板](https://exclusive-gatsby-850.notion.site/20a186dad999800dbb94f239f907215d?v=20a186dad99980228480000c8707478c&source=github) 到你的工作区
2. 创建 [Notion 集成](https://www.notion.so/my-integrations)，勾选"读取内容"权限
3. 在数据库页面中连接该集成

### 3. 环境变量

创建 `.env.local`：

```env
NOTION_TOKEN=你的集成token
NOTION_DATABASE_ID=你的数据库ID
NEXT_PUBLIC_SITE_URL=https://your-site.com
VERCEL_DEPLOY_HOOK=你的Vercel部署钩子URL
DEPLOY_SECRET=你的部署密钥
```

### 4. 启动

```bash
pnpm dev
```

访问 `http://localhost:3000`。

## 数据库属性

| 属性 | 类型 | 必填 |
|---|---|---|
| Title | 标题 | 是 |
| Status | 状态（Published/Draft） | 是 |
| Published Date | 日期 | 是 |
| Author | 人员 | 否 |
| Tags | 多选 | 否 |
| Category | 单选 | 否 |
| Featured Image | 文件 | 否 |

## 项目结构

```
src/
├── app/
│   ├── page.tsx              # 首页（含分页）
│   ├── posts/[slug]/page.tsx # 文章详情页
│   └── api/deploy/route.ts   # 部署 API
├── components/
│   ├── navbar.tsx            # 吸顶导航栏（含搜索）
│   ├── search-dialog.tsx     # Cmd+K 搜索框
│   ├── post-card.tsx         # 文章卡片
│   ├── post-pagination.tsx   # 分页组件
│   ├── layout.tsx            # 主布局
│   └── ui/                   # shadcn/ui 组件
├── lib/
│   ├── notion.ts             # Notion API 与缓存
│   └── utils.ts              # 工具函数
└── scripts/
    └── cache-posts.ts        # 构建时文章缓存
```

## 致谢

基于 [thegesturs/notion-blogs](https://github.com/thegesturs/notion-blogs) 改造。

## 许可证

MIT
