# StackerNoon - Quick Start Guide

Welcome to StackerNoon, your Nostr-powered long-form content platform!

## 🎯 What is This?

StackerNoon is a long-form content discovery platform featuring articles from Heather and Derek about Bitcoin and Nostr. It's inspired by HackerNoon but powered by the Nostr protocol - meaning all content is cryptographically signed and decentralized.

## 🚀 Getting Started

### Step 1: Access StackerNoon

1. Open the blog at your deployed URL (or `http://localhost:5173` if running locally)
2. You'll see the home page with long-form articles from Nostr creators
3. No login required to read articles!

### Step 2: Browse Articles

1. **Scroll the home page** to see featured and recent articles
2. **Filter by category** - Click category badges (#bitcoin, #ethereum, #nostr, etc.)
3. **Click an article** to read the full content
4. **View author info** - Each article shows the author's Nostr profile

### Step 3: Read Articles

Each article shows:
- Featured image
- Title and summary
- Author name and profile picture
- Read time estimate
- Publication date
- Full markdown content when you click to read

### Step 4: Publish Your Own Article

If you're Heather or Derek:

1. Click the "Write Now" button in the header
2. Log in with your Nostr signer (Alby, nos2x, etc.)
3. Use any Nostr client that supports Kind 23 (long-form content)
4. Write your article in Markdown format
5. Include tags using `#bitcoin` or `#nostr`
6. Publish to the Nostr network
7. Your article will appear on StackerNoon automatically!

## 📝 Markdown Tips

Write articles with Markdown formatting:

```markdown
# Main Heading
## Subheading
### Sub-subheading

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)

> Blockquote or quote

\`\`\`javascript
// Code block
const hello = "world";
\`\`\`

\`inline code\`
```

## 🎨 Article Categories

StackerNoon focuses on Bitcoin and Nostr:

- **bitcoin** - Bitcoin development, analysis, and adoption
- **nostr** - Nostr protocol, clients, and applications
- **building** - Building on Bitcoin and Nostr

Filter articles by these categories to find what matters.

## 📖 Reading Articles

1. **Browse all**: Start from the home page
2. **Filter by category**: Click a category badge to see only articles in that category
3. **Read**: Click an article to read the full content with markdown rendering
4. **Share**: Copy the article URL to share with others

## 🔒 Security & Privacy

- Your articles are **cryptographically signed** with your Nostr keys
- **No central server** - content is stored on Nostr relays
- Your **private key never leaves** your device/extension
- Content is **permanent** and immutable on the Nostr network

## ⚡ Features at a Glance

| Feature | Details |
|---------|---------|
| **Content Format** | Nostr Kind 23 (NIP-23 long-form) |
| **Markdown Support** | Full markdown with code highlighting |
| **Featured Images** | Custom header images for each article |
| **Author Info** | Shows Nostr profile info for each article |
| **Read Time** | Automatically calculated for each article |
| **Categories** | Filter articles by #t tags |
| **Responsive** | Works on mobile, tablet, and desktop |
| **Dark Mode** | Full light/dark theme support |

## 🐛 Troubleshooting

### Articles not showing
- Check your internet connection
- Make sure Nostr relays are connected
- Try refreshing the page
- Give the relays a moment to respond

### Can't publish article
- Make sure you're logged in with a Nostr signer
- Use a client that supports Kind 23 (long-form content)
- Try publishing a simpler test article first

### Article not appearing after publishing
- Give the relays 30-60 seconds to sync
- Refresh the page to see new articles
- Check that your article has a title and content

### Images not loading
- Make sure the image URL is publicly accessible
- Try a different image hosting service
- Some image hosts may be blocked by CORS

## 📚 More Information

- **Full Documentation**: See `README.md` for complete features
- **Nostr Protocol**: See `NIP.md` for the Kind 23 spec
- **Architecture**: See `ARCHITECTURE.md` for system design

## 🎉 Start Exploring!

StackerNoon showcases the best long-form content from Nostr creators. Start reading, discover amazing content, and share your own stories!

Happy reading! 📚
