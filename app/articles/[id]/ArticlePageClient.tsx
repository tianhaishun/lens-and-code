'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { articles as sampleArticles } from '@/data/sampleData';
import { useState, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  featured: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

interface ArticlePageClientProps {
  articleId: string;
}

export default function ArticlePageClient({ articleId }: ArticlePageClientProps) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [allArticles, setAllArticles] = useState<Article[]>(sampleArticles);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ author: '', content: '' });

  useEffect(() => {
    console.log('🔍 Loading article:', articleId);

    try {
      // 从 localStorage 加载已发布的文章
      const publishedData = localStorage.getItem('publishedArticles');
      console.log('📦 Published articles from localStorage:', publishedData);

      const published: Article[] = publishedData ? JSON.parse(publishedData) : [];
      console.log('✅ Parsed published articles:', published.length);

      // 合并所有文章
      const articles = [...sampleArticles, ...published];
      console.log('📚 Total articles:', articles.length);

      // 查找目标文章
      const foundArticle = articles.find(a => a.id === articleId);
      console.log('🎯 Found article:', foundArticle ? foundArticle.title : 'NOT FOUND');

      setAllArticles(articles);
      setArticle(foundArticle || null);

      // 加载评论
      const savedComments = localStorage.getItem(`comments_${articleId}`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    } catch (error) {
      console.error('❌ Error loading article:', error);
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  // 处理评论提交
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.author && newComment.content) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: newComment.author,
        content: newComment.content,
        date: new Date().toISOString().split('T')[0],
      };

      const updatedComments = [...comments, comment];
      setComments(updatedComments);
      localStorage.setItem(`comments_${articleId}`, JSON.stringify(updatedComments));
      setNewComment({ author: '', content: '' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-black flex items-center justify-center">
        <div className="text-cinema-gold text-2xl">加载中...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-cinema-black flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="cinema-title text-4xl text-white mb-4">文章未找到</h1>
          <p className="text-cinema-silver mb-8">文章 ID: {articleId}</p>
          <Link href="/articles" className="inline-block px-6 py-3 bg-cinema-gold text-cinema-black font-semibold rounded hover:bg-cinema-gold/90 transition-colors">
            返回文章列表
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = allArticles.findIndex(a => a.id === article.id);

  return (
    <div className="min-h-screen bg-cinema-black flex flex-col">
      <Navigation />

      <article className="flex-1">
        {/* Article Header */}
        <header className="relative h-[70vh] overflow-hidden flex-shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center cinema-image"
            style={{ backgroundImage: `url(${article.coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/90 via-cinema-black/40 to-transparent" />

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20">
            <div className="max-w-3xl">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-cinema-silver hover:text-cinema-gold transition-colors mb-6"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回文章列表
              </Link>

              <span className="inline-block px-3 py-1 bg-cinema-gold text-cinema-black text-xs font-semibold mb-4 rounded">
                {article.category}
              </span>

              <h1 className="cinema-title text-5xl md:text-7xl text-white mb-6 leading-tight text-shadow">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-cinema-silver">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-cinema-silver text-xl leading-relaxed space-y-6">
                <p className="text-2xl text-cinema-gold italic border-l-4 border-cinema-gold pl-6 py-4 mb-12">
                  {article.excerpt}
                </p>
                <div className="whitespace-pre-line">{article.content}</div>
              </div>
            </div>

            {/* Article Meta */}
            <div className="mt-16 pt-8 border-t border-cinema-gray">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cinema-gold rounded-full flex items-center justify-center">
                    <span className="text-cinema-black font-bold text-xl">{article.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{article.author}</p>
                    <p className="text-cinema-gray text-sm">作者</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="py-16 bg-cinema-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="cinema-title text-3xl text-white mb-8">
              评论 ({comments.length})
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-12">
              <div className="bg-cinema-black p-6 rounded-lg border border-cinema-gray">
                <div className="mb-4">
                  <label htmlFor="author" className="block text-cinema-silver text-sm mb-2">
                    名称
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={newComment.author}
                    onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                    className="w-full bg-cinema-dark border border-cinema-gray rounded px-4 py-2 text-white focus:outline-none focus:border-cinema-gold transition-colors"
                    placeholder="请输入您的名称"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block text-cinema-silver text-sm mb-2">
                    评论内容
                  </label>
                  <textarea
                    id="content"
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    rows={4}
                    className="w-full bg-cinema-dark border border-cinema-gray rounded px-4 py-2 text-white focus:outline-none focus:border-cinema-gold transition-colors resize-none"
                    placeholder="分享您的想法..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cinema-gold text-cinema-black font-semibold rounded hover:bg-cinema-gold/90 transition-colors"
                >
                  发表评论
                </button>
              </div>
            </form>

            {/* Comments List */}
            {comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-cinema-black p-6 rounded-lg border border-cinema-gray">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cinema-gray rounded-full flex items-center justify-center">
                          <span className="text-cinema-gold font-semibold">{comment.author[0]}</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold">{comment.author}</p>
                          <p className="text-cinema-gray text-xs">{comment.date}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-cinema-silver leading-relaxed whitespace-pre-line">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-cinema-silver">
                <p>还没有评论，快来发表第一条评论吧！</p>
              </div>
            )}
          </div>
        </section>

        {/* Navigation */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <button
                onClick={() => {
                  if (currentIndex > 0) {
                    router.push(`/articles/${allArticles[currentIndex - 1].id}`);
                  }
                }}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-6 py-3 bg-cinema-dark hover:bg-cinema-gray rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                上一篇
              </button>
              <button
                onClick={() => {
                  if (currentIndex < allArticles.length - 1) {
                    router.push(`/articles/${allArticles[currentIndex + 1].id}`);
                  }
                }}
                disabled={currentIndex === allArticles.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-cinema-dark hover:bg-cinema-gray rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一篇
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
}
