"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatValue } from "@/lib/utils";
import type { DonutChartConfig, DataRow } from "@/lib/types";

const DEFAULT_COLORS = ["#2C5F8A", "#E8913A", "#5BA67D", "#C75B5B", "#D4A843", "#6A9BC3", "#8E6BBF", "#4ECDC4"];

interface DonutChartProps {
  data: DataRow[];
  config: DonutChartConfig;
  title?: string;
}

export function DonutChart({ data, config, title }: DonutChartProps) {
  const total = data.reduce((sum, row) => sum + (Number(row[config.valueKey]) || 0), 0);

  const renderLabel = config.showPercent !== false
    ? ({ name, value }: { name: string; value: number }) => {
        const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0";
        return `${name} (${pct}%)`;
      }
    : undefined;

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey={config.valueKey}
              nameKey={config.categoryKey}
              cx="50%"
              cy="50%"
              innerRadius={config.innerRadius ?? 60}
              outerRadius={100}
              paddingAngle={2}
              label={renderLabel}
              labelLine={true}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={DEFAULT_COLORS[i % DEFAULT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [formatValue(value, "number"), ""]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
