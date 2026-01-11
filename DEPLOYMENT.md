# 🚀 GitHub Pages 部署指南

本指南将帮助你将 Cinematic Blog 部署到 GitHub Pages。

## 📋 前置要求

- GitHub 账号
- 本地安装了 Git
- Node.js 和 npm 已安装

## 🎯 部署步骤

### 方法一：使用 GitHub Actions 自动部署（推荐）

#### 1. 创建 GitHub 仓库

```bash
# 在 GitHub 上创建一个新仓库，比如名为 cinematic-blog
# 然后在本地项目目录执行：
cd cinematic-blog
git init
git add .
git commit -m "Initial commit"
```

#### 2. 关联远程仓库

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/cinematic-blog.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 3. 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单找到 **Pages**
4. 在 **Build and deployment** 部分：
   - **Source**: 选择 `GitHub Actions`
5. 点击保存

#### 4. 配置 GitHub Actions

项目已经包含了 `.github/workflows/deploy.yml` 文件，它会：
- 自动构建项目
- 部署到 GitHub Pages
- 每次推送代码到 main 分支时自动重新部署

#### 5. 首次部署

推送代码后，GitHub Actions 会自动开始部署：

1. 点击仓库的 **Actions** 标签查看部署进度
2. 等待几分钟，部署完成后会显示绿色✅
3. 访问 `https://YOUR_USERNAME.github.io/cinematic-blog/` 查看你的网站

### 方法二：手动部署

如果你想手动控制部署过程：

#### 1. 构建项目

```bash
cd cinematic-blog
NODE_ENV=production npm run build
```

#### 2. 安装 gh-pages 包

```bash
npm install --save-dev gh-pages
```

#### 3. 在 package.json 添加部署脚本

在 `package.json` 的 `scripts` 部分添加：

```json
{
  "scripts": {
    "deploy": "gh-pages -d out -b gh-pages"
  }
}
```

#### 4. 部署

```bash
npm run deploy
```

## 🔧 配置说明

### basePath 和 assetPrefix

在 `next.config.js` 中配置了：

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/cinematic-blog' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/cinematic-blog' : '',
```

如果你的仓库名不是 `cinematic-blog`，需要修改这两行为你的仓库名。

### 静态导出配置

项目已配置为静态导出模式：

```javascript
output: 'export',           // 导出静态 HTML
trailingSlash: true,        // URL 结尾添加斜杠
images: {
  unoptimized: true,        // 禁用图片优化（GitHub Pages 不支持）
}
```

## 🌐 访问你的网站

部署成功后，你的网站可以通过以下地址访问：

```
https://YOUR_USERNAME.github.io/cinematic-blog/
```

## 🔄 自动部署配置

一旦设置了 GitHub Actions，每次你推送代码到 `main` 分支时：

1. GitHub Actions 会自动触发
2. 构建新的版本
3. 自动部署到 GitHub Pages
4. 几分钟后你的网站就会更新

## 📝 自定义域名（可选）

如果你想使用自己的域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容填写你的域名（如：`www.yourdomain.com`）
3. 在域名提供商处配置 DNS 记录
4. 在 GitHub Pages 设置中配置自定义域名

## 🐛 常见问题

### 1. 部署后页面空白

检查 `basePath` 是否正确配置为你的仓库名。

### 2. 图片不显示

确保使用的是外部图片 URL（如 Unsplash），GitHub Pages 不支持本地图片优化。

### 3. 链接 404

确保所有链接都使用了正确的 basePath，或者使用相对路径。

### 4. GitHub Actions 失败

查看 Actions 日志，通常是构建错误或权限问题。确保仓库设置中启用了 GitHub Pages。

## 📦 文件结构

部署后的 `out` 目录结构：

```
out/
├── index.html
├── articles/
│   ├── index.html
│   └── 1/
│       └── index.html
├── projects/
│   └── index.html
├── admin/
│   └── index.html
├── about/
│   └── index.html
└── _next/
    └── static/
```

## 🎉 完成！

恭喜！你的电影质感博客现在已经部署到 GitHub Pages 上了。

---

需要帮助？查看 [GitHub Pages 官方文档](https://docs.github.com/pages) 或 [Next.js 部署文档](https://nextjs.org/docs/deployment)
