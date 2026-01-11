import { articles } from '@/data/sampleData';
import ArticlePageClient from './ArticlePageClient';

export function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  return <ArticlePageClient articleId={params.id} />;
}
