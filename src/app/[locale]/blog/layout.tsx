import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — The Kai",
  description:
    "AI ajan sistemleri, müzik prodüksiyon, Claude Code ve dijital yaratıcılık üzerine derinlemesine yazılar, rehberler ve deneyimler.",
  alternates: {
    canonical: "/blog",
    languages: {
      tr: "https://thekai.co/blog",
      en: "https://thekai.co/en/blog",
    },
  },
  openGraph: {
    title: "Blog — The Kai",
    description:
      "AI ajan sistemleri, müzik prodüksiyon, Claude Code ve dijital yaratıcılık üzerine yazılar.",
    url: "https://thekai.co/blog",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
