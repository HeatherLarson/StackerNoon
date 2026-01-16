# Derek & Me Chronicles - Blog System

This document describes the private blog system for Derek and Heather's chronicles.

## Overview

The Derek & Me Chronicles is a private Nostr-powered blog where only Heather and Derek can publish articles. The blog uses:

- **Kind 30251**: Custom addressable event kind for blog articles
- **Nostr Network**: All articles are published to Nostr relays and are cryptographically signed
- **Access Control**: Only two authorized pubkeys can publish articles
- **HackerNoon Design**: Sleek, professional design inspired by HackerNoon.com

## Authorized Publishers

Only these two accounts can publish articles to the blog:

1. **Heather**: `npub1nl8r463jkdtr0qu0k3dht03jt9t59cttk0j8gtxg9wea2russlnq2zf9d0`
   - Pubkey (hex): `9fce3aea32b35637838fb45b75be32595742e16bb3e4742cc82bb3d50f9087e6`

2. **Derek**: `npub18ams6ewn5aj2n3wt2qawzglx9mr4nzksxhvrdc4gzrecw7n5tvjqctp424`
   - Pubkey (hex): `4f1ebb82e7c7b631e234b02b87f6fdf87cf2c46d8eed17f23ca3b89e3f86ff5f`

## Features

### Reading Articles

- **Blog Home** (`/`): Browse all published articles with filters by category
- **Article View** (`/article/:slug`): Read full article with markdown rendering
- **Categories**: Filter articles by tags (building, thinking, product, podcast, updates)
- **Author Info**: See who wrote each article with their Nostr profile
- **Read Time**: Automatic calculation of reading time
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

### Publishing Articles

- **Restricted Access**: Only authorized publishers can access the publish page
- **Markdown Support**: Write articles in Markdown format with full syntax highlighting
- **Featured Images**: Add custom images to articles
- **Categories**: Tag articles with multiple categories
- **Draft Prevention**: All articles are published directly to Nostr (no drafts)
- **Automatic Timestamps**: Publication dates are automatically set

## Data Structure

### Kind 30251: Blog Article Event

```json
{
  "kind": 30251,
  "content": "Full article content in Markdown",
  "tags": [
    ["d", "article-slug"],
    ["title", "Article Title"],
    ["summary", "Brief article summary"],
    ["image", "https://example.com/image.jpg"],
    ["image_alt", "Alt text for image"],
    ["t", "category1"],
    ["t", "category2"],
    ["published_at", "1234567890"]
  ]
}
```

### Tag Meanings

- `d`: Unique slug for the article (URL-safe, lowercase, hyphens only)
- `title`: Article title (required, max 200 characters)
- `summary`: Brief description (required, max 500 characters)
- `image`: Featured image URL (optional)
- `image_alt`: Alt text for accessibility (optional)
- `t`: Category tags (multiple allowed): building, thinking, product, podcast, updates
- `published_at`: Unix timestamp of publication

## Routes

- `/` - Blog home with article list and filters
- `/article/:slug` - Individual article view
- `/publish` - Publish new article (restricted to authorized publishers)

## Hooks

### `useBlogArticles(category?: string)`

Query blog articles with optional category filter.

```typescript
const { data: articles, isLoading } = useBlogArticles('building');
```

### `useBlogArticle(slug: string)`

Fetch a single article by slug.

```typescript
const { data: article } = useBlogArticle('my-article');
```

### `usePublishBlogArticle()`

Publish a new article. Automatically enforces access control.

```typescript
const { mutate, isAuthorized } = usePublishBlogArticle();

mutate({
  slug: 'my-article',
  title: 'My Article',
  summary: 'A brief summary',
  content: '# Markdown content',
  image: 'https://example.com/image.jpg',
  categories: ['building', 'thinking'],
});
```

## Components

### `BlogHeader`

Main header with blog title and publish button (for authorized users).

### `BlogList`

Grid of article cards with category filtering.

### `ArticleCard`

Individual article card in the grid view showing:
- Featured image
- Title
- Summary
- Categories
- Author info and profile picture
- Read time and publication date

### `ArticleView`

Full article view with:
- Featured image
- Markdown rendering with syntax highlighting
- Author info
- Read time
- Publication date
- Navigation links

### `PublishArticleForm`

Form for publishing new articles with validation:
- Slug validation (lowercase, hyphens only)
- Title and summary length validation
- Markdown content editing
- Category selection
- Image and alt text fields
- Access control enforcement

## Design Features

The blog uses a HackerNoon-inspired design with:

- **Clean Typography**: Large, bold headlines with excellent readability
- **Professional Colors**: Dark and light mode support with carefully chosen grays and blues
- **Smooth Interactions**: Hover effects, transitions, and loading skeletons
- **Responsive Grid**: Articles display in responsive grid (1 column on mobile, 3 on desktop)
- **Rich Metadata**: Each article shows author, read time, publication date, and categories
- **Markdown Rendering**: Full Markdown support with code highlighting and proper formatting

## Future Enhancements

Possible future additions:
- Comments on articles using NIP-COMMENTS kind
- Related articles recommendations
- Social sharing (NIP-19 identifiers)
- Search functionality
- Author-specific article feeds
- Draft support using NIP-2 (JSON)
- Article statistics (views, engagement)
