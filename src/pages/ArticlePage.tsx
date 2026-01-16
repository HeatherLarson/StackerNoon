import { useSeoMeta } from '@unhead/react';
import { useParams } from 'react-router-dom';
import { ArticleView } from '@/components/blog/ArticleView';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();

  useSeoMeta({
    title: slug ? `${slug.replace(/-/g, ' ')} - Derek & Me Chronicles` : 'Article - Derek & Me Chronicles',
    description: 'Read chronicles from Derek and Heather about things they\'re building and talking about.',
  });

  if (!slug) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ArticleView slug={slug} />
    </div>
  );
};

export default ArticlePage;
