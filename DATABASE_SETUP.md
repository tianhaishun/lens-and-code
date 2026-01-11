# 数据库设置指南

## 1. 在 Supabase 创建表

登录 Supabase 控制台：https://kftgoananyndzkztqlnn.supabase.co

### 方法 1: 使用 SQL 编辑器

1. 点击左侧菜单的 "SQL Editor"
2. 点击 "New Query"
3. 复制 `supabase/schema.sql` 文件内容
4. 粘贴到编辑器
5. 点击 "Run" 执行

### 方法 2: 使用 Table Editor

你也可以手动创建表，但建议使用 SQL 脚本一次性创建所有表和策略。

## 2. 设置第一个管理员

### 步骤 1: 注册账号

1. 访问你的博客 `/admin` 页面
2. 点击"还没有账号？立即注册"
3. 输入邮箱和密码注册

### 步骤 2: 获取用户 ID

注册成功后，系统会显示你的用户 ID，复制它。

### 步骤 3: 在 Supabase 设置管理员权限

1. 在 Supabase 控制台，点击 "Table Editor"
2. 选择 `admin_users` 表
3. 点击 "Insert row"
4. 输入：
   - `user_id`: 你的用户 ID（UUID格式）
   - `is_admin`: true
5. 点击 "Save"

### 或者使用 SQL 设置管理员

在 SQL Editor 中执行：

```sql
-- 替换为你的实际用户 ID
INSERT INTO admin_users (user_id, is_admin)
VALUES ('你的用户ID', true);
```

## 3. Google Analytics 设置

### 步骤 1: 创建 GA 账号

1. 访问 https://analytics.google.com
2. 创建账号和媒体资源
3. 获取跟踪 ID（格式：G-XXXXXXXXXX）

### 步骤 2: 更新环境变量

在本地开发，更新 `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

在 Netlify 部署：

1. 登录 Netlify 控制台
2. 选择你的站点
3. 点击 "Site settings" → "Build & deploy" → "Environment"
4. 添加环境变量：
   - Key: `NEXT_PUBLIC_GA_ID`
   - Value: 你的 GA 跟踪 ID

## 4. Netlify 环境变量配置

在 Netlify 控制台添加以下环境变量：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://kftgoananyndzkztqlnn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_LV_rZV1frmRaefR_vPZSYA_0He810mp
NEXT_PUBLIC_GA_ID=你的GA跟踪ID
```

## 5. 数据迁移（从 localStorage 到 Supabase）

如果你想将现有的 localStorage 文章迁移到数据库：

1. 在浏览器控制台运行：
```javascript
const articles = JSON.parse(localStorage.getItem('publishedArticles') || '[]');
console.log(JSON.stringify(articles, null, 2));
```

2. 复制输出的 JSON
3. 在 Supabase Table Editor 中手动添加文章
4. 或者使用我们即将提供的迁移脚本

## 6. 测试

### 测试管理员权限

1. 用管理员账号登录 → 应该可以访问后台
2. 用普通用户账号登录 → 应该显示"权限不足"

### 测试文章管理

1. 作为管理员创建文章
2. 在文章列表查看
3. 编辑和删除文章

### 测试评论

1. 在文章页面发表评论
2. 检查是否存储在 Supabase

## 7. 安全检查清单

- ✅ 所有表都启用了 RLS（行级安全）
- ✅ 只有管理员可以修改文章
- ✅ 所有人都可以查看文章和评论
- ✅ 环境变量不会暴露在客户端代码中
- ✅ Supabase Anon Key 有适当的权限限制

## 8. 故障排除

### 问题：无法访问管理后台

**解决方案**：
1. 检查 `admin_users` 表是否有你的记录
2. 确认 `is_admin` 字段为 `true`
3. 在浏览器控制台检查用户 ID

### 问题：文章无法保存到 Supabase

**解决方案**：
1. 检查 RLS 策略是否正确设置
2. 确认用户有管理员权限
3. 查看 Supabase Logs 查看错误信息

### 问题：Google Analytics 不工作

**解决方案**：
1. 检查环境变量是否设置
2. 在浏览器查看源代码，搜索 `gtag` 是否存在
3. 使用 GA Debugger 扩展检查

## 需要帮助？

如果遇到问题，请检查：
1. Supabase Logs: https://kftgoananyndzkztqlnn.suplify.co/logs
2. Netlify Deploy Logs
3. 浏览器控制台错误信息
