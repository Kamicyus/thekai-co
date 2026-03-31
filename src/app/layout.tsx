import type { Metadata } from "next";
import { Inter, DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Kai — AI-Native Creative Studio",
  description:
    "Müzik, teknoloji ve yaratıcılık kesişiminde bir stüdyo. AI ajan sistemi, müzik prodüksiyon, içerik üretimi ve yazılım geliştirme.",
  keywords: [
    "The Kai",
    "AI",
    "müzik",
    "yazılım",
    "içerik üretimi",
    "AI ajan",
    "prodüksiyon",
  ],
  authors: [{ name: "Kamer Can İzvermez" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "The Kai — AI-Native Creative Studio",
    description:
      "Müzik, teknoloji ve yaratıcılık kesişiminde bir stüdyo.",
    url: "https://thekai.co",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    site: "@callmethekai",
    creator: "@callmethekai",
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
    <html
      lang="tr"
      className={`${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${dmSerifDisplay.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
