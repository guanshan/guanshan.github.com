# Guanshan.github.com

官山山的个人主页源码，部署在 `guanshan.github.io`。页面以纯静态 HTML/CSS/JS 构建，提供中英双语内容和亮/暗主题切换。

## ✨ 主要特性

- 玻璃拟态风格的响应式布局，默认展示中文，支持一键切换到英文。
- 主题开关支持系统偏好检测与 Shift 点击恢复跟随系统。
- 主页涵盖简介、代表项目、经历、专利、教育与联系方式模块，可按需扩展。
- 无后端依赖，仅使用 GitHub Pages 即可发布。

## 🗂 目录结构

```
index.html            # 页面结构与文案
stylesheets/styles.css # 视觉样式与布局
javascripts/main.js    # 主题与语言切换逻辑
params.json            # GitHub Pages 生成器的保留文件（勿删）
```

旧版模板遗留的字体、图片已清理，仅保留当前所需资源。

## 🛠 自定义指南

1. **文案与链接**：直接编辑 [`index.html`](index.html) 中的对应段落，中文和英文各有一段。
2. **样式调整**：在 [`stylesheets/styles.css`](stylesheets/styles.css) 中修改色板、阴影或布局变量。
3. **交互逻辑**：若需改动主题/语言开关行为，请查看 [`javascripts/main.js`](javascripts/main.js)。
4. **新增模块**：复制现有 `<section>` 结构并补齐 `.lang-zh` / `.lang-en` 文案即可。
5. **缓存提示**：更新静态资源后记得调整 `index.html` 中的 `?v=` 版本号，以便强制刷新线上缓存。

## 🚀 部署

将改动提交并推送到 `master`（或仓库配置的发布分支），GitHub Pages 会自动构建并更新站点。首次发布可能需要数分钟生效。

## ✅ 建议检查项

- 替换代表项目、经历、专利等区块的占位内容。
- 更新联系方式（邮箱、GitHub、所在地等）。
- 确认中英双语文案同步且语义准确。
- 部署后强制刷新浏览器缓存（例如 `⌘⇧R` 或 `Ctrl+F5`）核对外观。

欢迎继续扩展这个页面，让它展示更多你想分享的内容。💡
