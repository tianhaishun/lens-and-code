'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { articles } from '@/data/sampleData';
import { useState } from 'react';

interface ArticlePageClientProps {
  articleId: string;
}

export default function ArticlePageClient({ articleId }: ArticlePageClientProps) {
  const router = useRouter();
  const article = articles.find(a => a.id === articleId);

  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Alex Chen',
      content: '这篇文章写得非常有深度，特别是关于色彩理论的部分，让我对前端设计有了新的认识。',
      date: '2025-01-09',
    },
    {
      id: '2',
      author: 'Sarah Wu',
      content: '期待更多这样的高质量内容！电影质感的设计确实能带来更好的用户体验。',
      date: '2025-01-08',
    },
  ]);

  const [newComment, setNewComment] = useState({ author: '', content: '' });

  if (!article) {
    return (
      <div className="min-h-screen bg-cinema-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="cinema-title text-4xl text-white mb-4">文章未找到</h1>
          <Link href="/articles" className="elegant-link text-cinema-gold">
            返回文章列表
          </Link>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.author && newComment.content) {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          author: newComment.author,
          content: newComment.content,
          date: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewComment({ author: '', content: '' });
    }
  };

  return (
    <div className="min-h-screen bg-cinema-black">
      <Navigation />

      {/* Article Header */}
      <article>
        <header className="relative h-[70vh] overflow-hidden">
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
                <div className="flex gap-4">
                  <button className="p-2 bg-cinema-gray hover:bg-cinema-gold hover:text-cinema-black rounded transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-cinema-gray hover:bg-cinema-gold hover:text-cinema-black rounded transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="py-16 bg-cinema-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="cinema-title text-3xl text-white mb-8">评论 ({comments.length})</h2>

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
                  <p className="text-cinema-silver leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <button
                onClick={() => {
                  const currentIndex = articles.findIndex(a => a.id === article.id);
                  if (currentIndex > 0) {
                    router.push(`/articles/${articles[currentIndex - 1].id}`);
                  }
                }}
                disabled={articles.findIndex(a => a.id === article.id) === 0}
                className="flex items-center gap-2 px-6 py-3 bg-cinema-dark hover:bg-cinema-gray rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                上一篇
              </button>
              <button
                onClick={() => {
                  const currentIndex = articles.findIndex(a => a.id === article.id);
                  if (currentIndex < articles.length - 1) {
                    router.push(`/articles/${articles[currentIndex + 1].id}`);
                  }
                }}
                disabled={articles.findIndex(a => a.id === article.id) === articles.length - 1}
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
