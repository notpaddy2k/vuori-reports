"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BarChart3, Search } from "lucide-react";
import reportsData from "../reports/index.json";

interface ReportEntry {
  id: string;
  title: string;
  description?: string;
  asOfDate?: string;
  author?: string;
  status?: "NEW" | "UPDATED";
}

const reports = reportsData as ReportEntry[];

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = reports.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <h1 className="text-lg font-semibold tracking-tight">
            Home
            <span className="ml-1.5 text-muted-foreground font-normal">
              ({filtered.length})
            </span>
          </h1>

          <div className="relative w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search reports..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            />
          </div>
        </div>
      </header>

      {/* Card grid */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-20">
            {reports.length === 0
              ? "No reports available."
              : "No reports match your search."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {filtered.map((report) => (
              <Link key={report.id} href={`/${report.id}`} className="group">
                <Card className="relative flex flex-col items-center px-5 py-8 transition-all hover:shadow-md hover:border-primary/30 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
                  {/* Status badge */}
                  {report.status && (
                    <span
                      className={`absolute right-3 top-3 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none ${
                        report.status === "NEW"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary/15 text-secondary"
                      }`}
                    >
                      {report.status}
                    </span>
                  )}

                  {/* Icon area */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
                    <BarChart3 className="h-7 w-7 text-primary" />
                  </div>

                  {/* Title */}
                  <p className="mt-4 text-center text-sm font-medium leading-snug">
                    {report.title}
                  </p>

                  {/* Meta line */}
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    {report.author && <span>{report.author}</span>}
                    {report.author && report.asOfDate && (
                      <span className="mx-1">&middot;</span>
                    )}
                    {report.asOfDate && <span>As of {report.asOfDate}</span>}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
