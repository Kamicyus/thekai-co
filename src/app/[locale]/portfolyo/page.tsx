"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

const MUSIC_ARTWORKS_TR = [
  {
    title: "Estarabim",
    category: "SINGLE ARTWORK",
    description: "Türk hip-hop ve Orta Doğu melodilerini birleştiren single. Kamer'in en son çıkan teki.",
    image: "/images/artworks/estarabim.jpg",
  },
  {
    title: "Kamer",
    category: "ALBUM ARTWORK",
    description: "Gitarlı portre — Kamer'in sanatçı kimliğini yansıtan ikonik kare.",
    image: "/images/artworks/kamer-genius.jpg",
  },
  {
    title: "Beni Affet",
    category: "SINGLE ARTWORK",
    description: "Siyah-beyaz portre ve kırmızı kaligrafi — duygusal derinlik.",
    image: "/images/artworks/beni-affet.jpg",
  },
  {
    title: "Yandı Dibine Kadar",
    category: "SINGLE ARTWORK",
    description: "Çöl estetiği ve sinematik görsellikle tasarlanan artwork.",
    image: "/images/artworks/yandi-dibine-kadar.jpg",
  },
  {
    title: "Boş Vitrin",
    category: "SINGLE ARTWORK",
    description: "Kolaj ve çift pozlama tekniğiyle pop-art esintili artwork.",
    image: "/images/artworks/bos-vitrin.jpg",
  },
  {
    title: "Cosmic Dervish — Cappadocia",
    category: "ALBUM ARTWORK",
    description: "Kapadokya'da kozmik müzisyenler — psikedelik Anadolu rock albümü.",
    image: "/images/artworks/cosmic-dervish.jpg",
  },
];

const MUSIC_ARTWORKS_EN = [
  {
    title: "Estarabim",
    category: "SINGLE ARTWORK",
    description: "A single blending Turkish hip-hop and Middle Eastern melodies. Kamer's latest release.",
    image: "/images/artworks/estarabim.jpg",
  },
  {
    title: "Kamer",
    category: "ALBUM ARTWORK",
    description: "Guitar portrait -- an iconic square reflecting Kamer's artist identity.",
    image: "/images/artworks/kamer-genius.jpg",
  },
  {
    title: "Beni Affet",
    category: "SINGLE ARTWORK",
    description: "Black and white portrait with red calligraphy -- emotional depth.",
    image: "/images/artworks/beni-affet.jpg",
  },
  {
    title: "Yandi Dibine Kadar",
    category: "SINGLE ARTWORK",
    description: "Artwork designed with desert aesthetics and cinematic visuals.",
    image: "/images/artworks/yandi-dibine-kadar.jpg",
  },
  {
    title: "Bos Vitrin",
    category: "SINGLE ARTWORK",
    description: "Pop-art inspired artwork with collage and double exposure techniques.",
    image: "/images/artworks/bos-vitrin.jpg",
  },
  {
    title: "Cosmic Dervish — Cappadocia",
    category: "ALBUM ARTWORK",
    description: "Cosmic musicians in Cappadocia -- a psychedelic Anatolian rock album.",
    image: "/images/artworks/cosmic-dervish.jpg",
  },
];

const DIGITAL_ARTWORKS_TR = [
  {
    title: "Red Chaos",
    description: "Kırmızı tuval üzerinde kaotik figürler — hareketin enerjisi.",
    image: "/images/artworks/red-chaos.jpg",
  },
  {
    title: "Leopards",
    description: "Kükreyen leoparlar — doğanın ham gücü.",
    image: "/images/artworks/leopards.jpg",
  },
  {
    title: "White Horse",
    description: "Galakside koşan beyaz at — özgürlüğün sembolü.",
    image: "/images/artworks/white-horse.jpg",
  },
  {
    title: "Tango",
    description: "Altın ışıkta dans eden çift — tutkunun renkleri.",
    image: "/images/artworks/tango.jpg",
  },
  {
    title: "Shadow Crown",
    description: "Mor ışıkta taçlı gölge figür — karanlığın asaleti.",
    image: "/images/artworks/shadow-crown.jpg",
  },
  {
    title: "Vortex",
    description: "Işık girdabına yürüyen figür — sonsuzluğa adım.",
    image: "/images/artworks/vortex.jpg",
  },
  {
    title: "Mushroom Portrait",
    description: "Mantar başlıklı portre — sürrealist güzellik.",
    image: "/images/artworks/mushroom-portrait.jpg",
  },
  {
    title: "Flower Field",
    description: "Çiçek tarlasında şeffaf figür — doğayla bütünleşme.",
    image: "/images/artworks/flower-field.jpg",
  },
  {
    title: "Still Life",
    description: "Pikap ve sofra — nostaljik gerçekçilik.",
    image: "/images/artworks/still-life.jpg",
  },
];

