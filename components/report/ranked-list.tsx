import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatValue } from "@/lib/utils";
import type { RankedListConfig, DataRow } from "@/lib/types";

interface RankedListProps {
  data: DataRow[];
  config: RankedListConfig;
  title?: string;
}

export function RankedList({ data, config, title }: RankedListProps) {
  const items = data.slice(0, config.maxItems || 10);

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-3">
          {items.map((row, i) => {
            const rank = config.rankKey ? (row[config.rankKey] as number) : i + 1;
            const label = String(row[config.labelKey] ?? "");
            const imageUrl = config.imageKey ? (row[config.imageKey] as string) : null;

            return (
              <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                <span className="text-lg font-bold text-muted-foreground w-8 text-center shrink-0">
                  {rank}
                </span>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={label}
                    className="w-12 h-12 object-cover rounded border"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{label}</div>
                  <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                    {config.metrics.map((metric) => (
                      <span key={metric.key}>
                        {metric.label}: {formatValue(row[metric.key], metric.format, metric.decimals)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
