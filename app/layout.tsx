import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import FacebookPixelHead from "@/components/FacebookPixelHead";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

// Soyuz Grotesk will be loaded via CSS @import

export const metadata: Metadata = {
  title: "Выставка «Частные школы за рубежом» - M&K Education Expo 2025",
  description: "Встретьтесь с представителями ведущих частных школ мира. 4 октября - Астана, 5 октября - Алматы. Бесплатная регистрация.",
  keywords: "частные школы, международные школы, образование за рубежом, школы-пансионы, выставка образования, Астана, Алматы",
  authors: [{ name: "M&K Education" }],
  openGraph: {
    title: "Выставка «Частные школы за рубежом» 2025",
    description: "Престижное образование для вашего ребенка. 4-5 октября 2025",
    type: "website",
    locale: "ru_RU",
    alternateLocale: "en_US",
    url: "https://mks-expo.vercel.app",
    siteName: "M&K Education Expo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Central Asia Education Expo 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Central Asia Education Expo 2025",
    description: "Premier international schools exhibition in Central Asia",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <FacebookPixelHead />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}