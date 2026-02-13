import type { Platform } from "@/types";

/* ===== Number Formatting ===== */
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

/* ===== Percentage Formatting ===== */
export const formatPercentage = (num: number): string => {
  const sign = num >= 0 ? "+" : "";
  return `${sign}${num.toFixed(1)}%`;
};

/* ===== Date Formatting ===== */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatRelativeTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
};

/* ===== Platform Configuration ===== */
export const platformConfig: Record<
  Platform,
  { label: string; color: string; bgColor: string; chartColor: string }
> = {
  instagram: {
    label: "Instagram",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950",
    chartColor: "#ec4899",
  },
  twitter: {
    label: "Twitter",
    color: "text-sky-500",
    bgColor: "bg-sky-50 dark:bg-sky-950",
    chartColor: "#0ea5e9",
  },
  facebook: {
    label: "Facebook",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    chartColor: "#2563eb",
  },
  youtube: {
    label: "YouTube",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950",
    chartColor: "#ef4444",
  },
  linkedin: {
    label: "LinkedIn",
    color: "text-blue-700",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    chartColor: "#1d4ed8",
  },
};
