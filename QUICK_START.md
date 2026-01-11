# ⚡ 快速部署到 GitHub Pages

## 🎯 最简单的 3 步部署法

### 第 1 步：创建 GitHub 仓库

```bash
# 1. 在 GitHub 网站上创建一个新仓库（比如叫 cinematic-blog）

# 2. 在本地项目目录初始化 Git
cd cinematic-blog
git init
git add .
git commit -m "Initial commit"

# 3. 关联远程仓库（替换 YOUR_USERNAME 为你的用户名）
git remote add origin https://github.com/YOUR_USERNAME/cinematic-blog.git
git branch -M main
git push -u origin main
```

### 第 2 步：启用 GitHub Pages

1. 打开你的 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单点击 **Pages**
4. 在 **Build and deployment** 部分：
   - **Source** 选择：`GitHub Actions`
5. 系统会提示配置 workflow，点击 **Configure** 或者直接推送代码后会自动识别

### 第 3 步：等待部署完成

1. 点击仓库的 **Actions** 标签
2. 你会看到 `Deploy to GitHub Pages` 工作流正在运行
3. 等待 3-5 分钟，工作流完成后会显示绿色的 ✅
4. 访问你的网站：`https://YOUR_USERNAME.github.io/cinematic-blog/`

---

## 🎉 完成！

你的电影质感博客现在已经上线了！

## 📸 项目截图

- **首页**：电影海报风格的轮播展示
- **文章页**：优雅的阅读体验
- **项目页**：GitHub 项目集成
- **管理页**：简单的文章管理

## 🔄 自动更新

以后每次你推送代码到 `main` 分支，GitHub Actions 都会自动：
1. 构建新版本
2. 部署到 GitHub Pages
3. 几分钟后网站就会更新

## 🛠️ 本地开发

部署后，你仍然可以在本地继续开发：

```bash
# 本地运行（实时预览）
npm run dev

# 本地构建测试
NODE_ENV=production npm run build
npm run serve
```

## 💡 提示

- 首次部署可能需要等待 5-10 分钟
- 如果遇到问题，查看 Actions 页面的日志
- 确保 `next.config.js` 中的 `basePath` 和仓库名一致

---

需要详细说明？查看 [DEPLOYMENT.md](./DEPLOYMENT.md)
