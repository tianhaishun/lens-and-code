import ArticlePageClient from './ArticlePageClient';
import { articles } from '@/data/sampleData';

export function generateStaticParams() {
  // 生成示例文章的参数
  const params = articles.map((article) => ({
    id: article.id,
  }));

  // 尝试从环境变量或预定义列表中获取更多文章ID
  // 由于这是构建时，无法读取 localStorage
  // 所以我们需要为动态文章预留一些 ID 范围
  const dynamicIds = Array.from({ length: 100 }, (_, i) =>
    (Date.now() - i * 86400000).toString() // 过去100天的时间戳
  );

  const dynamicParams = dynamicIds.map((id) => ({
    id,
  }));

  return [...params, ...dynamicParams];
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  return <ArticlePageClient articleId={params.id} />;
}
