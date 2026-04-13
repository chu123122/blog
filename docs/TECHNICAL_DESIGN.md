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
</html>
```

Props:
- `title?: string` — 页面标题，默认 "chu's Blog"
- `description?: string` — meta description

### 6.2 各页面职责

| 页面 | 数据源 | 交互 |
|------|--------|------|
| `index.astro` | `getCollection("posts")` → 最新 6 篇 | 无 |
| `posts/index.astro` | `getCollection("posts")` → 全部 | 分类筛选按钮（客户端 JS） |
| `posts/[slug].astro` | `getStaticPaths()` + `render(post)` | TOC 目录跳转 |
| `archives/index.astro` | `getCollection("posts")` → 按年分组 | 无 |
| `about/index.astro` | 硬编码技能/项目数据 | 无 |

---

## 7. 构建与部署

### 7.1 本地开发

```bash
# 启动 dev server（不需要 /blog 前缀）
npx astro dev --port 4321

# 构建
npx astro build

# 预览构建结果（需要 /blog 前缀）
npx astro preview
```

### 7.2 GitHub Pages 部署

Astro 配置：
```javascript
export default defineConfig({
  site: "https://chu123122.github.io",
  base: "/blog",
  // ...
});
```

部署方式：GitHub Actions 自动构建 → 发布 `dist/` 到 `gh-pages` 分支。

### 7.3 Markdown 渲染配置

```javascript
markdown: {
  shikiConfig: {
    theme: "one-dark-pro",  // 代码高亮主题
    wrap: true,             // 长行自动换行
  },
},
```

---

## 8. 响应式断点

| 断点 | 行为 |
|------|------|
| `≤ 768px` | 导航变汉堡菜单，文章列表隐藏日期/分类，竖排装饰/隐藏小字隐藏，TOC 隐藏 |
| `769px ~ 1024px` | TOC 隐藏，文章单栏 |
| `≥ 1025px` | 完整双栏（文章 + TOC），竖排装饰可见 |

---

## 9. 可访问性

| 项目 | 实现 |
|------|------|
| 语义 HTML | `<nav>`, `<main>`, `<article>`, `<header>`, `<footer>` |
| 键盘导航 | 所有链接和按钮可 Tab 聚焦 |
| 色彩对比度 | 主文字 `#2c2825` on `#faf8f5` → 对比度 12.3:1 (AAA) |
| 移动端菜单 | `aria-label="菜单"` |
| 图片 | 所有 `<img>` 带 alt 属性 |
| 文字选择 | 自定义 `::selection` 使用 accent 色 |

---

## 10. 待办事项

| 优先级 | 任务 | 状态 |
|--------|------|------|
| P0 | 旧 Hexo 文章迁移为 MD/MDX（15 篇） | 🔲 待执行 |
| P0 | GitHub Actions 部署 workflow | 🔲 待配置 |
| P1 | 文章图片迁移到 `public/images/` | 🔲 待执行 |
| P1 | RSS / Atom feed 支持 | 🔲 待添加 |
| P2 | 文章阅读进度条 | 🔲 可选 |
| P2 | 深色模式（谨慎考虑，不要纯黑） | 🔲 可选 |
| P2 | 搜索功能 | 🔲 可选 |

---

## 11. 审美指南（面向 AI 协作者）

**做**：
- 用暖白色系、低饱和度色彩
- 用衬线体做标题、装饰，无衬线做正文
- 把有趣的小细节藏起来（hover 显现、极低不透明度）
- 保持大面积留白和呼吸感
- 引用村上春树等日本文学（中日文皆可）

**不要**：
- 纯黑底色（`#000` 或接近纯黑）
- 霓虹/荧光色系
- 巨大的背景文字/水印
- 过度极简到寡淡
- 张扬的动效（大范围 glitch、闪烁等）

**审美参照**：
- 音乐：ヨルシカ、n-buna、酸欠少女さユリ、サカナクション
- 文学：村上春树（核心）、川端康成
- 游戏：空洞骑士·泪城（永恒之雨的意象）
- 关键词：克制、文学感、暗藏细节、纸张质感、花瓣与风

---

*文档版本：v1.0 | 花と嵐视觉系统*
