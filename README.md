# 🎬 Cinematic Blog

一个具有电影质感和艺术风格的个人博客系统，使用 Next.js 和 Tailwind CSS 构建。

## ✨ 特性

- 🎨 **电影质感设计** - 暗色调主题，胶片颗粒效果，优雅的视觉体验
- 📝 **文章管理** - 支持发布、编辑、删除文章
- 💬 **评论系统** - 每篇文章都有独立的评论区
- 🚀 **项目展示** - 展示个人 GitHub 项目
- 📱 **响应式设计** - 完美适配各种设备
- ⚡ **性能优化** - 基于 Next.js 14 的最新特性

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: 支持 Vercel 一键部署

## 📦 安装

```bash
# 克隆项目
git clone <repository-url>
cd cinematic-blog

# 安装依赖
npm install

# 运行开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 🎯 主要功能

### 1. 首页
- 电影海报风格的精选文章轮播
- 最新文章列表
- 项目展示预览
- GitHub 链接集成

### 2. 文章系统
- 文章列表页（支持分类筛选）
- 文章详情页（优雅的阅读体验）
- 文章导航（上一篇/下一篇）
- 评论功能

### 3. 项目展示
- GitHub 项目展示
- 项目统计信息（stars、forks）
- 技术栈标签
- 直接链接到 GitHub

### 4. 管理后台
- 文章发布和编辑
- 评论管理
- 文章状态管理

## 📁 项目结构

```
cinematic-blog/
├── app/
│   ├── articles/
│   │   ├── [id]/
│   │   │   └── page.tsx      # 文章详情页
│   │   └── page.tsx          # 文章列表页
│   ├── projects/
│   │   └── page.tsx          # 项目展示页
│   ├── admin/
│   │   └── page.tsx          # 管理后台
│   ├── about/
│   │   └── page.tsx          # 关于页面
│   ├── globals.css           # 全局样式
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 首页
├── components/
│   ├── Navigation.tsx        # 导航组件
│   └── Footer.tsx            # 页脚组件
├── data/
│   └── sampleData.ts         # 示例数据
├── lib/
│   └── types.ts              # TypeScript 类型定义
└── public/                   # 静态资源
```

## 🎨 设计理念

### 电影质感效果
- **胶片颗粒效果** - 使用 CSS 动画模拟胶片质感
- **暗角效果** - 径向渐变创建电影般的暗角
- **扫描线效果** - 微妙的扫描线增加复古感
- **优雅的排版** - 使用 Georgia 字体营造电影标题感

### 色彩方案
- `cinema-black`: #0a0a0a - 深黑背景
- `cinema-dark`: #141414 - 次级背景
- `cinema-gray`: #1f1f1f - 卡片背景
- `cinema-gold`: #d4af37 - 金色强调色
- `cinema-silver`: #c0c0c0 - 银色文本

## 🚀 部署

### GitHub Pages 部署（免费）

项目已配置为静态导出，可以轻松部署到 GitHub Pages：

#### 方法一：自动部署（推荐）

1. 创建 GitHub 仓库并推送代码
2. 在仓库 Settings → Pages 中启用 GitHub Actions
3. 推送代码，GitHub Actions 会自动构建并部署

详细步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

#### 方法二：快速部署

```bash
# 运行部署脚本
./deploy.sh
```

### Vercel 部署（推荐用于生产环境）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 会自动检测 Next.js 并进行部署

### 其他平台

项目可以部署到任何支持静态网站或 Next.js 的平台：
- Netlify
- AWS S3 + CloudFront
- Google Cloud
- Azure Static Web Apps

## 📝 自定义

### 修改 GitHub 链接

在所有文件中将 `https://github.com/tianhaishun` 替换为你的 GitHub 地址。

### 添加自己的文章

编辑 `data/sampleData.ts` 文件，添加你自己的文章内容。

### 修改主题色

编辑 `tailwind.config.js` 和 `app/globals.css` 来自定义颜色方案。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

Justin Tian - [GitHub](https://github.com/tianhaishun)

---

⭐ 如果这个项目对你有帮助，请给个 Star！
