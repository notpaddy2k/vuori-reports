"use client";

import dynamic from "next/dynamic";

// Recharts components must be dynamically imported with ssr: false
// to prevent hydration mismatch (Recharts generates different SVG on server vs client)
export const ComboChart = dynamic(
  () => import("./combo-chart").then((m) => ({ default: m.ComboChart })),
  { ssr: false }
);
export const BarChartComponent = dynamic(
  () => import("./bar-chart").then((m) => ({ default: m.BarChartComponent })),
  { ssr: false }
);
export const LineChartComponent = dynamic(
  () => import("./line-chart").then((m) => ({ default: m.LineChartComponent })),
  { ssr: false }
);
export const DonutChart = dynamic(
  () => import("./donut-chart").then((m) => ({ default: m.DonutChart })),
  { ssr: false }
);
export const DataTable = dynamic(
  () => import("./data-table").then((m) => ({ default: m.DataTable })),
  { ssr: false }
);

// These don't use Recharts or client state — safe as regular exports
export { KpiCard } from "./kpi-card";
export { PivotTable } from "./pivot-table";
export { RankedList } from "./ranked-list";
export { Insight } from "./insight";
