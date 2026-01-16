# Derek and Me Chronicles - Custom Nostr Events

This document defines custom Nostr event kinds used in the Derek and Me Chronicles application.

## Kind 30251: Blog Articles

Articles and chronicles for the Derek and Me Chronicles blog.

**Type**: Addressable Replaceable Event (Kind 30251)

**Purpose**: Store and retrieve blog articles authored by allowed contributors.

### Event Structure

```json
{
  "kind": 30251,
  "content": "Full article content in markdown format",
  "tags": [
    ["d", "article-slug"],
    ["title", "Article Title"],
    ["summary", "Brief summary of the article"],
    ["image", "https://example.com/image.jpg"],
    ["t", "category-tag"],
    ["published_at", "1234567890"]
  ]
}
```

### Required Tags

- `d`: Unique identifier (slug) for the article - must be URL-safe lowercase with hyphens
- `title`: Article title (required, max 200 characters)
- `summary`: Brief summary of the article (required, max 500 characters)
- `published_at`: Unix timestamp when the article was published

### Optional Tags

- `image`: Featured image URL for the article
- `t`: Category tags (can have multiple) - commonly used: "building", "thinking", "product", "podcast", "updates"
- `image_alt`: Alt text for the featured image

### Access Control

Articles can only be published by these pubkeys (configured in the application):
- Heather Larson: `9fce3aea32b35637838fb45b75be32595742e16bb3e4742cc82bb3d50f9087e6`
- Derek: `4f1ebb82e7c7b631e234b02b87f6fdf87cf2c46d8eed17f23ca3b89e3f86ff5f` (decoded from npub18ams6ewn5aj2n3wt2qawzglx9mr4nzksxhvrdc4gzrecw7n5tvjqctp424)

### Content Format

The `content` field contains the full article text in Markdown format. This allows for:
- Headers, paragraphs, lists
- Code blocks with syntax highlighting
- Links and references
- Images and media

### Example Event

```json
{
  "kind": 30251,
  "content": "# Building with Nostr\n\nThis week we explored...\n\n## Key Takeaways\n- Point 1\n- Point 2",
  "tags": [
    ["d", "building-with-nostr"],
    ["title", "Building with Nostr"],
    ["summary", "Weekly chronicles of our Nostr development journey"],
    ["image", "https://image.example.com/building.jpg"],
    ["t", "building"],
    ["published_at", "1705000000"]
  ]
}
```

### Querying Articles

Articles can be queried by:
- Author pubkey + kind
- Category using the `#t` filter
- Date range using the timestamp

```typescript
// Query all articles by an author
const articles = await nostr.query([
  {
    kinds: [30251],
    authors: [pubkey],
  }
]);

// Query articles by category
const buildingArticles = await nostr.query([
  {
    kinds: [30251],
    '#t': ['building'],
  }
]);
```
