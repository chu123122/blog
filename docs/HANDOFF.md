# 博客重设计 · AI 交接文档

> **最后更新**：2026-04-13
> **当前状态**：Phase 1 未开始（SPEC 已完成，项目未初始化）
> **分支**：`redesign-astro`
> **仓库**：https://github.com/chu123122/blog.git

---

## 📋 30 秒速读

用户要把个人技术博客从 **Hexo 7.3.0** 迁移到 **Astro**，日式二次元视觉风格，部署在 GitHub Pages。15 篇旧文章全部迁移。

**当前进度**：设计规格（SPEC）已完成，Astro 项目尚未初始化（因为当前环境缺少 Node.js）。

**你要做的**：从 Phase 1 开始执行。

---

## 🎯 已确定的设计决策（不要推翻）

| 决策 | 内容 | 原因 |
|------|------|------|
| 技术栈 | **Astro** | 静态博客最佳选择，零 JS 默认，Markdown 原生支持 |
| 视觉风格 | **日式/二次元 + 深色基调** | 用户明确选择，匹配现有素材 |
| 配色 | 深蓝 `#0a1628` → 蓝紫 `#1a2744` → 暖橙 `#e8956a` | 来自用户现有的"鲸落地"封面图 |
| 效果 | 毛玻璃卡片、星空/海洋渐变、柔和过渡 | SPEC 中定义 |
| 部署 | GitHub Pages | 用户选择，免费，现有方式 |
| 内容迁移 | 全部 15 篇文章 | 用户明确要求 |
| 代码高亮 | Shiki（Astro 内置） | 不需要额外配置 |

---

## 📂 仓库现状

```
blog/                          ← 当前是 Hexo 静态输出
├── docs/
│   ├── SPEC.md                ← ★ 完整设计规格，必读
│   └── HANDOFF.md             ← 本文件
├── index.html                 ← Hexo 生成的首页
├── css/main.css               ← Hexo 主题样式
├── images/                    ← ★ 素材目录（头像、封面图）
│   ├── 鲸落地.png             ← 主背景图
│   ├── avatar.jpg             ← 二次元头像
│   ├── 心灯探梦.jpg
│   ├── 守护甜心.jpg
│   ├── 崩坠.jpg
│   └── 无衔之尾.png
├── 2024/... 和 2025/...       ← 15 篇旧文章（Hexo 生成的 HTML）
└── (Astro 项目待创建)
```

### 15 篇文章清单

旧文章是 Hexo 生成的 HTML，**不是 Markdown 源文件**。需要从 HTML 中提取内容转为 `.md`。

文章按路径分布在 `2024/` 和 `2025/` 目录下，分类包括：
- 游戏开发学习记录（DOTS/ECS、设计模式等）
- CS 公开课学习记录
- GAMES101 学习记录（光栅化、光追等）
- 技术记录（数据结构等）

---

## 🚀 执行计划

### Phase 1：项目初始化（从这里开始）

```bash
# 1. 确保 Node.js >= 18
node --version

# 2. 在 blog 目录中初始化 Astro（选择空模板）
cd blog
npm create astro@latest . -- --template minimal --no-install --no-git
npm install

# 3. 安装必要依赖
npm install @astrojs/mdx @astrojs/sitemap sharp
```

**注意**：初始化时不要覆盖 `docs/` 和 `images/` 目录。如果 Astro 初始化脚手架会冲突，先备份这两个目录。

### Phase 2：全局样式 + 布局

1. 创建 CSS 变量系统（配色方案见 SPEC）
2. 创建 `BaseLayout.astro`（导航 + 页脚 + 背景）
3. 背景使用 `鲸落地.png` 做固定背景 + 暗色叠加层
4. 毛玻璃卡片效果：`backdrop-filter: blur(12px); background: rgba(26, 39, 68, 0.6)`
5. 响应式断点：移动端 < 768px / 平板 768-1024px / 桌面 > 1024px

### Phase 3：页面开发

1. **首页**：Hero 区（头像+介绍+社交链接）+ 最新文章网格
2. **文章列表页**：分类筛选 + 卡片网格（封面图+标题+摘要+日期）
3. **文章详情页**：Markdown 渲染 + 右侧目录 + 代码高亮
4. **关于页**：个人介绍 + 技能标签 + 项目经历

### Phase 4：文章迁移

从 `2024/` 和 `2025/` 下的 HTML 文件中提取正文内容，转为 Astro content collection 的 `.md` 文件。每篇文章需要：

```markdown
---
title: "文章标题"
date: 2024-XX-XX
category: "分类"
tags: ["标签1", "标签2"]
cover: "/images/封面图.jpg"  # 如果有
description: "摘要"
---

正文内容...
```

### Phase 5：部署

1. `astro.config.mjs` 设置 `site` 和 `base`
2. 创建 `.github/workflows/deploy.yml`（GitHub Actions 自动部署）
3. 仓库 Settings → Pages → Source: GitHub Actions

---

## ⚠️ 已知问题和注意事项

1. **旧文章是 HTML 不是 Markdown** — 需要从 Hexo 生成的 HTML 中反向提取内容。如果用户能提供 Hexo 源文件（`source/_posts/*.md`），直接迁移会容易很多。**建议先问用户有没有 Hexo 的 Markdown 源文件。**

2. **图片文件名含中文** — `鲸落地.png`、`心灯探梦.jpg` 等。在 Astro 中使用时注意 URL 编码，或者重命名为英文。

3. **Node.js 环境** — 上一个 AI 尝试安装 Node 20.19.0 失败（权限问题）。确保当前环境有 Node >= 18。

4. **Git 分支** — 所有改动在 `redesign-astro` 分支上。不要合并到 main，等用户确认满意后再合。

5. **不要删除旧文件** — 在迁移完成并验证之前，保留所有 Hexo 生成的旧文件。

---

## 📐 设计规格

完整设计规格见 **`docs/SPEC.md`**，包含：
- 现状分析
- 目标定义
- 设计方向（配色、效果、布局）
- 页面结构
- 实现步骤

---

## 🧑 用户画像（帮你理解上下文）

- 游戏客户端/引擎开发者（C++/C#/Lua），不是前端开发者
- 博客内容是技术学习记录（UE、Unity DOTS、图形学、帧同步等）
- 偏好简洁直接的沟通，不要废话
- 审美偏日式/二次元
- 有完整的 AI 工作系统（双 Agent + Skill 体系），详见 skills-repo 的 SYSTEM_STATUS.md

---

## ✅ 验收标准

完成时需要满足：
1. [ ] Astro 项目能 `npm run build` 无错误
2. [ ] 15 篇旧文章全部可访问
3. [ ] 首页、文章列表、文章详情、关于页 4 个页面完整
4. [ ] 代码高亮正常工作
5. [ ] 移动端响应式正常
6. [ ] 深色主题 + 日式二次元风格
7. [ ] GitHub Pages 部署成功
8. [ ] Lighthouse Performance > 90

---

*本文档供接手的 AI 助手阅读。如有疑问，先读 SPEC.md，再问用户。*
