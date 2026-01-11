-- 创建文章表
CREATE TABLE IF NOT EXISTS articles (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

-- 创建评论表
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  articleId TEXT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

-- 创建项目表
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  githubUrl TEXT NOT NULL,
  demoUrl TEXT,
  language TEXT NOT NULL,
  topics TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

-- 创建管理员表
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_comments_articleId ON comments(articleId);
CREATE INDEX IF NOT EXISTS idx_projects_language ON projects(language);
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);

-- 启用行级安全策略（RLS）
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取
CREATE POLICY "允许所有人读取文章" ON articles FOR SELECT USING (true);
CREATE POLICY "允许所有人读取评论" ON comments FOR SELECT USING (true);
CREATE POLICY "允许所有人读取项目" ON projects FOR SELECT USING (true);
CREATE POLICY "允许所有人读取管理员" ON admin_users FOR SELECT USING (true);

-- 允许所有人插入评论
CREATE POLICY "允许所有人插入评论" ON comments FOR INSERT WITH CHECK (true);

-- 只有管理员可以修改文章
CREATE POLICY "只有管理员可以插入文章" ON articles FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "只有管理员可以更新文章" ON articles FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "只有管理员可以删除文章" ON articles FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- 只有管理员可以修改项目
CREATE POLICY "只有管理员可以插入项目" ON projects FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "只有管理员可以更新项目" ON projects FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "只有管理员可以删除项目" ON projects FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- 管理员表策略
CREATE POLICY "禁止直接插入管理员" ON admin_users FOR INSERT WITH CHECK (false);
CREATE POLICY "管理员可以更新管理员状态" ON admin_users FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid() AND is_admin = true
  )
);
