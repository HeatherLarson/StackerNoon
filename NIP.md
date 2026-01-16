# StackerNoon - Heather & Derek's Nostr Long-Form Content Platform

This document describes the Nostr protocol usage in StackerNoon, a long-form content discovery platform featuring articles from Heather and Derek.

## Kind 23: Long-Form Content

StackerNoon displays long-form articles (Kind 23) from Heather and Derek about Bitcoin and Nostr.

**Type**: Regular Event (Kind 23) as defined in NIP-23

**Purpose**: Display long-form content from creators across the Nostr network.

### Event Structure

```json
{
  "kind": 23,
  "content": "Full article content in markdown format",
  "tags": [
    ["d", "article-slug"],
    ["title", "Article Title"],
    ["summary", "Brief summary of the article"],
    ["image", "https://example.com/image.jpg"],
    ["t", "bitcoin"],
    ["t", "nostr"],
    ["published_at", "1234567890"]
  ]
}
```

### Standard Tags (NIP-23)

- `d`: Unique identifier (slug) for the article - must be URL-safe lowercase with hyphens
- `title`: Article title (required)
- `summary`: Brief summary of the article (optional, extracted from content if not provided)
- `published_at`: Unix timestamp when the article was published
- `t`: Category tags (can have multiple) - examples: "bitcoin", "ethereum", "nostr", "defi", "nft", "web3", "crypto"
- `image`: Featured image URL for the article (optional)

### Content Format

The `content` field contains the full article text in Markdown format. This allows for:
- Headers, paragraphs, lists
- Code blocks with syntax highlighting
- Links and references
- Images and media

### Example Event

```json
{
  "kind": 23,
  "content": "# Understanding Bitcoin\n\nBitcoin is a peer-to-peer electronic cash system...\n\n## How it Works\n- Decentralized network\n- Proof of work...",
  "tags": [
    ["d", "understanding-bitcoin"],
    ["title", "Understanding Bitcoin"],
    ["summary", "A comprehensive guide to Bitcoin fundamentals"],
    ["image", "https://image.example.com/bitcoin.jpg"],
    ["t", "bitcoin"],
    ["t", "cryptocurrency"],
    ["published_at", "1705000000"]
  ]
}
```

### Authorized Publishers

StackerNoon only displays articles from:
- **Heather**: `9fce3aea32b35637838fb45b75be32595742e16bb3e4742cc82bb3d50f9087e6`
- **Derek**: `4f1ebb82e7c7b631e234b02b87f6fdf87cf2c46d8eed17f23ca3b89e3f86ff5f`

### Querying Articles

StackerNoon queries articles by:
- Kind 23 filter
- Author filter (Heather & Derek only)
- Category using the `#t` filter

```typescript
// Query articles from Heather & Derek
const articles = await nostr.query([
  {
    kinds: [23],
    authors: [
      '9fce3aea32b35637838fb45b75be32595742e16bb3e4742cc82bb3d50f9087e6',
      '4f1ebb82e7c7b631e234b02b87f6fdf87cf2c46d8eed17f23ca3b89e3f86ff5f'
    ],
    limit: 50,
  }
]);

// Query articles by category
const bitcoinArticles = await nostr.query([
  {
    kinds: [23],
    authors: [
      '9fce3aea32b35637838fb45b75be32595742e16bb3e4742cc82bb3d50f9087e6',
      '4f1ebb82e7c7b631e234b02b87f6fdf87cf2c46d8eed17f23ca3b89e3f86ff5f'
    ],
    '#t': ['bitcoin'],
    limit: 50,
  }
]);
```

### NIP-23 Reference

For full NIP-23 specification, see: https://github.com/nostr-protocol/nips/blob/master/23.md
