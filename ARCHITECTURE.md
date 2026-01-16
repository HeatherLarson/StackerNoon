# Derek & Me Chronicles - Architecture Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Browser                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              React Application (Vite)                    │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │   Blog Page  │  │ Article Page │  │ Publish Page │  │  │
│  │  │      (/)     │  │ (/article/:) │  │   (/publish) │  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │  │
│  │         │                  │                  │          │  │
│  │         └──────────────────┴──────────────────┘          │  │
│  │                      │                                    │  │
│  │         ┌────────────▼────────────┐                      │  │
│  │         │   React Router          │                      │  │
│  │         │   (Navigation)          │                      │  │
│  │         └────────────┬────────────┘                      │  │
│  │                      │                                    │  │
│  │         ┌────────────▼────────────┐                      │  │
│  │         │   Custom Hooks          │                      │  │
│  │         │ - useBlogArticles       │                      │  │
│  │         │ - useBlogArticle        │                      │  │
│  │         │ - usePublishBlogArticle │                      │  │
│  │         │ - useCurrentUser        │                      │  │
│  │         └────────────┬────────────┘                      │  │
│  │                      │                                    │  │
│  │         ┌────────────▼────────────┐                      │  │
│  │         │   TanStack Query        │                      │  │
│  │         │   (Data Fetching)       │                      │  │
│  │         └────────────┬────────────┘                      │  │
│  │                      │                                    │  │
│  └──────────────────────┼────────────────────────────────────┘  │
└─────────────────────────┼─────────────────────────────────────────┘
                          │
                          │ WebSocket
                          │
            ┌─────────────▼─────────────┐
            │   Nostrify Client         │
            │   (Nostr Protocol Layer)  │
            │   - Query events          │
            │   - Publish events        │
            │   - Sign with NIP-07      │
            └─────────────┬─────────────┘
                          │
            ┌─────────────▼─────────────────────────────┐
            │      Nostr Relay Pool                     │
            │  (Multiple relay connections)            │
            │                                           │
            │  • wss://relay.ditto.pub                │
            │  • wss://relay.nostr.band               │
            │  • wss://relay.damus.io                 │
            └─────────────────────────────────────────┘
```

## Data Flow

### Reading Articles

```
User visits "/" (Blog Home)
         │
         ▼
React renders Blog component
         │
         ▼
useBlogArticles("category") hook is called
         │
         ▼
TanStack Query executes query
         │
         ▼
Nostrify sends filter to relay:
{
  kinds: [30251],
  authors: [pubkey1, pubkey2],
  "#t": ["category"]
}
         │
         ▼
Relay responds with events
         │
         ▼
Hook parses and validates events
         │
         ▼
Articles rendered in grid
```

### Publishing Article

```
Author clicks "Write Article"
         │
         ▼
PublishArticleForm component renders
         │
         ▼
Author fills form & validates
         │
         ▼
Author clicks "Publish"
         │
         ▼
usePublishBlogArticle hook checks authorization
         │
         ├─ NOT AUTHORIZED ─► Error message
         │
         └─ AUTHORIZED ──┐
                         ▼
            Construct Kind 30251 event:
            {
              kind: 30251,
              content: "article markdown",
              tags: [
                ["d", "article-slug"],
                ["title", "..."],
                ... more tags
              ]
            }
                         │
                         ▼
            useNostrPublish hook signs event
            (using NIP-07 signer)
                         │
                         ▼
            Event published to all relays
                         │
                         ▼
            Success message shown
                         │
                         ▼
            User redirected to home page
```

### Reading Single Article

```
User clicks article card
         │
         ▼
Navigate to /article/:slug
         │
         ▼
React renders ArticlePage component
         │
         ▼
useBlogArticle(slug) hook is called
         │
         ▼
TanStack Query executes query:
{
  kinds: [30251],
  authors: [pubkey1, pubkey2],
  "#d": ["slug"]
}
         │
         ▼
Relay returns single event (newest version)
         │
         ▼
Hook parses event
         │
         ▼
ArticleView component renders:
- Featured image
- Title & metadata
- Markdown content (via react-markdown)
- Author profile info
- Read time
```

## Component Hierarchy

```
App.tsx
├── AppRouter
│   ├── Blog.tsx ─────────────────────────┐
│   │   ├── BlogHeader                     │
│   │   │   ├── LoginArea                  │
│   │   │   └── Write Article Button       │
│   │   └── BlogList                       │
│   │       ├── Category Filters (Badges)  │
│   │       └── ArticleCard (Grid)         │
│   │           ├── Featured Image         │
│   │           ├── Title & Categories     │
│   │           ├── Summary                │
│   │           └── Author Info            │
│   │                                      │
│   ├── ArticlePage.tsx ──────────────────┤
│   │   └── ArticleView                    │
│   │       ├── Featured Image             │
│   │       ├── Title & Categories         │
│   │       ├── Author Profile             │
│   │       ├── Article Metadata           │
│   │       ├── Markdown Content           │
│   │       └── Back Link                  │
│   │                                      │
│   ├── PublishPage.tsx ──────────────────┤
│   │   └── PublishArticleForm             │
│   │       ├── Slug Input                 │
│   │       ├── Title Input                │
│   │       ├── Summary Textarea           │
│   │       ├── Category Selection         │
│   │       ├── Content Editor             │
│   │       ├── Image URL Input            │
│   │       ├── Alt Text Input             │
│   │       └── Publish Button             │
│   │                                      │
│   ├── NIP19Page.tsx (unchanged)         │
│   └── NotFound.tsx (unchanged)          │
└── Other providers (unchanged)
    ├── QueryClientProvider
    ├── NostrLoginProvider
    ├── NostrProvider
    ├── AppProvider
    ├── NWCProvider
    └── ...
