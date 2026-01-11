# Vercel 部署问题修复指南

## 问题诊断

虽然构建成功，但域名无法访问，这通常是因为：
1. Vercel 项目没有正确连接到 GitHub 仓库
2. 项目配置有误
3. 域名还没有生效

---

## ✅ 解决方案 A：重新配置 Vercel（推荐）

### 步骤 1：删除现有 Vercel 项目
1. 访问 https://vercel.com/dashboard
2. 找到 `lens-and-code` 项目
3. 点击 Settings → General → Delete Project

### 步骤 2：重新导入项目
1. 在 Vercel Dashboard 点击 "Add New"
2. 选择 "Project"
3. 点击 "Import Git Repository"
4. 输入：`tianhaishun/lens-and-code`
5. 或从你的 GitHub 列表中选择

### 步骤 3：配置项目
- **Framework Preset**: Next.js（自动检测）
- **Root Directory**: `./`（留空）
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 步骤 4：添加环境变量（可选）
如果使用 Supabase：
```
NEXT_PUBLIC_SUPABASE_URL = 你的 Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY = 你的 Supabase Key
```

### 步骤 5：部署
点击 "Deploy" 按钮

---

## ✅ 解决方案 B：使用 Netlify（更简单）

Netlify 通常配置更简单且更稳定：

### 步骤 1：访问 Netlify
https://app.netlify.com/start

### 步骤 2：连接 GitHub
1. 点击 "Add new site" → "Import an existing project"
2. 选择 "GitHub" 并授权
3. 选择 `tianhaishun/lens-and-code` 仓库

### 步骤 3：配置构建设置
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Branch to deploy**: `main`

### 步骤 4：部署
点击 "Deploy site"

Netlify 会提供一个类似 `random-name.netlify.app` 的域名

---

## ✅ 解决方案 C：本地测试

在重新部署前，先本地测试确保一切正常：

```bash
cd /Users/justin/ZCodeProject/cinematic-blog

# 清理并重新构建
rm -rf .next node_modules
npm install
npm run build

# 本地预览生产版本
npm start
```

访问 http://localhost:3000 确认博客正常显示

---

## 🔍 验证部署成功

部署成功后，你应该看到：
- ✅ 电影质感的首页（不是 README）
- ✅ 导航栏（首页、文章、项目、关于）
- ✅ 轮播的文章展示
- ✅ 优雅的暗色调主题

---

## 💡 推荐

如果 Vercel 继续有问题，**我强烈推荐使用 Netlify**：
- ✅ 配置更简单
- ✅ 部署更稳定
- ✅ 免费额度更慷慨
- ✅ 对 Next.js 支持完美

需要我帮你配置 Netlify 吗？
