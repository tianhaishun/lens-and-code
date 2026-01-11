# 🚀 你的 Lens & Code 博客部署指南

## 📋 项目信息

- **仓库名**：`lens-and-code`
- **GitHub 用户名**：`tianhaishun`
- **部署后地址**：`https://tianhaishun.github.io/lens-and-code/`
- **博客主题**：镜头与代码 - 电影质感的个人博客

---

## ⚡ 快速部署（3 步完成）

### 第 1 步：创建 GitHub 仓库

1. 打开 [GitHub](https://github.com)
2. 点击右上角的 **+** → **New repository**
3. 填写仓库信息：
   - **Repository name**: `lens-and-code` （必须完全一致）
   - **Description**: 镜头与代码 - 电影质感的个人博客
   - **Public**: 选择 Public（必须公开才能部署到 GitHub Pages）
4. **不要**勾选 "Add a README file"
5. 点击 **Create repository**

### 第 2 步：推送代码到 GitHub

在你的项目目录执行：

```bash
cd /Users/justin/ZCodeProject/cinematic-blog

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Lens & Code blog"

# 添加远程仓库
git remote add origin https://github.com/tianhaishun/lens-and-code.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

**注意**：如果 push 时要求登录，GitHub 会提示你使用 Personal Access Token（更安全）或密码。

### 第 3 步：启用 GitHub Pages

1. 打开你的仓库：https://github.com/tianhaishun/lens-and-code
2. 点击 **Settings** 标签
3. 在左侧菜单找到 **Pages**
4. 在 **Build and deployment** 部分：
   - **Source**: 选择 `GitHub Actions`
5. 会看到提示说项目中有 workflow 配置文件
6. 保持默认设置，保存即可

### 第 4 步：等待自动部署

1. 点击仓库的 **Actions** 标签
2. 你会看到 `Deploy to GitHub Pages` 工作流正在运行
3. 等待 3-5 分钟，工作流完成后会显示绿色的 ✅
4. 访问你的博客：**https://tianhaishun.github.io/lens-and-code/**

---

## 🎉 完成！

你的电影质感博客现在上线了！

## 🔄 后续更新

每次你修改代码后，只需：

```bash
git add .
git commit -m "更新内容"
git push
```

GitHub Actions 会自动重新构建和部署，3-5分钟后网站就会更新。

## 📝 博客功能清单

### ✅ 已实现功能
- [x] 电影质感的首页设计（轮播展示）
- [x] 文章列表和详情页
- [x] 评论系统
- [x] 项目展示（已链接到你的 GitHub）
- [x] 管理后台（发布、编辑文章）
- [x] 关于页面
- [x] 响应式设计（手机、平板、电脑）
- [x] 优雅的动画效果

### 📸 示例文章
目前有 4 篇示例文章：
1. 探索电影质感的前端设计
2. TypeScript 进阶：类型体操的艺术
3. 摄影与编程：两个世界的交汇
4. Next.js 14 全栈开发实践

### 🎨 示例项目
目前有 4 个示例项目链接到你的 GitHub：
1. Cinematic Blog（本博客）
2. React Components Library
3. AI Image Generator
4. Portfolio Theme

---

## 🛠️ 自定义你的内容

### 1. 替换示例文章

编辑 `data/sampleData.ts`，将示例文章替换成你自己的内容：

```typescript
export const articles: Article[] = [
  {
    id: '1',
    title: '你的文章标题',
    excerpt: '文章摘要...',
    content: '你的文章内容...',
    author: 'Justin Tian',
    date: '2025-01-11',
    readTime: '5 分钟',
    category: '技术',
    coverImage: 'https://...',
    featured: true,
  },
  // ... 更多文章
]
```

### 2. 更新项目列表

同样在 `data/sampleData.ts` 中，替换 `projects` 数组为你真实的 GitHub 项目。

### 3. 修改个人信息

编辑以下文件：
- `components/Footer.tsx` - 页脚信息
- `app/about/page.tsx` - 关于页面
- `app/page.tsx` - 首页

### 4. 添加真实的图片

将图片放在 `public/images/` 目录，然后引用：
```typescript
coverImage: '/images/your-photo.jpg'
```

---

## 🌐 你的博客地址

- **主页**: https://tianhaishun.github.io/lens-and-code/
- **文章列表**: https://tianhaishun.github.io/lens-and-code/articles
- **项目展示**: https://tianhaishun.github.io/lens-and-code/projects
- **关于**: https://tianhaishun.github.io/lens-and-code/about
- **管理**: https://tianhaishun.github.io/lens-and-code/admin

---

## 💡 本地开发

部署后，你仍然可以在本地开发：

```bash
# 开发模式（实时预览）
npm run dev

# 访问 http://localhost:3000
```

本地开发时使用 `http://localhost:3000`，不会有 basePath，方便调试。

---

## 🐛 常见问题

### Q: 部署后页面空白？
A: 等待几分钟让 CDN 刷新。如果还是空白，检查 GitHub Actions 的日志。

### Q: 图片不显示？
A: 确保使用外部图片 URL（Unsplash 等）或放在 `public/` 目录。

### Q: 样式错乱？
A: 确保 `next.config.js` 中的 `basePath` 配置为 `/lens-and-code`。

### Q: 如何修改仓库名？
A: 如果改了仓库名，需要同步修改 `next.config.js` 中的 `basePath` 和 `assetPrefix`。

---

## 🎬 恭喜！

你的 **Lens & Code** 博客已经准备就绪！

开始创作吧！ 📸✨

---

**需要帮助？**
- 查看 [README.md](./README.md) 了解项目结构
- 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解详细部署信息
