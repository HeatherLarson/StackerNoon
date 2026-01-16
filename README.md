# Derek & Me Chronicles

A private, Nostr-powered blog where Derek and Heather chronicle things they're building and talking about. Built with React, TailwindCSS, and Nostr protocol integration.

## 🚀 Features

### Blog Functionality
- **Private Publishing**: Only Heather and Derek can publish articles
- **Markdown Support**: Write rich articles with full Markdown formatting
- **Categories**: Tag articles (building, thinking, product, podcast, updates)
- **Featured Images**: Add beautiful header images to articles
- **Author Info**: Display Nostr profile information for each article
- **Read Time Calculation**: Automatic reading time estimates
- **Responsive Design**: Perfect on mobile, tablet, and desktop

### Design
- **HackerNoon-Inspired**: Sleek, professional design aesthetic
- **Dark Mode Support**: Full dark/light theme support
- **Smooth Interactions**: Hover effects, transitions, and smooth animations
- **Loading States**: Skeleton loaders for better UX
- **Category Filtering**: Filter articles by tags on the home page

### Nostr Integration
- **Kind 30251**: Custom addressable event for blog articles
- **Cryptographically Signed**: All articles are signed with Nostr keys
- **Nostr Network**: Articles are published to Nostr relays
- **Access Control**: Enforced at the application level with pubkey validation

## 🏗️ Architecture

### Routes

- `/` - **Blog Home**: Browse all articles with category filtering
- `/article/:slug` - **Article View**: Read individual articles
- `/publish` - **Publish Article**: Create new articles (restricted to authorized users)

### Key Files

```
src/
├── components/blog/
│   ├── BlogHeader.tsx          # Main blog header with publish button
│   ├── BlogList.tsx            # Article grid with filtering
│   ├── ArticleCard.tsx         # Individual article preview
│   ├── ArticleView.tsx         # Full article display
│   └── PublishArticleForm.tsx  # Article creation form
├── hooks/
│   ├── useBlogArticles.ts      # Query articles hook
│   └── usePublishBlogArticle.ts # Publish article hook
└── pages/
    ├── Blog.tsx                # Blog home page
    ├── ArticlePage.tsx         # Article view page
    └── PublishPage.tsx         # Article creation page
```

### Nostr Data Structure

Articles are stored as Kind 30251 (addressable replaceable events):

```json
{
  "kind": 30251,
  "content": "Full article content in Markdown",
  "tags": [
    ["d", "article-slug"],
    ["title", "Article Title"],
    ["summary", "Brief summary"],
    ["image", "https://example.com/image.jpg"],
    ["image_alt", "Alt text"],
    ["t", "building"],
    ["t", "thinking"],
    ["published_at", "1234567890"]
  ]
}
```

## 👥 Authorized Publishers

Only these Nostr accounts can publish articles:

### Heather Larson
- **npub**: `npub1nl8r463jkdtr0qu0k3dht03jt9t59cttk0j8gtxg9wea2russlnq2zf9d0`
- **Pubkey**: `9fce3aea32b35637838fb45b75be32595742e16bb3e4742cc82bb3d50f9087e6`
- **Profile**: Yoga teacher, sobriety advocate, content creator on Nostr

### Derek
- **npub**: `npub18ams6ewn5aj2n3wt2qawzglx9mr4nzksxhvrdc4gzrecw7n5tvjqctp424`
- **Pubkey**: `4f1ebb82e7c7b631e234b02b87f6fdf87cf2c46d8eed17f23ca3b89e3f86ff5f`

## 🔐 Security & Access Control

- **Nostr Key-Based**: Authentication via Nostr NIP-07 extensions
- **Pubkey Whitelist**: Only whitelisted pubkeys can publish
- **Cryptographic Signatures**: All events are signed with private keys
- **No Passwords**: Uses Nostr wallet/key management

## 📝 Article Metadata

Each article includes:

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | ✅ | URL-friendly identifier (lowercase, hyphens) |
| `title` | ✅ | Article title (max 200 chars) |
| `summary` | ✅ | Brief summary (max 500 chars) |
| `content` | ✅ | Full article in Markdown |
| `image` | ❌ | Featured image URL |
| `image_alt` | ❌ | Image alt text for accessibility |
| `categories` | ✅ | One or more tags (building, thinking, product, podcast, updates) |
| `published_at` | ✅ | Unix timestamp (auto-set) |

