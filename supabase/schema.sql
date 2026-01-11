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

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_comments_articleId ON comments(articleId);
CREATE INDEX IF NOT EXISTS idx_projects_language ON projects(language);

-- 启用行级安全策略（RLS）
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取
CREATE POLICY "允许所有人读取文章" ON articles FOR SELECT USING (true);
CREATE POLICY "允许所有人读取评论" ON comments FOR SELECT USING (true);
CREATE POLICY "允许所有人读取项目" ON projects FOR SELECT USING (true);

-- 允许所有人插入评论（需要实际的认证系统来限制）
CREATE POLICY "允许所有人插入评论" ON comments FOR INSERT WITH CHECK (true);

-- 管理员可以修改文章和项目（需要配置实际的认证）
-- 这里暂时允许所有人，生产环境需要配置正确的策略
CREATE POLICY "允许所有人插入文章" ON articles FOR INSERT WITH CHECK (true);
CREATE POLICY "允许所有人更新文章" ON articles FOR UPDATE USING (true);
CREATE POLICY "允许所有人删除文章" ON articles FOR DELETE USING (true);
CREATE POLICY "允许所有人插入项目" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "允许所有人更新项目" ON projects FOR UPDATE USING (true);
CREATE POLICY "允许所有人删除项目" ON projects FOR DELETE USING (true);
