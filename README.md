# 河南奋隼建筑工程有限公司 - 官方网站

整合了公司官网与经验分享平台的统一企业网站，支持从 GitHub 仓库自动加载 Markdown 文档。

## 网站结构

```
首页 (/)
├── 英雄区 - 公司品牌展示
├── 业务领域 - 房屋建筑、市政工程、装饰装修
├── 工程案例 - 代表性项目展示
├── 公司简介 - 公司介绍和统计数据
├── 经验分享预览 - 最新文章展示
└── 联系我们 - 联系方式

经验分享 (/stories)
├── 文章列表
├── 分类筛选（项目经验、技术分享、管理心得、安全管理、质量控制）
└── 搜索功能

文章详情 (/stories/:slug)
└── Markdown 内容渲染
```

## 功能特点

- **官网与经验分享整合**：统一的导航和设计风格
- **Markdown 文档支持**：自动解析 frontmatter 元数据
- **GitHub 集成**：从 GitHub 仓库自动加载文章
- **分类筛选**：支持按项目经验、技术分享、安全管理等分类浏览
- **搜索功能**：支持标题、内容、标签搜索
- **响应式设计**：适配桌面端和移动端

## 技术栈

- **前端框架**：React 19 + TypeScript
- **样式方案**：Tailwind CSS 4 + shadcn/ui
- **动画效果**：Framer Motion
- **Markdown 渲染**：Streamdown
- **路由管理**：Wouter
- **构建工具**：Vite

## 快速开始

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

### 部署到 Vercel

1. **将项目推送到 GitHub 仓库**

2. **登录 Vercel**，点击 "New Project"

3. **导入 GitHub 仓库**，选择本项目

4. **配置环境变量**（可选，用于从外部 GitHub 仓库加载文章）：
   - `VITE_GITHUB_OWNER`：GitHub 用户名或组织名
   - `VITE_GITHUB_REPO`：仓库名称
   - `VITE_GITHUB_BRANCH`：分支名称（默认 main）
   - `VITE_GITHUB_PATH`：文章目录路径（默认 stories）

5. **点击 Deploy** 完成部署

## 添加文章

### 文章格式

在 `stories` 目录下创建 Markdown 文件：

```markdown
---
title: 文章标题
date: 2025-12-15
author: 作者姓名
category: project
tags: [标签1, 标签2, 标签3]
excerpt: 文章摘要，将显示在列表页
coverImage: /images/cover.jpg
---

文章正文内容...
```

### 支持的分类

| 分类 ID | 分类名称 |
|---------|----------|
| project | 项目经验 |
| technology | 技术分享 |
| management | 管理心得 |
| safety | 安全管理 |
| quality | 质量控制 |

### 封面图片

- **本地图片**：将图片放入 `client/public/images/` 目录，使用 `/images/xxx.jpg` 引用
- **外部链接**：直接使用图片 URL

## 配置 GitHub 集成

### 方式一：环境变量（推荐）

在 Vercel 项目设置中添加环境变量：

```
VITE_GITHUB_OWNER=your-username
VITE_GITHUB_REPO=your-repo
VITE_GITHUB_BRANCH=main
VITE_GITHUB_PATH=stories
```

### 方式二：修改配置文件

编辑 `client/src/lib/config.ts`：

```typescript
export const githubConfig: GitHubConfig = {
  owner: 'your-username',
  repo: 'your-repo',
  branch: 'main',
  path: 'stories',
};
```

## 项目结构

```
fensun-success-stories/
├── client/                 # 前端代码
│   ├── public/            # 静态资源
│   │   └── images/        # 图片资源
│   ├── src/
│   │   ├── components/    # 组件
│   │   ├── hooks/         # 自定义 Hooks
│   │   ├── lib/           # 工具函数
│   │   ├── pages/         # 页面组件
│   │   ├── App.tsx        # 应用入口
│   │   └── index.css      # 全局样式
│   └── index.html         # HTML 模板
├── stories/               # Markdown 文章目录
├── vercel.json           # Vercel 配置
└── README.md             # 说明文档
```

## 自定义配置

### 修改公司信息

编辑 `client/src/pages/Home.tsx` 中的相关内容：
- 公司名称和简介
- 业务领域描述
- 工程案例信息
- 统计数据
- 联系方式

### 修改导航菜单

编辑 `client/src/components/Layout.tsx` 中的 `navLinks` 数组。

### 修改主题颜色

编辑 `client/src/index.css` 中的 CSS 变量：

```css
:root {
  --primary: oklch(0.65 0.18 45); /* 主色调 - 橙色 */
  /* ... 其他颜色变量 */
}
```

## 常见问题

### 文章不显示？

1. 检查 GitHub 仓库是否为公开仓库
2. 检查环境变量配置是否正确
3. 检查 Markdown 文件格式是否正确

### 图片不显示？

1. 确保图片路径正确
2. 本地图片需放在 `client/public/images/` 目录
3. 外部图片需确保链接可访问

## 许可证

MIT License

---

© 2026 河南奋隼建筑工程有限公司
