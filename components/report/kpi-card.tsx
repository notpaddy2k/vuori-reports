import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatValue, getConditionalColor } from "@/lib/utils";
import type { KpiCardConfig, DataRow } from "@/lib/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  data: DataRow[];
  config: KpiCardConfig;
  title?: string;
}

export function KpiCard({ data, config, title }: KpiCardProps) {
  const row = data[0]; // KPI cards typically use a single row
  if (!row) return null;

  const value = row[config.metric.key] as number;
  const formatted = formatValue(value, config.metric.format, config.metric.decimals);

  let trendValue: number | null = null;
  let trendFormatted = "";
  let trendColor: string | undefined;

  if (config.trend) {
    trendValue = row[config.trend.valueKey] as number;
    trendFormatted = formatValue(trendValue, config.trend.format || "percent", 1);
    trendColor = getConditionalColor(trendValue, config.metric.conditionalColor);
  }

  const TrendIcon = trendValue !== null
    ? trendValue > 0 ? TrendingUp : trendValue < 0 ? TrendingDown : Minus
    : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {title || config.metric.label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatted}</div>
        {config.trend && trendValue !== null && (
          <div className="flex items-center gap-1 mt-1 text-sm" style={{ color: trendColor }}>
            {TrendIcon && <TrendIcon className="h-4 w-4" />}
            <span>{trendFormatted}</span>
            <span className="text-muted-foreground ml-1">{config.trend.label || "vs LY"}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
