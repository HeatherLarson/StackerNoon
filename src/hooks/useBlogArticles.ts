import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

// Kind 23: Long-form content (NIP-23)
const LONG_FORM_KIND = 23;

// Authorized publishers - only Heather and Derek
export const AUTHORIZED_PUBLISHERS = [
  '9fce3aea32b35637838fb45b75be32595742e16bb3e4742cc82bb3d50f9087e6', // Heather
  '4f1ebb82e7c7b631e234b02b87f6fdf87cf2c46d8eed17f23ca3b89e3f86ff5f', // Derek (npub18ams6ewn5aj2n3wt2qawzglx9mr4nzksxhvrdc4gzrecw7n5tvjqctp424)
];

export interface BlogArticle extends NostrEvent {
  data: {
    slug: string;
    title: string;
    summary: string;
    image?: string;
    imageAlt?: string;
    categories: string[];
    publishedAt: number;
  };
}

function parseArticleEvent(event: NostrEvent): BlogArticle | null {
  try {
    const d = event.tags.find(([name]) => name === 'd')?.[1];
    const title = event.tags.find(([name]) => name === 'title')?.[1];
    const summary = event.tags.find(([name]) => name === 'summary')?.[1];
    const image = event.tags.find(([name]) => name === 'image')?.[1];
    const imageAlt = event.tags.find(([name]) => name === 'image_alt')?.[1];
    const publishedAt = parseInt(event.tags.find(([name]) => name === 'published_at')?.[1] || '0');
    const categories = event.tags.filter(([name]) => name === 't').map(([, value]) => value);

    // For Kind 23, title and summary are required
    if (!d || !title) {
      return null;
    }

    return {
      ...event,
      data: {
        slug: d,
        title,
        summary: summary || event.content.substring(0, 200),
        image,
        imageAlt,
        categories,
        publishedAt: publishedAt || event.created_at,
      },
    };
  } catch {
    return null;
  }
}

export function useBlogArticles(category?: string) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['long-form-articles', category],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(8000)]);

      const filter: Record<string, unknown> = {
        kinds: [LONG_FORM_KIND],
        authors: AUTHORIZED_PUBLISHERS,
        limit: 50,
      };

      if (category) {
        filter['#t'] = [category];
      }

      const events = await nostr.query([filter as any], { signal });

      // Parse and validate events
      const articles = events
        .map(parseArticleEvent)
        .filter((article): article is BlogArticle => article !== null)
        // Sort by published_at descending (newest first)
        .sort((a, b) => b.data.publishedAt - a.data.publishedAt);

      return articles;
    },
  });
}

export function useBlogArticle(slug: string) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['long-form-article', slug],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(8000)]);

      const events = await nostr.query(
        [
          {
            kinds: [LONG_FORM_KIND],
            authors: AUTHORIZED_PUBLISHERS,
            '#d': [slug],
            limit: 1,
          },
        ],
        { signal }
      );

      if (events.length === 0) {
        return null;
      }

      return parseArticleEvent(events[0]);
    },
  });
}
