import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { platformConfig } from "@/lib/helpers";
import type { AnalyticsDataPoint } from "@/types";

/* ===== Analytics Chart Props ===== */
interface AnalyticsChartProps {
  data: AnalyticsDataPoint[];
  period: "weekly" | "monthly";
  onPeriodChange: (period: "weekly" | "monthly") => void;
}

/* ===== Custom Tooltip ===== */
interface TooltipPayload {
  color: string;
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;

  return (
    <div className="rounded-lg border bg-background p-3 shadow-lg">
      <p className="mb-2 text-sm font-medium">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium">
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ===== Analytics Chart Component ===== */
export default function AnalyticsChart({
  data,
  period,
  onPeriodChange,
}: AnalyticsChartProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Audience Overview</CardTitle>
          <CardDescription>
            Impressions across all platforms ({period === "weekly" ? "this week" : "last 6 months"})
          </CardDescription>
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          <Button
            variant={period === "weekly" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onPeriodChange("weekly")}
            className={cn(
              "text-xs",
              period !== "weekly" && "text-muted-foreground"
            )}
          >
            Weekly
          </Button>
          <Button
            variant={period === "monthly" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onPeriodChange("monthly")}
            className={cn(
              "text-xs",
              period !== "monthly" && "text-muted-foreground"
            )}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                {(Object.keys(platformConfig) as Array<keyof typeof platformConfig>).map(
                  (key) => (
                    <linearGradient
                      key={key}
                      id={`gradient-${key}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={platformConfig[key].chartColor}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={platformConfig[key].chartColor}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  )
                )}
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={(value: number) =>
                  value >= 1000 ? `${(value / 1000).toFixed(0)}K` : String(value)
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
              />
              {(Object.keys(platformConfig) as Array<keyof typeof platformConfig>).map(
                (key) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    name={platformConfig[key].label}
                    stroke={platformConfig[key].chartColor}
                    fill={`url(#gradient-${key})`}
                    strokeWidth={2}
                  />
                )
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
