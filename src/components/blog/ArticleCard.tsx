import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useAuthor } from '@/hooks/useAuthor';
import { genUserName } from '@/lib/genUserName';
import type { BlogArticle } from '@/hooks/useBlogArticles';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: BlogArticle;
  featured?: boolean;
}

export function ArticleCard({ article, featured }: ArticleCardProps) {
  const author = useAuthor(article.pubkey);
  const authorMetadata = author.data?.metadata;
  const authorName = authorMetadata?.name || genUserName(article.pubkey);
  const authorImage = authorMetadata?.picture;

  const readTime = Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200));
  const publicationDate = new Date(article.data.publishedAt * 1000);
  const timeAgo = formatDistanceToNow(publicationDate, { addSuffix: true });

  if (featured) {
    return (
      <Link to={`/article/${article.data.slug}`}>
        <div className="group overflow-hidden rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 hover:shadow-2xl cursor-pointer">
          <div className="grid md:grid-cols-2 gap-6 p-8">
            {/* Image */}
            {article.data.image && (
              <div className="relative h-64 md:h-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 order-2 md:order-1">
                <img
                  src={article.data.image}
                  alt={article.data.imageAlt || article.data.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col justify-center gap-4 order-1 md:order-2">
              {/* Categories */}
              {article.data.categories.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {article.data.categories.slice(0, 2).map((category) => (
                    <Badge
                      key={category}
                      className="text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 uppercase"
                    >
                      #{category}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white line-clamp-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {article.data.title}
              </h2>

              {/* Summary */}
              <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-lg">
                {article.data.summary}
              </p>

              {/* Footer */}
              <div className="pt-4 flex items-center justify-between text-sm mt-auto">
                <div className="flex items-center gap-3">
                  {authorImage && (
                    <img
                      src={authorImage}
                      alt={authorName}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{authorName}</p>
                    <p className="text-gray-500 dark:text-gray-400">{timeAgo}</p>
                  </div>
                </div>
                <div className="text-gray-500 dark:text-gray-400 font-medium">
                  {readTime} min read
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.data.slug}`}>
      <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 hover:shadow-lg h-full group cursor-pointer">
        {/* Featured Image */}
        {article.data.image && (
          <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
            <img
              src={article.data.image}
              alt={article.data.imageAlt || article.data.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col gap-3 h-full">
          {/* Categories */}
          {article.data.categories.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {article.data.categories.slice(0, 2).map((category) => (
                <Badge
                  key={category}
                  className="text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 uppercase"
                >
                  #{category}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-black text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
            {article.data.title}
          </h3>

          {/* Summary */}
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm flex-1">
            {article.data.summary}
          </p>

          {/* Footer */}
          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs mt-auto">
            <div className="flex items-center gap-2">
              {authorImage && (
                <img
                  src={authorImage}
                  alt={authorName}
                  className="w-5 h-5 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <span className="font-bold text-gray-700 dark:text-gray-300">{authorName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
              <span>{readTime} min read</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
