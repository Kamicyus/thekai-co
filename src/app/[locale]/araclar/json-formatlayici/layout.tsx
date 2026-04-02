import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz JSON Formatlayıcı | The Kai",
  description:
    "JSON verilerinizi otomatik formatlayın, syntax hatalarını tespit edin, sıkıştırın veya güzelleştirin. Reklamsız, ücretsiz, hızlı.",
  openGraph: {
    title: "Ücretsiz JSON Formatlayıcı | The Kai",
    description:
      "JSON verilerinizi otomatik formatlayın, syntax hatalarını tespit edin, sıkıştırın veya güzelleştirin. Reklamsız, ücretsiz, hızlı.",
    url: "https://thekai.co/araclar/json-formatlayici",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz JSON Formatlayıcı",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/json-formatlayici",
  },
};

export default function JSONFormatlayiciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
