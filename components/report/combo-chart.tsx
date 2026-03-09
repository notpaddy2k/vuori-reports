"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatValue } from "@/lib/utils";
import type { ComboChartConfig, DataRow } from "@/lib/types";

const DEFAULT_COLORS = ["#2C5F8A", "#E8913A", "#5BA67D", "#C75B5B", "#D4A843", "#6A9BC3", "#8E6BBF", "#4ECDC4"];

interface ComboChartProps {
  data: DataRow[];
  config: ComboChartConfig;
  title?: string;
}

export function ComboChart({ data, config, title }: ComboChartProps) {
  const bars = config.bars || [];
  const lines = config.lines || [];

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey={config.xAxis.key}
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            {(bars.length > 0 || !config.yAxisRight) && (
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => formatValue(v, config.yAxisLeft?.format || "compact")}
              />
            )}
            {lines.length > 0 && (
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => formatValue(v, config.yAxisRight?.format || "percent")}
              />
            )}
            <Tooltip
              formatter={(value: number, name: string) => {
                const metric = [...bars, ...lines].find((m) => m.key === name);
                return [formatValue(value, metric?.format, metric?.decimals), metric?.label || name];
              }}
            />
            {config.showLegend !== false && <Legend />}
            {bars.map((metric, i) => (
              <Bar
                key={metric.key}
                yAxisId="left"
                dataKey={metric.key}
                name={metric.label}
                fill={metric.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                radius={[2, 2, 0, 0]}
              />
            ))}
            {lines.map((metric, i) => (
              <Line
                key={metric.key}
                yAxisId="right"
                type="monotone"
                dataKey={metric.key}
                name={metric.label}
                stroke={metric.color || DEFAULT_COLORS[(bars.length + i) % DEFAULT_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
