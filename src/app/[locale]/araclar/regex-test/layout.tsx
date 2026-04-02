import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Regex Tester | Düzenli İfade Test Aracı | The Kai",
  description:
    "Regex pattern yazın, metin üzerinde canlı test edin. Eşleşmeleri renkli olarak görün, grupları inceleyin. Ücretsiz regex tester, düzenli ifade test aracı.",
  keywords: [
    "regex tester",
    "regex test",
    "düzenli ifade test",
    "regular expression",
    "regex online",
    "regex kontrol",
    "regex denemesi",
    "pattern eşleştirme",
  ],
  openGraph: {
    title: "Ücretsiz Regex Tester | Düzenli İfade Test Aracı | The Kai",
    description:
      "Regex pattern yazın, metin üzerinde canlı test edin. Eşleşmeleri renkli olarak görün, grupları inceleyin. Reklamsız, ücretsiz, hızlı.",
    url: "https://thekai.co/araclar/regex-test",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz Regex Tester",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/regex-test",
  },
};

export default function RegexTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
