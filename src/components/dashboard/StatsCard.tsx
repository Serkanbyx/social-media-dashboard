import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatNumber, formatPercentage } from "@/lib/helpers";

/* ===== Stats Card Props ===== */
interface StatsCardProps {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  suffix?: string;
}

/* ===== Stats Card Component ===== */
export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  suffix = "",
}: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">
              {formatNumber(value)}
              {suffix}
            </p>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive ? "text-emerald-500" : "text-red-500"
                )}
              >
                {formatPercentage(change)}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
          <div className={cn("rounded-xl p-3", iconBg)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
