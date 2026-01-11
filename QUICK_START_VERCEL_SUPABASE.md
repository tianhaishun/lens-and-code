# ⚡ 快速部署到 Vercel + Supabase

## 🎯 5 分钟完成部署

### 步骤 1: 创建 Supabase 项目（2 分钟）

1. **访问**: https://supabase.com
2. **点击**: "New Project"
3. **填写**:
   - Name: `cinematic-blog`
   - Password: 设置强密码（保存！）
   - Region: Singapore
4. **等待**: 2-3 分钟创建完成

### 步骤 2: 配置数据库（1 分钟）

1. **打开**: Supabase Dashboard → SQL Editor
2. **创建表**: 复制以下 SQL 并执行

```sql
CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  readTime TEXT NOT NULL,
  category TEXT NOT NULL,
  coverImage TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  articleId TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  githubUrl TEXT NOT NULL,
  demoUrl TEXT,
  language TEXT NOT NULL,
  topics TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. **获取密钥**:
   - Settings → API → Copy URL
   - Settings → API → Copy anon public key

### 步骤 3: 部署到 Vercel（2 分钟）

1. **访问**: https://vercel.com/new
2. **导入**: 选择你的 GitHub 仓库 `tianhaishun/lens-and-code`
3. **配置**:
   - Framework: Next.js (自动检测)
   - Environment Variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=你的Supabase URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase Key
     ```
4. **点击**: Deploy

---

## ✅ 完成！

你的博客现在运行在：
- **Vercel**: `https://lens-and-code.vercel.app` (或自定义域名)
- **数据库**: Supabase (持久化存储)

---

## 📱 初始化示例数据

### 本地运行：

```bash
# 创建 .env.local
cp .env.local.example .env.local

# 填入 Supabase 凭证
nano .env.local

# 运行种子脚本
npm run db:seed
```

---

## 🎨 访问你的博客

- **博客**: https://lens-and-code.vercel.app
- **Supabase Dashboard**: https://supabase.com/dashboard
- **GitHub**: https://github.com/tianhaishun/lens-and-code

---

## 🚀 自动更新

以后每次推送代码到 GitHub，Vercel 会自动重新部署！

---

**需要详细说明？** 查看 [DEPLOY_VERCEL_SUPABASE.md](./DEPLOY_VERCEL_SUPABASE.md)
