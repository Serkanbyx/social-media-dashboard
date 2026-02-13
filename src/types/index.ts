/* ===== Platform Types ===== */
export type Platform = "instagram" | "twitter" | "facebook" | "youtube" | "linkedin";

/* ===== Stats Overview ===== */
export interface PlatformStats {
  id: string;
  platform: Platform;
  followers: number;
  followersChange: number;
  engagement: number;
  engagementChange: number;
  posts: number;
  impressions: number;
  impressionsChange: number;
}

/* ===== Analytics Data Point ===== */
export interface AnalyticsDataPoint {
  date: string;
  instagram: number;
  twitter: number;
  facebook: number;
  youtube: number;
  linkedin: number;
}

/* ===== Post ===== */
export interface Post {
  id: string;
  platform: Platform;
  content: string;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  shares: number;
  status: "published" | "scheduled" | "draft";
  createdAt: string;
  scheduledAt?: string;
  image?: string;
}

/* ===== Dashboard Stats Summary ===== */
export interface DashboardSummary {
  totalFollowers: number;
  totalFollowersChange: number;
  totalEngagement: number;
  totalEngagementChange: number;
  totalPosts: number;
  totalPostsChange: number;
  totalImpressions: number;
  totalImpressionsChange: number;
}

/* ===== API Response Wrapper ===== */
export interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
}

/* ===== Filter / Sort Options ===== */
export type PostFilter = "all" | Platform;
export type PostStatus = "all" | "published" | "scheduled" | "draft";
export type SortOrder = "newest" | "oldest" | "most-liked" | "most-commented";
