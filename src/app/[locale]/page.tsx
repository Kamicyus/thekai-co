import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Showcase from "@/components/sections/Showcase";
import Products from "@/components/sections/Products";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import TechStack from "@/components/sections/TechStack";
import CTABanner from "@/components/sections/CTABanner";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Showcase />
      <Products />
      <Process />
      <About />
      <Timeline />
      <TechStack />
      <CTABanner />
    </>
  );
}
