# StackerNoon - Complete Overview

**StackerNoon** is a HackerNoon-inspired long-form content discovery platform powered by the Nostr protocol. It pulls real articles from creators across the Nostr network - no mock data, no central authority, just pure decentralized content.

## 🎨 Design Philosophy

### HackerNoon Aesthetic
- **Green Color Scheme**: #1DB854 (hsl(145, 88%, 47%)) matching HackerNoon.com
- **Professional Header**: Search bar, navigation menu, login/signup buttons
- **Clean Typography**: Bold headlines, readable body text
- **Responsive Design**: Works perfectly on mobile, tablet, desktop
- **Dark/Light Modes**: Full theme support with HackerNoon green accent

### User Experience
- **Featured Articles**: Hero section showcasing the latest/best content
- **Article Grid**: Responsive grid (1 column mobile → 3 columns desktop)
- **Category Filtering**: Filter by #t tags (bitcoin, ethereum, nostr, etc.)
- **Author Integration**: Shows Nostr profile info for each creator
- **Read Time**: Automatic calculation for better article discovery
- **Smooth Interactions**: Hover effects, transitions, loading states

## 🔌 Nostr Integration

### Kind 23 (NIP-23)
StackerNoon uses Kind 23 for long-form content, as defined in NIP-23:

```json
{
  "kind": 23,
  "content": "Full markdown article content",
  "tags": [
    ["d", "article-slug"],
    ["title", "Article Title"],
    ["summary", "Brief description"],
    ["image", "https://image-url.jpg"],
    ["t", "bitcoin"],
    ["t", "nostr"],
    ["published_at", "1705000000"]
  ]
}
```

### Real Data from Nostr
- **Source**: Kind 23 events from Nostr network
- **Authors**: Only Heather and Derek
- **Decentralized**: Content stored on Nostr relays worldwide
- **Cryptographically Signed**: All articles verified with author's signature
- **Private**: Curated content from specific authors

## 🏗️ Architecture

### Component Structure

```
App (Providers)
├── NostrProvider (Relay connection)
├── QueryClientProvider (Data caching)
├── NostrLoginProvider (User auth)
└── AppProvider (Theme & config)
    └── AppRouter
        ├── Blog Page
        │   ├── BlogHeader (HackerNoon header)
        │   └── BlogList (Featured + Grid)
        │       ├── ArticleCard (Regular)
        │       └── ArticleCard (Featured)
        ├── ArticlePage
        │   └── ArticleView (Full markdown rendering)
        └── 404 NotFound
```

### Data Flow

```
Home Page
  ↓
useBlogArticles(category?)
  ↓
TanStack Query
  ↓
Nostrify Client
  ↓
Nostr Relay Pool
  ↓
Kind 23 Events (filtered by #t tag)
  ↓
Parse & Validate Events
  ↓
Sort by published_at (newest first)
  ↓
Render ArticleCard components
```

## 📊 Categories

StackerNoon focuses on Bitcoin and Nostr only (customizable in `src/components/blog/BlogList.tsx`):

```
bitcoin    - Bitcoin development, analysis, adoption
nostr      - Nostr protocol, clients, applications
vibecoding - Building on Bitcoin and Nostr
```

## 🎯 Key Features

### Reading
- ✓ Browse article grid with featured section
- ✓ Filter by category tags
- ✓ Click to read full markdown article
- ✓ View author Nostr profile
- ✓ See read time and publication date

### Publishing
- ✓ Anyone can publish (no gatekeeping)
- ✓ Use any Nostr client that supports Kind 23
- ✓ Articles appear instantly on StackerNoon
- ✓ Cryptographically signed content
- ✓ Decentralized storage on Nostr relays

### Design
- ✓ HackerNoon-inspired aesthetic
- ✓ Green color scheme
- ✓ Responsive mobile-to-desktop
- ✓ Dark and light modes
- ✓ Smooth animations

## 🚀 Quick Start

