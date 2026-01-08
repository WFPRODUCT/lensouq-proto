import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lensouq",
  description: "Photographers & Models marketplace prototype for Qatar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
