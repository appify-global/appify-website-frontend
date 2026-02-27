import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appify | Custom Software Development, AI & Digital Transformation",
  description: "Appify is a custom software development agency specializing in AI & ML engineering, mobile app development, enterprise ERP systems, and digital transformation across Australia, UAE, and Qatar.",
  keywords: ["software development", "AI", "machine learning", "mobile app development", "ERP", "digital transformation", "Australia", "UAE", "Qatar"],
  authors: [{ name: "Appify" }],
  openGraph: {
    title: "Appify | Custom Software Development, AI & Digital Transformation",
    description: "Appify partners with enterprises and startups to build custom software, AI solutions, and digital products.",
    type: "website",
    locale: "en_AU",
    siteName: "Appify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Appify | Custom Software Development",
    description: "Custom software development, AI & ML engineering, and digital transformation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="//s3-public-presigner-production-6b6f.up.railway.app" />
        <link rel="preconnect" href="https://s3-public-presigner-production-6b6f.up.railway.app" />
        <link rel="dns-prefetch" href="//railbucket-0bqb1b7ady2ufu.t3.storageapi.dev" />
        <link rel="preconnect" href="https://railbucket-0bqb1b7ady2ufu.t3.storageapi.dev" crossOrigin="" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
