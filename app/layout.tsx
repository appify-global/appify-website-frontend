import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { JsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://appify.global"),
  title: {
    default: "Appify | Custom Software Development, AI & Digital Transformation",
    template: "%s | Appify",
  },
  description: "Appify builds custom software, AI & ML solutions, mobile apps, and ERP systems. Digital transformation across Australia, UAE, and Qatar.",
  alternates: {
    canonical: "/",
  },
  keywords: ["software development", "AI", "machine learning", "mobile app development", "ERP", "digital transformation", "Australia", "UAE", "Qatar"],
  authors: [{ name: "Appify" }],
  openGraph: {
    url: "https://appify.global",
    title: "Appify | Custom Software Development, AI & Digital Transformation",
    description: "Custom software, AI solutions, and digital products for enterprises and startups. Australia, UAE, Qatar.",
    type: "website",
    locale: "en_AU",
    siteName: "Appify",
    images: [
      {
        url: "/appify.png",
        width: 1200,
        height: 630,
        alt: "Appify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appify | Custom Software Development",
    description: "Custom software development, AI & ML engineering, and digital transformation.",
    images: ["/appify.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = "https://appify.global";
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Appify",
    url: baseUrl,
    logo: `${baseUrl}/appify.png`,
    description:
      "Appify is a custom software development agency specializing in AI & ML engineering, mobile app development, enterprise ERP systems, and digital transformation across Australia, UAE, and Qatar.",
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Appify",
    url: baseUrl,
    description: "Custom software development, AI & ML engineering, and digital transformation.",
    publisher: { "@id": `${baseUrl}/#organization` },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-47WPQ722HP"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-47WPQ722HP');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
