import Link from "next/link";

interface ReportHeaderProps {
  title: string;
  description?: string;
  asOfDate?: string;
}

export function ReportHeader({ title, description, asOfDate }: ReportHeaderProps) {
  return (
    <header className="border-b bg-card px-6 py-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            &larr; All Reports
          </Link>
          <div>
            <h1 className="text-lg font-semibold font-heading">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {asOfDate && (
          <div className="text-sm text-muted-foreground">
            As of {asOfDate}
          </div>
        )}
      </div>
    </header>
  );
}
