# chu's Blog · AI 交接文档

> **最后更新**：2026-04-13
> **当前状态**：Phase 5 进行中（Cloudflare Pages 部署，待确认 CF 项目分支配置）
> **分支**：`redesign-astro`
> **仓库**：https://github.com/chu123122/blog.git
> **线上地址**：https://blog-b9l.pages.dev

---

## 📋 30 秒速读

博客从 Hexo 迁移到 Astro 6。视觉风格「花と嵐」已确定并落地——暖白底色、飘落花瓣、日系文学感。16 篇文章已迁移为 MD。构建已通过（20 页，2.32s）。部署方案为 **Cloudflare Pages**（自动监听 GitHub push）。GitHub Actions 仅做 CI 构建检查。当前需确认 Cloudflare Pages 项目绑定的分支为 `redesign-astro`。

---

## 🎯 已确定的设计决策（不要推翻）

| 决策 | 内容 | 原因 |
|------|------|------|
| 技术栈 | Astro 6 + MDX + Cloudflare Pages | 静态博客最佳方案，用户已确认 |
| 视觉风格 | 花と嵐（A+A2 融合） | 经过 10+ 套 demo 对比后确认 |
| 底色 | `#faf8f5` 暖白 | 用户明确不要纯黑 |
| 字体 | Shippori Mincho / Noto Serif SC / Zen Old Mincho / Noto Sans SC | 日系文学感 |
| 花瓣 | 12 片，不透明度 18%~35%，自然可见 | 用户喜欢 A 方案的花瓣程度 |
| 分类色条 | 图形=赤 `#c47b6b` / 技术=蓝 `#7b9bb5` / 游戏=绿 `#8baa7d` | A2 方案确认 |
| 隐藏细节 | 竖排日文、hero 小字、footer 彩蛋，hover 渐显 | 用户核心审美："克制但不寡淡，细节暗藏在缝隙里" |
| base 路径 | 统一 `/`（无子路径） | Cloudflare Pages 部署在根路径 |
| 部署 | Cloudflare Pages（自动），GitHub Actions 仅 CI | 用户原有 CF 项目 `blog` |

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
- [x] Phase 4：16 篇旧文章 HTML→MD 迁移
- [x] astro build 通过（20 页，2.32s）
- [x] 修复 2 处断裂图片路径
- [x] astro.config.mjs 切换到 Cloudflare Pages
- [x] GitHub Actions 简化为 CI-only

## 🚀 下一步（从这里开始）

### 确认 Cloudflare Pages 配置

1. 登录 Cloudflare Dashboard → Pages → `blog` 项目
2. 确认 **Production branch** 设为 `redesign-astro`（或等合并到 `main`）
3. 确认 **Build settings**：
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 如果配置正确，push 已触发，等待部署完成
5. 验证 https://blog-b9l.pages.dev

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
4. [ ] Cloudflare Pages 部署成功，https://blog-b9l.pages.dev 可访问
5. [ ] 响应式在移动端正常工作

---

*本文档供接手的 AI 助手阅读。如有疑问，先读 SPEC.md，再问用户。*
