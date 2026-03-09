import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatValue, getConditionalColor, cn } from "@/lib/utils";
import type { PivotTableConfig, DataRow, MetricConfig } from "@/lib/types";

interface PivotTableProps {
  data: DataRow[];
  config: PivotTableConfig;
  title?: string;
}

function renderMetricCell(row: DataRow, metric: MetricConfig) {
  const value = row[metric.key] as number;
  const formatted = formatValue(value, metric.format, metric.decimals);
  const color = metric.conditionalColor
    ? getConditionalColor(value, metric.conditionalColor)
    : undefined;

  return (
    <TableCell key={metric.key} className="text-right tabular-nums" style={{ color }}>
      {formatted}
    </TableCell>
  );
}

export function PivotTable({ data, config, title }: PivotTableProps) {
  const { rowDimensions, columnGroups } = config;

  // Build row hierarchy for rendering
  type RowGroup = { label: string; children: RowGroup[]; rows: DataRow[]; depth: number };

  function buildHierarchy(rows: DataRow[], dims: typeof rowDimensions, depth: number): RowGroup[] {
    if (dims.length === 0) return [];
    const dim = dims[0];
    const groups = new Map<string, DataRow[]>();
    for (const row of rows) {
      const key = String(row[dim.key] ?? "");
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(row);
    }
    return Array.from(groups.entries()).map(([label, groupRows]) => ({
      label,
      children: buildHierarchy(groupRows, dims.slice(1), depth + 1),
      rows: groupRows,
      depth,
    }));
  }

  const hierarchy = buildHierarchy(data, rowDimensions, 0);

  // Compute subtotals for a group of rows
  function computeSubtotal(rows: DataRow[]): DataRow {
    const totals: DataRow = {};
    for (const group of columnGroups) {
      for (const metric of group.metrics) {
        const sum = rows.reduce((acc, r) => acc + (Number(r[metric.key]) || 0), 0);
        totals[metric.key] = sum;
      }
    }
    return totals;
  }

  // Flatten hierarchy into renderable rows
  type FlatRow = { type: "data" | "subtotal" | "grandtotal"; label: string; indent: number; data: DataRow };
  const flatRows: FlatRow[] = [];

  function flattenGroup(group: RowGroup) {
    if (group.children.length > 0) {
      for (const child of group.children) {
        // Data row with both dimensions
        if (child.children.length === 0) {
          for (const row of child.rows) {
            flatRows.push({
              type: "data",
              label: child.label,
              indent: group.depth + 1,
              data: row,
            });
          }
        } else {
          flattenGroup(child);
        }
      }
      // Subtotal for this group
      if (rowDimensions[group.depth]?.showSubtotals !== false) {
        flatRows.push({
          type: "subtotal",
          label: `${group.label} Total`,
          indent: group.depth,
          data: computeSubtotal(group.rows),
        });
      }
    } else {
      for (const row of group.rows) {
        flatRows.push({
          type: "data",
          label: group.label,
          indent: group.depth,
          data: row,
        });
      }
    }
  }

  for (const group of hierarchy) {
    // Add group header
    if (rowDimensions.length > 1) {
      flatRows.push({
        type: "data",
        label: group.label,
        indent: 0,
        data: {},
      });
    }
    flattenGroup(group);
  }

  // Grand total
  const grandTotal = config.showGrandTotal !== false ? computeSubtotal(data) : null;

  // Total metric columns
  const totalMetrics = columnGroups.reduce((sum, g) => sum + g.metrics.length, 0);

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            {/* Column group headers */}
            <TableRow>
              <TableHead
                className={cn(
                  "min-w-[200px]",
                  config.stickyFirstColumn !== false && "sticky left-0 z-10 bg-card"
                )}
                rowSpan={2}
              >
                {rowDimensions.map((d) => d.label).join(" / ")}
              </TableHead>
              {columnGroups.map((group) => (
                <TableHead
                  key={group.label}
                  className="text-center border-l"
                  colSpan={group.metrics.length}
                >
                  {group.label}
                </TableHead>
              ))}
            </TableRow>
            {/* Metric headers */}
            <TableRow>
              {columnGroups.map((group) =>
                group.metrics.map((metric) => (
                  <TableHead key={`${group.label}-${metric.key}`} className="text-right text-xs border-l whitespace-nowrap">
                    {metric.label}
                  </TableHead>
                ))
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {flatRows.map((row, i) => {
              const isSubtotal = row.type === "subtotal";
              const isGroupHeader = row.type === "data" && Object.keys(row.data).length === 0;

              if (isGroupHeader) {
                return (
                  <TableRow key={i} className="bg-muted/30">
                    <TableCell
                      className={cn(
                        "font-semibold",
                        config.stickyFirstColumn !== false && "sticky left-0 z-10 bg-muted/30"
                      )}
                      colSpan={totalMetrics + 1}
                    >
                      {row.label}
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <TableRow key={i} className={cn(isSubtotal && "font-semibold bg-muted/20 border-t")}>
                  <TableCell
                    className={cn(
                      config.stickyFirstColumn !== false && "sticky left-0 z-10 bg-card",
                      isSubtotal && "bg-muted/20"
                    )}
                    style={{ paddingLeft: `${(row.indent || 0) * 16 + 12}px` }}
                  >
                    {row.label}
                  </TableCell>
                  {columnGroups.map((group) =>
                    group.metrics.map((metric) => renderMetricCell(row.data, metric))
                  )}
                </TableRow>
              );
            })}
          </TableBody>
          {grandTotal && (
            <TableFooter>
              <TableRow className="font-bold">
                <TableCell
                  className={cn(
                    config.stickyFirstColumn !== false && "sticky left-0 z-10 bg-muted/50"
                  )}
                >
                  Grand Total
                </TableCell>
                {columnGroups.map((group) =>
                  group.metrics.map((metric) => renderMetricCell(grandTotal, metric))
                )}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}
