import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Görsel Boyutlandırıcı | The Kai",
  description:
    "Görsellerinizi sosyal medya boyutlarına uyarlayın. Instagram, YouTube, Twitter ve özel boyutlar. Reklamsız, ücretsiz, hızlı.",
  openGraph: {
    title: "Ücretsiz Görsel Boyutlandırıcı | The Kai",
    description:
      "Görsellerinizi sosyal medya boyutlarına uyarlayın. Instagram, YouTube, Twitter ve özel boyutlar. Reklamsız, ücretsiz, hızlı.",
    url: "https://thekai.co/araclar/gorsel-boyutlandirma",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz Görsel Boyutlandırıcı",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/gorsel-boyutlandirma",
  },
};

export default function GorselBoyutlandirmaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
