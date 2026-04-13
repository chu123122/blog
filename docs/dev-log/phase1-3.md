# Phase 1~3 开发记录

> 日期：2026-04-13
> 作者：工作 Agent

---

## Phase 1：项目初始化

### 设计决策
- **Astro 6**：选择 Astro 而非继续 Hexo，因为 Content Collection + MDX 更灵活
- **Node 22.12.0**：Astro 6 / create-astro 要求 Node ≥ 22
- **base: "/blog"**：GitHub Pages 仓库名是 `blog`，需要子路径

### 新增文件
- `astro.config.mjs` — site + base + markdown + integrations
- `package.json` — astro, @astrojs/mdx, @astrojs/sitemap, sharp
- `tsconfig.json`
- `src/content.config.ts` — posts Collection 定义

### 踩坑
- Node 20.18.0 不满足 create-astro 要求，需要 22.12.0

---

## Phase 2：视觉风格确认

### 迭代过程
1. **方案 A（花と嵐）** — 暖白+花瓣+居中 Hero → 用户喜欢底色和花瓣
2. **方案 B（雪国）** — 冷白+飘雪+毛玻璃 → 用户觉得还行
3. **方案 C（夜盤）** — 霓虹+深色 → **毙掉**（太张扬）
4. **方案 D（雨の街）** — 深蓝灰+雨丝 → **毙掉**（太张扬）
5. **方案 E（黄昏図書館）** — 琥珀暗色 → **毙掉**
6. **方案 F（海辺の手紙）** — 雾蓝 → **毙掉**
7. **方案 G（余白）** — 极简白 → **毙掉**（太极简）
8. **方案 H（夜想曲）** — 极简黑 → **毙掉**（不要纯黑）
9. **方案 I（文庫本）** — 泛黄书页 → **毙掉**（太极简）
10. **方案 A2（春と修羅）** — A+左对齐+色条 → ✅ 选中，合并到 A
11. **方案 A3（窓辺の手記）** — A+侧栏 → 不选
12. **方案 G2/I2** — G/I 重制 → 不选

### 确认的审美红线
- ✅ 暖白底色（`#faf8f5`）
- ✅ 花瓣 12 片，自然可见度
- ✅ 隐藏细节（hover 渐显）
- ✅ 村上春树引言
- ❌ 不要纯黑
- ❌ 不要霓虹/张扬大字
- ❌ 不要过度极简到寡淡

### 教训
- 应该**先确认审美红线再出方案**，C~F 四套是浪费
- 用户的审美参照：ヨルシカ、n-buna、酸欠少女、鱼韵、村上春树、空洞骑士·泪城

---

## Phase 3：Astro 组件落地

### 设计决策
- **global.css 单文件**：所有设计令牌、组件样式、prose 排版集中管理
- **BaseLayout 统一**：花瓣/竖排装饰/导航/footer 放在 Layout 中，页面只写内容
- **分类色条**：用 4px 竖线 + 三色（赤/蓝/绿）区分文章分类
- **base 路径自动切换**：`process.argv.includes("dev")` 判断，dev 时 `/`，build 时 `/blog`

### 新增文件
- `src/styles/global.css` — 846 行完整设计系统
- `src/layouts/BaseLayout.astro` — 全局布局
- `src/pages/index.astro` — 首页
- `src/pages/posts/index.astro` — 文章列表（含分类筛选 JS）
- `src/pages/posts/[slug].astro` — 文章详情（正文 + TOC）
- `src/pages/archives/index.astro` — 归档
- `src/pages/about/index.astro` — 关于页

### 踩坑
- CSS import 路径问题：BaseLayout 最初没 import global.css → 页面裸奔
- dev vs preview 模式混淆：dev 不处理 base 前缀，CSS 路径 404
- dist 目录被旧 dev server 锁住 → build 输出为空
