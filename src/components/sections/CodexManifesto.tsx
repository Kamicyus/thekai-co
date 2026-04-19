const MANIFESTO = [
  {
    title: "Source-linked.",
    body: "Every quote carries a timestamp and a link to the original interview. You can verify us in one click. If we can&rsquo;t cite it, we don&rsquo;t ship it.",
  },
  {
    title: "Pattern over moment.",
    body: "One statement is a remark. Two statements across years is a pattern. Codex principles need ≥2 sources — we don&rsquo;t build careers on single quotes.",
  },
  {
    title: "Transformation, not transcription.",
    body: "The quote is the evidence, not the product. Each principle lives with Kai&rsquo;s 2026 application — what this means for an AI-native creator, this week.",
  },
  {
    title: "Respect the origin.",
    body: "No artist is told what they meant. No book is paraphrased. Any passage an artist disputes is taken down within 72 hours, good-faith.",
  },
];

export default function CodexManifesto() {
  return (
    <section className="bg-[#0A0A0A] border-t border-[#1F1F1D]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-28">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#D8FB32] mb-8">
          The editorial contract
        </div>
        <h2 className="font-semibold text-[40px] sm:text-[56px] leading-[1.02] tracking-[-1.5px] text-[#F5F5F0] mb-16 max-w-[620px]">
          What Codex{" "}
          <span
            className="italic font-normal text-[#D8FB32]"
            style={{ fontFamily: "'Iowan Old Style', Georgia, serif" }}
          >
            is
          </span>
          , and what it refuses to be.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
          {MANIFESTO.map((m) => (
            <div key={m.title} className="border-t border-[#1F1F1D] pt-6">
              <div className="font-mono text-[10px] tracking-[1.8px] uppercase text-[#D8FB32] mb-3">
                {m.title.replace(".", "")}
              </div>
              <p
                className="text-[17px] leading-[1.55] text-[#F5F5F0]"
                dangerouslySetInnerHTML={{ __html: m.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
