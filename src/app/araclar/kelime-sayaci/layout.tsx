import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ucretsiz Kelime Sayaci | Karakter Sayaci | The Kai",
  description:
    "Online kelime ve karakter sayaci. Cumle, paragraf sayisi ve tahmini okuma suresi. Reklamsiz, ucretsiz, aninda sonuc.",
  openGraph: {
    title: "Ucretsiz Kelime Sayaci | Karakter Sayaci | The Kai",
    description:
      "Online kelime ve karakter sayaci. Cumle, paragraf sayisi ve tahmini okuma suresi. Reklamsiz, ucretsiz, aninda sonuc.",
    url: "https://thekai.co/araclar/kelime-sayaci",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ucretsiz Kelime Sayaci",
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
