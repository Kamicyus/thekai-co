import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "Contact — The Kai | AI-Native Creative Studio"
      : "İletişim — The Kai | AI-Native Creative Studio",
    description: isEn
      ? "Get in touch with The Kai. Let's discuss your AI agent system, music production, web design projects."
      : "The Kai ile iletişime geçin. AI ajan sistemi, müzik prodüksiyon, web tasarımı projeleriniz için görüşelim.",
    alternates: {
      canonical: isEn ? "/en/iletisim" : "/iletisim",
      languages: {
        tr: "https://thekai.co/iletisim",
        en: "https://thekai.co/en/iletisim",
      },
    },
    openGraph: {
      title: isEn
        ? "Contact — The Kai | AI-Native Creative Studio"
        : "İletişim — The Kai | AI-Native Creative Studio",
      description: isEn
        ? "Get in touch with The Kai for your AI and creative projects."
        : "The Kai ile iletişime geçin. AI ajan sistemi, müzik prodüksiyon, web tasarımı projeleriniz için görüşelim.",
      url: isEn
        ? "https://thekai.co/en/iletisim"
        : "https://thekai.co/iletisim",
      siteName: "The Kai",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/images/og-image.png"],
    },
  };
}

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
