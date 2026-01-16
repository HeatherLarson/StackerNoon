import { useBlogArticles } from '@/hooks/useBlogArticles';
import { ArticleCard } from './ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const CATEGORIES = ['bitcoin', 'ethereum', 'nostr', 'defi', 'nft', 'web3', 'crypto'];

export function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { data: articles, isLoading } = useBlogArticles(selectedCategory);

  const featuredArticle = articles?.[0];
  const regularArticles = articles?.slice(1) || [];

  return (
    <div className="space-y-12">
      {/* Featured Section - Full Width */}
      {isLoading ? (
        <Skeleton className="h-96 w-full rounded-lg" />
      ) : featuredArticle ? (
        <ArticleCard article={featuredArticle} featured />
      ) : null}

      {/* Category Filter */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === undefined ? 'default' : 'outline'}
            className="cursor-pointer transition-all text-xs font-bold"
            onClick={() => setSelectedCategory(undefined)}
          >
            ALL ARTICLES
          </Badge>
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer transition-all text-xs font-bold"
              onClick={() => setSelectedCategory(category)}
            >
              #{category.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border dark:bg-gray-900">
              <div className="p-6 space-y-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
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
      ) : regularArticles && regularArticles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">
              {selectedCategory
                ? `No articles found with #${selectedCategory}. Try a different category.`
                : 'Loading long-form content from Nostr...'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
