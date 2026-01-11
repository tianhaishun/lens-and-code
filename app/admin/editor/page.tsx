'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { articles as sampleArticles } from '@/data/sampleData';

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editArticleId = searchParams.get('edit');

  const [pageTitle, setPageTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('技术');
  const [saveStatus, setSaveStatus] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  // 检查登录状态
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/admin');
    }
  }, [router]);

  // 加载要编辑的文章
  useEffect(() => {
    if (editArticleId) {
      setIsEditMode(true);
      const published = JSON.parse(localStorage.getItem('publishedArticles') || '[]');
      const allArticles = [...sampleArticles, ...published];
      const articleToEdit = allArticles.find(a => a.id === editArticleId);

      if (articleToEdit) {
        setPageTitle(articleToEdit.title);
        setContent(articleToEdit.content);
        setExcerpt(articleToEdit.excerpt || '');
        setCategory(articleToEdit.category);
      } else {
        alert('文章未找到');
        router.push('/admin');
      }
    } else {
      // 从 localStorage 加载草稿
      const savedDraft = localStorage.getItem('articleDraft');
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        setPageTitle(draft.title || '');
        setContent(draft.content || '');
        setExcerpt(draft.excerpt || '');
        setCategory(draft.category || '技术');
        setPaperSize(draft.paperSize || 'a4');
        setFontSize(draft.fontSize || '16');
        setFontFamily(draft.fontFamily || 'Georgia');
      }
    }
  }, [editArticleId, router]);

  // 编辑器设置
  const [paperSize, setPaperSize] = useState<'a4' | 'a5' | 'letter'>('a4');
  const [fontSize, setFontSize] = useState('16');
  const [fontFamily, setFontFamily] = useState('Georgia');
  const [lineHeight, setLineHeight] = useState('1.8');

  // 自动保存草稿
  useEffect(() => {
    if (!isEditMode) {
      const timer = setTimeout(() => {
        const draft = {
          title: pageTitle,
          content,
          excerpt,
          category,
          paperSize,
          fontSize,
          fontFamily,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem('articleDraft', JSON.stringify(draft));
        setSaveStatus(`已自动保存 ${new Date().toLocaleTimeString()}`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [pageTitle, content, excerpt, category, paperSize, fontSize, fontFamily, isEditMode]);

  // 插入表情符号
  const insertEmoji = (emoji: string) => {
    setContent(content + emoji);
  };

  // 发布或更新文章
  const handlePublish = () => {
    if (!pageTitle || !content) {
      alert('请填写标题和内容');
      return;
    }

    const article = {
      id: isEditMode ? editArticleId! : Date.now().toString(),
      title: pageTitle,
      content,
      excerpt: excerpt || content.substring(0, 200),
      author: 'Justin Tian',
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.ceil(content.length / 400)} 分钟`,
      category,
      coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop',
      featured: false,
    };

    // 获取已发布的文章
    let existingArticles = JSON.parse(localStorage.getItem('publishedArticles') || '[]');

    if (isEditMode) {
      // 更新现有文章
      const index = existingArticles.findIndex((a: any) => a.id === editArticleId);
      if (index !== -1) {
        existingArticles[index] = article;
      } else {
        // 如果在已发布文章中没找到，可能是示例文章，添加到列表
        existingArticles.unshift(article);
      }
      localStorage.setItem('publishedArticles', JSON.stringify(existingArticles));
      alert('文章更新成功！');
    } else {
      // 发布新文章
      existingArticles = [article, ...existingArticles];
      localStorage.setItem('publishedArticles', JSON.stringify(existingArticles));
      // 清除草稿
      localStorage.removeItem('articleDraft');
      alert('文章发布成功！');
    }

    router.push('/admin');
  };

  // 获取纸张尺寸样式
  const getPaperStyle = () => {
    const sizes = {
      a4: 'max-w-[210mm]',
      a5: 'max-w-[148mm]',
      letter: 'max-w-[216mm]',
    };
    return sizes[paperSize];
  };

  const emojis = ['😀', '😂', '🎉', '💡', '🔥', '✨', '💻', '🎨', '📝', '🚀', '❤️', '👍'];

  return (
    <div className="min-h-screen bg-cinema-black flex flex-col">
      <Navigation />

      <div className="pt-20 pb-8 flex-1">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-cinema-gray hover:bg-cinema-gold hover:text-cinema-black rounded transition-colors text-sm"
              >
                ← 返回
              </button>
              <h1 className="cinema-title text-2xl text-white">
              {isEditMode ? '编辑文章' : '文章编辑器'}
            </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cinema-gray text-sm">{saveStatus}</span>
              <button
                onClick={() => {
                  if (confirm('确定要清空内容吗？')) {
                    setPageTitle('');
                    setContent('');
                    setExcerpt('');
                    localStorage.removeItem('articleDraft');
                  }
                }}
                className="px-4 py-2 bg-cinema-gray text-cinema-silver rounded hover:bg-cinema-gray/80 transition-colors text-sm"
              >
                清空
              </button>
              <button
                onClick={handlePublish}
                className="px-6 py-2 bg-cinema-gold text-cinema-black font-semibold rounded hover:bg-cinema-gold/90 transition-colors text-sm"
              >
                {isEditMode ? '更新文章' : '发布文章'}
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* 设置面板 */}
            <div className="w-72 flex-shrink-0 space-y-4">
              {/* 文章信息 */}
              <div className="bg-cinema-dark p-4 rounded-lg border border-cinema-gray">
                <h3 className="text-white font-semibold mb-3">文章信息</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-cinema-silver text-xs mb-1">标题</label>
                    <input
                      type="text"
                      value={pageTitle}
                      onChange={(e) => setPageTitle(e.target.value)}
                      className="w-full bg-cinema-black border border-cinema-gray rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-cinema-gold"
                      placeholder="输入文章标题"
                    />
                  </div>
                  <div>
                    <label className="block text-cinema-silver text-xs mb-1">摘要</label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      className="w-full bg-cinema-black border border-cinema-gray rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-cinema-gold resize-none"
                      placeholder="输入文章摘要"
                    />
                  </div>
                  <div>
                    <label className="block text-cinema-silver text-xs mb-1">分类</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-cinema-black border border-cinema-gray rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-cinema-gold"
                    >
                      <option value="技术">技术</option>
                      <option value="设计">设计</option>
                      <option value="生活">生活</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 页面设置 */}
              <div className="bg-cinema-dark p-4 rounded-lg border border-cinema-gray">
                <h3 className="text-white font-semibold mb-3">页面设置</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-cinema-silver text-xs mb-1">纸张大小</label>
                    <select
                      value={paperSize}
                      onChange={(e) => setPaperSize(e.target.value as any)}
                      className="w-full bg-cinema-black border border-cinema-gray rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-cinema-gold"
                    >
                      <option value="a4">A4 (210mm)</option>
                      <option value="a5">A5 (148mm)</option>
                      <option value="letter">Letter (216mm)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-cinema-silver text-xs mb-1">字体大小: {fontSize}px</label>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-cinema-silver text-xs mb-1">行高: {lineHeight}</label>
                    <select
                      value={lineHeight}
                      onChange={(e) => setLineHeight(e.target.value)}
                      className="w-full bg-cinema-black border border-cinema-gray rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-cinema-gold"
                    >
                      <option value="1.5">1.5 (紧凑)</option>
                      <option value="1.8">1.8 (标准)</option>
                      <option value="2.0">2.0 (宽松)</option>
                      <option value="2.5">2.5 (很宽松)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-cinema-silver text-xs mb-1">字体</label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full bg-cinema-black border border-cinema-gray rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-cinema-gold"
                    >
                      <option value="Georgia">Georgia (衬线)</option>
                      <option value="Arial">Arial (无衬线)</option>
                      <option value="'Courier New'">Courier New (等宽)</option>
                      <option value="'Times New Roman'">Times New Roman (经典)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 表情符号 */}
              <div className="bg-cinema-dark p-4 rounded-lg border border-cinema-gray">
                <h3 className="text-white font-semibold mb-3">表情符号</h3>
                <div className="grid grid-cols-6 gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => insertEmoji(emoji)}
                      className="p-2 text-2xl bg-cinema-black hover:bg-cinema-gray rounded transition-colors"
                      title={emoji}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* 统计信息 */}
              <div className="bg-cinema-dark p-4 rounded-lg border border-cinema-gray">
                <h3 className="text-white font-semibold mb-3">统计</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cinema-silver">字数:</span>
                    <span className="text-white">{content.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cinema-silver">预计阅读:</span>
                    <span className="text-white">{Math.ceil(content.length / 400)} 分钟</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cinema-silver">段落数:</span>
                    <span className="text-white">{content.split('\n').filter(p => p.trim()).length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 编辑区域 */}
            <div className="flex-1 overflow-x-auto">
              <div
                className={`${getPaperStyle()} mx-auto bg-white text-black p-[20mm] shadow-2xl min-h-[297mm] transition-all duration-300`}
                style={{
                  fontFamily,
                  fontSize: `${fontSize}px`,
                  lineHeight,
                }}
              >
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full min-h-[800px] bg-transparent resize-none focus:outline-none"
                  placeholder="开始写作..."
                  style={{
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    lineHeight,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cinema-black flex items-center justify-center">
        <div className="text-cinema-gold text-xl">加载中...</div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
