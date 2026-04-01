"use client";

import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

const MUSIC_ARTWORKS = [
  {
    title: "Estarabim",
    category: "Single Artwork",
    description: "Türk hip-hop ve Orta Doğu melodilerini birleştiren single. Kamer'in en son çıkan teki.",
    image: "/images/artworks/estarabim.jpg",
  },
  {
    title: "Yandı Dibine Kadar",
    category: "Single Artwork",
    description: "Çöl estetiği ve sinematik görsellikle tasarlanan artwork.",
    image: "/images/artworks/yandi-dibine-kadar.jpg",
  },
  {
    title: "Kamer",
    category: "Sanatçı Görseli",
    description: "Gitarlı portre — Kamer'in sanatçı kimliğini yansıtan ikonik kare.",
    image: "/images/artworks/kamer-genius.jpg",
  },
];

const DIGITAL_ARTWORKS = [
  {
    title: "Vortex",
    description: "Işık girdabına yürüyen figür — sonsuzluğa adım.",
    image: "/images/artworks/vortex.jpg",
  },
  {
    title: "Red Chaos",
    description: "Kırmızı tuval üzerinde kaotik figürler — hareketin enerjisi.",
    image: "/images/artworks/red-chaos.jpg",
  },
  {
    title: "Shadow Crown",
    description: "Mor ışıkta taçlı gölge figür — karanlığın asaleti.",
    image: "/images/artworks/shadow-crown.jpg",
  },
  {
    title: "Flower Field",
    description: "Çiçek tarlasında şeffaf figür — doğayla bütünleşme.",
    image: "/images/artworks/flower-field.jpg",
  },
  {
    title: "Tango",
    description: "Altın ışıkta dans eden çift — tutkunun renkleri.",
    image: "/images/artworks/tango.jpg",
  },
  {
    title: "Mushroom Portrait",
    description: "Mantar başlıklı portre — sürrealist güzellik.",
    image: "/images/artworks/mushroom-portrait.jpg",
  },
  {
    title: "White Horse",
    description: "Galakside koşan beyaz at — özgürlüğün sembolü.",
    image: "/images/artworks/white-horse.jpg",
  },
  {
    title: "Still Life",
    description: "Pikap ve sofra — nostaljik gerçekçilik.",
    image: "/images/artworks/still-life.jpg",
  },
  {
    title: "Leopards",
    description: "Kükreyen leoparlar — doğanın ham gücü.",
    image: "/images/artworks/leopards.jpg",
  },
];

export default function PortfolyoPage() {
  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
      {/* Decorative pinwheels */}
      <div className="absolute top-20 right-8 pointer-events-none">
        <DecorativePinwheel size={120} opacity={0.04} rotate={15} />
      </div>
      <div className="absolute bottom-40 left-4 pointer-events-none">
        <DecorativePinwheel size={80} opacity={0.03} rotate={-20} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <FadeIn className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8FB32]/10 border border-[#D8FB32]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full" />
            <span className="text-[#D8FB32] text-xs font-medium uppercase tracking-wider">
              Portfolyo
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-5">
            Artwork Galerisi
          </h1>
          <p className="text-[#999999] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Müzik kapakları, dijital sanat ve yaratıcı projeler.
            <br />
            Her eser bir dünya, her tasarım bir hikaye.
          </p>
        </FadeIn>

        {/* Müzik Artwork'leri */}
        <FadeIn className="mb-20">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-8">
            Müzik Artwork'leri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MUSIC_ARTWORKS.map((item) => (
              <div key={item.title} className="group">
                <div className="relative bg-[#141414] border border-[#1F2937] rounded-[20px] overflow-hidden hover:border-[#D8FB32]/30 transition-all duration-500">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] bg-[#D8FB32]/15 text-[#D8FB32] px-2.5 py-1 rounded-full font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#F5F5F5] mt-3 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#999999] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Dijital Sanat / Kim Jung Vada */}
        <FadeIn>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-3">
            Dijital Sanat
          </h2>
          <p className="text-[#999999] text-base mb-8 max-w-lg">
            AI destekli üretim süreciyle oluşturulan orijinal sanat eserleri.
          </p>
          <div className="columns-2 lg:columns-3 gap-4 space-y-4">
            {DIGITAL_ARTWORKS.map((item) => (
              <div
                key={item.title}
                className="break-inside-avoid group"
              >
                <div className="relative bg-[#141414] border border-[#1F2937] rounded-[16px] overflow-hidden hover:border-[#D8FB32]/20 transition-all duration-500">
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#F5F5F5] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#CCCCCC] text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn className="mt-20 text-center">
          <p className="text-[#666666] text-sm mb-6">
            Artwork ve kapak tasarımı hizmeti almak ister misiniz?
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] hover:bg-[#B4F030] hover:scale-[1.02] transition-all duration-200 text-base"
          >
            Proje Teklifi Al
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
