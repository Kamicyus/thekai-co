import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ui/ChatBot";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#D8FB32",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isEn = locale === "en";

  return {
    verification: {
      google: "381hRN8N9uH22ahkeV6odWFlJEv-KSBqya4Pvaj6iIU",
    },
    title: isEn
      ? "The Kai — AI Agent Systems, Music Production, Digital Creative Studio"
      : "The Kai — AI Ajan Sistemi, Müzik Prodüksiyon, Dijital Yaratıcılık Stüdyosu",
    description: isEn
      ? "AI agent system setup, music production, web design and content creation. 72+ AI agents, 20M+ plays. Istanbul-based AI-native creative studio."
      : "AI ajan sistemi kurulumu, müzik prodüksiyon, web tasarımı ve içerik üretimi. 72+ AI ajan, 20M+ dinlenme. İstanbul merkezli AI-native creative studio.",
    keywords: isEn
      ? [
          "The Kai",
          "AI agent system",
          "AI",
          "music production",
          "web design",
          "software",
          "content creation",
          "AI agent",
          "production",
          "digital creativity",
          "Istanbul",
        ]
      : [
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
      languages: {
        tr: "https://thekai.co",
        en: "https://thekai.co/en",
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "Kai Agents",
    },
    other: {
      "mobile-web-app-capable": "yes",
    },
    openGraph: {
      title: isEn
        ? "The Kai — AI Agent Systems, Music Production, Digital Creative Studio"
        : "The Kai — AI Ajan Sistemi, Müzik Prodüksiyon, Dijital Yaratıcılık Stüdyosu",
      description: isEn
        ? "AI agent system setup, music production, web design and content creation. 72+ AI agents, 20M+ plays. Istanbul-based AI-native creative studio."
        : "AI ajan sistemi kurulumu, müzik prodüksiyon, web tasarımı ve içerik üretimi. 72+ AI ajan, 20M+ dinlenme. İstanbul merkezli AI-native creative studio.",
      url: "https://thekai.co",
      siteName: "The Kai",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "The Kai — AI-Native Creative Studio",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "The Kai — AI-Native Creative Studio"
        : "The Kai — AI-Native Creative Studio",
      description: isEn
        ? "AI agent system setup, music production, web design and content creation."
        : "AI ajan sistemi kurulumu, müzik prodüksiyon, web tasarımı ve içerik üretimi.",
      site: "@callmethekai",
      creator: "@callmethekai",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "The Kai — AI-Native Creative Studio",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "tr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fontVariables} antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
    <NextIntlClientProvider locale={locale} messages={messages}>
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
              "https://linkedin.com/company/the-kai",
            ],
          }),
        }}
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatBot />
      <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" strategy="afterInteractive" />
    </NextIntlClientProvider>
      </body>
    </html>
  );
}
