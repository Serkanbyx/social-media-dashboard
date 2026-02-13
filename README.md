# Social Media Dashboard

A modern, responsive social media analytics dashboard built with React, TypeScript, and Vite. Track followers, engagement rates, impressions, and manage posts across multiple platforms from a single interface.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwindcss)

## Features

- **Dashboard Overview** — Real-time stats cards showing total followers, engagement rate, posts, and impressions with trend indicators
- **Multi-Platform Analytics** — Visual charts (Area & Bar) for Instagram, Twitter, Facebook, YouTube, and LinkedIn using Recharts
- **Posts Management** — Full CRUD operations: create, edit, delete, and filter posts by platform, status, or search query
- **Dark/Light Mode** — Toggle between themes with persistent localStorage preference
- **Responsive Design** — Fully responsive layout with collapsible sidebar for mobile devices
- **State Management** — Centralized state with Redux Toolkit and async thunks for API calls
- **Mock API** — Simulated REST API with realistic data and artificial delays

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| State Management | Redux Toolkit |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Charts | Recharts |
| Icons | Lucide React |
| Deployment | Netlify |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/social-media-dashboard.git
cd social-media-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on `localhost:5173` |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
├── components/
│   ├── dashboard/        # Dashboard-specific components
│   │   ├── AnalyticsChart.tsx
│   │   ├── EngagementChart.tsx
│   │   ├── PlatformCard.tsx
│   │   ├── RecentPosts.tsx
│   │   └── StatsCard.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   └── Sidebar.tsx
│   ├── posts/            # Posts management components
│   │   ├── CreatePostDialog.tsx
│   │   ├── PostCard.tsx
│   │   └── PostFilters.tsx
│   └── ui/               # Reusable UI components (shadcn/ui)
├── data/
│   └── mockData.ts       # Mock data for all entities
├── hooks/
│   └── useTheme.ts       # Dark/light theme hook
├── lib/
│   ├── helpers.ts        # Utility functions & platform config
│   └── utils.ts          # cn() class merge utility
├── pages/
│   ├── DashboardPage.tsx
│   └── PostsPage.tsx
├── services/
│   └── api.ts            # Mock API service layer
├── store/
│   ├── index.ts          # Redux store configuration
│   ├── dashboardSlice.ts # Dashboard state & thunks
│   └── postsSlice.ts     # Posts state & thunks
├── types/
│   └── index.ts          # TypeScript type definitions
├── App.tsx               # Root component with routing
├── main.tsx              # Application entry point
└── index.css             # Global styles & CSS variables
```

## Routes

| Path | Description |
|------|-------------|
| `/dashboard` | Main analytics dashboard with stats, charts, and recent posts |
| `/posts` | Posts management with filtering, search, and CRUD operations |
| `*` | Redirects to `/dashboard` |

## Deployment

The project is configured for Netlify deployment with the `netlify.toml` file:

1. Push your code to GitHub
2. Connect the repository to Netlify
3. Netlify will auto-detect the build settings from `netlify.toml`
4. Deploy!

## License

This project is open source and available under the [MIT License](LICENSE).
