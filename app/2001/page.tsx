import { ReportHeader } from "@/components/report/report-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  KpiCard,
  ComboChart,
  BarChartComponent,
  DonutChart,
  DataTable,
} from "@/components/report";

// --- Data imports ---
import execKpis from "./data/exec-kpis.json";
import weeklyTrend from "./data/weekly-trend.json";
import channelPerformance from "./data/channel-performance.json";
import channelWeeklyTrend from "./data/channel-weekly-trend.json";
import genderPerformance from "./data/gender-performance.json";
import endUsePerformance from "./data/end-use-performance.json";
import productClassPerformance from "./data/product-class-performance.json";
import colorVsNonColor from "./data/color-vs-noncolor.json";
import nrfColorDetail from "./data/nrf-color-detail.json";
import fullPriceVsMarkdown from "./data/fp-vs-md.json";
import fpMdByChannel from "./data/fp-md-by-channel.json";
import fpMdByGender from "./data/fp-md-by-gender.json";
import returnsWeekly from "./data/returns-weekly.json";
import returnsByDimension from "./data/returns-by-dimension.json";
import fcstGapByChannel from "./data/fcst-gap-by-channel.json";
import fcstGapByEndUse from "./data/fcst-gap-by-end-use.json";
import fcstGapByProductClass from "./data/fcst-gap-by-product-class.json";
import fcstGapByGender from "./data/fcst-gap-by-gender.json";