const DIGITAL_ARTWORKS_EN = [
  {
    title: "Red Chaos",
    description: "Chaotic figures on a red canvas -- the energy of motion.",
    image: "/images/artworks/red-chaos.jpg",
  },
  {
    title: "Leopards",
    description: "Roaring leopards -- the raw power of nature.",
    image: "/images/artworks/leopards.jpg",
  },
  {
    title: "White Horse",
    description: "A white horse running through the galaxy -- symbol of freedom.",
    image: "/images/artworks/white-horse.jpg",
  },
  {
    title: "Tango",
    description: "A couple dancing in golden light -- the colors of passion.",
    image: "/images/artworks/tango.jpg",
  },
  {
    title: "Shadow Crown",
    description: "A crowned shadow figure in purple light -- the nobility of darkness.",
    image: "/images/artworks/shadow-crown.jpg",
  },
  {
    title: "Vortex",
    description: "A figure walking into a vortex of light -- stepping into infinity.",
    image: "/images/artworks/vortex.jpg",
  },
  {
    title: "Mushroom Portrait",
    description: "A portrait with a mushroom crown -- surrealist beauty.",
    image: "/images/artworks/mushroom-portrait.jpg",
  },
  {
    title: "Flower Field",
    description: "A transparent figure in a flower field -- becoming one with nature.",
    image: "/images/artworks/flower-field.jpg",
  },
  {
    title: "Still Life",
    description: "Turntable and dining table -- nostalgic realism.",
    image: "/images/artworks/still-life.jpg",
  },
];

export default function PortfolyoPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const MUSIC_ARTWORKS = isEn ? MUSIC_ARTWORKS_EN : MUSIC_ARTWORKS_TR;
  const DIGITAL_ARTWORKS = isEn ? DIGITAL_ARTWORKS_EN : DIGITAL_ARTWORKS_TR;

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
              {isEn ? "Portfolio" : "Portfolyo"}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-5">
            {isEn ? "Portfolio" : "Portfolyo"}
          </h1>
          <p className="text-[#999999] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            {isEn ? (
              <>
                Websites, music covers, digital art and creative projects.
                <br />
                Every piece is a world, every design is a story.
              </>
            ) : (
              <>
                Web siteleri, müzik kapakları, dijital sanat ve yaratıcı projeler.
                <br />
                Her eser bir dünya, her tasarım bir hikaye.
              </>
            )}
          </p>
        </FadeIn>

        {/* Web Sites */}
        <div id="web-siteleri" className="scroll-mt-28">
        <FadeIn className="mb-20">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-3">
            {isEn ? "Websites" : "Web Siteleri"}
          </h2>
          <p className="text-[#999999] text-base mb-8 max-w-lg">
            {isEn
              ? "Web projects built with modern technologies."
              : "Modern teknolojilerle geliştirdiğimiz web projeleri."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Echo Bazaar", image: "/images/projects/scroll-ozeta.jpg" },
              { name: "Shortlist Creative", image: "/images/projects/scroll-shortlist.jpg" },
              { name: "The Kai", image: "/images/projects/scroll-thekai.jpg" },
            ].map((site) => (
              <div key={site.name} className="group/site">
                {/* Browser frame */}
                <div className="rounded-t-xl bg-[#1A1A1A] border border-[#2A2A2A] border-b-0 px-3 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex-1 mx-2 bg-[#0A0A0A] rounded-md h-5" />
                </div>
                {/* Smooth CSS scroll viewport */}
                <div className="h-[240px] sm:h-[320px] overflow-hidden rounded-b-xl border border-[#2A2A2A] border-t-0 bg-[#0A0A0A]">
                  <img
                    src={site.image}
                    alt={`${site.name} ${isEn ? "website" : "web sitesi"}`}
                    className="w-full h-auto object-cover object-top"
                    loading="lazy"
                    style={{
                      animation: "scrollSite 20s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate",
                    }}
                  />
                </div>
                {/* Site name */}
                <p className="text-center text-[#F5F5F5] text-sm font-medium mt-3">{site.name}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        </div>

        {/* Music Artworks */}
        <div id="artwork" className="scroll-mt-28">
        <FadeIn className="mb-20">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-8">
            {isEn ? "Music Artworks" : "Müzik Artwork'leri"}
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
        </div>

        {/* Digital Art */}
        <FadeIn>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-3">
            {isEn ? "Digital Art" : "Dijital Sanat"}
          </h2>
          <p className="text-[#999999] text-base mb-8 max-w-lg">
            {isEn
              ? "Original artworks created with AI-powered production processes."
              : "AI destekli üretim süreciyle oluşturulan orijinal sanat eserleri."}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {DIGITAL_ARTWORKS.map((item) => (
              <div
                key={item.title}
                className="group"
              >
                <div className="relative bg-[#141414] border border-[#1F2937] rounded-[16px] overflow-hidden hover:border-[#D8FB32]/20 transition-all duration-500">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
            {isEn
              ? "Would you like to get artwork and cover design services?"
              : "Artwork ve kapak tasarımı hizmeti almak ister misiniz?"}
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] hover:bg-[#B4F030] hover:scale-[1.02] transition-all duration-200 text-base"
          >
            {isEn ? "Get a Quote" : "Proje Teklifi Al"}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
