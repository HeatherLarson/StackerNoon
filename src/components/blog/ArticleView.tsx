import { useBlogArticle } from '@/hooks/useBlogArticles';
import { useAuthor } from '@/hooks/useAuthor';
import { genUserName } from '@/lib/genUserName';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';

interface ArticleViewProps {
  slug: string;
}

export function ArticleView({ slug }: ArticleViewProps) {
  const { data: article, isLoading } = useBlogArticle(slug);
  const author = useAuthor(article?.pubkey || '');
  const authorMetadata = author.data?.metadata;
  const authorName = article ? authorMetadata?.name || genUserName(article.pubkey) : '';
  const authorImage = authorMetadata?.picture;

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
        </Link>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article not found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            This article might have been removed or the URL may be incorrect.
          </p>
        </div>
      </div>
    );
  }

  const readTime = Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200));
  const publicationDate = new Date(article.data.publishedAt * 1000);
  const timeAgo = formatDistanceToNow(publicationDate, { addSuffix: true });

  return (
    <article className="py-8">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
        </Link>

        {/* Featured Image */}
        {article.data.image && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={article.data.image}
              alt={article.data.imageAlt || article.data.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="space-y-4">
          {/* Categories */}
          {article.data.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.data.categories.map((category) => (
                <Badge
                  key={category}
                  className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {article.data.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 border-t border-b border-gray-200 dark:border-gray-800 py-4">
            <div className="flex items-center gap-3">
              {authorImage && (
                <img
                  src={authorImage}
                  alt={authorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{authorName}</p>
                <p className="text-sm">
                  {publicationDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm">{readTime} min read</p>
              <p className="text-xs text-gray-500">{timeAgo}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mt-8 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-8 mb-4 border-l-4 border-green-600 pl-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
                  {children}
                </p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-green-600 dark:text-green-400 hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-sm font-mono">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-700">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-green-600 dark:border-green-400 pl-4 italic text-gray-600 dark:text-gray-400 my-4 bg-gray-50 dark:bg-gray-900 py-3 pr-4 rounded">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  {children}
                </ol>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt}
                  className="w-full rounded-lg my-6 border border-gray-200 dark:border-gray-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <Link to="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Articles
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
