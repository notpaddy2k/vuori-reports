import { ReportHeader } from "@/components/report/report-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  KpiCard,
  ComboChart,
  BarChartComponent,
  LineChartComponent,
  DataTable,
  Insight,
} from "@/components/report";

// --- Data imports ---
import execKpis from "./data/exec-kpis.json";
import weeklyTrend from "./data/weekly-trend.json";
import channelPerformance from "./data/channel-performance.json";
import channelWeeklyTrend from "./data/channel-weekly-trend.json";
import productClassPerformance from "./data/product-class-performance.json";
import subclassPerformance from "./data/subclass-performance.json";
import styleWinners from "./data/style-winners.json";
import styleMisses from "./data/style-misses.json";
import genderPerformance from "./data/gender-performance.json";
import endUsePerformance from "./data/end-use-performance.json";
import fcstGapByGender from "./data/fcst-gap-by-gender.json";
import fcstGapByEndUse from "./data/fcst-gap-by-end-use.json";
import fcstGapByProductClass from "./data/fcst-gap-by-product-class.json";
import launch223Summary from "./data/launch-223-summary.json";
import launch223Weekly from "./data/launch-223-weekly.json";
import launch223ByClass from "./data/launch-223-by-class.json";
import launch223ByChannel from "./data/launch-223-by-channel.json";
import launch223Winners from "./data/launch-223-winners.json";
import launch223Misses from "./data/launch-223-misses.json";
import inventoryGrowingMisses from "./data/inventory-growing-misses.json";
import inventoryChaseCandidates from "./data/inventory-chase-candidates.json";
import fpRetailMisses from "./data/fp-retail-misses.json";
import returnRateOutliers from "./data/return-rate-outliers.json";
import returnsWeekly from "./data/returns-weekly.json";
import returnsByDimension from "./data/returns-by-dimension.json";

