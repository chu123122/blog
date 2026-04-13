# WORKFLOW — chu's Blog Astro 重构

> **阶段流转与交接物定义**
> 创建日期：2026-04-13

---

## 流程总览

```
SPEC（验收契约）
  ↓
Phase 1：项目初始化
  ↓
Phase 2：视觉风格确认
  ↓
Phase 3：Astro 落地
  ↓
Phase 4：文章迁移（暂缓）
  ↓
Phase 5：部署上线
  ↓
Harness 验证
```

---

## Phase 1：项目初始化

**目标**：搭建 Astro 项目骨架

### 交接物
- [x] `package.json` + 依赖安装（astro, @astrojs/mdx, @astrojs/sitemap, sharp）
- [x] `astro.config.mjs`（site, base, markdown 配置）
- [x] `src/content.config.ts`（posts collection schema）
- [x] 目录结构：`src/pages/`, `src/layouts/`, `src/styles/`, `src/content/posts/`
- [x] 构建验证：`npx astro build` 零错误

### 状态：✅ 完成

---

## Phase 2：视觉风格确认

**目标**：通过 HTML 原型迭代，确定最终视觉方向

### 交接物
- [x] 多套视觉 demo HTML（方案 A ~ I2，共 10+ 套）
- [x] 用户确认的最终方向：**A（花と嵐）+ A2（分类色条/隐藏细节）**
- [x] 设计令牌定义（色彩/字体/间距）
- [x] 隐藏细节清单（5 处暗藏彩蛋）

### 决策记录

| 决策 | 选择 | 备选（被毙） | 原因 |
|------|------|-------------|------|
| 底色 | 暖白 `#faf8f5` | 深色/纯黑 | 用户不喜欢纯黑 |
| Accent | 赤 `#c47b6b` | 霓虹粉/电子蓝 | 太张扬 |
| 花瓣 | 12 片，自然可见度 | 6-8 片极淡 | 太极简显得寡淡 |
| 布局 | 单栏居中 840px | 左侧栏双栏 | A3 方案试了但没被选 |
| 装饰 | 竖排日文 + 隐藏小字 | 巨大背景汉字 | 用户说"不要直接大字记录" |

### 审美红线（从迭代中提炼）

**✅ 做**：暖白/衬线体/花瓣/留白/hover 渐显/村上引言
**❌ 不做**：纯黑/霓虹/大字水印/张扬动效/过度极简

### 状态：✅ 完成

---

## Phase 3：Astro 落地

**目标**：将确认的视觉方案落地到 Astro 项目

### 交接物
- [x] `global.css` — 完整设计令牌 + 组件样式（846 行）
- [x] `BaseLayout.astro` — 全局布局（导航/花瓣/竖排装饰/footer）
- [x] `pages/index.astro` — 首页（Hero + 最新文章 + 引言）
- [x] `pages/posts/index.astro` — 文章列表（分类筛选）
- [x] `pages/posts/[slug].astro` — 文章详情（正文 + TOC）
- [x] `pages/archives/index.astro` — 归档（按年分组）
- [x] `pages/about/index.astro` — 关于页
- [x] dev 模式 base 路径自动切换（dev: `/`, build: `/blog`）
- [x] 构建验证：`npx astro build` 零错误
- [ ] **渲染验证**：浏览器截图确认花と嵐风格正确渲染 ← 待用户确认

### 已知问题及修复

| 问题 | 原因 | 修复 |
|------|------|------|
| CSS 不加载（页面裸奔） | BaseLayout 没 import CSS | 加了 `import "../styles/global.css"` |
| `/blog/` 路径 404 (dev) | dev 模式不处理 base | `astro.config.mjs` 加 dev/build 自动切换 |
| 内部链接硬编码 `/blog/` | 路径不兼容 dev 模式 | 全部改为 `import.meta.env.BASE_URL` |

### 状态：⏳ 进行中（待渲染确认）

---

## Phase 4：文章迁移

**目标**：将旧 Hexo 的 15 篇 HTML 文章转为 MD/MDX

### 交接物
- [ ] 15 篇 `.md` / `.mdx` 文件，frontmatter 符合 schema
- [ ] 图片迁移到 `public/images/posts/`
- [ ] 文章列表和归档页正确显示所有文章
- [ ] 至少 3 篇文章详情页渲染验证（含代码块/图片/公式）

### 旧文章清单

| # | 标题 | 分类 | 日期 |
|---|------|------|------|
| 1 | 图形学练习实践 | 计算机图形学 | 2025.10.15 |
| 2 | GAMES101 proj记录 | 计算机图形学 | 2025.10.15 |
| 3 | 帧同步系统设计记录 | 技术 | 2025.09.06 |
| 4 | GAMES101学习之路(二)：光栅化的原理 | 计算机图形学 | 2025.07.14 |
| 5 | GAMES101学习之路(一)：深入理解MVP变换 | 计算机图形学 | 2025.07.07 |
| 6 | 客户端和服务端通信知识点记录 | 游戏开发 | 2025.02.19 |
| 7 | DOTS架构下的物理碰撞 | 游戏开发 | 2025.02.18 |
| 8 | DOTS输入处理 | 游戏开发 | 2025.02.14 |
| 9 | gitlet设计文档 | 编程 | 2025.02.13 |
| 10 | 游戏制作经验记录 | 游戏开发 | 2025.01.27 |
| 11-15 | (page 2 文章，待确认) | — | — |

### 状态：🔲 暂缓（用户要求先确认视觉）

---

## Phase 5：部署上线

**目标**：配置 GitHub Actions，自动构建部署到 GitHub Pages

### 交接物
- [ ] `.github/workflows/deploy.yml` — CI/CD 配置
- [ ] GitHub Pages 设置（source: GitHub Actions）
- [ ] 线上地址 `https://chu123122.github.io/blog` 可访问
- [ ] 所有内部链接、CSS、图片路径在线上正确

### 状态：🔲 待执行

---

## 进度总览

| Phase | 状态 | 交接物完成度 |
|-------|------|-------------|
| Phase 1：初始化 | ✅ 完成 | 5/5 |
| Phase 2：视觉确认 | ✅ 完成 | 4/4 |
| Phase 3：Astro 落地 | ⏳ 进行中 | 8/9（差渲染确认） |
| Phase 4：文章迁移 | 🔲 暂缓 | 0/4 |
| Phase 5：部署 | 🔲 待执行 | 0/4 |

---

*WORKFLOW 版本：v1.0 | 2026-04-13*
