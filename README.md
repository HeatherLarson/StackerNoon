# StackerNoon

A Nostr-native long-form content platform inspired by HackerNoon. Browse and read long-form articles (Kind 23 events) from creators across the Nostr network. Built with React, TailwindCSS, and Nostr protocol integration.

## 🚀 Features

### Blog Functionality
- **Open Publishing**: Any Nostr user can publish long-form articles
- **Markdown Support**: Write rich articles with full Markdown formatting
- **Categories**: Discover articles by tags (#bitcoin, #ethereum, #nostr, #defi, #nft, #web3, #crypto, etc.)
- **Featured Images**: Add beautiful header images to articles
- **Author Info**: Display Nostr profile information for each article
- **Read Time Calculation**: Automatic reading time estimates
- **Responsive Design**: Perfect on mobile, tablet, and desktop

### Design
- **HackerNoon-Inspired**: Sleek, professional design with green accent colors
- **Dark Mode Support**: Full dark/light theme support
- **Smooth Interactions**: Hover effects, transitions, and smooth animations
- **Loading States**: Skeleton loaders for better UX
- **Category Filtering**: Filter articles by tags on the home page
- **Featured Section**: Hero section showcasing the latest article

### Nostr Integration
- **Kind 23**: NIP-23 standard for long-form content
- **Cryptographically Signed**: All articles are signed with Nostr keys
- **Nostr Network**: Articles discovered from the entire Nostr ecosystem
- **Author Discovery**: See Nostr profiles and metadata for every author
- **Open Contribution**: Anyone with a Nostr key can publish

## 🏗️ Architecture

### Routes

- `/` - **Blog Home**: Browse all articles with category filtering
- `/article/:slug` - **Article View**: Read individual articles

### Key Files

```
src/
├── components/blog/
│   ├── BlogHeader.tsx          # HackerNoon-style header
│   ├── BlogList.tsx            # Article grid with filtering
│   ├── ArticleCard.tsx         # Individual article preview
│   └── ArticleView.tsx         # Full article display
├── hooks/
│   ├── useBlogArticles.ts      # Query long-form articles
│   └── usePublishBlogArticle.ts # Publish articles
└── pages/
    ├── Blog.tsx                # Blog home page
    └── ArticlePage.tsx         # Article view page
```

### Nostr Data Structure

StackerNoon uses Kind 23 (NIP-23) events for long-form content:

```json
{
  "kind": 23,
  "content": "Full article content in Markdown",
  "tags": [
    ["d", "article-slug"],
    ["title", "Article Title"],
    ["summary", "Brief summary"],
    ["image", "https://example.com/image.jpg"],
    ["t", "bitcoin"],
    ["t", "nostr"],
    ["published_at", "1234567890"]
  ]
}
```

## 🔗 Data Sources

StackerNoon queries the Nostr network for:
- **Kind 23 Events**: Long-form content articles
- **Any Author**: Articles from all Nostr creators
- **All Categories**: Filtered by #t tags

Articles are sorted by published_at timestamp (newest first).

## 📝 Article Categories

StackerNoon focuses on Bitcoin and Nostr:
- **bitcoin** - Bitcoin development, analysis, and adoption
- **nostr** - Nostr protocol, clients, and applications
- **building** - Building on Bitcoin and Nostr

Browse by category tags to discover related content.

## 🛠️ Technologies

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first styling with HackerNoon green theme
- **Vite**: Fast build tool
- **Nostrify**: Nostr protocol library
- **React Router**: Client-side routing
- **TanStack Query**: Data fetching and caching
- **react-markdown**: Markdown rendering

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Building

```bash
# Build for production
npm run build

# Output goes to dist/
```

## 📖 Usage

### Reading Articles

1. Visit the home page (`/`)
2. Browse the article grid or use category filters
3. Click on an article to read full content
4. Use category tags to discover related articles

### Publishing Articles

1. Log in with your Nostr signer (Alby, nos2x, etc.)
2. Use any Nostr client that supports Kind 23 to publish
3. Your article will appear on StackerNoon automatically
4. Tag with categories using #t tags

### Markdown Support

Articles support full Markdown:

```markdown
# Headings
## Subheadings

**Bold** and *italic* text

- Bullet lists
- With multiple items

1. Numbered lists
2. Also supported

[Links](https://example.com)

> Blockquotes

\`\`\`javascript
const code = "highlighted";
\`\`\`
```

## 🎨 Design

StackerNoon uses the HackerNoon color scheme:
- **Primary Green**: #1DB854 (hsl(145, 88%, 47%))
- **Dark Green**: Accent and borders
- **Neutral**: Grays for text and backgrounds

The design is responsive and works perfectly on mobile, tablet, and desktop devices.

## 🔗 Nostr Integration

### Querying Articles

```typescript
import { useBlogArticles } from '@/hooks/useBlogArticles';

function MyComponent() {
  const { data: articles } = useBlogArticles('bitcoin');
  // ...
}
```

### Publishing Articles

Use any Nostr client that supports NIP-23 to publish Kind 23 events.

## 📡 Nostr Relays

StackerNoon connects to multiple Nostr relays by default:

- `wss://relay.ditto.pub`
- `wss://relay.nostr.band`
- `wss://relay.damus.io`

Articles are discovered from all configured relays.

## 🎯 Future Enhancements

Possible features for future development:

- [ ] Search functionality across articles
- [ ] Author following and personalized feeds
- [ ] Commenting on articles
- [ ] Article ratings and recommendations
- [ ] Social sharing with NIP-19 identifiers
- [ ] Advanced filtering options
- [ ] Article statistics and engagement
- [ ] Lightning tips for authors
- [ ] Newsletter subscriptions

## 📄 License

This project is built with Shakespeare and uses the MIT License.

## 🎭 Built with Shakespeare

This platform was created with [Shakespeare](https://shakespeare.diy) - an AI-powered website builder.

[![Vibed with Shakespeare](https://img.shields.io/badge/Vibed%20with-Shakespeare-8B7AFF)](https://shakespeare.diy)
