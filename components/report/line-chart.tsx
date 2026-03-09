"use client";

import {
  LineChart as RechartsLineChart,
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
import type { LineChartConfig, DataRow } from "@/lib/types";

const DEFAULT_COLORS = ["#2C5F8A", "#E8913A", "#5BA67D", "#C75B5B", "#D4A843", "#6A9BC3", "#8E6BBF", "#4ECDC4"];

interface LineChartProps {
  data: DataRow[];
  config: LineChartConfig;
  title?: string;
}

export function LineChartComponent({ data, config, title }: LineChartProps) {
  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={config.xAxis.key} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number, name: string) => {
                const metric = config.metrics.find((m) => m.key === name);
                return [formatValue(value, metric?.format, metric?.decimals), metric?.label || name];
              }}
            />
            <Legend />
            {config.metrics.map((metric, i) => (
              <Line
                key={metric.key}
                type={config.smooth ? "monotone" : "linear"}
                dataKey={metric.key}
                name={metric.label}
                stroke={metric.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                strokeWidth={2}
                dot={config.showDots !== false ? { r: 4 } : false}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
