# StackerNoon - Complete Project Index

## 📋 Quick Navigation

### For First-Time Users
👉 Start here: **[QUICKSTART.md](./QUICKSTART.md)** - Step-by-step guide to read and publish articles

### For Project Overview
👉 Read: **[README.md](./README.md)** - Complete feature list and getting started guide

### For Technical Details
👉 Review: **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design and data flow diagrams

### For Blog System Docs
👉 Explore: **[docs/BLOG.md](./docs/BLOG.md)** - Technical documentation for the platform

### For Protocol Details
👉 Check: **[NIP.md](./NIP.md)** - Nostr protocol documentation for Kind 23 (NIP-23)

---

## 📁 File Structure

### Documentation Files

| File | Purpose |
|------|---------|
| **QUICKSTART.md** | Quick start guide for Derek & Heather |
| **README.md** | Complete project overview and features |
| **BUILD_SUMMARY.md** | Implementation details and customization |
| **ARCHITECTURE.md** | System design, data flow, and diagrams |
| **NIP.md** | Nostr protocol definition for Kind 30251 |
| **PROJECT_INDEX.md** | This file - project navigation guide |

### Source Code - Hooks (Nostr Integration)

```
src/hooks/
├── useBlogArticles.ts         # Query blog articles
├── usePublishBlogArticle.ts   # Publish new articles
└── [other hooks - pre-existing]
```

### Source Code - Components (UI)

```
src/components/blog/
├── BlogHeader.tsx              # Header with title & publish button
├── BlogList.tsx                # Article grid with filters
├── ArticleCard.tsx             # Individual article card
├── ArticleView.tsx             # Full article view
└── PublishArticleForm.tsx      # Article creation form
```

### Source Code - Pages (Routes)

```
src/pages/
├── Blog.tsx                    # Home page (/
├── ArticlePage.tsx             # Article view (/article/:slug)
├── PublishPage.tsx             # Publish form (/publish)
└── [other pages - pre-existing]
```

### Configuration Files

```
Root/
├── NIP.md                      # Protocol definition
├── package.json                # Dependencies (added: react-markdown)
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite build config
├── tailwind.config.ts          # Tailwind CSS config
└── AppRouter.tsx               # Route configuration
```

### Documentation Folder

```
docs/
├── BLOG.md                     # Blog system documentation ⭐ NEW
├── AI_CHAT.md                  # AI chat patterns
├── NOSTR_COMMENTS.md           # Comment system patterns
├── NOSTR_DIRECT_MESSAGES.md    # Messaging patterns
└── NOSTR_INFINITE_SCROLL.md    # Feed patterns
```

---

## 🎯 Key Features Implemented

### ✅ Private Blog System
- Only Derek and Heather can publish
- Access control enforced via Nostr pubkeys
- Full Markdown support
- Category filtering
- Author profile integration

### ✅ Nostr Integration
- Custom Kind 30251 (addressable events)
- Cryptographic signing via NIP-07
- Multi-relay publishing
- Efficient querying
- Event validation

### ✅ User Experience
- HackerNoon-inspired design
- Responsive mobile-to-desktop
- Dark/light mode
- Skeleton loading states
- Smooth animations
- Category filtering
- Read time calculation

### ✅ Form Validation
- Slug validation (lowercase, hyphens)
- Title length validation
- Summary length validation
- URL validation
- Category requirements
- Markdown support
- Authorization checks

### ✅ Performance
- TanStack Query caching
- Lazy image loading
- Event query optimization
- Code splitting
- Minimal relay load

---

## 🚀 How to Use

### 1. Reading Articles
```
Visit / → Browse articles → Click article → Read full content
```

### 2. Publishing Articles
```
Log in → Click "Write Article" → Fill form → Click "Publish"
```

### 3. Filtering Articles
```
Visit / → Click category badge → See filtered articles
```

---

## 🔐 Publishing

**Anyone can publish** articles to StackerNoon using their Nostr key! Just use any Nostr client that supports Kind 23 (long-form content) and your article will appear on the platform.

---

## 📊 Categories Available

StackerNoon is Bitcoin and Nostr focused:

| Category | Use Case |
|----------|----------|
| **bitcoin** | Bitcoin development, analysis, adoption |
| **nostr** | Nostr protocol and clients |
| **building** | Building on Bitcoin and Nostr |

To modify the default categories, edit `CATEGORIES` in:
- `src/components/blog/BlogList.tsx`

---

## 🛠️ Customization Quick Guide

### Change Blog Title
File: `src/components/blog/BlogHeader.tsx`
```jsx
<div className="text-2xl font-black">YOUR TITLE HERE</div>
```

