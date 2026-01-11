# 🚀 Vercel + Supabase 部署指南

本指南将帮助你将 Cinematic Blog 部署到 Vercel 并集成 Supabase 数据库。

## 📋 前置要求

- GitHub 账号（用于 Vercel 导入）
- Supabase 账号（免费）

---

## 🎯 第一步：创建 Supabase 项目

### 1. 注册并创建项目

1. 访问 [Supabase](https://supabase.com)
2. 点击 **"New Project"**
3. 填写信息：
   - **Name**: `cinematic-blog`
   - **Database Password**: 设置一个强密码（保存好！）
   - **Region**: 选择离你最近的区域（如 `Singapore` 或 `Tokyo`）
4. 点击 **"Create new project"**（等待 2-3 分钟）

### 2. 创建数据库表

1. 在项目仪表板，点击左侧 **"SQL Editor"**
2. 点击 **"New Query"**
3. 复制 `supabase/schema.sql` 的内容并粘贴
4. 点击 **"Run"** 执行 SQL

或者直接上传 `supabase/schema.sql` 文件。

### 3. 获取 API 密钥

1. 点击左侧 **"Project Settings"** → **"API"**
2. 复制以下信息：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 🌐 第二步：部署到 Vercel

### 1. 连接 GitHub

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 **"Add New..."** → **"Project"**

### 2. 导入仓库

1. 点击 **"Import Git Repository"**
2. 输入仓库地址：`https://github.com/tianhaishun/lens-and-code`
3. 或者选择你的 GitHub 账号下的 `lens-and-code` 仓库

### 3. 配置项目

**Framework Preset**: Next.js (自动检测)

**Environment Variables**:
点击 **"Environment Variables"** 添加以下变量：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | 你的 Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 你的 Supabase anon public key |

### 4. 部署

1. 点击 **"Deploy"**
2. 等待 3-5 分钟
3. 部署成功后会获得一个 `.vercel.app` 域名

---

## 🌱 第三步：初始化数据库

### 方式一：使用 Vercel 环境（推荐）

在 Vercel 项目中：

1. 进入 **Settings** → **Environment Variables**
2. 添加 Supabase 环境变量（同上）
3. 重新部署项目

然后访问：`https://你的域名.com/api/seed`（需要创建这个 API 路由）

### 方式二：本地运行

1. 创建 `.env.local` 文件：
```bash
cp .env.local.example .env.local
```

2. 填入你的 Supabase 凭证信息

3. 运行初始化脚本：
```bash
npm run db:seed
```

---

## 📝 第四步：配置自定义域名（可选）

### 在 Vercel 中：

1. 进入项目 **Settings** → **Domains**
2. 添加自定义域名（如 `blog.yourdomain.com`）
3. 按照提示配置 DNS 记录

---

## ✅ 完成部署

### 访问你的博客

- **Vercel 部署地址**: `https://lens-and-code.vercel.app` 或你配置的自定义域名
- **Supabase 控制台**: https://supabase.com/dashboard

### 功能清单

✅ **数据库持久化**
- 文章存储在 Supabase
- 评论支持实时存储
- 项目信息数据库管理

✅ **动态内容**
- 可以通过管理后台添加文章
- 评论真实保存到数据库
- 支持后续添加用户认证

✅ **自动部署**
- 推送代码到 GitHub 自动触发部署
- Vercel 提供全球 CDN 加速
- 零配置 HTTPS

---

## 🔧 本地开发

### 设置环境变量

1. 创建 `.env.local` 文件：
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. 运行开发服务器：
```bash
npm run dev
```

### 初始化数据库（首次运行）

```bash
npm run db:seed
```

---

## 🎨 数据库管理

### 查看数据

1. 登录 Supabase 控制台
2. 点击 **Table Editor** 查看所有表
3. 可以直接编辑、添加、删除数据

### 备份数据

1. 点击 **Database** → **Backups**
2. 创建定期备份任务

---

## 🚀 下一步

### 添加用户认证

Supabase 提供开箱即用的用户认证：

```typescript
import { supabase } from '@supabase/supabase-js'

// 用户注册
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
})

// 用户登录
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
})
```

### 实时订阅

使用 Supabase Realtime 功能：

```typescript
// 订阅新评论
const channel = supabase
  .channel('public:comments')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, payload => {
    console.log('新评论:', payload.new)
  })
  .subscribe()
```

---

## 📚 相关资源

- [Vercel 文档](https://vercel.com/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Next.js 文档](https://nextjs.org/docs)

---

**需要帮助？** 查看 [README.md](./README.md) 或 [DEPLOYMENT.md](./DEPLOYMENT.md)