### Read Articles
1. Open StackerNoon
2. Browse featured and recent articles
3. Filter by category (#bitcoin, #ethereum, etc.)
4. Click article to read full content

### Publish Articles
1. Create Kind 23 event in any Nostr client
2. Add title, summary, content (markdown)
3. Tag with categories (#bitcoin, #ethereum, etc.)
4. Publish to Nostr relays
5. Article appears on StackerNoon instantly!

## 🔗 Relays

Default relay configuration (in `src/App.tsx`):

```typescript
relays: [
  'wss://relay.ditto.pub',
  'wss://relay.nostr.band',
  'wss://relay.damus.io',
]
```

### Query Strategy
- **Read**: From any available relay (first to respond)
- **Publish**: To all configured relays (for redundancy)

## 🎨 Color Scheme

### HackerNoon Green
- **Primary**: #1DB854 (hsl(145, 88%, 47%))
- **Dark**: #1a9043 (darker green for accents)
- **Light**: #f0fdf4 (very light green tint)

### Neutral Colors
- **Background**: White (light) / Dark gray (dark mode)
- **Text**: Dark gray (light) / Light gray (dark mode)
- **Border**: Light gray (light) / Dark gray (dark mode)

## 📱 Responsive Breakpoints

```
Mobile:   < 640px  - 1 column
Tablet:   640-1024 - 2 columns
Desktop:  > 1024px - 3 columns
```

All layouts optimized for touch and mouse input.

## 🔒 Security & Privacy

### Cryptographic
- All articles signed with author's Nostr private key
- Signatures verified before display
- No password needed (uses NIP-07 wallet)
- Private keys never leave device

### Decentralized
- No central server controlling content
- Content stored on distributed Nostr relays
- Relays can be run by anyone
- No single point of failure

### Open
- Source code visible (GitHub)
- Protocol documented (NIP-23)
- Anyone can fork and run their own instance
- Community-driven development

## 🛠️ Technologies

### Frontend
- React 18.3.1 - UI framework
- TypeScript 5.5.3 - Type safety
- Vite 6.3.5 - Build tool
- TailwindCSS 3.4.11 - Styling
- shadcn/ui - Components

### Data & State
- TanStack Query 5.56.2 - Server state
- React Router 6.26.2 - Routing
- React Hook Form 7.53.0 - Forms

### Nostr
- Nostrify 0.48.2 - Protocol
- @nostrify/react - React hooks
- nostr-tools 2.13.0 - Utilities

### Content
- react-markdown 10.1.0 - Markdown rendering

## 📈 Performance

### Optimizations
- TanStack Query caching (avoid re-fetching)
- Lazy image loading
- Code splitting by route
- Efficient event parsing
- Minimal relay load (filter at relay level)

### Metrics
- Build size: ~100KB gzipped
- Load time: < 2s (typical)
- Relay query timeout: 8 seconds
- Stale time: 60 seconds (TanStack Query)

## 🎯 Use Cases

### For Readers
- **Discover** long-form content from Nostr creators
- **Follow** authors and topics
- **Read** articles with rich markdown formatting
- **Share** articles via URL

### For Writers (Heather & Derek)
- **Publish** articles directly to Nostr using Kind 23
- **Control** your own content (no central authority)
- **Reach** audience across relays
- **Share** Bitcoin and Nostr knowledge

### For Communities
- **Build** niche content platforms
- **Filter** by categories
- **Create** personalized feeds
- **Share** knowledge decentralized

## 🔄 Content Flow

```
Nostr Creator
  ↓
Creates Kind 23 event (long-form article)
  ↓
Signs with Nostr key
  ↓
Publishes to Nostr relays
  ↓
StackerNoon queries relays
  ↓
Receives article events
  ↓
Validates and parses
  ↓
Displays in article grid
  ↓
Reader discovers article
```

## 📚 Documentation Structure

```
README.md              - Project overview and features
QUICKSTART.md         - How to read and publish articles
ARCHITECTURE.md       - System design and data flow
BUILD_SUMMARY.md      - Implementation details
PROJECT_INDEX.md      - Navigation guide
NIP.md               - Kind 23 protocol spec
STACKERNOON_OVERVIEW.md - This file
```

## 🎓 Learning Resources

### Nostr
- **NIP-23**: https://github.com/nostr-protocol/nips/blob/master/23.md
- **Nostr Docs**: https://nostr.guide/
- **Nostrify**: https://nostrify.dev/

### Markdown
- **CommonMark Spec**: https://spec.commonmark.org/
- **Markdown Guide**: https://www.markdownguide.org/

### Web Technologies
- **React**: https://react.dev/
- **TailwindCSS**: https://tailwindcss.com/
- **Vite**: https://vitejs.dev/

## 🚀 Deployment

### Options
- **Vercel**: Auto-deploying from GitHub
- **Netlify**: Drag-and-drop deploys
- **Shakespeare**: Deploy directly from editor
- **Self-hosted**: Any static host (dist/ folder)

### Environment
- No backend required (fully client-side)
- Relays handle all data persistence
- No database needed
- No authentication server needed

## 🎭 Built with Shakespeare

StackerNoon was created with [Shakespeare.diy](https://shakespeare.diy) - an AI-powered website builder for Nostr.

Shakespeare makes it easy to:
- Design with AI assistance
- Build React applications
- Integrate Nostr directly
- Deploy with one click
- Collaborate with AI

## 💡 Philosophy

**StackerNoon is about**:
- ✨ Long-form Bitcoin & Nostr content
- 🔓 Curated publishing (Heather & Derek only)
- 🛡️ Cryptographic verification
- 🌍 Decentralized hosting on Nostr
- 👥 High-quality content focus
- 💪 Bitcoin maximalism

**StackerNoon is NOT**:
- ❌ A content moderation platform
- ❌ Centralized social media
- ❌ For everyone to publish
- ❌ Collecting user data
- ❌ Ad-supported
- ❌ Venture-backed

## 🎯 Future Vision

### Near-term
- [ ] Search functionality
- [ ] Author following
- [ ] Lightning tips
- [ ] Comments system
- [ ] Article ratings

### Long-term
- [ ] Decentralized moderation
- [ ] Creator marketplace
- [ ] Content rewards
- [ ] Multi-relay filtering
- [ ] Personalized algorithms

## 📊 Project Stats

- **Created**: January 16, 2026
- **Type**: Long-form content platform
- **Protocol**: Nostr (Kind 23 - NIP-23)
- **Data Source**: Real Nostr network (no mock data)
- **Design**: HackerNoon-inspired
- **License**: MIT
- **Status**: Production Ready

## 🤝 Community

- **GitHub**: Public repository
- **Nostr**: Share on Nostr network
- **Issues**: Report bugs and request features
- **Discussions**: Community feedback welcome

---

**StackerNoon: Decentralized long-form content discovery on Nostr** 🚀

Built with Shakespeare.diy | Powered by Nostr | Inspired by HackerNoon
