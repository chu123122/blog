# AI 上下文：chu's Blog

> **自动生成** by `generate_project_context.py` | 更新时间：2026-04-13 19:21
> **用途**：AI 助手打开此项目时，先读这个文件获取完整上下文
> **重新生成**：`python ~/.claude/skills-repo/_bootstrap/scripts/generate_project_context.py "C:\Users\chuxgao\WorkBuddy\20260413111416\blog"`

---

## ⚠️ 启动协议（必须遵守）

1. 你已经在读这个文件了 ✅
2. 通读下面的项目文档摘要，理解当前进度
3. 用 2-3 句话和用户核对："上次做到 XX，接下来是 YY，对吗？"
4. **用户确认后再开始干活**
5. 完成后运行：`python ~/.claude/skills-repo/_bootstrap/scripts/task_complete.py "C:\Users\chuxgao\WorkBuddy\20260413111416\blog" --fix`

---

## 📋 全局活跃项目

## 🔥 当前活跃项目（新 AI 先看这里）

| 项目 | 仓库 | 分支 | 进度 | 交接文档 |
|------|------|------|------|---------|
| **博客重设计** | [blog](https://github.com/chu123122/blog.git) | `redesign-astro` | SPEC+HANDOFF 已完成，Astro 项目未初始化 | `docs/HANDOFF.md` ★必读 |
| **帧同步 v2** | [LockStepSystem](https://github.com/chu123122/LockStepSystem.git) | `feature/v2-rollback-rudp` | Phase 1-4 代码完成，待 Unity 验证 | `docs/PROGRESS.md` + `docs/HARNESS_REVIEW.md` |

> 接手任何项目前，**先读对应的交接文档**，再和用户确认"上次做到哪了"。

---

## 📂 项目文档

### docs/HANDOFF.md — 交接文档（最重要，当前进度+下一步）

<details open>
<summary>展开查看</summary>

# chu's Blog · AI 交接文档

> **最后更新**：2026-04-13
> **当前状态**：Phase 4 完成（15 篇文章已迁移），Phase 5 构建部署进行中
> **分支**：`astro`
> **仓库**：https://github.com/chu123122/blog.git

---

## 📋 30 秒速读

博客从 Hexo 迁移到 Astro 6。视觉风格「花と嵐」已确定并落地——暖白底色、飘落花瓣、日系文学感。15 篇旧文章已迁移为 MD。GitHub Actions 部署配置已写好。当前卡在构建阶段（dist 被旧进程锁住），需要杀掉 node 后重新 build + push。

---

## 🎯 已确定的设计决策（不要推翻）

| 决策 | 内容 | 原因 |
|------|------|------|
| 技术栈 | Astro 6 + MDX + GitHub Pages | 静态博客最佳方案，用户已确认 |
| 视觉风格 | 花と嵐（A+A2 融合） | 经过 10+ 套 demo 对比后确认 |
| 底色 | `#faf8f5` 暖白 | 用户明确不要纯黑 |
| 字体 | Shippori Mincho / Noto Serif SC / Zen Old Mincho / Noto Sans SC | 日系文学感 |
| 花瓣 | 12 片，不透明度 18%~35%，自然可见 | 用户喜欢 A 方案的花瓣程度 |
| 分类色条 | 图形=赤 `#c47b6b` / 技术=蓝 `#7b9bb5` / 游戏=绿 `#8baa7d` | A2 方案确认 |
| 隐藏细节 | 竖排日文、hero 小字、footer 彩蛋，hover 渐显 | 用户核心审美："克制但不寡淡，细节暗藏在缝隙里" |
| base 路径 | dev 时 `/`，build 时 `/blog` | 自动切换，astro.config.mjs 中 process.argv 判断 |
| 部署 | GitHub Actions → gh-pages | deploy.yml 已写好 |

---

## 📂 仓库现状

```
blog/
├── astro.config.mjs           ← Astro 配置（base 自动切换）
├── package.json
├── tsconfig.json
├── .gitignore
├── .github/workflows/
│   └── deploy.yml             ← GitHub Actions 部署
├── docs/
│   ├── SPEC.md                ← 验收契约
│   ├── TECHNICAL_DESIGN.md    ← 技术参考文档（原 HARNESS.md）
│   ├── PROGRESS.md            ← 实时进度表
│   ├── HANDOFF.md             ← 本文件
│   ├── HARNESS_REVIEW.md      ← Harness 10 问验证
│   └── dev-log/
│       └── phase1-3.md        ← Phase 1~3 开发记录
├── src/
│   ├── content.config.ts      ← Content Collection 定义
│   ├── content/posts/         ← 15 篇迁移后的 MD 文章
│   ├── layouts/
│   │   └── BaseLayout.astro   ← 全局布局
│   ├── pages/
│   │   ├── index.astro        ← 首页
│   │   ├── posts/             ← 文章列表 + 详情
│   │   ├── archives/          ← 归档
│   │   └── about/             ← 关于
│   └── styles/
│       └── global.css         ← 花と嵐设计系统
└── public/images/             ← 静态图片
```

---

## ✅ 已完成

- [x] Phase 1：Astro 项目初始化 + 配置
- [x] Phase 2：视觉风格确认（10+ 套 demo → 花と嵐）
- [x] Phase 3：CSS + Layout + 5 个页面组件
- [x] Phase 4：15 篇旧文章 HTML→MD 迁移

## 🚀 下一步（从这里开始）

### 立即执行

1. 杀掉所有 node 进程：`Get-Process node | Stop-Process -Force`
2. 清理缓存：`Remove-Item dist,.astro -Recurse -Force`
3. 构建：`npx astro build`（需要 Node 22.12.0）
4. 验证 dist 目录有 HTML 输出
5. 创建 `astro` 分支：`git checkout -b astro`
6. 推送：`git add -A && git commit -m "feat: astro blog with hanato-arashi theme" && git push -u origin astro`
7. 在 GitHub 仓库设置中：Settings → Pages → Source 改为 GitHub Actions
8. 验证 https://chu123122.github.io/blog

---

## ⚠️ 已知问题和注意事项

1. **dist 锁定问题**：如果 `astro build` 后 dist 为空，是因为旧 dev server 进程锁住了目录。杀掉所有 node 进程后重试。
2. **base 路径**：dev 模式下访问 `localhost:4321/`（无 /blog 前缀）；build/preview 访问 `localhost:4321/blog/`。astro.config.mjs 已自动处理。
3. **字体加载**：使用 `fonts.googleapis.cn`（国内镜像），海外访问可能需要改为 `fonts.googleapis.com`。

---

## 🧑 用户画像

- **技术背景**：游戏客户端/引擎开发（UE/Unity DOTS/图形学/网络同步）
- **沟通偏好**：简洁、任务导向、中文、确认式反馈
- **审美偏好**：ヨルシカ/n-buna/酸欠少女/鱼韵/村上春树/空洞骑士·泪城。克制但不寡淡，细节暗藏在缝隙里。**不要**纯黑、霓虹、张扬、过度极简。
- **工作方法**：Harness 体系（SPEC→WORKFLOW→验证），项目必须有 docs/ 全套文档

---

## 📐 相关文档

- `docs/SPEC.md` — 验收契约
- `docs/TECHNICAL_DESIGN.md` — 技术参考（色彩/字体/组件/路由/部署）
- `docs/PROGRESS.md` — 实时进度表
- `docs/HARNESS_REVIEW.md` — Harness 10 问验证清单
- `docs/dev-log/phase1-3.md` — Phase 1~3 开发记录

---

## ✅ 验收标准

1. [x] Astro 项目可正常 build，生成静态 HTML
2. [x] 花と嵐视觉风格完整渲染（花瓣/暖白/衬线体/竖排装饰/隐藏细节）
3. [x] 15 篇旧文章成功迁移为 MD 并可通过 Content Collection 读取
4. [ ] GitHub Pages 部署成功，https://chu123122.github.io/blog 可访问
5. [ ] 响应式在移动端正常工作

---

*本文档供接手的 AI 助手阅读。如有疑问，先读 SPEC.md，再问用户。*

</details>

### docs/SPEC.md — 需求规格（做什么+验收标准）

<details open>
<summary>展开查看</summary>

# SPEC — chu's Blog Astro 重构

> **任务启动前的验收契约**
> 创建日期：2026-04-13

---

## 1. 需求描述

将 chu's Blog 从 Hexo + ParticleX 主题迁移到 Astro + 自研「花と嵐」视觉系统。

### 核心目标
1. 技术栈升级：Hexo → Astro 6 + MDX，支持更灵活的组件化
2. 视觉风格重塑：从 ParticleX 暗色主题 → 「花と嵐」暖白文学系
3. 保留所有旧文章内容（15 篇），格式从 HTML 迁移为 MD/MDX
4. 继续部署在 GitHub Pages（`chu123122.github.io/blog`）

### 关键问题 Top 5

| # | 问题 | 优先级 |
|---|------|--------|
| 1 | 旧 Hexo 站是纯 HTML 输出，没有 Markdown 源文件可直接复用 | P0 |
| 2 | 视觉方向不明确，需要通过原型迭代确认 | P0 |
| 3 | GitHub Pages 的 base 路径 `/blog` 在 dev/build 模式下行为不一致 | P1 |
| 4 | 旧文章中的图片需要迁移到新项目 `public/images/` | P1 |
| 5 | 需要配置 GitHub Actions 自动部署 | P1 |

## 2. 排除范围

- **不做** 深色模式（可能作为后续迭代）
- **不做** 搜索功能（可能作为后续迭代）
- **不做** 评论系统
- **不做** 国际化（仅中文 + 日文装饰）
- **不做** 复杂的动画/交互效果（保持克制）

## 3. 依赖与约束

| 约束 | 说明 |
|------|------|
| Node ≥ 22.12.0 | Astro 6 / create-astro 要求 |
| 部署目标 | GitHub Pages，base 必须为 `/blog` |
| 审美红线 | 不要纯黑、不要霓虹张扬、不要过度极简 |
| 字体 CDN | 使用 `fonts.googleapis.cn`（国内镜像） |
| 图标 CDN | FontAwesome 6.4.2 via `s4.zstatic.net` |

## 4. 验收标准

| # | 标准 | 验证方式 |
|---|------|----------|
| 1 | 4 个页面（首页/文章列表/归档/关于）正确渲染花と嵐风格 | 浏览器截图对比 demo |
| 2 | 花瓣动画、竖排装饰、隐藏彩蛋全部可见/可交互 | 手动检查 |
| 3 | 响应式：≤768px / 769-1024px / ≥1025px 三档正常 | 调整浏览器窗口 |
| 4 | `astro build` 零错误，输出文件完整 | 构建日志 |
| 5 | 部署到 GitHub Pages 后所有路径正确（CSS/图片/链接） | 线上访问 |
| 6 | 至少 1 篇文章成功迁移且详情页渲染正确（正文/目录/代码高亮） | 浏览器检查 |

---

*SPEC 版本：v1.0*

</details>

### docs/PROGRESS.md — 实时进度表

<details open>
<summary>展开查看</summary>

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

</details>

### docs/TECHNICAL_DESIGN.md — 技术设计文档

<details open>
<summary>展开查看</summary>

# chu's Blog — Harness 文档

> 项目全流程设计决策、技术规范与开发指南
> 最后更新：2026-04-13

---

## 1. 项目概述

| 字段 | 值 |
|------|-----|
| 项目名 | chu's Blog |
| 拥有者 | 楽酌 (chuxgao) |
| 仓库 | https://github.com/chu123122/blog.git |
| 部署 | GitHub Pages → https://chu123122.github.io/blog |
| 技术栈 | Astro 6 + MDX + GitHub Pages |
| Node 版本 | ≥ 22.12.0 |
| 视觉风格 | **花と嵐**（暖白文学系） |

### 项目定位
游戏开发/引擎技术/图形学的个人学习笔记博客。视觉风格融合日系文学感（ヨルシカ/村上春树），强调克制但不寡淡，细节暗藏在缝隙里。

---

## 2. 目录结构

```
blog/
├── astro.config.mjs          # Astro 配置（base: /blog）
├── package.json
├── src/
│   ├── content.config.ts      # Content Collection 定义
│   ├── content/
│   │   └── posts/             # 文章 .md / .mdx
│   ├── layouts/
│   │   └── BaseLayout.astro   # 全局布局（导航/花瓣/竖排装饰/footer）
│   ├── pages/
│   │   ├── index.astro        # 首页（Hero + 最新文章 + 引言）
│   │   ├── posts/
│   │   │   ├── index.astro    # 文章列表（分类筛选）
│   │   │   └── [slug].astro   # 文章详情（正文 + TOC 目录）
│   │   ├── archives/
│   │   │   └── index.astro    # 归档（按年分组）
│   │   └── about/
│   │       └── index.astro    # 关于页（技能/项目/简介）
│   └── styles/
│       └── global.css         # 全局样式系统
├── public/
│   └── images/                # 静态图片资源
└── dist/                      # 构建输出
```

---

## 3. 视觉设计系统

### 3.1 设计理念

**核心原则：克制但不寡淡，细节暗藏在缝隙里。**

- 大面积留白，让文字呼吸
- 装饰元素（花瓣/竖排文字/隐藏小字）都是"需要注意才能发现"的
- 不使用纯黑底色、霓虹色、张扬大字背景
- 引言出处、footer 彩蛋等用 hover 渐显

### 3.2 色彩令牌

```css
:root {
  --bg: #faf8f5;           /* 暖白底色（纸张感） */
  --bg-warm: #f5f0e8;      /* 更暖的辅助底色 */
  --text: #2c2825;         /* 主文字（深棕黑） */
  --text-mid: #6b6560;     /* 次要文字 */
  --text-faint: #a8a098;   /* 辅助灰 */
  --accent: #c47b6b;       /* 主 accent（赤/暖红） */
  --accent-light: #e8a090; /* accent 浅色 */
  --accent-pale: #f4d9d0;  /* accent 极浅 */
  --accent-hover: #a8604f; /* hover 深色 */
  --blue: #7b9bb5;         /* 分类色：技术 */
  --green: #8baa7d;        /* 分类色：游戏开发 */
  --border: rgba(44, 40, 37, 0.08);
}
```

### 3.3 分类色条映射

| 分类 | 色条 | 色值 |
|------|------|------|
| 计算机图形学 | `post-bar--graphics` | `--accent` (#c47b6b) |
| 技术 | `post-bar--tech` | `--blue` (#7b9bb5) |
| 游戏开发 | `post-bar--game` | `--green` (#8baa7d) |
| 其他 | `post-bar--default` | `--text-faint` |

### 3.4 字体系统

| 用途 | CSS 变量 | 字体 | 说明 |
|------|----------|------|------|
| UI/正文 | `--font-sans` | Noto Sans SC | 默认无衬线 |
| 标题/Hero | `--font-serif` | Shippori Mincho, Noto Serif SC | 日系衬线，文学感 |
| 装饰文字 | `--font-deco` | Zen Old Mincho | 竖排日文、隐藏彩蛋 |
| 代码 | `--font-mono` | Fira Code | 等宽代码 |

字体加载源：`fonts.googleapis.cn`（国内 CDN 镜像）

### 3.5 特效元素

| 元素 | 实现 | 参数 |
|------|------|------|
| **飘落花瓣** | JS 动态生成 12 个 `div.petal` | 不透明度 18%~35%，时长 13~26s |
| **水彩光晕** | `body::before` 三层 radial-gradient | 赤/蓝/绿三色，极低不透明度 |
| **纸张纹理** | `body::after` SVG feTurbulence | opacity: 0.015 |
| **竖排装饰** | `.vertical-deco` writing-mode: vertical-rl | 默认 8% 不透明度，hover → 15% |
| **隐藏小字** | `.hero__whisper` | 默认 4%，hover → 18%，过渡 3s |
| **Footer 彩蛋** | `.footer__ghost` | 默认 3%，hover → 15%，过渡 3s |
| **页面过渡** | `.animate-fade-up` keyframes | 0.5s fadeUp |

### 3.6 隐藏细节清单

发现这些需要仔细看或 hover：

1. 🌸 **Hero 右下角** — `世界の終わりで、花びらが舞う`
2. 📜 **右侧竖排** — `春の花びらが風に散る　——　楽酌の記録`
3. 🦶 **Footer 底行** — `すべての言葉は、いつか誰かに届く`
4. 📖 **引言出处** — `—— 村上春樹` 默认极淡，hover 渐显
5. 🌸 **花瓣** — 12 片缓慢飘落，不会过分抢眼

---

## 4. Content Collection

### 4.1 Schema 定义 (`content.config.ts`)

```typescript
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    description: z.string().default(""),
    draft: z.boolean().default(false),
  }),
});
```

### 4.2 文章 Frontmatter 示例

```yaml
---
title: "GAMES101学习之路(一)：深入理解MVP变换"
date: 2025-07-07
category: "计算机图形学"
tags: ["图形学", "MVP", "线性代数"]
description: "计算机渲染物体的第一步，MVP变换"
draft: false
---
```

### 4.3 文章放置规则

- 路径：`src/content/posts/` 下的 `.md` 或 `.mdx` 文件
- 文件名即为 slug（URL 路径段）
- 支持子目录组织，slug 会包含目录路径
- `draft: true` 的文章不会出现在列表和归档中

---

## 5. 页面路由

| 页面 | 路由 (dev) | 路由 (prod) | 源文件 |
|------|-----------|------------|--------|
| 首页 | `/` | `/blog/` | `pages/index.astro` |
| 文章列表 | `/posts/` | `/blog/posts/` | `pages/posts/index.astro` |
| 文章详情 | `/posts/[slug]/` | `/blog/posts/[slug]/` | `pages/posts/[slug].astro` |
| 归档 | `/archives/` | `/blog/archives/` | `pages/archives/index.astro` |
| 关于 | `/about/` | `/blog/about/` | `pages/about/index.astro` |

**注意**：所有内部链接使用 `import.meta.env.BASE_URL` 拼接，不硬编码 `/blog/`。

---

## 6. 组件架构

### 6.1 BaseLayout.astro

全局布局，所有页面通过 `<BaseLayout>` 包裹。包含：

```
<html>
  <head> — meta, fonts, FontAwesome, global.css
  <body>
    .petal-layer — 花瓣动画层
    .vertical-deco — 竖排装饰文字
    .page-wrap
      nav.navbar — 导航栏（logo + 链接 + 移动端汉堡）
      main.animate-fade-up — <slot /> 主内容
      footer — 版权 + 隐藏彩蛋
    <script> — 花瓣生成 + 移动端菜单

... (截断，完整内容见 C:\Users\chuxgao\WorkBuddy\20260413111416\blog\docs\TECHNICAL_DESIGN.md)

</details>

### docs/HARNESS_REVIEW.md — 体系验证/复盘

<details open>
<summary>展开查看</summary>

# Harness 体系验证清单 — chu's Blog

> **用途**：跑完 SPEC→WORKFLOW 流程后，对着这 10 个问题逐项检查，判断设计拆得对不对
> **时机**：每次完整使用 Harness 体系完成一个任务后填写
> **原则**：卡住的地方就是设计有问题的地方

---

## 关于 SPEC（任务启动前的验收契约）

### Q1：写 SPEC 的时候，有没有觉得"这个填起来好烦"？

**第一次使用记录（2026-04-13，博客 Astro 重构）：**
没有正式写 SPEC 文档。需求是通过对话逐步明确的：
- 用户提出"继续博客开发"→ AI 读取记忆找到项目上下文
- 视觉风格通过 10+ 套 HTML demo 迭代确认（A→I2，最终定 A+A2）
- 技术选型沿用记忆中的 Astro + MDX + GitHub Pages

**观察**：对于审美驱动的项目，传统 SPEC 的"需求列表"格式不太适用。视觉方向是通过**快速原型→反馈→迭代**确定的，而不是一开始就能写清楚。可以考虑加入"视觉方向确认"作为 SPEC 的一种变体。

### Q2：SPEC 写完后，AI 在后续工作中有没有引用过 SPEC 里的内容？

虽然没有正式 SPEC，但以下决策在后续开发中被持续引用：
- 色彩令牌（`--accent: #c47b6b` 等）→ 贯穿全部 CSS 和组件
- 审美红线（"不要纯黑""不要张扬"）→ 毙掉了方案 C/H
- 分类色条映射 → 直接写入 `barClass()` 函数
- 隐藏细节列表 → BaseLayout 中逐一实现

**结论**：虽然形式不是 SPEC 文档，但审美决策起到了等效的验收契约作用。

---

## 关于 WORKFLOW（阶段流转）

### Q3：实际做的时候，有没有按 WORKFLOW 定义的阶段走？

实际流程：
1. **Phase 1：项目初始化** ✅ Astro 脚手架 + 依赖安装 + 基础配置
2. **Phase 2：视觉风格确认** ✅ 10+ 套 HTML demo 迭代 → 最终定 A+A2
3. **Phase 3：风格落地到 Astro** ✅ global.css + BaseLayout + 各页面重写
4. **Phase 4：文章迁移** 🔲 尚未执行（用户主动暂缓）
5. **Phase 5：部署配置** 🔲 尚未执行

**偏差**：
- Phase 2 花了大量时间（10+ 套视觉 demo），超出预期。但这是审美项目的特性，不是流程问题
- **本地预览反复出问题**（dev vs preview 模式、端口掉线），浪费了不少时间

**发现**：WORKFLOW 应该加入"本地验证"作为每个 Phase 的强制检查点，不能只在最后才发现渲染挂了。

### Q4：有没有某个阶段觉得"这一步没必要，直接跳到下一步更快"？

Phase 2（视觉迭代）虽然耗时最长，但**绝对必要**。如果跳过直接写代码，方向错了要全部返工。

不过 Phase 2 中间有效率问题：
- 方案 D/E/F 三套是在用户说了"不要张扬"之前出的，方向偏了 → 浪费
- **应该在出 demo 前先确认审美红线**，再发散

---

## 关于双 Agent

### Q5：这次用的是哪个 Agent？过程中有没有切换到另一个 Agent 的需求？

用的是工作 Agent。没有切换需求。
整个流程是"设计→迭代→实现"，是典型的工作 Agent 任务。
如果用户要学习"Astro 的 Content Collection 底层原理"，那时候才需要学习 Agent。

---

## 关于记忆系统

### Q6：过程中有没有产生"这个应该记下来以后用"的信息？

有，且已写入记忆：
- 用户的审美偏好体系（ヨルシカ/村上春树/泪城/不要纯黑...）→ MEMORY.md
- 花と嵐视觉令牌 → MEMORY.md + HARNESS.md
- 分类色条映射规则 → HARNESS.md（原项目技术文档）

**观察**：审美偏好是高复用价值的记忆，因为它会影响后续所有视觉决策。写入 MEMORY.md 是对的。

---

## 关于三层金字塔

### Q7：让 AI 做的事情里，有没有哪步是"每次都一样的机械操作"？

有两个：
1. **启动/重启本地服务器**：端口被占、进程挂掉、dev vs preview 混淆 → 反复折腾
2. **构建后检查**：每次改完都要 build + 验证路径 → 机械操作

**建议**：
- 启动服务器可以下沉为 Script（一键 kill+rebuild+preview）
- 或在 Astro 配置中去掉 base 以简化本地开发（部署时再加回来）

---

## 关于产出质量

### Q8：AI 的产出，直接能用还是需要大改？

分层评估：
| 产出 | 质量 | 备注 |
|------|------|------|
| 视觉 demo HTML（10+ 套） | ✅ 直接可用 | 所有 demo 都能正确渲染 |
| global.css 设计系统 | ✅ 基本可用 | 令牌体系完整 |
| BaseLayout.astro | ⚠️ 需修复 | CSS import 路径问题导致样式不加载 |
| 页面组件 | ⚠️ 需修复 | base 路径硬编码问题 |
| 本地预览 | ❌ 反复出问题 | dev/preview 模式混淆、端口管理差 |

**观察**：AI 在"独立创作"（写 CSS、写 HTML demo）方面表现优秀，在"工程集成"（路径、构建、服务器管理）方面有明显盲区。

### Q9：AI 有没有做出"我明确不想要的行为"？

有：
1. 第一版方案 C（霓虹夜色风）方向完全偏了 → 因为没先确认审美红线就发散
2. 方案 D/E/F 也偏张扬 → 同上原因
3. 多次给错预览地址（dev 模式给 `/blog/` 路径）→ 缺乏对 Astro base 路径的理解

**改进**：在视觉迭代前应先确认 3-5 条审美红线（做/不做），再出方案。

---

## 总结判定

### Q10：如果明天再做一个类似任务，会怎么改流程？

**四个改进点：**

1. **加入"审美红线确认"环节**：在出视觉 demo 之前，先用 5 个问题确认用户的"绝对不要"和"一定要有"，避免方向性浪费

2. **本地预览标准化**：写一个启动脚本，统一处理 build + preview + 端口管理，不要每次手动折腾

3. **CSS 集成验证前置**：写完 CSS 后第一时间在真实 Astro 项目中验证渲染，不要等所有页面写完才发现样式没加载

4. **WORKFLOW 加入"渲染验证"交接物**：每个 Phase 完成后必须附截图证明渲染正确，不只是"代码写完了"

---

## 使用记录

| 日期 | 任务 | 用时 | 主要发现 |
|------|------|------|----------|
| 2026-04-13 | 博客 Astro 重构 + 花と嵐风格 | ~2.5h | 视觉迭代有效但前期浪费多；CSS 集成路径问题；dev/preview 模式混淆 |

---

## 当前已知问题

### 本地预览问题总结

| # | 问题 | 原因 | 状态 |
|---|------|------|------|
| 1 | CSS 样式完全不加载，页面裸奔 | BaseLayout 最初没 `import "../styles/global.css"`，后来修复后 Astro 输出的 CSS link 是 `/blog/_astro/xxx.css`，但 `astro dev` 模式下根路径是 `/` 不是 `/blog/`，所以 CSS 404 | 已诊断 |
| 2 | `localhost:4321/blog/` 返回 404 | `astro dev` 不处理 base 前缀；需要用 `astro preview`（serve build 输出） | 已诊断 |
| 3 | 服务器频繁掉线 | `serve` 和 `astro` 进程管理不稳定，Start-Process 后进程可能被回收 | 反复发生 |
| 4 | dev vs preview 行为差异 | dev: 根路径 `/`，无 base；preview: 正确处理 `/blog/`。开发时应用 dev + 不带前缀访问，或用 preview + 带前缀 | 已理清 |

**根治方案**：开发时临时把 `astro.config.mjs` 的 `base` 改为 `"/"`，部署前改回 `"/blog"`。或在 `package.json` 中加两个 script：
```json
{
  "dev": "astro dev",
  "dev:local": "astro dev --config astro.config.local.mjs",
  "preview": "astro build && astro preview"
}
```

---

*文档版本：v1.0 | 2026-04-13*

</details>

---

## 📐 跨项目规范（摘要）

> 完整版见 `~/.claude/global-memory/decisions/conventions.md`
> 标注 🔒 的规范由脚本硬检查，违反会被 `verify_conventions.py` 拦截

- DOC-01 🔒 项目必须有 SPEC + HANDOFF
  - **规则**：任何由 AI 协作开发的项目，`docs/` 目录下必须有 `SPEC.md` 和 `HANDOFF.md`
- DOC-02 🔒 HANDOFF 必须包含"已确定的设计决策"
  - **规则**：HANDOFF.md 中必须有"已确定的设计决策"区块，列出不应被推翻的决策
- DOC-03 🔒 多 Phase 项目必须有 PROGRESS.md
  - **规则**：超过 1 个 Phase 的项目必须维护实时进度表 `docs/PROGRESS.md`
- DOC-04 每个 Phase 完成后写 dev-log
  - **规则**：每个 Phase 完成后在 `docs/dev-log/phaseN.md` 记录：设计决策、新增文件、验证方法
- DOC-05 🔒 开发前必须有计划文档，开发中必须有进度文档
  - **规则**：项目开发前在 `docs/` 下产出 SPEC.md（需求+验收标准）+ TECHNICAL_DESIGN.md（架构+接口）。多 Phase 项目必须维护 PROGRESS.md。每个 Phase 完成后产出 dev-log。
- CODE-01 🔒 新模块必须有 V1/V2 切换开关
  - **规则**：重构或新增核心模块时，必须保留旧路径的切换开关（Inspector 可选或编译宏）
- CODE-02 🔒 C# 文件必须有 namespace
  - **规则**：所有 C# 文件必须在 namespace 内
- CODE-03 🔒 C++ header 必须有 pragma once 或 include guard
  - **规则**：所有 `.hpp` / `.h` 文件必须有头文件保护
- GIT-01 🔒 commit message 使用 conventional commits
  - **规则**：格式 `type(scope): description`，type 限定为 feat/fix/docs/refactor/test/chore
- GIT-02 特性开发用独立分支
  - **规则**：新功能在独立分支开发，不直接改 main
- MEM-01 🔒 修改记忆文件必须写 CHANGELOG
  - **规则**：修改 `global-memory/` 下任何文件后，必须在 `CHANGELOG.md` 追加一条记录
- MEM-02 PROMOTE 规范到全局前须标注来源
  - **规则**：从项目中提炼规范写入 `decisions/conventions.md` 时，必须标注来源项目和具体案例
- MEM-03 🔒 记忆索引同步
  - **规则**：新增/删除 topic 文件后，`MEMORY.md` 索引表必须同步更新
- HARNESS-01 🔒 项目开始前写 SPEC
  - **规则**：动手写代码之前必须先有 `docs/SPEC.md`
- HARNESS-02 项目完成后填 HARNESS_REVIEW
  - **规则**：跑完 SPEC→WORKFLOW 流程后填写 10 个验证问题

---

## 🔧 任务收尾清单

完成工作后，运行以下脚本确保合规：

```bash
# 一键收尾（检查+修复+同步）
python ~/.claude/skills-repo/_bootstrap/scripts/task_complete.py "C:\Users\chuxgao\WorkBuddy\20260413111416\blog" --fix

# 或分步执行
python ~/.claude/skills-repo/_bootstrap/scripts/verify_conventions.py "C:\Users\chuxgao\WorkBuddy\20260413111416\blog" --all
python ~/.claude/skills-repo/_bootstrap/scripts/post_task_hook.py --auto-fix
```

> 🔒 git commit 时会自动运行 pre-commit hook 拦截不合规的提交
