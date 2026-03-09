# Report Feedback — DTC Sales Performance vs Plan

## Summary
- **Report ID**: 2001
- **Business question**: Are we meeting our sales forecasts and operating plan? Tracking actuals vs. FCST and OP across DTC channels, with breakdowns by channel, gender, end use, product class, color, full price vs markdown, and returns.
- **Dataset used**: gold_launch_analysis_weekly (SemanticViewDataset)
- **Date**: 2026-03-09

## Conversation Summary
User requested a comprehensive sales performance report tracking actuals vs forecast and operating plan. The designer discovered the dataset only covers DTC channels (EC + FP) — no Wholesale/International/Retail. User confirmed proceeding with DTC-only scope. BOD Plan was omitted as it's not in the dataset. Returns analysis was included with available data (DMD_RTN_AMT only) with limitations noted. The designer explored weekly trends, channel splits, product mix, full price vs markdown, returns, and forecast gap drivers before building an 18-datasource, 6-page report.

## Components Built
- **Executive Summary**: 6 KPI cards + weekly demand trend combo chart
- **Channel Performance**: EC vs FP bar chart, detail table, weekly channel trend table
- **Product Mix**: Gender donut + table, End Use donut + table, Product Class table, Color vs Non-Color donut + NRF color detail table
- **Full Price vs Markdown**: Weekly FP/MD combo chart, by-channel bar + table, by-gender table
- **Returns**: Weekly returns combo chart, returns by dimension table
- **Forecast Gap Analysis**: Gap by channel/end use/product class bar charts + tables, gender table

## Iterations
- 1 review cycle (user confirmed scope decisions upfront, no visual changes requested)

## Data Quality Notes
- Dataset only covers EC (Ecommerce) and FP (Full-Price) channels — no Wholesale, International, or Retail
- No BOD Plan metric in the dataset (only FCST and OP)
- Returns limited to single DMD_RTN_AMT column — no WTD/MTD/YTD cadences, no LY comparison, no match-back vs in-period distinction
- Data covers 5 fiscal weeks (W05–W09, approx Feb 8 – Mar 8 2026)
- FCST and OP values appear to align with Regular (non-markdown) demand in some weeks — may indicate plan covers full-price only

## System Performance
- Designer iterations: 1
- Builder deploys: 1
- Build errors encountered: 0
- Playwright checks: 0

## Areas for Improvement
- Returns data needs WTD/MTD/YTD cadences and LY comparisons for meaningful match-back analysis
- Broader channel coverage (Wholesale, International, Retail) would require dataset refresh or separate datasets
- BOD Plan as a separate metric would enable the three-way comparison AK requested
- Week-over-week sequential momentum view was not built but would add value

## User Notes
None provided