export default function Page() {
  return (
    <>
      <ReportHeader
        title="DTC Performance vs Forecast"
        description="Weekly DTC performance analysis vs forecast for WE 3/8 (Fiscal Week 202609). Covers EC + Full-Price channels across all product classes, genders, and end uses."
        asOfDate="2026-03-08"
      />

      <div className="px-6">
        <Tabs defaultValue="executive-summary">
          <div className="overflow-x-auto -mx-6 px-6">
            <TabsList>
              <TabsTrigger value="executive-summary">Executive Summary</TabsTrigger>
              <TabsTrigger value="product-performance">Product Class | Sub-Class</TabsTrigger>
              <TabsTrigger value="style-winners-misses">Style Winners &amp; Misses</TabsTrigger>
              <TabsTrigger value="launch-223">2/23 Launch</TabsTrigger>
              <TabsTrigger value="channel-analysis">Channel Deep Dive</TabsTrigger>
              <TabsTrigger value="inventory-analysis">Inventory &amp; In-Stock</TabsTrigger>
              <TabsTrigger value="gender-end-use">Gender &amp; End Use</TabsTrigger>
              <TabsTrigger value="returns">Returns &amp; Quality</TabsTrigger>
              <TabsTrigger value="opportunities-risks">Opportunities &amp; Risks</TabsTrigger>
            </TabsList>
          </div>

          {/* ===== 1. Executive Summary ===== */}
          <TabsContent value="executive-summary">
            <Insight>
              <strong>DTC demand is $19.0M, +7.0% vs forecast (+$1.2M) and +20% YoY.</strong>{" "}
              EC is +19% above forecast, fully offsetting a -6.6% FP retail miss. The FP miss is a conversion problem, not inventory -- EOH is growing on the biggest misses.
            </Insight>

            {/* KPI Cards */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <KpiCard
                  data={execKpis}
                  title="Total Net Demand"
                  config={{
                    metric: { key: "total_demand", label: "Total Net Demand", format: "currency" },
                    trend: { valueKey: "yoy_pct", label: "vs LY", format: "percent" },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <KpiCard
                  data={execKpis}
                  title="Forecast Variance"
                  config={{
                    metric: { key: "fcst_var_amt", label: "vs Forecast $", format: "currency" },
                    trend: { valueKey: "fcst_var_pct", label: "vs Forecast %", format: "percent" },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <KpiCard
                  data={execKpis}
                  title="Return Rate"
                  config={{
                    metric: { key: "return_rate_pct", label: "Return Rate", format: "percent" },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <KpiCard
                  data={execKpis}
                  title="Full-Price %"
                  config={{
                    metric: { key: "full_price_pct", label: "Full-Price %", format: "percent" },
                  }}
                />
              </div>
            </div>

            {/* Weekly Demand vs Forecast */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <ComboChart
                  data={weeklyTrend}
                  title="Weekly Demand vs Forecast"
                  config={{
                    xAxis: { key: "week_end", label: "Week Ending" },
                    bars: [
                      { key: "actual", label: "Net Demand", format: "currency", color: "#2C5F8A" },
                      { key: "actual_ly", label: "Net Demand LY", format: "currency", color: "#D4A843" },
                    ],
                    lines: [
                      { key: "fcst", label: "Forecast", format: "currency", color: "#C75B5B" },
                    ],
                    yAxisLeft: { label: "Revenue", format: "compact" },
                    showDataLabels: false,
                    showLegend: true,
                  }}
                />
              </div>
            </div>

            {/* Channel Performance */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <BarChartComponent
                  data={channelPerformance}
                  title="Actual vs Forecast by Channel"
                  config={{
                    xAxis: { key: "channel" },
                    metrics: [
                      { key: "actual", label: "Actual", format: "currency", color: "#2C5F8A" },
                      { key: "fcst", label: "Forecast", format: "currency", color: "#C75B5B" },
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
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "fcst_var_pct", label: "vs Fcst %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "yoy_pct", label: "YoY %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "return_rate_pct", label: "Return Rate", format: "percent", align: "right" },
                    ],
                    searchable: false,
                    exportable: false,
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== 2. Product Class | Sub-Class ===== */}
          <TabsContent value="product-performance">
            <Insight>
              <strong>Tops (+$500K) and Bottoms (+$440K) are the largest dollar drivers of the forecast beat.</strong>{" "}
              Layers is the only class missing (-$158K). At the sub-class level, Short Sleeve Tops (+$479K) and Shorts (+$353K) lead, while Sweatshirts (-$197K) and Leggings (-$149K) are the biggest drags.
            </Insight>

            {/* Product Class vs Forecast */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <BarChartComponent
                  data={productClassPerformance}
                  title="Forecast Gap by Product Class"
                  config={{
                    xAxis: { key: "product_class" },
                    metrics: [
                      { key: "fcst_gap_amt", label: "$ Gap vs Forecast", format: "currency", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    orientation: "horizontal",
                    showDataLabels: true,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DataTable
                  data={productClassPerformance}
                  title="Product Class Detail"
                  config={{
                    columns: [
                      { key: "product_class", label: "Product Class", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "fcst_var_pct", label: "vs Fcst %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fcst_gap_amt", label: "$ Gap", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "yoy_pct", label: "YoY %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "fcst_gap_amt", direction: "desc" },
                  }}
                />
              </div>
            </div>

            {/* Sub-Class Performance */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={subclassPerformance}
                  title="Sub-Class vs Forecast"
                  config={{
                    columns: [
                      { key: "sub_class", label: "Sub-Class", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "gap", label: "$ Gap", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "vs_fcst_pct", label: "vs Fcst %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "eoh", label: "EOH", format: "compact", align: "right" },
                      { key: "return_rate", label: "Return Rate", format: "percent", align: "right" },
                    ],
                    searchable: true,
                    exportable: true,
                    defaultSort: { key: "gap", direction: "desc" },
                    pageSize: 20,
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== 3. Style Winners & Misses ===== */}
          <TabsContent value="style-winners-misses">
            <Insight>
              <strong>Villa Wideleg (+$193K), Villa Wideleg Short (+$131K), and Kore Short 7&quot; (+$108K) are the top forecast winners.</strong>{" "}
              Halo Mini FZ Hoodie (-$116K), Trestles Twill Tie Short (-$109K), and Halo Essential Wideleg (-$107K) are the biggest misses. Halo franchise collectively misses by $300K+ with high return rates.
            </Insight>

            {/* Top 20 Forecast Winners */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={styleWinners}
                  title="Top 20 Forecast Winners"
                  config={{
                    columns: [
                      { key: "style", label: "Style", align: "left" },
                      { key: "product_class", label: "Class", align: "left" },
                      { key: "gender", label: "Gender", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "gap", label: "$ Gap", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "vs_fcst_pct", label: "vs Fcst %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "eoh", label: "EOH", format: "compact", align: "right" },
                      { key: "return_rate", label: "Ret Rate", format: "percent", align: "right" },
                    ],
                    searchable: true,
                    exportable: true,
                    defaultSort: { key: "gap", direction: "desc" },
                    pageSize: 20,
                  }}
                />
              </div>
            </div>

            {/* Top 20 Forecast Misses */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={styleMisses}
                  title="Top 20 Forecast Misses"
                  config={{
                    columns: [
                      { key: "style", label: "Style", align: "left" },
                      { key: "product_class", label: "Class", align: "left" },
                      { key: "gender", label: "Gender", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "gap", label: "$ Gap", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "vs_fcst_pct", label: "vs Fcst %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "eoh", label: "EOH", format: "compact", align: "right" },
                      { key: "return_rate", label: "Ret Rate", format: "percent", align: "right" },
                    ],
                    searchable: true,
                    exportable: true,
                    defaultSort: { key: "gap", direction: "asc" },
                    pageSize: 20,
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== 4. 2/23 Launch ===== */}
          <TabsContent value="launch-223">
            <Insight>
              <strong>178 launch styles totaling $6.2M, +9.3% vs forecast (+$529K).</strong>{" "}
              The beat is accelerating from +0.3% in launch week to +9.3% in week 2. Villa franchise is the clear hero (+$164K for Villa Wideleg alone). Trestles Twill Tie Short is the biggest miss (-$109K) with 24K EOH units sitting.
            </Insight>

            {/* Launch KPIs */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <KpiCard
                  data={launch223Summary}
                  title="Launch Demand (WE 3/8)"
                  config={{
                    metric: { key: "total_demand", label: "Net Demand", format: "currency" },
                    trend: { valueKey: "fcst_var_pct", label: "vs Forecast", format: "percent" },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <KpiCard
                  data={launch223Summary}
                  title="Forecast Gap"
                  config={{
                    metric: { key: "fcst_gap", label: "$ Gap", format: "currency" },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <KpiCard
                  data={launch223Summary}
                  title="Styles Launched"
                  config={{
                    metric: { key: "n_styles", label: "Styles", format: "integer" },
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <KpiCard
                  data={launch223Summary}
                  title="EOH Units"
                  config={{
                    metric: { key: "eoh", label: "EOH", format: "compact" },
                  }}
                />
              </div>
            </div>

            {/* Weekly Ramp */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <ComboChart
                  data={launch223Weekly}
                  title="Weekly Ramp"
                  config={{
                    xAxis: { key: "week_end", label: "Week Ending" },
                    bars: [
                      { key: "actual", label: "Actual Demand", format: "currency", color: "#2C5F8A" },
                      { key: "fcst", label: "Forecast", format: "currency", color: "#E8913A" },
                    ],
                    lines: [
                      { key: "vs_fcst_pct", label: "vs Fcst %", format: "percent", color: "#5BA67D" },
                    ],
                    yAxisLeft: { label: "Revenue", format: "compact" },
                    yAxisRight: { label: "% vs Forecast", format: "percent" },
                    showDataLabels: true,
                    showLegend: true,
                  }}
                />
              </div>
            </div>

            {/* Launch by Channel + Class */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <BarChartComponent
                  data={launch223ByChannel}
                  title="Launch by Channel"
                  config={{
                    xAxis: { key: "channel" },
                    metrics: [
                      { key: "actual", label: "Actual", format: "currency", color: "#2C5F8A" },
                      { key: "fcst", label: "Forecast", format: "currency", color: "#C75B5B" },
                    ],
                    orientation: "vertical",
                    showDataLabels: true,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-8">
                <DataTable
                  data={launch223ByClass}
                  title="Launch by Product Class"
                  config={{
                    columns: [
                      { key: "product_class", label: "Product Class", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "fcst", label: "Forecast", format: "currency", align: "right" },
                      { key: "gap", label: "$ Gap", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "vs_fcst_pct", label: "vs Fcst %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "eoh", label: "EOH", format: "compact", align: "right" },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "gap", direction: "desc" },
                  }}
                />
              </div>
            </div>

            {/* Launch Winners & Misses */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <DataTable
                  data={launch223Winners}
                  title="Top 10 Launch Winners"
                  config={{
                    columns: [
                      { key: "style", label: "Style", align: "left" },
                      { key: "product_class", label: "Class", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "gap", label: "$ Gap", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "vs_fcst_pct", label: "vs Fcst %", format: "percent", align: "right" },
                      { key: "return_rate", label: "Ret Rate", format: "percent", align: "right" },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "gap", direction: "desc" },
                    pageSize: 10,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DataTable
                  data={launch223Misses}
                  title="Top 10 Launch Misses"
                  config={{
                    columns: [
                      { key: "style", label: "Style", align: "left" },
                      { key: "product_class", label: "Class", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "gap", label: "$ Gap", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "vs_fcst_pct", label: "vs Fcst %", format: "percent", align: "right" },
                      { key: "eoh", label: "EOH", format: "compact", align: "right" },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "gap", direction: "asc" },
                    pageSize: 10,
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== 5. Channel Deep Dive ===== */}
          <TabsContent value="channel-analysis">
            <Insight>
              <strong>EC is +$1.8M above forecast (+19.1%), fully offsetting FP{"'"}s -$556K miss (-6.6%).</strong>{" "}
              The net +$1.2M total beat is entirely EC-driven. FP styles like Halo Mini FZ Hoodie (-$89K), Coronado Pant (-$81K), and Halo Essential Wideleg (-$69K) lead the retail miss despite ample inventory.
            </Insight>

            {/* Channel Weekly Trend */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <LineChartComponent
                  data={channelWeeklyTrend}
                  title="Channel Weekly Trend"
                  config={{
                    xAxis: { key: "week_end", label: "Week Ending" },
                    metrics: [
                      { key: "ec_actual", label: "EC Actual", format: "currency", color: "#2C5F8A" },
                      { key: "ec_fcst", label: "EC Forecast", format: "currency", color: "#6A9BC3" },
                      { key: "fp_actual", label: "FP Actual", format: "currency", color: "#E8913A" },
                      { key: "fp_fcst", label: "FP Forecast", format: "currency", color: "#D4A843" },
                    ],
                    showDots: true,
                    smooth: false,
                  }}
                />
              </div>
            </div>

            {/* Full-Price Retail Misses */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={fpRetailMisses}
                  title="Full-Price Retail -- Top 20 Style Misses (Conversion Signal)"
                  config={{
                    columns: [
                      { key: "style", label: "Style", align: "left" },
                      { key: "product_class", label: "Class", align: "left" },
                      { key: "gender", label: "Gender", align: "left" },
                      { key: "fp_actual", label: "FP Actual", format: "currency", align: "right" },
                      { key: "fp_fcst", label: "FP Forecast", format: "currency", align: "right" },
                      { key: "fp_gap", label: "FP $ Gap", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "vs_fcst_pct", label: "vs Fcst %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "fp_eoh", label: "FP EOH", format: "compact", align: "right" },
                    ],
                    searchable: true,
                    exportable: true,
                    defaultSort: { key: "fp_gap", direction: "asc" },
                    pageSize: 20,
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== 6. Inventory & In-Stock ===== */}
          <TabsContent value="inventory-analysis">
            <Insight>
              <strong>The FP retail miss is NOT an in-stock problem -- inventory is growing on the biggest misses.</strong>{" "}
              Vuori Vintage Wideleg EOH +430%, Halo Essential Wideleg +41%, Trestles Twill Wideleg +82%. Conversely, chase candidates like Pose Column Skirt (EOH -88%) and Emilie Cashmere V-Neck (EOH -79%) need urgent replenishment.
            </Insight>

            {/* Growing Misses */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={inventoryGrowingMisses}
                  title="Missing Forecast + EOH Growing (Demand/Conversion Issue)"
                  config={{
                    columns: [
                      { key: "style", label: "Style", align: "left" },
                      { key: "product_class", label: "Class", align: "left" },
                      { key: "eoh_start", label: "EOH (Wk 1)", format: "compact", align: "right" },
                      { key: "eoh_now", label: "EOH (Now)", format: "compact", align: "right" },
                      { key: "eoh_change_pct", label: "EOH Change %", format: "percent", align: "right", conditionalColor: { positive: "#C75B5B", negative: "#5BA67D" } },
                      { key: "fcst_gap", label: "Fcst Gap $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "fcst_gap", direction: "asc" },
                    pageSize: 15,
                  }}
                />
              </div>
            </div>

            {/* Chase Candidates */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={inventoryChaseCandidates}
                  title="Beating Forecast + EOH Dropping (Chase Candidates)"
                  config={{
                    columns: [
                      { key: "style", label: "Style", align: "left" },
                      { key: "product_class", label: "Class", align: "left" },
                      { key: "eoh_start", label: "EOH (Wk 1)", format: "compact", align: "right" },
                      { key: "eoh_now", label: "EOH (Now)", format: "compact", align: "right" },
                      { key: "eoh_change_pct", label: "EOH Change %", format: "percent", align: "right", conditionalColor: { positive: "#C75B5B", negative: "#5BA67D" } },
                      { key: "fcst_gap", label: "Fcst Gap $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "fcst_gap", direction: "desc" },
                    pageSize: 15,
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== 7. Gender & End Use ===== */}
          <TabsContent value="gender-end-use">
            <Insight>
              <strong>Both genders beat forecast: Women{"'"}s +$636K, Men{"'"}s +$573K.</strong>{" "}
              Travel/Commute is the largest dollar beat at +$603K, while Fitness/Lounge is the only end use missing plan (-$337K), dragged down by sweatshirts, leggings, and joggers.
            </Insight>

            {/* Gender + End Use bars */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <BarChartComponent
                  data={genderPerformance}
                  title="Gender vs Forecast"
                  config={{
                    xAxis: { key: "gender" },
                    metrics: [
                      { key: "actual", label: "Actual", format: "currency", color: "#2C5F8A" },
                      { key: "fcst", label: "Forecast", format: "currency", color: "#C75B5B" },
                    ],
                    orientation: "vertical",
                    showDataLabels: true,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <BarChartComponent
                  data={endUsePerformance}
                  title="End Use vs Forecast"
                  config={{
                    xAxis: { key: "end_use" },
                    metrics: [
                      { key: "actual", label: "Actual", format: "currency", color: "#2C5F8A" },
                      { key: "fcst", label: "Forecast", format: "currency", color: "#C75B5B" },
                    ],
                    orientation: "horizontal",
                    showDataLabels: true,
                  }}
                />
              </div>
            </div>

            {/* Forecast Gap Decomposition */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <BarChartComponent
                  data={fcstGapByGender}
                  title="$ Gap by Gender"
                  config={{
                    xAxis: { key: "dimension_value" },
                    metrics: [
                      { key: "fcst_gap", label: "$ Gap", format: "currency", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    orientation: "vertical",
                    showDataLabels: true,
                  }}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <BarChartComponent
                  data={fcstGapByEndUse}
                  title="$ Gap by End Use"
                  config={{
                    xAxis: { key: "dimension_value" },
                    metrics: [
                      { key: "fcst_gap", label: "$ Gap", format: "currency", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    orientation: "horizontal",
                    showDataLabels: true,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <BarChartComponent
                  data={fcstGapByProductClass}
                  title="$ Gap by Product Class"
                  config={{
                    xAxis: { key: "dimension_value" },
                    metrics: [
                      { key: "fcst_gap", label: "$ Gap", format: "currency", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                    ],
                    orientation: "horizontal",
                    showDataLabels: true,
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== 8. Returns & Quality ===== */}
          <TabsContent value="returns">
            <Insight>
              <strong>Overall return rate is 18.0%.</strong>{" "}
              EC returns at 20.2% vs FP at 14.6%. Halo Easy Wideleg Short (53%), Echo Insulated Jacket (47%), and Restore Oversized Crew (46%) have extreme return rates suggesting fit or quality issues. Halo and Restore families show a pattern of high returns paired with forecast misses.
            </Insight>

            {/* Return Rate Trend + By Dimension */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <LineChartComponent
                  data={returnsWeekly}
                  title="Weekly Return Rate"
                  config={{
                    xAxis: { key: "week_end", label: "Week Ending" },
                    metrics: [
                      { key: "return_rate_pct", label: "Return Rate %", format: "percent", color: "#C75B5B" },
                    ],
                    showDots: true,
                    smooth: false,
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DataTable
                  data={returnsByDimension}
                  title="Return Rates by Dimension"
                  config={{
                    columns: [
                      { key: "dimension_type", label: "Dimension", align: "left" },
                      { key: "dimension_value", label: "Value", align: "left" },
                      { key: "returns_amt", label: "Returns $", format: "currency", align: "right" },
                      { key: "return_rate_pct", label: "Return Rate", format: "percent", align: "right" },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "return_rate_pct", direction: "desc" },
                  }}
                />
              </div>
            </div>

            {/* Return Rate Outliers */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={returnRateOutliers}
                  title="Return Rate Outliers (Styles >$10K Demand)"
                  config={{
                    columns: [
                      { key: "style", label: "Style", align: "left" },
                      { key: "product_class", label: "Class", align: "left" },
                      { key: "gender", label: "Gender", align: "left" },
                      { key: "actual", label: "Actual", format: "currency", align: "right" },
                      { key: "return_rate", label: "Return Rate", format: "percent", align: "right" },
                      { key: "vs_fcst_pct", label: "vs Fcst %", format: "percent", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "eoh", label: "EOH", format: "compact", align: "right" },
                    ],
                    searchable: true,
                    exportable: true,
                    defaultSort: { key: "return_rate", direction: "desc" },
                    pageSize: 15,
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* ===== 9. Opportunities & Risks ===== */}
          <TabsContent value="opportunities-risks">
            <Insight>
              <strong>Key action items: Chase Villa franchise and Pose Column Skirt (EOH -88%); investigate FP store conversion on Halo, Trestles Twill, and Ponto; review fit/quality on high-return Halo and Restore styles.</strong>{" "}
              EC overperformance creates opportunity to increase digital marketing while signal is hot. Fitness/Lounge softness across sweatshirts, leggings, and joggers requires merchandising review.
            </Insight>

            {/* Chase Candidates */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={inventoryChaseCandidates}
                  title="Chase Candidates (Beating Forecast, Low Inventory)"
                  config={{
                    columns: [
                      { key: "style", label: "Style", align: "left" },
                      { key: "product_class", label: "Class", align: "left" },
                      { key: "fcst_gap", label: "Fcst Beat $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "eoh_now", label: "EOH Now", format: "compact", align: "right" },
                      { key: "eoh_change_pct", label: "EOH Change %", format: "percent", align: "right" },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "fcst_gap", direction: "desc" },
                    pageSize: 15,
                  }}
                />
              </div>
            </div>

            {/* Risks */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-12">
                <DataTable
                  data={inventoryGrowingMisses}
                  title="Risks: Inventory Building on Misses (Conversion Problem)"
                  config={{
                    columns: [
                      { key: "style", label: "Style", align: "left" },
                      { key: "product_class", label: "Class", align: "left" },
                      { key: "fcst_gap", label: "Fcst Miss $", format: "currency", align: "right", conditionalColor: { positive: "#5BA67D", negative: "#C75B5B" } },
                      { key: "eoh_now", label: "EOH Now", format: "compact", align: "right" },
                      { key: "eoh_change_pct", label: "EOH Change %", format: "percent", align: "right" },
                    ],
                    searchable: false,
                    exportable: true,
                    defaultSort: { key: "fcst_gap", direction: "asc" },
                    pageSize: 15,
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
