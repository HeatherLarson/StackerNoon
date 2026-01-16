import { useSeoMeta } from '@unhead/react';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogList } from '@/components/blog/BlogList';

const Blog = () => {
  useSeoMeta({
    title: 'StackerNoon - Long-Form Content from Nostr',
    description: 'Discover long-form articles and stories from creators across the Nostr network. Real content, real authors, real stories.',
    ogTitle: 'StackerNoon',
    ogDescription: 'Long-form content platform powered by Nostr protocol',
    ogType: 'website',
  });

  return (
    <div className="min-h-screen bg-gray-950">
      <BlogHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogList />
      </main>
    </div>
  );
};

export default Blog;
