import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Metin Karşılaştırma | Text Diff Aracı | The Kai",
  description:
    "İki metni yan yana karşılaştırın, farkları renkli olarak görün. Eklenen satırlar yeşil, silinen satırlar kırmızı. Ücretsiz metin karşılaştırma, text diff aracı.",
  keywords: [
    "metin karşılaştırma",
    "text diff",
    "fark bulucu",
    "metin farkı",
    "karşılaştırma aracı",
    "diff checker",
    "metin diff",
    "metin kontrol",
  ],
  openGraph: {
    title: "Ücretsiz Metin Karşılaştırma | Text Diff Aracı | The Kai",
    description:
      "İki metni yan yana karşılaştırın, farkları renkli olarak görün. Eklenen satırlar yeşil, silinen satırlar kırmızı. Reklamsız, ücretsiz, hızlı.",
    url: "https://thekai.co/araclar/metin-farki",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz Metin Karşılaştırma Aracı",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/metin-farki",
  },
};

export default function MetinFarkiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