```

## Hook Dependency Graph

```
useBlogArticles(category)
├── useNostr()
│   ├── Nostrify client instance
│   └── Relay pool management
└── useQuery() [TanStack Query]
    └── Caching & background refetching

useBlogArticle(slug)
├── useNostr()
└── useQuery()

usePublishBlogArticle()
├── useCurrentUser()
│   └── Checks logged-in user
├── useNostrPublish()
│   ├── useNostr()
│   └── Event signing (NIP-07)
└── Validates authorization

PublishArticleForm uses:
├── useForm() [React Hook Form]
├── usePublishBlogArticle()
├── useCurrentUser()
└── useToast()
```

## State Management

### Global State (via providers)
- **NostrLoginProvider**: User login state
- **QueryClient**: Query/mutation state
- **AppProvider**: Theme, relay configuration
- **ThemeProvider**: Dark/light mode

### Component State
- **BlogList**: Selected category filter
- **PublishArticleForm**: Form data, validation
- **ArticleView**: None (derived from route params)

### Query Cache
- **useBlogArticles**: Cached articles per category
- **useBlogArticle**: Cached individual article
- **useAuthor**: Cached author metadata

## Security Model

```
┌──────────────────────────────────────────┐
│    Application Layer (Client-Side)       │
├──────────────────────────────────────────┤
│                                          │
│  1. Check authorization                  │
│     - usePublishBlogArticle hook         │
│     - useBlogArticles AUTHORIZED_PUBLISHERS  │
│                                          │
│  2. Validate input                       │
│     - React Hook Form + Zod validation   │
│                                          │
│  3. Sanitize content                     │
│     - Markdown rendering (safe)          │
│     - URL validation                     │
│                                          │
│  4. Cryptographic signing                │
│     - NIP-07 signer extension            │
│     - User's private key (never leaves   │
│       device)                            │
│                                          │
│  5. Event publishing                     │
│     - Signed event sent to relays        │
│     - Kind 30251 (addressable events)    │
│                                          │
└──────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│      Nostr Network (Relay Layer)         │
├──────────────────────────────────────────┤
│                                          │
│  1. Signature verification               │
│  2. Event kind validation                │
│  3. Persistent storage (if trusted)      │
│  4. Relay filtering on query             │
│                                          │
└──────────────────────────────────────────┘
```

## Kind 30251 Event Schema

```
Event Kind: 30251 (Addressable Replaceable Event)
Addressable by: pubkey + kind + d-tag

Structure:
{
  "kind": 30251,
  "pubkey": "author's pubkey",
  "created_at": 1234567890,
  "content": "Full article in Markdown",
  "tags": [
    // Required
    ["d", "article-slug"],        // unique identifier
    ["title", "Article Title"],   // headline
    ["summary", "Summary text"],  // description
    ["published_at", "timestamp"],// publication time
    
    // Optional
    ["image", "https://..."],     // featured image
    ["image_alt", "alt text"],    // image description
    ["t", "building"],            // category tag
    ["t", "thinking"],            // multiple allowed
    
    // Auto-added
    ["client", "derek-and-me-chronicles"]  // signed by app
  ],
  "sig": "event signature"  // NIP-07 signed
}
```

## Database Strategy

**Storage**: Nostr relays (distributed, decentralized)

**Query Pattern**:
```typescript
// Get all articles by authors
[{ kinds: [30251], authors: [pubkey1, pubkey2], limit: 100 }]

// Get by category
[{ kinds: [30251], authors: [pubkey1, pubkey2], '#t': ['building'], limit: 50 }]

// Get single article
[{ kinds: [30251], authors: [pubkey1, pubkey2], '#d': ['slug'], limit: 1 }]
```

**Caching**:
- TanStack Query caches responses
- Stale time: 60 seconds
- Cache persists across navigation
- Manual cache invalidation on publish

## Error Handling

```
┌─────────────────────────────────────┐
│   Error Boundaries                  │
├─────────────────────────────────────┤
│                                     │
│  ✓ Component errors caught          │
│  ✓ Fallback UI displayed            │
│  ✓ Stack trace logged               │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   Query Error Handling              │
├─────────────────────────────────────┤
│                                     │
│  ✓ Network timeout (5s)             │
│  ✓ Relay unavailable handling       │
│  ✓ Event validation errors          │
│  ✓ User feedback via toast          │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   Form Validation                   │
├─────────────────────────────────────┤
│                                     │
│  ✓ Client-side validation (Zod)     │
│  ✓ Field-level error messages       │
│  ✓ Real-time validation feedback    │
│  ✓ Authorization checks             │
│                                     │
└─────────────────────────────────────┘
```

## Performance Optimizations

1. **Query Caching**: TanStack Query caches results
2. **Lazy Loading**: Images load on demand
3. **Code Splitting**: Route-based splitting via React Router
4. **Event Parsing**: Efficient event validation
5. **Markdown Rendering**: Client-side rendering
6. **Single Relay Read**: Uses one relay for queries (configurable)
7. **Multi-Relay Publish**: Publishes to all configured relays

## Scalability Considerations

- **Articles**: Relays store all kind 30251 events
- **Authors**: Fixed (2 publishers) keeps load low
- **Queries**: Filtered by kind + authors + optional category
- **Relay Load**: Minimal due to small author set
- **Client Load**: Scales well with TanStack Query caching

---

**Architecture Version**: 1.0  
**Last Updated**: January 16, 2026
