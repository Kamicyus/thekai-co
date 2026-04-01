import type { Metadata } from "next";
import { Inter, DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ui/ChatBot";

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
  verification: {
    google: "381hRN8N9uH22ahkeV6odWFlJEv-KSBqya4Pvaj6iIU",
  },
  title: "The Kai — AI Ajan Sistemi, Müzik Prodüksiyon, Dijital Yaratıcılık Stüdyosu",
  description:
    "AI ajan sistemi kurulumu, müzik prodüksiyon, web tasarımı ve içerik üretimi. 72+ AI ajan, 20M+ dinlenme. İstanbul merkezli AI-native creative studio.",
  keywords: [
    "The Kai",
    "AI ajan sistemi",
    "AI",
    "müzik prodüksiyon",
    "web tasarımı",
    "yazılım",
    "içerik üretimi",
    "AI ajan",
    "prodüksiyon",
    "dijital yaratıcılık",
    "İstanbul",
  ],
  authors: [{ name: "Kamer Can İzvermez" }],
  metadataBase: new URL("https://thekai.co"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "The Kai — AI Ajan Sistemi, Müzik Prodüksiyon, Dijital Yaratıcılık Stüdyosu",
    description:
      "AI ajan sistemi kurulumu, müzik prodüksiyon, web tasarımı ve içerik üretimi. 72+ AI ajan, 20M+ dinlenme. İstanbul merkezli AI-native creative studio.",
    url: "https://thekai.co",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai — AI-Native Creative Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@callmethekai",
    creator: "@callmethekai",
    images: ["https://thekai.co/images/og-image.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Kai",
              url: "https://thekai.co",
              logo: "https://thekai.co/images/kai-carkli.svg",
              description:
                "AI-Native Creative Studio. Müzik, teknoloji ve yaratıcılık kesişiminde bir stüdyo.",
              founder: {
                "@type": "Person",
                name: "Kamer Can İzvermez",
              },
              sameAs: [
                "https://x.com/callmethekai",
                "https://youtube.com/@callmethekai",
                "https://instagram.com/callmethekai",
                "https://tiktok.com/@callmethekai",
                "https://linkedin.com/company/thekai",
              ],
            }),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
