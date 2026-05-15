# Guanshan.github.com

官山山的个人主页源码，部署在 `guanshan.github.io`。纯静态 HTML/CSS/JS，中英双语 + 亮/暗主题切换，无构建系统。

## 文案与定位的唯一源头

**所有文案改动先改 [`BRAND.md`](BRAND.md)，再同步到 `index.html`。**

BRAND.md 是这个站的品牌定位、Section 顺序、文案完整稿与架构演进建议。HTML 只是它的渲染层。

## 目录结构

```text
index.html              # 页面结构与文案
stylesheets/styles.css  # 视觉与布局
javascripts/main.js     # 主题、语言切换、动态 title/description
og-card.svg             # 社交分享卡片（1200×630）
favicon.svg             # 站点图标
params.json             # GitHub Pages 元数据
BRAND.md                # 品牌主源文档（先改这里）
```

## 页面 Section

`Hero → About → Technical Thesis → Focus & Expertise → Featured Work → Career Snapshot → Patents → Education → Contact`

Section 顺序与意图的说明详见 [`BRAND.md`](BRAND.md)。

## 自定义指南

1. **改文案**：先编辑 [`BRAND.md`](BRAND.md)，再同步到 [`index.html`](index.html)。每段都有 `.lang-zh` 与 `.lang-en` 两份。
2. **改样式**：编辑 [`stylesheets/styles.css`](stylesheets/styles.css)；色板与圆角等变量集中在文件顶部。
3. **改交互**：[`javascripts/main.js`](javascripts/main.js) 处理主题、语言切换、动态 `<title>` 与 `<meta description>`。
4. **新增 Section**：复制现有 `<section class="section">` 结构，补齐双语 span，必要时为新组件添加 class。
5. **资源缓存**：更新静态资源后调整 `index.html` 中 `?v=` 版本号以强制刷新 CDN。

## 部署

推送到 `master`（或 GitHub Pages 配置的发布分支），自动构建。首次发布几分钟内生效。

## 已落地的优化

- 顶部锚点导航 + 平滑滚动
- Open Graph / Twitter Card 社交卡片（`og-card.svg`）
- `<title>` 与 `<meta description>` 跟随语言切换动态更新
- 可访问性：`aria-label`、skip-to-content、`prefers-reduced-motion`

## 后续可选演进

- 文案抽到 JSON、HTML 仅保留骨架（详见 [`BRAND.md`](BRAND.md) 的 Tier 1 建议）
- 若要加博客或多页面再考虑 SSG（11ty / Astro）
