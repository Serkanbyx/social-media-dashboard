# 📊 Social Media Dashboard

A modern, responsive social media analytics dashboard built with React, TypeScript, and Vite. Track followers, engagement rates, impressions, and manage posts across multiple platforms — all from a single, beautifully designed interface.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

## Features

- **Dashboard Overview** — Real-time stats cards showing total followers, engagement rate, posts, and impressions with trend indicators
- **Multi-Platform Analytics** — Visual area and bar charts for Instagram, Twitter, Facebook, YouTube, and LinkedIn powered by Recharts
- **Posts Management** — Full CRUD operations: create, edit, delete, and filter posts by platform, status, or search query, with changes persisted to localStorage across sessions
- **Dark/Light Mode** — Toggle between themes with persistent localStorage preference and system preference detection
- **Responsive Design** — Fully responsive layout with collapsible sidebar and off-canvas navigation for mobile devices
- **State Management** — Centralized state with Redux Toolkit, async thunks, and typed hooks for predictable data flow
- **Mock API** — Simulated REST API service layer with realistic data, artificial delays for authentic UX, and localStorage-backed persistence for post mutations

## Live Demo

[🚀 View Live Demo](https://social-media-dashboardd.netlify.app/dashboard)

## Technologies

- **React 19**: Latest version of the UI library with modern hooks and concurrent features
- **TypeScript 5**: Type-safe development with strict typing and interfaces
- **Vite 7**: Lightning-fast build tool with HMR and optimized production builds
- **Redux Toolkit**: Centralized state management with createSlice and createAsyncThunk
- **React Router v7**: Client-side routing with nested layouts and route protection
- **Tailwind CSS v4**: Utility-first CSS framework with CSS variables for theming
- **shadcn/ui**: Beautifully designed, accessible UI components built with Radix UI primitives
- **Recharts**: Composable charting library for React (Area, Bar charts)
- **Lucide React**: Modern, consistent icon set with tree-shaking support
- **clsx & tailwind-merge**: Utility functions for conditional and merged class names
- **class-variance-authority (CVA)**: Type-safe component variant management
- **Netlify**: Automated deployment with continuous integration

## Installation

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/Serkanbyx/social-media-dashboard.git
cd social-media-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on `localhost:5173` |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |

## Usage

1. **Open the Dashboard** — Navigate to the main dashboard to see an overview of all your social media metrics at a glance
2. **Analyze Platform Stats** — View individual platform cards showing followers, engagement rate, posts, and impressions with growth indicators
3. **Explore Charts** — Toggle between weekly and monthly views on the audience overview area chart to track trends over time
4. **Manage Posts** — Switch to the Posts page to create, edit, or delete posts across different platforms
5. **Filter & Search** — Use the search bar, platform filter, status filter, and sort options to find specific posts quickly
6. **Toggle Theme** — Click the sun/moon icon in the header to switch between dark and light mode

## How It Works?

### Architecture

The application follows a clean separation of concerns pattern with Pages orchestrating data, Components handling presentation, Services abstracting API calls, and a centralized Redux Store managing state.

### Routing

React Router v7 handles client-side navigation with a shared `Layout` component wrapping all routes:

```typescript
// App.tsx - Route Configuration
<Routes>
  <Route element={<Layout />}>
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/posts" element={<PostsPage />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Route>
</Routes>
```

### State Management

Redux Toolkit manages the entire application state with two main slices:

```typescript
// store/index.ts
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer, // Stats, summary, analytics, period
    posts: postsReducer,         // Items, filters, sort, search
  },
});
```

### Data Flow

1. Pages dispatch async thunks on mount via `useEffect`
2. Thunks call the mock API service layer
3. API returns data with simulated delays (300–600ms)
4. Redux state updates trigger component re-renders
5. Components read state with typed `useAppSelector` hooks
6. Post mutations (create/update/delete) are persisted to localStorage, so changes survive page reloads
7. Redundant fetches are skipped via the thunk `condition` option when data is already loaded

### Theme System

The theme system uses CSS variables with a custom `useTheme` hook:

```typescript
// hooks/useTheme.ts
const useTheme = () => {
  // Reads from localStorage or falls back to system preference
  // Applies 'dark' class to document.documentElement
  // Persists choice to localStorage
};
```

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
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       └── textarea.tsx
├── data/
│   └── mockData.ts       # Mock data for all entities
├── hooks/
│   └── useTheme.ts       # Dark/light theme hook
├── lib/
│   ├── helpers.ts        # Utility functions & platform config
│   └── utils.ts          # cn() class merge utility
├── pages/
│   ├── DashboardPage.tsx  # Main analytics dashboard
│   └── PostsPage.tsx      # Posts management page
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

## Customization

### Add a New Platform

1. Define the platform in `types/index.ts`:

```typescript
export type Platform = 'instagram' | 'twitter' | 'facebook' | 'youtube' | 'linkedin' | 'tiktok';
```

2. Add platform configuration in `lib/helpers.ts`:

```typescript
export const platformConfig = {
  // ...existing platforms
  tiktok: {
    label: 'TikTok',
    color: 'bg-black text-white',
    chartColor: '#000000',
  },
};
```

3. Add mock data for the new platform in `data/mockData.ts`

### Change Theme Colors

Modify the CSS variables in `src/index.css` to customize the color scheme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ...customize as needed */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  /* ...customize as needed */
}
```

### Add a New Page

1. Create the page component in `src/pages/`
2. Add a new route in `App.tsx`
3. Add a navigation link in `components/layout/Sidebar.tsx`
4. Create a new Redux slice in `src/store/` if needed

## Features in Detail

- ✅ Dashboard with real-time summary statistics and trend indicators
- ✅ Multi-platform analytics with area and bar charts
- ✅ Weekly and monthly chart view toggle
- ✅ Individual platform cards with detailed metrics
- ✅ Recent posts feed on dashboard
- ✅ Full CRUD operations for posts management
- ✅ Search, filter by platform, filter by status, and sort posts
- ✅ Create/Edit post dialog with platform, author, content, and image fields
- ✅ Dark/Light mode with localStorage persistence
- ✅ System theme preference detection
- ✅ Responsive layout with collapsible sidebar
- ✅ Loading skeletons for async data fetching
- ✅ Typed Redux hooks and async thunks
- ✅ Mock API with simulated network delays
- ✅ localStorage persistence for post mutations across sessions
- 🔮 [ ] Real API integration with backend
- 🔮 [ ] User authentication and authorization
- 🔮 [ ] Real-time data with WebSocket updates
- 🔮 [ ] Export analytics as PDF/CSV
- 🔮 [ ] Post scheduling with calendar view
- 🔮 [ ] Notification system with real-time alerts

## Contributing

1. Fork the repository
2. Create your feature branch:

```bash
git checkout -b feat/amazing-feature
```

3. Commit your changes:

```bash
git commit -m "feat: add amazing feature"
```

4. Push to the branch:

```bash
git push origin feat/amazing-feature
```

5. Open a Pull Request

### Commit Message Format

| Prefix | Description |
|--------|-------------|
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `refactor:` | Code refactoring |
| `docs:` | Documentation changes |
| `chore:` | Maintenance tasks |
| `style:` | Code style changes (formatting, etc.) |
| `test:` | Adding or updating tests |

## Deployment

The project is configured for **Netlify** deployment with the `netlify.toml` file:

1. Push your code to GitHub
2. Connect the repository to Netlify
3. Netlify will auto-detect the build settings from `netlify.toml`
4. Deploy!

## License

This project is open source and available under the [MIT License](LICENSE).

## Developer

**Serkan Bayraktar**

- [Website](https://serkanbayraktar.com/)
- [GitHub](https://github.com/Serkanbyx)
- [Email](mailto:serkanbyx1@gmail.com)

## Contact

- **Bug Reports**: [Open an Issue](https://github.com/Serkanbyx/social-media-dashboard/issues)
- **Email**: serkanbyx1@gmail.com
- **Website**: [serkanbayraktar.com](https://serkanbayraktar.com/)

---

⭐ If you like this project, don't forget to give it a star!
