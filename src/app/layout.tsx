import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web to APK Converter",
  description: "Convert any website into Android APK premium UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
