import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { platformConfig } from "@/lib/helpers";
import type { PlatformStats } from "@/types";

/* ===== Engagement Chart Props ===== */
interface EngagementChartProps {
  data: PlatformStats[];
}

/* ===== Custom Tooltip ===== */
interface TooltipPayload {
  value: number;
  payload: { platform: string };
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
      <p className="mb-1 text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground">
        Engagement: <span className="font-medium text-foreground">{payload[0]?.value}%</span>
      </p>
    </div>
  );
}

/* ===== Engagement Chart Component ===== */
export default function EngagementChart({ data }: EngagementChartProps) {
  const chartData = data.map((stat) => ({
    platform: platformConfig[stat.platform].label,
    engagement: stat.engagement,
    fill: platformConfig[stat.platform].chartColor,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Rate</CardTitle>
        <CardDescription>
          Average engagement rate per platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="platform"
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={(value: number) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="engagement"
                radius={[6, 6, 0, 0]}
                maxBarSize={60}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
