export interface MetricConfig {
  key: string;
  label: string;
  format?: "number" | "currency" | "percent" | "compact" | "integer";
  decimals?: number;
  color?: string;
  compareKey?: string;
  varianceKey?: string;
  conditionalColor?: {
    positive?: string;
    negative?: string;
  };
}

export interface ColumnConfig {
  key: string;
  label: string;
  format?: "text" | "number" | "currency" | "percent" | "compact" | "integer";
  align?: "left" | "center" | "right";
  sortable?: boolean;
  width?: string;
  conditionalColor?: {
    positive?: string;
    negative?: string;
  };
}

export interface AxisConfig {
  key: string;
  label?: string;
  format?: string;
}

// Component config types
export interface KpiCardConfig {
  metric: MetricConfig;
  trend?: {
    valueKey: string;
    label?: string;
    format?: "percent" | "currency" | "number";
  };
  sparkline?: boolean;
}

export interface ComboChartConfig {
  xAxis: AxisConfig;
  bars?: MetricConfig[];
  lines?: MetricConfig[];
  yAxisLeft?: { label?: string; format?: "currency" | "number" | "compact" };
  yAxisRight?: { label?: string; format?: "percent" | "number" | "compact" };
  showDataLabels?: boolean;
  showLegend?: boolean;
}

export interface BarChartConfig {
  xAxis: AxisConfig;
  metrics: MetricConfig[];
  orientation?: "vertical" | "horizontal";
  stacked?: boolean;
  showDataLabels?: boolean;
}

export interface LineChartConfig {
  xAxis: AxisConfig;
  metrics: MetricConfig[];
  showDots?: boolean;
  smooth?: boolean;
}

export interface DonutChartConfig {
  categoryKey: string;
  valueKey: string;
  showPercent?: boolean;
  innerRadius?: number;
}

export interface PivotTableConfig {
  rowDimensions: {
    key: string;
    label: string;
    showSubtotals?: boolean;
  }[];
  columnGroups: {
    key?: string;
    label: string;
    metrics: MetricConfig[];
  }[];
  showGrandTotal?: boolean;
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  compact?: boolean;
}

export interface DataTableConfig {
  columns: ColumnConfig[];
  pageSize?: number;
  searchable?: boolean;
  exportable?: boolean;
  defaultSort?: {
    key: string;
    direction: "asc" | "desc";
  };
}

export interface RankedListConfig {
  rankKey?: string;
  labelKey: string;
  imageKey?: string;
  metrics: MetricConfig[];
  maxItems?: number;
  timePeriodTabs?: string[];
}

// Data row type — flexible record
export type DataRow = Record<string, unknown>;