export default function Page() {
  return (
    <>
      <ReportHeader
        title="DTC Sales Performance"
        description="Actuals vs forecast and operating plan across Ecommerce and Full-Price channels"
        asOfDate="2026-03-08"
      />

      <div className="px-6">
        <Tabs defaultValue="executive-summary">
          <div className="overflow-x-auto -mx-6 px-6">
            <TabsList>
              <TabsTrigger value="executive-summary">Executive Summary</TabsTrigger>
              <TabsTrigger value="channel-performance">Channel Performance</TabsTrigger>
              <TabsTrigger value="product-mix">Product Mix</TabsTrigger>
              <TabsTrigger value="full-price-markdown">Full Price vs Markdown</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="forecast-gap">Forecast Gap</TabsTrigger>
            </TabsList>
          </div>

          {/* ===== Executive Summary ===== */}
          <TabsContent value="executive-summary">
            {/* KPI Cards */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                <KpiCard
                  data={execKpis}
                  config={{
                    metric: { key: "total_demand", label: "Net Demand WTD", format: "currency" },
                    trend: { valueKey: "yoy_pct", label: "vs LY", format: "percent" },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                <KpiCard
                  data={execKpis}
                  config={{
                    metric: {
                      key: "fcst_var_pct",
                      label: "vs Forecast",
                      format: "percent",
                      conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" },
                    },
                    trend: { valueKey: "fcst_var_amt", label: "gap $", format: "currency" },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                <KpiCard
                  data={execKpis}
                  config={{
                    metric: {
                      key: "op_var_pct",
                      label: "vs OP",
                      format: "percent",
                      conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" },
                    },
                    trend: { valueKey: "op_var_amt", label: "gap $", format: "currency" },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                <KpiCard
                  data={execKpis}
                  config={{
                    metric: {
                      key: "yoy_pct",
                      label: "YoY Growth",
                      format: "percent",
                      conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" },
                    },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                <KpiCard
                  data={execKpis}
                  config={{
                    metric: { key: "full_price_pct", label: "Full Price %", format: "percent" },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                <KpiCard
                  data={execKpis}
                  config={{
                    metric: { key: "return_rate_pct", label: "Return Rate", format: "percent" },
                  }}
                />
              </div>
            </div>

            {/* Weekly Demand Trend */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <ComboChart
                  data={weeklyTrend}
                  title="Weekly Demand Trend: Actuals vs Forecast vs OP vs LY"
                  config={{
                    xAxis: { key: "week_end", label: "Week Ending" },
                    bars: [
                      { key: "actual", label: "Actual", format: "currency", color: "#2C5F8A" },
                      { key: "actual_ly", label: "LY", format: "currency", color: "#D4A843" },
                    ],
                    lines: [
                      { key: "fcst", label: "Forecast", format: "currency", color: "#C75B5B" },
                      { key: "op", label: "OP", format: "currency", color: "#636E72" },
                      { key: "yoy_pct", label: "YoY %", format: "percent", color: "#5BA67D" },
                    ],
                    yAxisLeft: { label: "Revenue", format: "compact" },
                    yAxisRight: { label: "YoY %", format: "percent" },
                    showDataLabels: true,
                    showLegend: true,
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== Channel Performance ===== */}
          <TabsContent value="channel-performance">
            {/* EC vs Full-Price — Latest Week */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <BarChartComponent
                  data={channelPerformance}
                  title="EC vs Full-Price — Latest Week"
                  config={{
                    xAxis: { key: "channel", label: "Channel" },
                    metrics: [
                      { key: "actual", label: "Actual", format: "currency", color: "#2C5F8A" },
                      { key: "fcst", label: "Forecast", format: "currency", color: "#C75B5B" },
                      { key: "op", label: "OP", format: "currency", color: "#636E72" },
                      { key: "actual_ly", label: "LY", format: "currency", color: "#D4A843" },
                    ],
                    orientation: "vertical",
                    showDataLabels: true,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DataTable
                  data={channelPerformance}
                  title="Channel Detail"
                  config={{
                    columns: [
                      { key: "channel", label: "Channel", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst_var_pct", label: "vs FCST %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "op_var_pct", label: "vs OP %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "yoy_pct", label: "YoY %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "full_price_pct", label: "FP %", format: "percent", align: "right" },
                      { key: "return_rate_pct", label: "Return Rate", format: "percent", align: "right" },
                    ],
                    searchable: false,
                    exportable: true,
                  }}
                />
              </div>
            </div>

            {/* Weekly Channel Trend */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={channelWeeklyTrend}
                  title="Weekly Channel Trend"
                  config={{
                    columns: [
                      { key: "week_end", label: "Week", align: "left" },
                      { key: "channel", label: "Channel", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "op", label: "OP", format: "currency", align: "right" },
                      { key: "actual_ly", label: "LY", format: "currency", align: "right" },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "week_end", direction: "desc" },
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== Product Mix ===== */}
          <TabsContent value="product-mix">
            {/* By Gender */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-3">
                <DonutChart
                  data={genderPerformance}
                  title="Gender Mix"
                  config={{
                    categoryKey: "gender",
                    valueKey: "actual",
                    showPercent: true,
                    innerRadius: 60,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-9">
                <DataTable
                  data={genderPerformance}
                  title="Gender Performance"
                  config={{
                    columns: [
                      { key: "gender", label: "Gender", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst_var_pct", label: "vs FCST %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "op_var_pct", label: "vs OP %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "yoy_pct", label: "YoY %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fcst_gap_amt", label: "FCST Gap $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "units", label: "Units", format: "compact", align: "right" },
                    ],
                    searchable: false,
                    exportable: true,
                  }}
                />
              </div>
            </div>

            {/* By End Use */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-3">
                <DonutChart
                  data={endUsePerformance}
                  title="End Use Mix"
                  config={{
                    categoryKey: "end_use",
                    valueKey: "actual",
                    showPercent: true,
                    innerRadius: 60,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-9">
                <DataTable
                  data={endUsePerformance}
                  title="End Use Performance"
                  config={{
                    columns: [
                      { key: "end_use", label: "End Use", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst_var_pct", label: "vs FCST %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "op_var_pct", label: "vs OP %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "yoy_pct", label: "YoY %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fcst_gap_amt", label: "FCST Gap $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "actual", direction: "desc" },
                  }}
                />
              </div>
            </div>

            {/* By Product Class */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={productClassPerformance}
                  title="By Product Class"
                  config={{
                    columns: [
                      { key: "product_class", label: "Product Class", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "actual_ly", label: "LY", format: "currency", align: "right" },
                      { key: "yoy_pct", label: "YoY %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "fcst_var_pct", label: "vs FCST %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "op", label: "OP", format: "currency", align: "right" },
                      { key: "op_var_pct", label: "vs OP %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fcst_gap_amt", label: "FCST Gap $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: true,
                    exportable: true,
                    defaultSort: { key: "actual", direction: "desc" },
                  }}
                />
              </div>
            </div>

            {/* Color vs Non-Color */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-3">
                <DonutChart
                  data={colorVsNonColor}
                  title="Color vs Non-Color Mix"
                  config={{
                    categoryKey: "color_group",
                    valueKey: "actual",
                    showPercent: true,
                    innerRadius: 60,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-9">
                <DataTable
                  data={nrfColorDetail}
                  title="NRF Color Detail"
                  config={{
                    columns: [
                      { key: "nrf_color", label: "NRF Color", align: "left" },
                      { key: "color_group", label: "Group", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "actual_ly", label: "LY", format: "currency", align: "right" },
                      { key: "yoy_pct", label: "YoY %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: true,
                    exportable: true,
                    defaultSort: { key: "actual", direction: "desc" },
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== Full Price vs Markdown ===== */}
          <TabsContent value="full-price-markdown">
            {/* Weekly FP vs MD Trend */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <ComboChart
                  data={fullPriceVsMarkdown}
                  title="Weekly Full Price vs Markdown Trend"
                  config={{
                    xAxis: { key: "week_end", label: "Week Ending" },
                    bars: [
                      { key: "full_price_amt", label: "Full Price TY", format: "currency", color: "#2C5F8A" },
                      { key: "full_price_amt_ly", label: "Full Price LY", format: "currency", color: "#6A9BC3" },
                      { key: "markdown_amt", label: "Markdown TY", format: "currency", color: "#E8913A" },
                      { key: "markdown_amt_ly", label: "Markdown LY", format: "currency", color: "#D4A843" },
                    ],
                    lines: [
                      { key: "full_price_pct", label: "FP % TY", format: "percent", color: "#C75B5B" },
                      { key: "full_price_pct_ly", label: "FP % LY", format: "percent", color: "#636E72" },
                      { key: "fcst", label: "Forecast", format: "currency", color: "#5BA67D" },
                    ],
                    yAxisLeft: { label: "Revenue", format: "compact" },
                    yAxisRight: { label: "Full Price %", format: "percent" },
                    showDataLabels: true,
                    showLegend: true,
                  }}
                />
              </div>
            </div>

            {/* FP/MD Split by Channel */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <BarChartComponent
                  data={fpMdByChannel}
                  title="Full Price / Markdown by Channel"
                  config={{
                    xAxis: { key: "channel", label: "Channel" },
                    metrics: [
                      { key: "actual", label: "Demand", format: "currency", color: "#2C5F8A" },
                      { key: "actual_ly", label: "LY", format: "currency", color: "#D4A843" },
                    ],
                    stacked: true,
                    orientation: "vertical",
                    showDataLabels: true,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DataTable
                  data={fpMdByChannel}
                  title="FP / MD by Channel"
                  config={{
                    columns: [
                      { key: "channel", label: "Channel", align: "left" },
                      { key: "markdown_type", label: "Type", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "actual_ly", label: "LY", format: "currency", align: "right" },
                      { key: "yoy_pct", label: "YoY %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: false,
                    exportable: true,
                  }}
                />
              </div>
            </div>

            {/* FP/MD by Gender */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={fpMdByGender}
                  title="Full Price / Markdown by Gender"
                  config={{
                    columns: [
                      { key: "gender", label: "Gender", align: "left" },
                      { key: "full_price_amt", label: "Full Price $", format: "currency", align: "right" },
                      { key: "markdown_amt", label: "Markdown $", format: "currency", align: "right" },
                      { key: "full_price_pct", label: "FP %", format: "percent", align: "right" },
                      { key: "fp_yoy_pct", label: "FP YoY %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "md_yoy_pct", label: "MD YoY %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "op", label: "OP", format: "currency", align: "right" },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "full_price_amt", direction: "desc" },
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== Returns ===== */}
          <TabsContent value="returns">
            {/* Weekly Returns Trend */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <ComboChart
                  data={returnsWeekly}
                  title="Weekly Returns Trend"
                  config={{
                    xAxis: { key: "week_end", label: "Week Ending" },
                    bars: [
                      { key: "returns_amt", label: "Returns $", format: "currency", color: "#C75B5B" },
                      { key: "net_demand", label: "Net Demand", format: "currency", color: "#2C5F8A" },
                    ],
                    lines: [
                      { key: "return_rate_pct", label: "Return Rate %", format: "percent", color: "#E8913A" },
                    ],
                    yAxisLeft: { label: "Revenue", format: "compact" },
                    yAxisRight: { label: "Return Rate %", format: "percent" },
                    showDataLabels: true,
                    showLegend: true,
                  }}
                />
              </div>
            </div>

            {/* Returns by Dimension */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={returnsByDimension}
                  title="Returns by Dimension (Latest Week)"
                  config={{
                    columns: [
                      { key: "dimension_type", label: "Dimension", align: "left" },
                      { key: "dimension_value", label: "Value", align: "left" },
                      { key: "returns_amt", label: "Returns $", format: "currency", align: "right" },
                      { key: "gross_demand", label: "Gross Demand", format: "currency", align: "right" },
                      { key: "return_rate_pct", label: "Return Rate %", format: "percent", align: "right" },
                    ],
                    searchable: true,
                    exportable: true,
                    pageSize: 25,
                    defaultSort: { key: "returns_amt", direction: "desc" },
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== Forecast Gap Analysis ===== */}
          <TabsContent value="forecast-gap">
            {/* Gap by Channel */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <BarChartComponent
                  data={fcstGapByChannel}
                  title="Forecast Gap by Channel"
                  config={{
                    xAxis: { key: "channel", label: "Channel" },
                    metrics: [
                      { key: "fcst_gap", label: "FCST Gap $", format: "currency", color: "#2C5F8A", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    orientation: "vertical",
                    showDataLabels: true,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DataTable
                  data={fcstGapByChannel}
                  title="Gap by Channel"
                  config={{
                    columns: [
                      { key: "channel", label: "Channel", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "fcst_gap", label: "Gap $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fcst_var_pct", label: "Gap %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: false,
                    exportable: true,
                  }}
                />
              </div>
            </div>

            {/* Gap by End Use */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <BarChartComponent
                  data={fcstGapByEndUse}
                  title="Forecast Gap by End Use"
                  config={{
                    xAxis: { key: "end_use", label: "End Use" },
                    metrics: [
                      { key: "fcst_gap", label: "FCST Gap $", format: "currency", color: "#2C5F8A" },
                    ],
                    orientation: "horizontal",
                    showDataLabels: true,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DataTable
                  data={fcstGapByEndUse}
                  title="Gap by End Use"
                  config={{
                    columns: [
                      { key: "end_use", label: "End Use", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "fcst_gap", label: "Gap $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fcst_var_pct", label: "Gap %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "fcst_gap", direction: "desc" },
                  }}
                />
              </div>
            </div>

            {/* Gap by Product Class */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <BarChartComponent
                  data={fcstGapByProductClass}
                  title="Forecast Gap by Product Class"
                  config={{
                    xAxis: { key: "product_class", label: "Product Class" },
                    metrics: [
                      { key: "fcst_gap", label: "FCST Gap $", format: "currency", color: "#2C5F8A" },
                    ],
                    orientation: "horizontal",
                    showDataLabels: true,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DataTable
                  data={fcstGapByProductClass}
                  title="Gap by Product Class"
                  config={{
                    columns: [
                      { key: "product_class", label: "Product Class", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "fcst_gap", label: "Gap $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fcst_var_pct", label: "Gap %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "fcst_gap", direction: "desc" },
                  }}
                />
              </div>
            </div>

            {/* Gap by Gender */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={fcstGapByGender}
                  title="Forecast Gap by Gender"
                  config={{
                    columns: [
                      { key: "gender", label: "Gender", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "fcst_gap", label: "FCST Gap $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fcst_var_pct", label: "FCST Var %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "op", label: "OP", format: "currency", align: "right" },
                      { key: "op_gap", label: "OP Gap $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "fcst_gap", direction: "desc" },
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
