import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CodexHero from "@/components/sections/CodexHero";
import CodexIssueCard from "@/components/sections/CodexIssueCard";
import CodexWaitlist from "@/components/sections/CodexWaitlist";
import CodexManifesto from "@/components/sections/CodexManifesto";
import CodexRoadmap from "@/components/sections/CodexRoadmap";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn
      ? "Kai Codex — Origin playbooks from artists who broke out"
      : "Kai Codex — Sanatçı yol haritaları, tam metin kaynağıyla",
    description: isEn
      ? "Every four weeks, one artist's career pattern — distilled from public interviews into a 30-page field kit for the next operator."
      : "Her dört haftada bir sanatçı. Kamu röportajlarından damıtılmış 30 sayfalık saha kiti. Bir sonraki operatör için.",
    alternates: { canonical: "/codex" },
  };
}

export default async function CodexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <CodexHero />
      <CodexIssueCard />
      <CodexManifesto />
      <CodexRoadmap />
      <CodexWaitlist />
    </>
  );
}
