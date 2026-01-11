import ArticlePageClient from './ArticlePageClient';
import { articles } from '@/data/sampleData';

export function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  return <ArticlePageClientWrapper params={params} />;
}

async function ArticlePageClientWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ArticlePageClient articleId={id} />;
}
