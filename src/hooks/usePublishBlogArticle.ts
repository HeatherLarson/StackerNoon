import { useCurrentUser } from './useCurrentUser';
import { useNostrPublish } from './useNostrPublish';
import { AUTHORIZED_PUBLISHERS } from './useBlogArticles';

const BLOG_ARTICLE_KIND = 30251;

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

    if (!AUTHORIZED_PUBLISHERS.includes(user.pubkey)) {
      throw new Error('You are not authorized to publish articles to this blog');
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
      kind: BLOG_ARTICLE_KIND,
      content: input.content,
      tags,
    });
  };

  return {
    ...rest,
    mutate: publish,
    isAuthorized: user ? AUTHORIZED_PUBLISHERS.includes(user.pubkey) : false,
  };
}
