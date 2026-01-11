'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { articles as sampleArticles } from '@/data/sampleData';

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('articles');

  // 从 localStorage 加载已发布的文章
  const [articles, setArticles] = useState<typeof sampleArticles>([]);

  useEffect(() => {
    // 加载示例文章 + 已发布的文章
    const published = JSON.parse(localStorage.getItem('publishedArticles') || '[]');
    setArticles([...sampleArticles, ...published]);
  }, []);

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

  const handleDeleteArticle = (id: string) => {
    if (confirm('确定要删除这篇文章吗？')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-cinema-black flex flex-col">
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
            <div className="space-y-6">
              {/* 统计卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-cinema-dark p-6 rounded-lg border border-cinema-gray">
                  <div className="text-cinema-silver text-sm mb-1">总文章数</div>
                  <div className="text-3xl font-bold text-cinema-gold">{articles.length}</div>
                </div>
                <div className="bg-cinema-dark p-6 rounded-lg border border-cinema-gray">
                  <div className="text-cinema-silver text-sm mb-1">技术文章</div>
                  <div className="text-3xl font-bold text-white">
                    {articles.filter(a => a.category === '技术').length}
                  </div>
                </div>
                <div className="bg-cinema-dark p-6 rounded-lg border border-cinema-gray">
                  <div className="text-cinema-silver text-sm mb-1">设计文章</div>
                  <div className="text-3xl font-bold text-white">
                    {articles.filter(a => a.category === '设计').length}
                  </div>
                </div>
                <div className="bg-cinema-dark p-6 rounded-lg border border-cinema-gray">
                  <div className="text-cinema-silver text-sm mb-1">生活文章</div>
                  <div className="text-3xl font-bold text-white">
                    {articles.filter(a => a.category === '生活').length}
                  </div>
                </div>
              </div>

              {/* 文章列表 */}
              <div className="bg-cinema-dark rounded-lg border border-cinema-gray overflow-hidden">
                <div className="p-6 border-b border-cinema-gray flex items-center justify-between">
                  <h2 className="text-xl text-white">文章列表</h2>
                  <button
                    onClick={() => router.push('/admin/editor')}
                    className="px-4 py-2 bg-cinema-gold text-cinema-black font-semibold rounded hover:bg-cinema-gold/90 transition-colors text-sm"
                  >
                    + 新建文章
                  </button>
                </div>
                <div className="divide-y divide-cinema-gray">
                {articles.map((article) => (
                  <div key={article.id} className="p-6 flex items-center justify-between hover:bg-cinema-gray/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg text-white">{article.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${
                          article.featured
                            ? 'bg-cinema-gold text-cinema-black'
                            : 'bg-cinema-gray text-cinema-silver'
                        }`}>
                          {article.featured ? '精选' : '普通'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-cinema-silver">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                        onClick={() => {
                          // TODO: 实现编辑功能
                          alert('编辑功能即将上线，敬请期待！');
                        }}
                        className="p-2 text-cinema-silver hover:text-cinema-gold transition-colors"
                        title="编辑"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
