export default function CodexIssueCard() {
  return (
    <section className="bg-[#0A0A0A] border-t border-[#1F1F1D]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-28">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#D8FB32] mb-6">
          Issue №01 · Shipping soon
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <div>
            <h2 className="font-semibold text-[44px] sm:text-[72px] leading-[0.95] tracking-[-2px] text-[#F5F5F0] mb-6">
              The{" "}
              <span
                className="italic font-normal text-[#D8FB32]"
                style={{ fontFamily: "'Iowan Old Style', Georgia, serif" }}
              >
                Ezhel
              </span>
              <br />
              Codex.
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#F5F5F0] mb-5">
              Ankara boy who moved to Berlin, rewrote Turkish pop, built a
              cross-cultural rap catalog. Seven long-form interviews, nine
              principles, one broken rule — translated into plays the 2026
              AI-native creator can run this week.
            </p>
            <p className="text-[14px] leading-[1.6] text-[#A8A8A0]">
              Every quote sourced. Every principle counter-weighed with a modern
              application. Fair-use disciplined; artist-respectful.
            </p>
          </div>

          <div className="border-l border-[#1F1F1D] pl-8 space-y-8">
            {[
              ["Principles", "9"],
              ["Interviews mined", "7"],
              ["Hours of source audio", "4h 22m"],
              ["Pages", "30"],
              ["Languages", "EN first · TR to follow"],
              ["Price", "$19"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="font-mono text-[9px] tracking-[1.8px] uppercase text-[#5A5A55] mb-1.5">
                  {label}
                </div>
                <div className="text-[16px] text-[#F5F5F0]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
