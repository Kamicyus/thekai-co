import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Kelime Sayacı | Karakter Sayacı | The Kai",
  description:
    "Online kelime ve karakter sayacı. Cümle, paragraf sayısı ve tahmini okuma süresi. Reklamsız, ücretsiz, anında sonuç.",
  openGraph: {
    title: "Ücretsiz Kelime Sayacı | Karakter Sayacı | The Kai",
    description:
      "Online kelime ve karakter sayacı. Cümle, paragraf sayısı ve tahmini okuma süresi. Reklamsız, ücretsiz, anında sonuç.",
    url: "https://thekai.co/araclar/kelime-sayaci",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz Kelime Sayacı",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/kelime-sayaci",
  },
};

export default function KelimeSayaciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
