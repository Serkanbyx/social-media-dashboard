import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatNumber, formatPercentage, platformConfig } from "@/lib/helpers";
import type { PlatformStats } from "@/types";

/* ===== Platform Card Props ===== */
interface PlatformCardProps {
  stats: PlatformStats;
}

/* ===== Platform Card Component ===== */
export default function PlatformCard({ stats }: PlatformCardProps) {
  const config = platformConfig[stats.platform];
  const isPositive = stats.followersChange >= 0;

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{config.label}</CardTitle>
        <Badge
          variant={isPositive ? "success" : "destructive"}
          className="text-xs"
        >
          {formatPercentage(stats.followersChange)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Followers */}
          <div>
            <p className={cn("text-2xl font-bold", config.color)}>
              {formatNumber(stats.followers)}
            </p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="text-center">
              <p className="text-sm font-semibold">{stats.engagement}%</p>
              <p className="text-xs text-muted-foreground">Engagement</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold">{stats.posts}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold">
                {formatNumber(stats.impressions)}
              </p>
              <p className="text-xs text-muted-foreground">Impressions</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
