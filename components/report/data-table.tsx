"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatValue, getConditionalColor, cn } from "@/lib/utils";
import type { DataTableConfig, DataRow } from "@/lib/types";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search, Download } from "lucide-react";

interface DataTableProps {
  data: DataRow[];
  config: DataTableConfig;
  title?: string;
}

export function DataTable({ data, config, title }: DataTableProps) {
  const [sortKey, setSortKey] = useState(config.defaultSort?.key || "");
  const [sortDir, setSortDir] = useState<"asc" | "desc">(config.defaultSort?.direction || "desc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = config.pageSize || 25;

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      config.columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(q))
    );
  }, [data, search, config.columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va === null || va === undefined) return 1;
      if (vb === null || vb === undefined) return -1;
      const cmp = typeof va === "number" && typeof vb === "number"
        ? va - vb
        : String(va).localeCompare(String(vb));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(sorted.length / pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(0);
  };

  const handleExport = () => {
    const headers = config.columns.map((c) => c.label).join(",");
    const rows = data.map((row) =>
      config.columns.map((c) => {
        const v = row[c.key];
        return typeof v === "string" && v.includes(",") ? `"${v}"` : String(v ?? "");
      }).join(",")
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "data"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      {(title || config.searchable !== false || config.exportable !== false) && (
        <CardHeader>
          <div className="flex items-center justify-between">
            {title && <CardTitle>{title}</CardTitle>}
            <div className="flex items-center gap-2">
              {config.searchable !== false && (
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                    className="pl-8 pr-3 py-2 text-sm border rounded-md bg-background w-64"
                  />
                </div>
              )}
              {config.exportable !== false && (
                <button onClick={handleExport} className="p-2 border rounded-md hover:bg-muted" title="Export CSV">
                  <Download className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {config.columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    "whitespace-nowrap",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.sortable !== false && "cursor-pointer select-none"
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable !== false && <ArrowUpDown className="h-3 w-3" />}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((row, i) => (
              <TableRow key={i}>
                {config.columns.map((col) => {
                  const value = row[col.key];
                  const formatted = formatValue(value, col.format, 0);
                  const color = col.conditionalColor
                    ? getConditionalColor(value as number, col.conditionalColor)
                    : undefined;
                  return (
                    <TableCell
                      key={col.key}
                      className={cn(
                        "tabular-nums",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center"
                      )}
                      style={{ color }}
                    >
                      {formatted}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>
              {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="p-1 border rounded disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="p-1 border rounded disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
