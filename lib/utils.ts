import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormatType = "number" | "currency" | "percent" | "compact" | "integer" | "text";

export function formatValue(
  value: unknown,
  format: FormatType = "number",
  decimals: number = 0
): string {
  if (value === null || value === undefined || value === "") return "\u2014";

  const num = typeof value === "string" ? parseFloat(value) : (value as number);
  if (isNaN(num) && format !== "text") return String(value);

  switch (format) {
    case "text":
      return String(value);

    case "currency":
      if (Math.abs(num) >= 1_000_000) {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(num / 1_000_000) + "M";
      }
      if (Math.abs(num) >= 1_000) {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(num);
      }
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(num);

    case "percent":
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals || 1,
        maximumFractionDigits: decimals || 1,
      }).format(num) + "%";

    case "compact":
      if (Math.abs(num) >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + "M";
      }
      if (Math.abs(num) >= 1_000) {
        return (num / 1_000).toFixed(1) + "K";
      }
      return num.toFixed(decimals);

    case "integer":
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Math.round(num));

    case "number":
    default:
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(num);
  }
}

export function getConditionalColor(
  value: number | null | undefined,
  colors?: { positive?: string; negative?: string; neutral?: string }
): string | undefined {
  if (value === null || value === undefined) return undefined;
  const c = {
    positive: colors?.positive || "#5BA67D",
    negative: colors?.negative || "#C75B5B",
    neutral: colors?.neutral || "#636E72",
  };
  if (value > 0) return c.positive;
  if (value < 0) return c.negative;
  return c.neutral;
}
