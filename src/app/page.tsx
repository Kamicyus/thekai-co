import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Showcase from "@/components/sections/Showcase";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import TechStack from "@/components/sections/TechStack";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Showcase />
      <Process />
      <About />
      <Timeline />
      <TechStack />
      <CTABanner />
    </>
  );
}
