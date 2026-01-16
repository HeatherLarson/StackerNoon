import { useSeoMeta } from '@unhead/react';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogList } from '@/components/blog/BlogList';

const Blog = () => {
  useSeoMeta({
    title: 'Derek & Me Chronicles - Building & Thinking Out Loud',
    description: 'Chronicles of things Derek and Heather are building and talking about. A private blog powered by Nostr.',
    ogTitle: 'Derek & Me Chronicles',
    ogDescription: 'Chronicles of things Derek and Heather are building and talking about.',
    ogType: 'website',
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <BlogHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogList />
      </main>
    </div>
  );
};

export default Blog;