### Change Default Categories
File: `src/components/blog/BlogList.tsx`
```typescript
const CATEGORIES = ['bitcoin', 'ethereum', 'nostr', 'defi', 'nft', 'web3', 'crypto'];
```

### Change Colors
File: `src/index.css` - modify CSS custom properties (currently HackerNoon green)

### Change Relays
File: `src/App.tsx` - modify `defaultConfig.relayMetadata.relays`

---

## 📦 Dependencies

### New Package Added
- `react-markdown@10.1.0` - Markdown rendering

### Pre-existing Key Dependencies
- React 18.3.1
- TypeScript 5.5.3
- TailwindCSS 3.4.11
- Vite 6.3.5
- Nostrify 0.48.2
- TanStack Query 5.56.2
- React Router 6.26.2
- React Hook Form 7.53.0
- Zod 3.25.71
- Lucide React 0.462.0
- shadcn/ui components

---

## 🧪 Testing & Validation

### Run Tests
```bash
npm run test
```

Includes:
- TypeScript type checking
- ESLint linting
- Vitest unit tests
- Build validation

### Build Project
```bash
npm run build
```

Output: `dist/` directory (ready for deployment)

### Development Server
```bash
npm run dev
```

Open: `http://localhost:5173`

---

## 🔗 Nostr Resources

### Articles About Kind 30251
- See `NIP.md` for complete specification
- See `docs/BLOG.md` for implementation guide

### Nostr Relay Configuration
Default relays in `src/App.tsx`:
- `wss://relay.ditto.pub`
- `wss://relay.nostr.band`
- `wss://relay.damus.io`

### NIP-07 (Signer)
Used for:
- User authentication
- Event signing
- NIP-44 encryption

---

## 📚 Additional Documentation

### For Development
- **[docs/BLOG.md](./docs/BLOG.md)** - Blog system technical docs
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design
- **[BUILD_SUMMARY.md](./BUILD_SUMMARY.md)** - Implementation details

### For Nostr Integration
- **[NIP.md](./NIP.md)** - Protocol definition
- **[docs/NOSTR_COMMENTS.md](./docs/NOSTR_COMMENTS.md)** - Comment patterns
- **[docs/NOSTR_DIRECT_MESSAGES.md](./docs/NOSTR_DIRECT_MESSAGES.md)** - Messaging

### For Deployment
- Check GitHub Actions workflows in `.github/workflows/`
- Build output is in `dist/` directory
- Compatible with Vercel, Netlify, and Shakespeare deployment

---

## 🎓 Learning Path

**New to this project?**

1. **Start**: Read [QUICKSTART.md](./QUICKSTART.md) (5 min)
2. **Understand**: Read [README.md](./README.md) (10 min)
3. **Deep Dive**: Review [ARCHITECTURE.md](./ARCHITECTURE.md) (15 min)
4. **Modify**: Edit files based on [BUILD_SUMMARY.md](./BUILD_SUMMARY.md)

**Want to understand the protocol?**

1. **Basics**: Start with [NIP.md](./NIP.md)
2. **Technical**: Read [docs/BLOG.md](./docs/BLOG.md)
3. **Examples**: Look at hooks in `src/hooks/`

**Want to add features?**

1. **Check docs**: See if documented in `docs/`
2. **Follow patterns**: Look at existing components
3. **Reference**: Check [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 📞 Support & Questions

### For Setup Issues
👉 See [QUICKSTART.md](./QUICKSTART.md#troubleshooting)

### For Technical Questions
👉 See [BUILD_SUMMARY.md](./BUILD_SUMMARY.md)

### For Protocol Questions
👉 See [NIP.md](./NIP.md)

### For Architecture Questions
👉 See [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## ✨ What's Next?

### Possible Enhancements
- [ ] Comment system on articles
- [ ] Search functionality
- [ ] Related articles
- [ ] Author-specific feeds
- [ ] Social sharing (NIP-19)
- [ ] Draft support
- [ ] Article statistics
- [ ] Email subscriptions

See [README.md](./README.md#-future-enhancements) for more ideas.

---

## 📝 Git Commits

View the implementation history:

```bash
git log --oneline
```

Key commits:
1. `feat: Add Derek & Me Chronicles private blog system`
2. `docs: Add comprehensive README and blog documentation`
3. `docs: Add quick start guide`
4. `docs: Add comprehensive build summary`
5. `docs: Add detailed architecture documentation`

---

## 🎭 Built with Shakespeare

This project was created with [Shakespeare.diy](https://shakespeare.diy)

[![Vibed with Shakespeare](https://img.shields.io/badge/Vibed%20with-Shakespeare-8B7AFF)](https://shakespeare.diy)

---

**Last Updated**: January 16, 2026
**Status**: ✅ Production Ready
**Version**: 1.0.0
**Maintainers**: Heather Larson & Derek
