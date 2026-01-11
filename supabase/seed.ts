import { supabase } from '../lib/supabase'

export async function seedDatabase() {
  console.log('开始初始化数据库...')

  if (!supabase) {
    console.error('Supabase 未配置，无法初始化数据库')
    return
  }

  // 插入示例文章
  const articles = [
    {
      id: '1',
      title: '探索电影质感的前端设计',
      excerpt: '在数字时代，如何通过代码重现胶片电影的质感与情感？本文将深入探讨色彩理论、光影效果和视觉层次的运用。',
      content: `# 探索电影质感的前端设计

在数字时代，如何通过代码重现胶片电影的质感与情感？本文将深入探讨色彩理论、光影效果和视觉层次的运用。

## 色彩的温度

电影胶片有着独特的色彩表现力。每一帧画面都承载着情感的温度，从温暖的橙色到冷冽的蓝色，色彩不仅仅是视觉的呈现，更是情感的载体。

> "色彩是直接触及灵魂的力量。"

## 光影的舞蹈

光线与影子的交错创造了画面的深度。在网页设计中，我们通过渐变、阴影和遮罩来模拟这种效果，让平面元素具有立体感。

## 细节的艺术

胶片的颗粒感、画面的暗角效果、字幕的字体选择——这些看似微小的细节，共同构成了电影质感的整体体验。`,
      author: 'Justin Tian',
      date: '2025-01-10',
      readTime: '8 分钟',
      category: '设计',
      coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop',
      featured: true,
    },
    {
      id: '2',
      title: 'TypeScript 进阶：类型体操的艺术',
      excerpt: '深入理解 TypeScript 的高级类型系统，掌握泛型、条件类型和映射类型的使用技巧。',
      content: `# TypeScript 进阶：类型体操的艺术

TypeScript 的类型系统是其最强大的特性之一。通过掌握高级类型，我们可以编写更加安全、灵活的代码。

## 泛型的力量

泛型让我们能够编写可复用的组件，同时保持类型安全。

## 条件类型

条件类型引入了逻辑判断的能力，让类型系统能够根据条件选择不同的类型。

## 实用技巧

在实际项目中，合理使用高级类型可以大幅提升代码质量和开发效率。`,
      author: 'Justin Tian',
      date: '2025-01-08',
      readTime: '12 分钟',
      category: '技术',
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop',
      featured: true,
    },
    {
      id: '3',
      title: '摄影与编程：两个世界的交汇',
      excerpt: '摄影教会我观察世界的方式，编程给我改变世界的能力。这两个看似不同的领域，实则有着深刻的联系。',
      content: `# 摄影与编程：两个世界的交汇

摄影教会我观察世界的方式，编程给我改变世界的能力。

## 构图与架构

摄影中的构图原则与软件架构设计有着惊人的相似性。都需要考虑平衡、重点、引导线等要素。

## 光线与性能

如同摄影师追逐最佳光线，开发者也需要不断优化性能，找到最佳的平衡点。

## 后期与迭代

照片的后期处理与代码的迭代优化，本质上都是在追求完美的过程。`,
      author: 'Justin Tian',
      date: '2025-01-05',
      readTime: '6 分钟',
      category: '生活',
      coverImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=800&fit=crop',
      featured: false,
    },
    {
      id: '4',
      title: 'Next.js 14 全栈开发实践',
      excerpt: '从零开始构建一个现代化的全栈应用，探索 Next.js 14 的新特性和最佳实践。',
      content: `# Next.js 14 全栈开发实践

Next.js 14 带来了许多令人兴奋的新特性，让全栈开发变得更加高效。

## App Router

全新的 App Router 提供了更直观的路由方式和更强的性能。

## Server Components

服务端组件让性能优化变得更加简单，减少了客户端的 JavaScript 负载。

## Server Actions

Server Actions 简化了数据变更操作，无需手动创建 API 端点。 `,
      author: 'Justin Tian',
      date: '2025-01-03',
      readTime: '15 分钟',
      category: '技术',
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop',
      featured: true,
    },
  ]

  for (const article of articles) {
    const { error } = await supabase.from('articles').insert(article)
    if (error) {
      console.error('插入文章失败:', article.id, error)
    } else {
      console.log('✓ 文章已插入:', article.id)
    }
  }

  // 插入示例项目
  const projects = [
    {
      id: '1',
      title: 'Cinematic Blog',
      description: '一个具有电影质感的个人博客系统，使用 Next.js 和 Tailwind CSS 构建。',
      githubUrl: 'https://github.com/tianhaishun/cinematic-blog',
      demoUrl: 'https://tianhaishun.github.io/lens-and-code/',
      language: 'TypeScript',
      topics: ['nextjs', 'blog', 'tailwindcss', 'typescript'],
    },
    {
      id: '2',
      title: 'React Components Library',
      description: '精心设计的 React 组件库，提供了一系列高质量的可复用组件。',
      githubUrl: 'https://github.com/tianhaishun/react-components',
      language: 'TypeScript',
      topics: ['react', 'components', 'ui', 'storybook'],
    },
    {
      id: '3',
      title: 'AI Image Generator',
      description: '基于 AI 的图像生成工具，支持多种风格和参数调整。',
      githubUrl: 'https://github.com/tianhaishun/ai-image-generator',
      demoUrl: 'https://ai-image-demo.vercel.app',
      language: 'Python',
      topics: ['ai', 'image-generation', 'stable-diffusion', 'python'],
    },
    {
      id: '4',
      title: 'Portfolio Theme',
      description: '优雅的个人作品集主题，支持多种布局和自定义选项。',
      githubUrl: 'https://github.com/tianhaishun/portfolio-theme',
      language: 'TypeScript',
      topics: ['portfolio', 'theme', 'nextjs', 'design'],
    },
  ]

  for (const project of projects) {
    const { error } = await supabase.from('projects').insert(project)
    if (error) {
      console.error('插入项目失败:', project.id, error)
    } else {
      console.log('✓ 项目已插入:', project.id)
    }
  }

  // 插入示例评论
  const comments = [
    {
      id: '1',
      articleId: '1',
      author: 'Alex Chen',
      content: '这篇文章写得非常有深度，特别是关于色彩理论的部分，让我对前端设计有了新的认识。',
      email: 'alex@example.com',
    },
    {
      id: '2',
      articleId: '1',
      author: 'Sarah Wu',
      content: '期待更多这样的高质量内容！电影质感的设计确实能带来更好的用户体验。',
      email: 'sarah@example.com',
    },
  ]

  for (const comment of comments) {
    const { error } = await supabase.from('comments').insert(comment)
    if (error) {
      console.error('插入评论失败:', comment.id, error)
    } else {
      console.log('✓ 评论已插入:', comment.id)
    }
  }

  console.log('\n✅ 数据库初始化完成！')
}
