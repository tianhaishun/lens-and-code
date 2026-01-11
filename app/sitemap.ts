import { MetadataRoute } from 'next'
import { articles as sampleArticles } from '@/data/sampleData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://monumental-kulfi-d85db9.netlify.app'

  // 静态页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // 文章页面
  const articlePages = sampleArticles.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...articlePages]
}
