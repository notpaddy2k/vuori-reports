"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatValue } from "@/lib/utils";
import type { BarChartConfig, DataRow } from "@/lib/types";

const DEFAULT_COLORS = ["#2C5F8A", "#E8913A", "#5BA67D", "#C75B5B", "#D4A843", "#6A9BC3", "#8E6BBF", "#4ECDC4"];

interface BarChartProps {
  data: DataRow[];
  config: BarChartConfig;
  title?: string;
}

export function BarChartComponent({ data, config, title }: BarChartProps) {
  const isHorizontal = config.orientation === "horizontal";
  const ChartComponent = RechartsBarChart;

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ChartComponent
            data={data}
            layout={isHorizontal ? "vertical" : "horizontal"}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            {isHorizontal ? (
              <>
                <YAxis dataKey={config.xAxis.key} type="category" tick={{ fontSize: 12 }} width={120} />
                <XAxis type="number" tick={{ fontSize: 12 }} />
              </>
            ) : (
              <>
                <XAxis dataKey={config.xAxis.key} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
              </>
            )}
            <Tooltip
              formatter={(value: number, name: string) => {
                const metric = config.metrics.find((m) => m.key === name);
                return [formatValue(value, metric?.format, metric?.decimals), metric?.label || name];
              }}
            />
            <Legend />
            {config.metrics.map((metric, i) => (
              <Bar
                key={metric.key}
                dataKey={metric.key}
                name={metric.label}
                fill={metric.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                stackId={config.stacked ? "stack" : undefined}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
