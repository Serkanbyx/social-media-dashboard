import { useEffect } from "react";
import { Users, Eye, FileText, TrendingUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchDashboardStats,
  fetchDashboardSummary,
  fetchAnalytics,
} from "@/store/dashboardSlice";
import { fetchPosts } from "@/store/postsSlice";
import StatsCard from "@/components/dashboard/StatsCard";
import PlatformCard from "@/components/dashboard/PlatformCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import EngagementChart from "@/components/dashboard/EngagementChart";
import RecentPosts from "@/components/dashboard/RecentPosts";
import { Skeleton } from "@/components/ui/skeleton";

/* ===== Dashboard Page ===== */
export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { stats, summary, analytics, analyticsPeriod, loading } =
    useAppSelector((state) => state.dashboard);
  const { items: posts } = useAppSelector((state) => state.posts);

  /* Fetch data on mount */
  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchDashboardSummary());
    dispatch(fetchAnalytics("weekly"));
    dispatch(fetchPosts());
  }, [dispatch]);

  /* Handle analytics period change */
  const handlePeriodChange = (period: "weekly" | "monthly") => {
    dispatch(fetchAnalytics(period));
  };

  /* Loading State */
  if (loading && !summary) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[130px] rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-[420px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      {summary && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total Followers"
            value={summary.totalFollowers}
            change={summary.totalFollowersChange}
            icon={Users}
            iconColor="text-blue-500"
            iconBg="bg-blue-500/10"
          />
          <StatsCard
            title="Engagement Rate"
            value={summary.totalEngagement}
            change={summary.totalEngagementChange}
            icon={TrendingUp}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-500/10"
            suffix="%"
          />
          <StatsCard
            title="Total Posts"
            value={summary.totalPosts}
            change={summary.totalPostsChange}
            icon={FileText}
            iconColor="text-purple-500"
            iconBg="bg-purple-500/10"
          />
          <StatsCard
            title="Total Impressions"
            value={summary.totalImpressions}
            change={summary.totalImpressionsChange}
            icon={Eye}
            iconColor="text-amber-500"
            iconBg="bg-amber-500/10"
          />
        </div>
      )}

      {/* Analytics Chart */}
      <AnalyticsChart
        data={analytics}
        period={analyticsPeriod}
        onPeriodChange={handlePeriodChange}
      />

      {/* Platform Cards + Engagement Chart */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <PlatformCard key={stat.id} stats={stat} />
            ))}
          </div>
        </div>
        <EngagementChart data={stats} />
      </div>

      {/* Recent Posts */}
      <RecentPosts posts={posts} />
    </div>
  );
}
