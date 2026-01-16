import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthor } from '@/hooks/useAuthor';
import { genUserName } from '@/lib/genUserName';
import type { BlogArticle } from '@/hooks/useBlogArticles';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: BlogArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const author = useAuthor(article.pubkey);
  const authorMetadata = author.data?.metadata;
  const authorName = authorMetadata?.name || genUserName(article.pubkey);
  const authorImage = authorMetadata?.picture;

  const readTime = Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200));
  const publicationDate = new Date(article.data.publishedAt * 1000);
  const timeAgo = formatDistanceToNow(publicationDate, { addSuffix: true });

  return (
    <Link to={`/article/${article.data.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full group border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-900">
        {/* Featured Image */}
        {article.data.image && (
          <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={article.data.image}
              alt={article.data.imageAlt || article.data.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          {/* Categories */}
          {article.data.categories.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {article.data.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium"
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.data.title}
          </h2>

          {/* Summary */}
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
            {article.data.summary}
          </p>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mt-auto">
            <div className="flex items-center gap-2">
              {authorImage && (
                <img
                  src={authorImage}
                  alt={authorName}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <span className="font-medium text-gray-700 dark:text-gray-300">{authorName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
              <span>{readTime} min read</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
