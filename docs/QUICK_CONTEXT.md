# 🚀 chu's Blog — 快速上下文

> **复制这段话到新对话中即可继续开发**

---

## 项目位置

```
仓库：https://github.com/chu123122/blog.git
本地：c:\Users\chuxgao\WorkBuddy\20260413111416\blog
Node：C:\Users\chuxgao\.workbuddy\binaries\node\versions\22.12.0\node.exe
```

## 当前状态

Astro 6 博客，视觉风格「花と嵐」（暖白+花瓣+日系文学感），已完成：
- ✅ Phase 1~4：项目初始化、视觉确认、组件落地、15篇文章迁移
- ⏳ Phase 5：构建+部署（卡在这里）

## 需要继续做的事

### 1. 构建（之前 dist 被旧进程锁住导致空输出）
```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
$env:PATH = "C:\Users\chuxgao\.workbuddy\binaries\node\versions\22.12.0;$env:PATH"
cd c:\Users\chuxgao\WorkBuddy\20260413111416\blog
Remove-Item dist,.astro -Recurse -Force -ErrorAction SilentlyContinue
npx astro build
# 验证 dist/ 下有 HTML 文件
```

### 2. 推送到 GitHub（astro 分支，orphan 不继承 Hexo 历史）
```powershell
git checkout --orphan astro
git reset
git add .gitignore astro.config.mjs package.json package-lock.json tsconfig.json src/ docs/ .github/ public/
git commit -m "feat: astro blog with hanato-arashi theme"
git push -u origin astro
```

### 3. GitHub 仓库设置
- Settings → Pages → Source 改为 **GitHub Actions**
- 验证 https://chu123122.github.io/blog

## 关键文件

| 文件 | 说明 |
|------|------|
| `docs/PROGRESS.md` | 实时进度表 |
| `docs/HANDOFF.md` | AI 交接文档（30 秒速读 + 设计决策 + 下一步） |
| `docs/SPEC.md` | 验收契约 |
| `docs/TECHNICAL_DESIGN.md` | 技术参考（色彩/字体/组件/路由） |
| `docs/HARNESS_REVIEW.md` | Harness 10 问验证 |
| `docs/dev-log/phase1-3.md` | Phase 1~3 开发记录 |

## 审美红线（绝对不要违反）

- ✅ 暖白 `#faf8f5` + 花瓣 + 衬线体 + 隐藏细节
- ❌ 不要纯黑、霓虹、张扬大字、过度极简
- 参照：ヨルシカ / 村上春树 / 空洞骑士·泪城

## 注意事项

- `astro dev` 时 base=`/`，访问 `localhost:4321/`
- `astro build/preview` 时 base=`/blog`，访问 `localhost:4321/blog/`
- astro.config.mjs 中已自动切换
- 用户习惯 Harness 体系（SPEC→WORKFLOW→验证），所有变更记录到 docs/

---

**新对话提示词**：「请读取 `c:\Users\chuxgao\WorkBuddy\20260413111416\blog\docs\HANDOFF.md` 和 `docs\PROGRESS.md`，继续博客的 Phase 5 构建部署。」
