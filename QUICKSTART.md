# Derek & Me Chronicles - Quick Start Guide

Welcome to your private blog! Here's how to get started.

## 🎯 What is This?

This is a private Nostr-powered blog where only you and Derek can publish articles. Everything you publish is cryptographically signed and stored on the Nostr network.

## 🚀 Getting Started

### Step 1: Access the Blog

1. Open the blog at your deployed URL (or `http://localhost:5173` if running locally)
2. You'll see the home page with all published articles

### Step 2: Log In

1. Click the login button (usually in the top right)
2. Choose your Nostr signer extension (Alby, nos2x, etc.)
3. Approve the login request
4. Once logged in as Derek or Heather, you'll see the "Write Article" button

### Step 3: Write Your First Article

1. Click the "Write Article" button
2. Fill in the article details:
   - **URL Slug**: A URL-safe name (e.g., `first-article`, `building-nostr`)
   - **Title**: Your article title (max 200 characters)
   - **Summary**: A brief description (max 500 characters)
   - **Categories**: Choose what type of article this is (building, thinking, product, podcast, updates)
   - **Content**: Write your full article in Markdown
   - **Featured Image** (optional): Add a header image URL
   - **Image Alt Text** (optional): Description for accessibility

3. Click "Publish Article"
4. Your article is published to Nostr immediately!

## 📝 Markdown Tips

Use Markdown formatting in your articles:

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

Choose categories that best describe your article:

- **building**: Technical posts about what you're building
- **thinking**: Thoughts, reflections, and philosophical posts
- **product**: Product announcements and updates
- **podcast**: Posts related to podcasting or Soapbox Sessions
- **updates**: General updates and announcements

You can choose multiple categories per article!

## 📖 Reading Articles

1. **Browse all**: Start from the home page
2. **Filter by category**: Click a category badge to see only articles in that category
3. **Read**: Click an article to read the full content
4. **Share**: Copy the article URL to share with others

## 🔒 Security & Privacy

- Your articles are **cryptographically signed** with your Nostr keys
- Only **Derek and Heather's pubkeys** can publish articles
- Articles are **permanently stored** on the Nostr network
- Your **private key never leaves** your device/extension

## ⚡ Features at a Glance

| Feature | Details |
|---------|---------|
| **Article Storage** | Nostr Kind 30251 (addressable events) |
| **Markdown Support** | Full markdown with code highlighting |
| **Featured Images** | Custom header images for each article |
| **Author Info** | Shows Nostr profile info for each article |
| **Read Time** | Automatically calculated for each article |
| **Categories** | Filter articles by topics |
| **Responsive** | Works on mobile, tablet, and desktop |
| **Dark Mode** | Full light/dark theme support |

## 🐛 Troubleshooting

### "You are not authorized to publish articles"
- Make sure you're logged in with the correct Nostr account
- Only Derek and Heather's accounts can publish

### Article didn't publish
- Check your internet connection
- Make sure your Nostr signer extension is working
- Try again in a few moments

### Article slug error
- Slugs must be lowercase with only letters, numbers, and hyphens
- Examples: `good-article`, `my-post-2024`, `nostr-tips`
- Not allowed: `My Article`, `article!`, `special@chars`

### Featured image not showing
- Make sure the image URL is publicly accessible
- Try a different hosting service (Blossom, Imgur, etc.)

## 📚 More Information

- **Full Documentation**: See `docs/BLOG.md` for technical details
- **Nostr Protocol**: See `NIP.md` for the article schema
- **Project Details**: See `README.md` for the full feature list

## 🎉 Start Writing!

Your chronicles are waiting to be told. Click "Write Article" and start sharing what you're building and thinking about!

Happy writing! ✍️