## 📚 Documentation

- **[NIP.md](./NIP.md)** - Nostr protocol documentation for Kind 30251
- **[docs/BLOG.md](./docs/BLOG.md)** - Comprehensive blog system documentation
- **[docs/AI_CHAT.md](./docs/AI_CHAT.md)** - AI chat integration patterns
- **[docs/NOSTR_COMMENTS.md](./docs/NOSTR_COMMENTS.md)** - Comment system patterns
- **[docs/NOSTR_DIRECT_MESSAGES.md](./docs/NOSTR_DIRECT_MESSAGES.md)** - Messaging patterns
- **[docs/NOSTR_INFINITE_SCROLL.md](./docs/NOSTR_INFINITE_SCROLL.md)** - Feed patterns

## 🛠️ Technologies

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first styling
- **Vite**: Fast build tool
- **Nostrify**: Nostr protocol library
- **React Router**: Client-side routing
- **TanStack Query**: Data fetching and caching
- **React Hook Form**: Form management
- **shadcn/ui**: Component library
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

### Testing

```bash
# Run all tests
npm run test

# Includes: TypeScript checking, ESLint, Vitest
```

## 📖 Usage

### Reading Articles

1. Visit the home page (`/`)
2. Browse the article grid
3. Click on an article to read full content
4. Use category filters to find specific topics

### Publishing Articles

1. Log in with Nostr (NIP-07 extension)
2. If authorized, click "Write Article" button
3. Fill in article details:
   - Title
   - Summary
   - Content (Markdown)
   - Featured image (optional)
   - Categories
4. Click "Publish Article"
5. Article appears on Nostr network instantly

### Markdown Support

Articles support full Markdown:

```markdown
# Headings
## Subheadings
### Sub-subheadings

**Bold** and *italic* text

- Bullet lists
- With multiple items

1. Numbered lists
2. Also supported

[Links](https://example.com)

> Blockquotes

`inline code` and code blocks:

\`\`\`javascript
const hello = "world";
\`\`\`
```

## 🎨 Customization

### Colors

The blog uses TailwindCSS with custom color scheme. Modify `tailwind.config.ts` to change colors.

### Categories

Edit the `CATEGORIES` constant in `src/components/blog/BlogList.tsx` and `src/components/blog/PublishArticleForm.tsx` to add new categories.

### Authorized Publishers

Edit `AUTHORIZED_PUBLISHERS` in `src/hooks/useBlogArticles.ts` to add/remove publishers.

## 🔗 Nostr Integration

### Querying Articles

```typescript
import { useBlogArticles } from '@/hooks/useBlogArticles';

function MyComponent() {
  const { data: articles } = useBlogArticles('building');
  // ...
}
```

### Publishing Articles

```typescript
import { usePublishBlogArticle } from '@/hooks/usePublishBlogArticle';

function MyComponent() {
  const { mutate, isAuthorized } = usePublishBlogArticle();

  const publish = () => {
    mutate({
      slug: 'my-article',
      title: 'My Article',
      summary: 'Summary text',
      content: '# Markdown content',
      image: 'https://example.com/image.jpg',
      categories: ['building'],
    });
  };
}
```

## 📡 Nostr Relays

The blog connects to multiple Nostr relays by default:

- `wss://relay.ditto.pub`
- `wss://relay.nostr.band`
- `wss://relay.damus.io`

Articles are published to all configured relays for maximum availability.

## 🎯 Future Enhancements

Possible features for future development:

- [ ] Comments on articles (NIP-COMMENTS)
- [ ] Related articles recommendations
- [ ] Article search
- [ ] Author-specific feeds
- [ ] Article statistics
- [ ] Social sharing with NIP-19
- [ ] Draft support
- [ ] Email subscriptions
- [ ] Video support in articles
- [ ] Code syntax highlighting themes

## 📄 License

This project is built with Shakespeare and uses the MIT License.

## 🎭 Built with Shakespeare

This blog was created with [Shakespeare](https://shakespeare.diy) - an AI-powered website builder.

[![Vibed with Shakespeare](https://img.shields.io/badge/Vibed%20with-Shakespeare-8B7AFF)](https://shakespeare.diy)
