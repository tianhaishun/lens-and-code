# 🎬 Cinematic Blog

一个具有电影质感和艺术风格的个人博客系统，使用 Next.js 和 Tailwind CSS 构建。

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Netlify-deployed-teal)](https://www.netlify.com/)

## ✨ 特性

- 🎨 **电影质感设计** - 暗色调主题，胶片颗粒效果，优雅的视觉体验
- 📝 **强大的编辑器** - 支持15+字体选择，8种格式化工具，实时预览
- 💬 **评论系统** - 每篇文章独立评论区，支持多行内容
- 🔐 **管理后台** - 文章CRUD、编辑、发布管理
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **SSR渲染** - 支持动态文章ID访问
- 🎭 **动画效果** - 流畅的过渡和交互动画

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Netlify (SSR)
- **数据存储**: LocalStorage (客户端持久化)

## 📦 快速开始

```bash
# 克隆项目
git clone https://github.com/your-username/cinematic-blog.git
cd cinematic-blog

# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 构建生产版本
npm run build
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 🎯 主要功能

### 1. 首页
- 电影海报风格的精选文章轮播
- 最新文章列表
- 项目展示预览
- 社交链接集成

### 2. 文章系统
- **文章列表**: 支持分类筛选（技术/设计/生活）
- **文章详情**: 优雅的阅读体验，支持动态路由
- **文章导航**: 上一篇/下一篇功能
- **评论功能**: 每篇文章独立评论区

### 3. 编辑器功能
- **15+字体选择**:
  - 衬线: Georgia, Times New Roman, Palatino
  - 无衬线: Arial, Helvetica, Segoe UI
  - 等宽: Courier New, Monaco
  - 中文: 微软雅黑, 宋体, 楷体

- **格式化工具**:
  - 标题、粗体、斜体
  - 引用、代码、链接
  - 分割线、列表

- **实时预览**: 所见即所得的编辑体验
- **自动保存**: 草稿自动保存到本地
- **文章统计**: 字数、阅读时间、段落数

### 4. 管理后台
- 登录验证（密码: `admin123`）
- 文章发布和编辑
- 文章删除管理
- 文章统计面板

## 📁 项目结构

```
cinematic-blog/
├── app/
│   ├── articles/
│   │   ├── [id]/
│   │   │   ├── page.tsx              # 文章详情服务端组件
│   │   │   └── ArticlePageClient.tsx  # 文章详情客户端组件
│   │   └── page.tsx                  # 文章列表页
│   ├── admin/
│   │   ├── page.tsx                  # 管理后台
│   │   └── editor/
│   │       └── page.tsx              # 文章编辑器
│   ├── projects/
│   │   └── page.tsx                  # 项目展示页
│   ├── about/
│   │   └── page.tsx                  # 关于页面
│   ├── globals.css                   # 全局样式和主题
│   ├── layout.tsx                    # 根布局
│   └── page.tsx                      # 首页
├── components/
│   ├── Navigation.tsx                # 导航栏组件
│   └── Footer.tsx                    # 页脚组件
├── data/
│   └── sampleData.ts                 # 示例文章和项目数据
├── lib/
│   └── types.ts                      # TypeScript 类型定义
├── public/                           # 静态资源
├── next.config.js                    # Next.js 配置
└── netlify.toml                      # Netlify 部署配置
```

## 🎨 设计系统

### 色彩方案
```css
cinema-black: #0a0a0a    /* 深黑背景 */
cinema-dark: #141414     /* 次级背景 */
cinema-gray: #1f1f1f     /* 卡片背景 */
cinema-gold: #d4af37     /* 金色强调 */
cinema-silver: #c0c0c0   /* 银色文本 */
```

### 电影质感效果
- **胶片颗粒**: CSS 动画模拟胶片质感
- **暗角效果**: 径向渐变创建电影暗角
- **过渡动画**: 优雅的页面切换效果

## 🚀 部署指南

### 方法一：Netlify 部署（推荐）

#### 1. 准备工作
- 确保代码已推送到 GitHub 仓库
- 注册 [Netlify](https://www.netlify.com) 账号

#### 2. 部署步骤

1. **登录 Netlify**
   - 使用 GitHub 账号登录 Netlify

2. **添加新站点**
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的 GitHub 仓库

3. **配置构建设置**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `20`

   或者直接使用项目根目录的 `netlify.toml` 配置文件（已包含）

4. **环境变量**（如需要）
   - 如有环境变量，在 Site settings → Environment variables 中配置

5. **部署**
   - 点击 "Deploy site"
   - Netlify 会自动构建并部署

6. **获取域名**
   - 部署完成后，Netlify 会提供一个随机域名
   - 可在 Domain settings 中绑定自定义域名

#### 3. 更新部署

每次推送到 `main` 分支时，Netlify 会自动触发重新部署。

### 方法二：Vercel 部署

1. 访问 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. Vercel 会自动检测 Next.js 并配置
5. 点击 "Deploy"

### 方法三：其他平台

项目也可以部署到：
- **GitHub Pages**: 需要修改为静态导出（`output: 'export'`）
- **Cloudflare Pages**: 支持 Next.js SSR
- **Railway**: 支持 Docker 部署
- **自托管**: 使用 `npm start` 运行生产服务器

## 🔧 配置说明

### 修改个人信息

编辑以下文件中的相关信息：

1. **作者信息**:
   - `data/sampleData.ts` - 文章作者名称
   - `app/admin/editor/page.tsx` - 默认作者名称

2. **GitHub 链接**:
   - 搜索所有 `tianhaishun` 替换为你的 GitHub 用户名
   - 修改 `data/sampleData.ts` 中的项目链接

3. **管理密码**:
   - `app/admin/page.tsx` 第 33 行的密码验证
   - 默认密码: `admin123`

### 自定义主题色

编辑 `app/globals.css` 中的 Tailwind 配置：

```css
@theme {
  --color-cinema-black: #0a0a0a;
  --color-cinema-gold: #d4af37;
  /* 修改这些颜色值 */
}
```

### 添加示例文章

编辑 `data/sampleData.ts`：

```typescript
export const articles: Article[] = [
  {
    id: '1',
    title: '你的文章标题',
    excerpt: '文章摘要',
    content: `# 文章内容\n\n这里是正文...`,
    author: '你的名字',
    date: '2025-01-12',
    readTime: '5 分钟',
    category: '技术',
    coverImage: 'https://你的封面图.jpg',
    featured: true,
  },
  // 添加更多文章...
];
```

## 🔐 安全注意事项

### 生产环境部署前必做

1. **修改默认密码**
   - 修改 `app/admin/page.tsx` 中的登录密码
   - 建议使用强密码

2. **数据存储**
   - 当前使用 LocalStorage 存储数据
   - 数据仅保存在用户浏览器中
   - 清除浏览器数据会丢失文章和评论
   - 如需持久化存储，考虑集成后端数据库

3. **环境变量**
   - 不要在代码中硬编码敏感信息
   - 使用部署平台的环境变量功能
   - `.env.local` 文件已添加到 `.gitignore`

4. **GitHub 仓库**
   - 检查是否包含敏感信息
   - 不要提交包含密码的文件
   - 使用 `.gitignore` 排除配置文件

## 📊 功能特性

### 已实现
- ✅ 文章发布、编辑、删除
- ✅ 富文本编辑器（15+字体、格式化工具）
- ✅ 评论系统
- ✅ 分类筛选
- ✅ 文章搜索
- ✅ 响应式设计
- ✅ SSR 渲染
- ✅ 管理后台

### 计划中
- 📧 Markdown 编辑器
- 🔍 全文搜索
- 🏷️ 标签系统
- 📊 访问统计
- 🌙 深色模式切换
- 🌍 国际化支持

## 🐛 常见问题

### Q: 为什么发布的文章刷新后消失？
A: 当前版本使用 LocalStorage 存储数据，数据保存在浏览器本地。如需持久化存储，需要集成后端数据库。

### Q: 如何备份文章和评论？
A: 可以使用浏览器开发者工具导出 LocalStorage 数据，或在管理后台手动备份。

### Q: 部署后文章无法访问？
A: 确保使用 SSR 模式部署（Netlify/Vercel），不要使用静态导出模式。

### Q: 如何修改默认字体？
A: 编辑 `app/admin/editor/page.tsx` 中的默认 `fontFamily` 状态值。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👨‍💻 作者

**Justin Tian** - [GitHub](https://github.com/tianhaishun)

## 🙏 致谢

- Next.js 团队
- Tailwind CSS 团队
- 所有开源贡献者

---

⭐ 如果这个项目对你有帮助，请给个 Star！

💡 **提示**: 这是个人博客项目，当前版本适合个人使用。如需用于生产环境，建议添加后端数据库和用户认证系统。
