import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube BPM & Ton Analiz + Ses Dosyası Analizi | The Kai",
  description:
    "YouTube linkinden veya ses dosyasından BPM (tempo) ve müzikal ton (key) bilgisini ücretsiz öğrenin. Web Audio API ile tarayıcıda analiz. Reklamsız, kayıt gerektirmez.",
  keywords: [
    "youtube bpm bulucu",
    "şarkı tonu bulma",
    "müzikal key detector",
    "youtube şarkı analiz",
    "bpm hesaplayıcı online",
    "şarkı tempo bulma",
    "ses dosyası bpm analiz",
    "mp3 ton bulma",
    "wav key detector",
    "online audio analyzer",
  ],
  openGraph: {
    title: "YouTube BPM & Ton Analiz + Ses Dosyası Analizi | The Kai",
    description:
      "YouTube linkinden veya ses dosyasından BPM (tempo) ve müzikal ton (key) bilgisini ücretsiz öğrenin. Tarayıcıda analiz, dosya yüklenmez.",
    url: "https://thekai.co/araclar/youtube-bpm-analiz",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - YouTube BPM & Ton Analiz Aracı",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/youtube-bpm-analiz",
  },
};

export default function YoutubeBpmAnalyzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
