import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Büyük Küçük Harf Çevirici | Metin Dönüştürücü | The Kai",
  description:
    "Metni büyük harfe, küçük harfe, başlık düzenine veya cümle düzenine anında çevirin. Reklamsız, ücretsiz, hızlı.",
  openGraph: {
    title: "Büyük Küçük Harf Çevirici | Metin Dönüştürücü | The Kai",
    description:
      "Metni büyük harfe, küçük harfe, başlık düzenine veya cümle düzenine anında çevirin. Reklamsız, ücretsiz, hızlı.",
    url: "https://thekai.co/araclar/harf-cevirici",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Büyük Küçük Harf Çevirici",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/harf-cevirici",
  },
};

export default function HarfCeviriciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
