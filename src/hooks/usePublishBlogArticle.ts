import { useCurrentUser } from './useCurrentUser';
import { useNostrPublish } from './useNostrPublish';

// Kind 23: Long-form content (NIP-23)
const LONG_FORM_KIND = 23;

export interface PublishArticleInput {
  slug: string;
  title: string;
  summary: string;
  content: string;
  image?: string;
  imageAlt?: string;
  categories?: string[];
}

export function usePublishBlogArticle() {
  const { user } = useCurrentUser();
  const { mutate, ...rest } = useNostrPublish();

  const publish = (input: PublishArticleInput) => {
    if (!user) {
      throw new Error('User must be logged in to publish articles');
    }

    const tags: string[][] = [
      ['d', input.slug],
      ['title', input.title],
      ['summary', input.summary],
      ['published_at', Math.floor(Date.now() / 1000).toString()],
    ];

    if (input.image) {
      tags.push(['image', input.image]);
    }

    if (input.imageAlt) {
      tags.push(['image_alt', input.imageAlt]);
    }

    if (input.categories && input.categories.length > 0) {
      input.categories.forEach((category) => {
        tags.push(['t', category]);
      });
    }

    mutate({
      kind: LONG_FORM_KIND,
      content: input.content,
      tags,
    });
  };

  return {
    ...rest,
    mutate: publish,
    isAuthorized: !!user,
  };
}
