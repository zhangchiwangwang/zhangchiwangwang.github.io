# Zhangchi Wang — Portfolio

英文个人作品集网站（美本申请用）。纯静态 HTML/CSS/JS，无需构建，可直接部署到 GitHub Pages。

## 页面结构

| 文件 | 内容 |
|---|---|
| `index.html` | 首页 About / Resume（简介、数据、四个板块入口） |
| `racer.html` | 01 Racer（RC 赛车经历） |
| `maker.html` | 02 Maker（科创与专利） |
| `educator.html` | 03 Educator（STEM 教育公平计划） |
| `artist.html` | 04 Artist（绘画与书法） |
| `assets/` | 样式、脚本与全部图片 |

## 上传到 GitHub 并开启 Pages

1. 在 GitHub 新建仓库，例如 `portfolio`（若想用 `用户名.github.io` 作为主站，仓库名就取 `用户名.github.io`）。
2. 把本文件夹**内的所有文件**（含 `index.html`、`assets/` 等）上传到仓库根目录：
   - 命令行：
     ```bash
     git init
     git add .
     git commit -m "Portfolio site"
     git branch -M main
     git remote add origin https://github.com/你的用户名/portfolio.git
     git push -u origin main
     ```
   - 或直接在仓库页面点 **Add file → Upload files**，把整个文件夹拖进去。
3. 仓库 **Settings → Pages → Source** 选择 `Deploy from a branch`，分支选 `main`、目录选 `/(root)`，保存。
4. 等 1–2 分钟，访问 `https://你的用户名.github.io/portfolio/`（或 `https://你的用户名.github.io/`）即可。

> 注意：`index.html` 必须位于仓库根目录；所有链接均为相对路径，项目页（子路径）下也能正常打开。

## 本地预览

直接双击 `index.html`，或在文件夹内运行：

```bash
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```
