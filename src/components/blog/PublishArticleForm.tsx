import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { usePublishBlogArticle } from '@/hooks/usePublishBlogArticle';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useToast } from '@/hooks/useToast';
import { Loader2, AlertCircle } from 'lucide-react';

const CATEGORIES = ['building', 'thinking', 'product', 'podcast', 'updates'];

const articleSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be under 200 characters'),
  summary: z.string().min(10, 'Summary must be at least 10 characters').max(500, 'Summary must be under 500 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  image: z.string().url('Image must be a valid URL').optional().or(z.literal('')),
  imageAlt: z.string().optional(),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface PublishArticleFormProps {
  onSuccess?: () => void;
}

export function PublishArticleForm({ onSuccess }: PublishArticleFormProps) {
  const { user } = useCurrentUser();
  const { mutate, isPending, isAuthorized } = usePublishBlogArticle();
  const { toast } = useToast();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['building']);

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      slug: '',
      title: '',
      summary: '',
      content: '',
      image: '',
      imageAlt: '',
      categories: ['building'],
    },
  });

  const onSubmit = (data: ArticleFormData) => {
    if (!isAuthorized) {
      toast({
        title: 'Not Authorized',
        description: 'You are not authorized to publish articles to this blog.',
        variant: 'destructive',
      });
      return;
    }

    try {
      mutate({
        ...data,
        categories: selectedCategories,
      });

      toast({
        title: 'Article Published!',
        description: 'Your article has been published to the Nostr network.',
      });

      form.reset();
      setSelectedCategories(['building']);
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to publish article',
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return (
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="py-8">
          <p className="text-gray-600 dark:text-gray-400">You must be logged in to publish articles.</p>
        </CardContent>
      </Card>
    );
  }

  if (!isAuthorized) {
    return (
      <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950">
        <CardContent className="py-8">
          <div className="flex gap-3">
            <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 dark:text-red-100">Access Denied</p>
              <p className="text-red-800 dark:text-red-200 text-sm mt-1">
                You are not authorized to publish articles to this blog. This blog is exclusively for Derek and Heather.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle>Publish New Article</CardTitle>
        <CardDescription>
          Share your thoughts and chronicles with the world via Nostr
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="my-article-title"
                      {...field}
                      disabled={isPending}
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </FormControl>
                  <FormDescription>
                    URL-friendly identifier (lowercase, hyphens only)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Article Title"
                      {...field}
                      disabled={isPending}
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary of your article..."
                      {...field}
                      disabled={isPending}
                      className="dark:bg-gray-800 dark:border-gray-700 resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value.length}/500 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categories */}
            <div className="space-y-3">
              <FormLabel>Categories</FormLabel>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                    className="cursor-pointer transition-all"
                    onClick={() => {
                      setSelectedCategories((prev) =>
                        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
                      );
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <FormDescription>
                Select one or more categories for your article
              </FormDescription>
            </div>

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (Markdown)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your article in Markdown format..."
                      {...field}
                      disabled={isPending}
                      className="dark:bg-gray-800 dark:border-gray-700 font-mono"
                      rows={12}
                    />
                  </FormControl>
                  <FormDescription>
                    Supports Markdown formatting: headings, bold, italic, links, code blocks, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      disabled={isPending}
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Alt Text */}
            <FormField
              control={form.control}
              name="imageAlt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Alt Text (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description of the featured image"
                      {...field}
                      disabled={isPending}
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish Article'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
