import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const title = isEn
    ? "Blog — The Kai | AI Agents, Music Production & Digital Creativity"
    : "Blog — The Kai | AI Ajan Sistemleri, Müzik Prodüksiyon, Dijital Yaratıcılık";

  const description = isEn
    ? "In-depth articles on AI agent systems, music production, Claude Code, content strategy, and digital creativity. Insights from Kamer at thekai.co."
    : "AI ajan sistemleri, müzik prodüksiyon, Claude Code, içerik stratejisi ve dijital yaratıcılık üzerine derinlemesine yazılar. Kamer'in thekai.co'dan içgörüleri.";

  return {
    title,
    description,
    alternates: {
      canonical: "/blog",
      languages: {
        tr: "https://thekai.co/blog",
        en: "https://thekai.co/en/blog",
      },
    },
    openGraph: {
      title,
      description,
      url: "https://thekai.co/blog",
      siteName: "The Kai",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "The Kai Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.png"],
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
