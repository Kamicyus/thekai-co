import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz BMI Hesaplayıcı — Vücut Kitle İndeksi | The Kai",
  description:
    "Boy ve kilonuzu girin, vücut kitle indeksinizi anında hesaplayın. Sağlıklı kilo aralığı göstergesi. Reklamsız, ücretsiz.",
  openGraph: {
    title: "Ücretsiz BMI Hesaplayıcı — Vücut Kitle İndeksi | The Kai",
    description:
      "Boy ve kilonuzu girin, vücut kitle indeksinizi anında hesaplayın. Sağlıklı kilo aralığı göstergesi. Reklamsız, ücretsiz.",
    url: "https://thekai.co/araclar/bmi-hesaplayici",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz BMI Hesaplayıcı",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/bmi-hesaplayici",
  },
};

export default function BMIHesaplayiciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
