import { useBlogArticles } from '@/hooks/useBlogArticles';
import { ArticleCard } from './ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const CATEGORIES = ['building', 'thinking', 'product', 'podcast', 'updates'];

export function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { data: articles, isLoading } = useBlogArticles(selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
          Filter by category
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === undefined ? 'default' : 'outline'}
            className="cursor-pointer transition-all hover:border-blue-500"
            onClick={() => setSelectedCategory(undefined)}
          >
            All Articles
          </Badge>
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer transition-all hover:border-blue-500"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="p-6 space-y-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="pt-4 flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : articles && articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <CardContent className="py-16 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {selectedCategory
                ? `No articles found in the "${selectedCategory}" category. Try selecting a different category or view all articles.`
                : 'No articles published yet. Check back soon for new chronicles!'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
