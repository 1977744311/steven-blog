# Steven Blog

A modern blog built with Next.js and Notion as CMS. Forked from [thegesturs/notion-blogs](https://github.com/thegesturs/notion-blogs) with enhanced UI and features.

## What's New

- **Pagination** — Homepage displays 6 posts per page with URL-based navigation (`/?page=2`)
- **Search** — `Cmd+K` / `Ctrl+K` to open a search dialog, filter posts by title, description, tags, and category
- **Sticky Navbar** — Frosted glass effect header with search button and dark mode toggle
- **Improved Cards** — Gradient placeholder for posts without cover images, consistent card heights
- **Enhanced Footer** — Blog info section with back-to-top button
- **Deploy Button** — One-click Vercel deploy trigger with secret authentication

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Notion
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Theming**: next-themes (light/dark)

## Getting Started

### Prerequisites

- Node.js 18.17+
- pnpm
- A Notion account

### 1. Clone & Install

```bash
git clone git@github.com:1977744311/steven-blog.git
cd steven-blog
pnpm install
```

### 2. Set Up Notion

1. Duplicate this [Notion template](https://exclusive-gatsby-850.notion.site/20a186dad999800dbb94f239f907215d?v=20a186dad99980228480000c8707478c&source=github) to your workspace
2. Create a [Notion integration](https://www.notion.so/my-integrations) with "Read content" capability
3. Connect the integration to your database page

### 3. Environment Variables

Create `.env.local`:

```env
NOTION_TOKEN=your_integration_token
NOTION_DATABASE_ID=your_database_id
NEXT_PUBLIC_SITE_URL=https://your-site.com
VERCEL_DEPLOY_HOOK=your_vercel_deploy_hook_url
DEPLOY_SECRET=your_deploy_secret
```

### 4. Run

```bash
pnpm dev
```

Visit `http://localhost:3000`.

## Database Properties

| Property | Type | Required |
|---|---|---|
| Title | Title | Yes |
| Status | Status (Published/Draft) | Yes |
| Published Date | Date | Yes |
| Author | People | No |
| Tags | Multi-select | No |
| Category | Select | No |
| Featured Image | Files | No |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage with pagination
│   ├── posts/[slug]/page.tsx # Post detail page
│   └── api/deploy/route.ts   # Deploy API
├── components/
│   ├── navbar.tsx            # Sticky navbar with search
│   ├── search-dialog.tsx     # Cmd+K search dialog
│   ├── post-card.tsx         # Blog post card
│   ├── post-pagination.tsx   # Pagination controls
│   ├── layout.tsx            # Main layout
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── notion.ts             # Notion API & cache
│   └── utils.ts              # Utilities
└── scripts/
    └── cache-posts.ts        # Build-time post caching
```

## Credits

Based on [thegesturs/notion-blogs](https://github.com/thegesturs/notion-blogs).

## License

MIT
