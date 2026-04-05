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
      ? "Kai Agents — Manage Your AI Agents Like a Company | The Kai"
      : "Kai Agents — AI Ajanlarınızı Bir Şirket Gibi Yönetin | The Kai",
    description: isEn
      ? "Build an AI employee team without writing code. Create departments, assign tasks, run meetings. Turkey's first AI orchestration platform — BYOK."
      : "Kod yazmadan AI çalışan ekibi kurun. Departmanlar oluşturun, görevler verin, toplantılar düzenleyin. Türkiye'nin ilk AI orkestrasyon platformu — BYOK.",
    keywords: isEn
      ? [
          "Kai Agents",
          "AI agents",
          "AI orchestration",
          "agent platform",
          "AI workforce",
          "no-code AI",
          "department agents",
          "The Kai",
          "BYOK",
          "Turkey AI platform",
        ]
      : [
          "Kai Agents",
          "AI ajan",
          "AI orkestrasyon",
          "ajan platformu",
          "AI çalışan",
          "kodsuz AI",
          "departman ajanları",
          "The Kai",
          "BYOK",
          "Türkiye AI platform",
        ],
    metadataBase: new URL("https://thekai.co"),
    alternates: {
      canonical: isEn ? "/en/agents" : "/agents",
      languages: {
        tr: "https://thekai.co/agents",
        en: "https://thekai.co/en/agents",
      },
    },
    openGraph: {
      title: isEn
        ? "Kai Agents — Manage Your AI Agents Like a Company"
        : "Kai Agents — AI Ajanlarınızı Bir Şirket Gibi Yönetin",
      description: isEn
        ? "Build an AI employee team without writing code. Turkey's first AI orchestration platform."
        : "Kod yazmadan AI çalışan ekibi kurun. Türkiye'nin ilk AI orkestrasyon platformu.",
      url: isEn ? "https://thekai.co/en/agents" : "https://thekai.co/agents",
      siteName: "The Kai",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Kai Agents — AI Orchestration Platform",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "Kai Agents — Manage Your AI Agents Like a Company"
        : "Kai Agents — AI Ajanlarınızı Bir Şirket Gibi Yönetin",
      description: isEn
        ? "Build an AI employee team without writing code. Turkey's first AI orchestration platform."
        : "Kod yazmadan AI çalışan ekibi kurun. Türkiye'nin ilk AI orkestrasyon platformu.",
      site: "@callmethekai",
      creator: "@callmethekai",
      images: ["/images/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
