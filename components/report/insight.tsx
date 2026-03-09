import { Lightbulb } from "lucide-react";

interface InsightProps {
  children: React.ReactNode;
}

export function Insight({ children }: InsightProps) {
  return (
    <div className="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground mb-6">
      <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
      <div>{children}</div>
    </div>
  );
}
