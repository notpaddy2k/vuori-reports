import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vuori Reports",
  description: "Retail analysis reports",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="h-1 w-full bg-primary" />
        {children}
      </body>
    </html>
  );
}
