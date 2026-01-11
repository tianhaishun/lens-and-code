'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('articles');

  // 简单的密码验证
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('密码错误，提示：admin123');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cinema-black flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-cinema-dark p-8 rounded-lg border border-cinema-gray">
            <h1 className="cinema-title text-3xl text-cinema-gold mb-6 text-center">管理后台登录</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="password" className="block text-cinema-silver text-sm mb-2">
                  管理员密码
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-cinema-black border border-cinema-gray rounded px-4 py-3 text-white focus:outline-none focus:border-cinema-gold transition-colors"
                  placeholder="请输入密码 (admin123)"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-cinema-gold text-cinema-black font-semibold rounded hover:bg-cinema-gold/90 transition-colors"
              >
                登录
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const [articles, setArticles] = useState([
    {
      id: '1',
      title: '探索电影质感的前端设计',
      category: '设计',
      date: '2025-01-10',
      status: 'published',
    },
    {
      id: '2',
      title: 'TypeScript 进阶：类型体操的艺术',
      category: '技术',
      date: '2025-01-08',
      status: 'published',
    },
  ]);

  // New article form
  const [newArticle, setNewArticle] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '技术',
    coverImage: '',
    featured: false,
  });

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const article = {
      id: Date.now().toString(),
      ...newArticle,
      date: new Date().toISOString().split('T')[0],
      status: 'published',
    };
    setArticles([article, ...articles]);
    setNewArticle({
      title: '',
      excerpt: '',
      content: '',
      category: '技术',
      coverImage: '',
      featured: false,
    });
    alert('文章发布成功！');
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('确定要删除这篇文章吗？')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-cinema-black">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="cinema-title text-4xl text-white">管理后台</h1>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 bg-cinema-gray hover:bg-cinema-gold hover:text-cinema-black rounded transition-colors text-sm"
            >
              退出登录
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-cinema-gray">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-6 py-3 text-sm font-semibold transition-colors ${
                activeTab === 'articles'
                  ? 'text-cinema-gold border-b-2 border-cinema-gold'
                  : 'text-cinema-silver hover:text-white'
              }`}
            >
              文章管理
            </button>
            <button
              onClick={() => router.push('/admin/editor')}
              className="px-6 py-3 text-sm font-semibold transition-colors text-cinema-gold border-b-2 border-cinema-gold"
            >
              发布文章
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-6 py-3 text-sm font-semibold transition-colors ${
                activeTab === 'comments'
                  ? 'text-cinema-gold border-b-2 border-cinema-gold'
                  : 'text-cinema-silver hover:text-white'
              }`}
            >
              评论管理
            </button>
          </div>

          {/* Articles Tab */}
          {activeTab === 'articles' && (
            <div className="bg-cinema-dark rounded-lg border border-cinema-gray overflow-hidden">
              <div className="p-6 border-b border-cinema-gray">
                <h2 className="text-xl text-white">文章列表</h2>
              </div>
              <div className="divide-y divide-cinema-gray">
                {articles.map((article) => (
                  <div key={article.id} className="p-6 flex items-center justify-between hover:bg-cinema-gray/50 transition-colors">
                    <div className="flex-1">
                      <h3 className="text-lg text-white mb-1">{article.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-cinema-silver">
                        <span>{article.category}</span>
                        <span>{article.date}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          article.status === 'published' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                        }`}>
                          {article.status === 'published' ? '已发布' : '草稿'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => router.push(`/articles/${article.id}`)}
                        className="p-2 text-cinema-silver hover:text-cinema-gold transition-colors"
                        title="预览"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="p-2 text-cinema-silver hover:text-red-500 transition-colors"
                        title="删除"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create Article Tab */}
          {activeTab === 'create' && (
            <div className="bg-cinema-dark rounded-lg border border-cinema-gray p-6">
              <h2 className="text-xl text-white mb-6">发布新文章</h2>
              <form onSubmit={handleCreateArticle} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-cinema-silver text-sm mb-2">
                    标题
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="w-full bg-cinema-black border border-cinema-gray rounded px-4 py-2 text-white focus:outline-none focus:border-cinema-gold transition-colors"
                    placeholder="请输入文章标题"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-cinema-silver text-sm mb-2">
                    摘要
                  </label>
                  <textarea
                    id="excerpt"
                    value={newArticle.excerpt}
                    onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                    rows={3}
                    className="w-full bg-cinema-black border border-cinema-gray rounded px-4 py-2 text-white focus:outline-none focus:border-cinema-gold transition-colors resize-none"
                    placeholder="请输入文章摘要"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-cinema-silver text-sm mb-2">
                    内容
                  </label>
                  <textarea
                    id="content"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    rows={15}
                    className="w-full bg-cinema-black border border-cinema-gray rounded px-4 py-2 text-white focus:outline-none focus:border-cinema-gold transition-colors resize-none font-mono"
                    placeholder="请输入文章内容（支持 Markdown）"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-cinema-silver text-sm mb-2">
                      分类
                    </label>
                    <select
                      id="category"
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                      className="w-full bg-cinema-black border border-cinema-gray rounded px-4 py-2 text-white focus:outline-none focus:border-cinema-gold transition-colors"
                    >
                      <option value="技术">技术</option>
                      <option value="设计">设计</option>
                      <option value="生活">生活</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="coverImage" className="block text-cinema-silver text-sm mb-2">
                      封面图片 URL
                    </label>
                    <input
                      type="url"
                      id="coverImage"
                      value={newArticle.coverImage}
                      onChange={(e) => setNewArticle({ ...newArticle, coverImage: e.target.value })}
                      className="w-full bg-cinema-black border border-cinema-gray rounded px-4 py-2 text-white focus:outline-none focus:border-cinema-gold transition-colors"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newArticle.featured}
                    onChange={(e) => setNewArticle({ ...newArticle, featured: e.target.checked })}
                    className="w-4 h-4 bg-cinema-black border-cinema-gray rounded"
                  />
                  <label htmlFor="featured" className="text-cinema-silver text-sm">
                    设为精选文章
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-cinema-gold text-cinema-black font-semibold rounded hover:bg-cinema-gold/90 transition-colors"
                  >
                    发布文章
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewArticle({
                      title: '',
                      excerpt: '',
                      content: '',
                      category: '技术',
                      coverImage: '',
                      featured: false,
                    })}
                    className="px-6 py-3 bg-cinema-gray text-cinema-silver rounded hover:bg-cinema-gray/80 transition-colors"
                  >
                    重置
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div className="bg-cinema-dark rounded-lg border border-cinema-gray p-6">
              <h2 className="text-xl text-white mb-6">评论管理</h2>
              <div className="space-y-4">
                {[
                  { id: '1', author: 'Alex Chen', content: '这篇文章写得非常好！', article: '探索电影质感的前端设计', date: '2025-01-09' },
                  { id: '2', author: 'Sarah Wu', content: '期待更多内容', article: 'TypeScript 进阶', date: '2025-01-08' },
                ].map((comment) => (
                  <div key={comment.id} className="bg-cinema-black p-4 rounded border border-cinema-gray">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-semibold">{comment.author}</p>
                        <p className="text-cinema-gray text-xs">{comment.date}</p>
                      </div>
                      <button className="text-red-500 hover:text-red-400 text-sm">删除</button>
                    </div>
                    <p className="text-cinema-silver text-sm mb-2">{comment.content}</p>
                    <p className="text-cinema-gold text-xs">文章: {comment.article}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
