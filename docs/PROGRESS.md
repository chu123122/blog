# chu's Blog · 开发进度表

> **仓库**：https://github.com/chu123122/blog.git
> **分支**：`astro`
> **最后更新**：2026-04-13

---

## 总览

| Phase | 名称 | 状态 | 完成日期 |
|-------|------|------|---------|
| 1 | 项目初始化 + Astro 基础配置 | ✅ 完成 | 2026-04-13 |
| 2 | 视觉风格确认（花と嵐） | ✅ 完成 | 2026-04-13 |
| 3 | Astro 组件/页面落地 | ✅ 完成 | 2026-04-13 |
| 4 | 旧文章迁移（HTML→MD） | ✅ 完成 | 2026-04-13 |
| 5 | 构建 + 部署到 GitHub Pages | ⏳ 进行中 | — |

---

## Phase 1：项目初始化

| 任务 | 状态 |
|------|------|
| 创建 Astro 6 项目 | ✅ |
| 安装依赖（astro, @astrojs/mdx, @astrojs/sitemap, sharp） | ✅ |
| 配置 astro.config.mjs（site, base, markdown） | ✅ |
| 定义 Content Collection schema（content.config.ts） | ✅ |
| 配置 tsconfig.json | ✅ |

## Phase 2：视觉风格确认

| 任务 | 状态 |
|------|------|
| 方案 A（花と嵐）— 暖白+花瓣+文学系 | ✅ 选中 |
| 方案 A2 — 左对齐+分类色条 | ✅ 选中（合并到 A） |
| 方案 B~I2（共 10+ 套对比 demo） | ✅ 已评审毙掉 |
| 确认审美红线（不要纯黑/霓虹/张扬/过度极简） | ✅ |

## Phase 3：Astro 组件落地

| 任务 | 状态 |
|------|------|
| global.css — 完整设计令牌系统 | ✅ |
| BaseLayout.astro — 导航+花瓣+竖排装饰+footer | ✅ |
| index.astro — 首页（Hero+最新文章+引言） | ✅ |
| posts/index.astro — 文章列表（分类筛选） | ✅ |
| posts/[slug].astro — 文章详情（正文+TOC） | ✅ |
| archives/index.astro — 归档（按年分组） | ✅ |
| about/index.astro — 关于页 | ✅ |
| astro.config.mjs base 路径自动切换 | ✅ |

## Phase 4：文章迁移

| 任务 | 状态 |
|------|------|
| 编写迁移脚本 migrate.mjs | ✅ |
| 迁移 15 篇旧 Hexo 文章为 MD | ✅ |
| 文章 frontmatter 格式校验 | ✅ |

## Phase 5：构建 + 部署

| 任务 | 状态 |
|------|------|
| .github/workflows/deploy.yml | ✅ 已创建 |
| .gitignore 配置 | ✅ |
| 创建 astro 分支 | ⏳ |
| 推送到 GitHub | ⏳ |
| astro build 成功 | ⏳ |
| GitHub Actions 自动部署 | ⏳ |
| 线上 https://chu123122.github.io/blog 验证 | ⏳ |

---

## 已知问题

| # | 问题 | 状态 |
|---|------|------|
| 1 | `astro build` dist 为空（旧 dev server 锁 dist 目录） | 需杀 node 后重建 |
| 2 | dev 模式 base=`/` vs build 模式 base=`/blog` | 已修复（process.argv 判断） |
| 3 | posts collection 为空时的 warning | 正常（已有 15 篇文章后消失） |
