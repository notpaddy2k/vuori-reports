import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import reportsData from "../reports/index.json";

interface ReportEntry {
  id: string;
  title: string;
  description?: string;
  asOfDate?: string;
}

const reports = reportsData as ReportEntry[];

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Link key={report.id} href={`/${report.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>
                  {report.description && <span>{report.description}</span>}
                  {report.asOfDate && (
                    <span className="block mt-1 text-xs">
                      As of {report.asOfDate}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
