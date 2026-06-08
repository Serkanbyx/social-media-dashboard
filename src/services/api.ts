import type {
  PlatformStats,
  AnalyticsDataPoint,
  Post,
  DashboardSummary,
  ApiResponse,
} from "@/types";
import {
  platformStats,
  weeklyAnalytics,
  monthlyAnalytics,
  dashboardSummary,
  posts as mockPosts,
} from "@/data/mockData";

/* ===== Simulated API Delay ===== */
const simulateDelay = (ms: number = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/* ===== Dashboard API ===== */
export const dashboardApi = {
  /** Fetch platform statistics */
  async getStats(): Promise<ApiResponse<PlatformStats[]>> {
    await simulateDelay(600);
    return { data: platformStats, status: "success" };
  },

  /** Fetch dashboard summary */
  async getSummary(): Promise<ApiResponse<DashboardSummary>> {
    await simulateDelay(400);
    return { data: dashboardSummary, status: "success" };
  },

  /** Fetch analytics data */
  async getAnalytics(
    period: "weekly" | "monthly" = "weekly"
  ): Promise<ApiResponse<AnalyticsDataPoint[]>> {
    await simulateDelay(500);
    const data = period === "weekly" ? weeklyAnalytics : monthlyAnalytics;
    return { data, status: "success" };
  },
};

/* ===== Posts Persistence ===== */
const POSTS_STORAGE_KEY = "posts";

/** Load posts from localStorage, falling back to mock data */
const loadPosts = (): Post[] => {
  try {
    const stored = localStorage.getItem(POSTS_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Post[]) : [...mockPosts];
  } catch {
    return [...mockPosts];
  }
};

/** Persist the current posts store to localStorage */
const persistPosts = (posts: Post[]): void => {
  try {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // Ignore write errors (e.g. storage unavailable or quota exceeded)
  }
};

/* ===== Posts API ===== */
// In-memory store for CRUD operations, hydrated from localStorage
let postsStore: Post[] = loadPosts();

export const postsApi = {
  /** Fetch all posts */
  async getPosts(): Promise<ApiResponse<Post[]>> {
    await simulateDelay(500);
    return { data: [...postsStore], status: "success" };
  },

  /** Fetch a single post by ID */
  async getPostById(id: string): Promise<ApiResponse<Post | null>> {
    await simulateDelay(300);
    const post = postsStore.find((p) => p.id === id) || null;
    return { data: post, status: post ? "success" : "error" };
  },

  /** Create a new post */
  async createPost(
    post: Omit<Post, "id" | "createdAt" | "likes" | "comments" | "shares">
  ): Promise<ApiResponse<Post>> {
    await simulateDelay(400);
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
    };
    postsStore = [newPost, ...postsStore];
    persistPosts(postsStore);
    return { data: newPost, status: "success" };
  },

  /** Update an existing post */
  async updatePost(
    id: string,
    updates: Partial<Post>
  ): Promise<ApiResponse<Post | null>> {
    await simulateDelay(400);
    const exists = postsStore.some((p) => p.id === id);
    if (!exists) {
      return { data: null, status: "error", message: "Post not found" };
    }
    postsStore = postsStore.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    persistPosts(postsStore);
    const updated = postsStore.find((p) => p.id === id) ?? null;
    return { data: updated, status: "success" };
  },

  /** Delete a post */
  async deletePost(id: string): Promise<ApiResponse<boolean>> {
    await simulateDelay(300);
    const exists = postsStore.some((p) => p.id === id);
    if (!exists) {
      return { data: false, status: "error", message: "Post not found" };
    }
    postsStore = postsStore.filter((p) => p.id !== id);
    persistPosts(postsStore);
    return { data: true, status: "success" };
  },
};
