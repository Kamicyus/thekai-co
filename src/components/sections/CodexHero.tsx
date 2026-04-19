import Image from "next/image";

export default function CodexHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(216,251,50,0.10) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(85,50,250,0.08) 0%, transparent 55%)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-28 text-left">
        <div className="flex items-center gap-3 mb-10">
          <Image
            src="/images/kai-carkli.svg"
            alt="Kai"
            width={44}
            height={44}
            className="opacity-90"
          />
          <span className="font-mono text-[11px] tracking-[2.4px] uppercase text-[#D8FB32]">
            Kai · Codex Series
          </span>
        </div>

        <h1 className="font-semibold text-[56px] sm:text-[96px] leading-[0.92] tracking-[-3px] text-[#F5F5F0] mb-8">
          Origin{" "}
          <span
            className="italic font-normal text-[#D8FB32]"
            style={{ fontFamily: "'Iowan Old Style', Georgia, serif" }}
          >
            playbooks
          </span>
          ,<br />
          field-tested.
        </h1>

        <p
          className="text-[20px] sm:text-[24px] leading-[1.35] text-[#A8A8A0] max-w-[620px] mb-14"
          style={{
            fontFamily: "'Iowan Old Style', Georgia, serif",
            fontStyle: "italic",
          }}
        >
          Every four weeks, one artist&rsquo;s career pattern — distilled from
          public interviews into a 30-page field kit for the next operator.
        </p>

        <div className="flex flex-wrap gap-4 items-center font-mono text-[10px] tracking-[1.6px] uppercase text-[#5A5A55]">
          <span>No theory</span>
          <span className="text-[#D8FB32]">·</span>
          <span>No guru fluff</span>
          <span className="text-[#D8FB32]">·</span>
          <span>Source-linked quotes</span>
          <span className="text-[#D8FB32]">·</span>
          <span>Modern translation</span>
        </div>
      </div>
    </section>
  );
}
