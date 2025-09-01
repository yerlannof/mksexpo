import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

// Soyuz Grotesk will be loaded via CSS @import

export const metadata: Metadata = {
  title: "Central Asia Education Expo 2025 | International Schools Exhibition",
  description: "Join the premier international schools exhibition in Central Asia. Discover top educational institutions, meet representatives, and explore opportunities for your child's future. March 15-16, 2025 in Astana.",
  keywords: "international schools, education expo, Central Asia, Kazakhstan, private schools, education fair, school exhibition, Astana, education 2025",
  authors: [{ name: "M&K Education" }],
  openGraph: {
    title: "Central Asia Education Expo 2025",
    description: "Premier international schools exhibition in Central Asia. March 15-16, 2025",
    type: "website",
    locale: "en_US",
    alternateLocale: "ru_RU",
    url: "https://caee.kz",
    siteName: "Central Asia Education Expo",
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
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}