'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { articles } from '@/data/sampleData';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredArticles = articles.filter(a => a.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredArticles.length]);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section - Featured Articles Slider */}
      <section className="relative h-screen overflow-hidden">
        {featuredArticles.map((article, index) => (
          <div
            key={article.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center cinema-image"
              style={{ backgroundImage: `url(${article.coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/90 via-cinema-black/50 to-transparent" />

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-3xl animate-slide-up">
                <span className="inline-block px-3 py-1 bg-cinema-gold text-cinema-black text-xs font-semibold mb-4 rounded">
                  {article.category}
                </span>
                <h1 className="cinema-title text-5xl md:text-7xl text-white mb-6 leading-tight text-shadow">
                  {article.title}
                </h1>
                <p className="text-cinema-silver text-lg md:text-xl mb-8 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-cinema-silver mb-8">
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
                <Link
                  href={`/articles/${article.id}`}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-cinema-gold text-cinema-black font-semibold rounded hover:bg-cinema-gold/90 transition-all duration-300 transform hover:scale-105"
                >
                  阅读全文
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {featuredArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-cinema-gold' : 'bg-cinema-gray hover:bg-cinema-silver'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20 bg-cinema-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="cinema-title text-4xl text-white">最新文章</h2>
            <Link
              href="/articles"
              className="elegant-link text-cinema-gold flex items-center gap-2"
            >
              查看全部
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 6).map((article, index) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <article className="bg-cinema-dark overflow-hidden rounded-lg border border-cinema-gray hover:border-cinema-gold transition-all duration-500 transform hover:-translate-y-2">
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center cinema-image"
                      style={{ backgroundImage: `url(${article.coverImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block px-2 py-1 bg-cinema-gray text-cinema-gold text-xs font-semibold mb-3 rounded">
                      {article.category}
                    </span>
                    <h3 className="cinema-title text-xl text-white mb-3 group-hover:text-cinema-gold transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-cinema-silver text-sm mb-4 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-cinema-gray">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 bg-cinema-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="cinema-title text-4xl text-white mb-4">个人项目</h2>
            <p className="text-cinema-silver text-lg">探索我的 GitHub 仓库</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: '高性能架构', desc: '追求极致性能' },
              { icon: '🎨', title: '优雅设计', desc: '注重视觉体验' },
              { icon: '🔧', title: '工具开发', desc: '提升开发效率' },
              { icon: '🚀', title: '开源贡献', desc: '回馈技术社区' },
            ].map((item, index) => (
              <Link
                key={index}
                href="/projects"
                className="group p-6 bg-cinema-black rounded-lg border border-cinema-gray hover:border-cinema-gold transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="cinema-title text-xl text-white mb-2 group-hover:text-cinema-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-cinema-silver text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="https://github.com/tianhaishun"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-cinema-gray hover:bg-cinema-gold hover:text-cinema-black rounded transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              访问 GitHub
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
