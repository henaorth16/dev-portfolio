import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"
import { openDb } from '@/lib/db';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Portfolio",
  description: "A modern developer portfolio showcasing projects and skills",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const db = await openDb();
  const heroResult = await db.execute('SELECT resumeLink FROM hero WHERE id = 1');
  const resumeLink = heroResult.rows.length > 0 ? heroResult.rows[0].resumeLink as string : "https://googleDriveLink";

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header resumeLink={resumeLink}/>
        {children}
        <Analytics />
        <Footer name="DAWIT" year={2024} />
      </body>
    </html>
  );
}
