'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { articles } from '@/data/sampleData';
import { useState } from 'react';

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const categories = ['全部', '技术', '设计', '生活'];

  const filteredArticles = selectedCategory === '全部'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-cinema-black">
      <Navigation />

      {/* Page Header */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cinema-black/50 to-cinema-black" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30" />
        </div>
        <div className="relative text-center px-4">
          <h1 className="cinema-title text-6xl text-white mb-4 text-shadow">文章</h1>
          <p className="text-cinema-silver text-lg">探索技术与生活的交汇点</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-cinema-dark border-b border-cinema-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <span className="text-cinema-silver text-sm">分类:</span>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-cinema-gold text-cinema-black'
                      : 'bg-cinema-gray text-cinema-silver hover:bg-cinema-gray/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <article className="bg-cinema-dark overflow-hidden rounded-lg border border-cinema-gray hover:border-cinema-gold transition-all duration-500 h-full flex flex-col">
                  {/* Cover Image */}
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center cinema-image"
                      style={{ backgroundImage: `url(${article.coverImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-cinema-gold text-cinema-black text-xs font-semibold rounded">
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="cinema-title text-2xl text-white mb-3 group-hover:text-cinema-gold transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-cinema-silver text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-cinema-gray pt-4 border-t border-cinema-gray/50">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {article.date}
                        </span>
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
