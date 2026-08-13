import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema OS · IRBIS",
  description: "Painel interno da IRBIS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
