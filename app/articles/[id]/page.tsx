import ArticlePageClient from './ArticlePageClient';

export default function ArticlePage({ params }: { params: { id: string } }) {
  return <ArticlePageClient articleId={params.id} />;
}
