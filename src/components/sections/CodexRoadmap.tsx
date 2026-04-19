const ROADMAP = [
  { num: "№01", artist: "Ezhel", status: "Live · $14", live: true },
  { num: "№02", artist: "Mabel Matiz", status: "Live · $14", live: true },
  { num: "№03", artist: "Dua Lipa", status: "Live · $14", live: true },
  {
    num: "№04",
    artist: "Tyler, The Creator",
    status: "Live · $14",
    live: true,
  },
  { num: "№05", artist: "Kendrick Lamar", status: "Live · $14", live: true },
  { num: "№06", artist: "Sabrina Carpenter", status: "Live · $14", live: true },
  {
    num: "Bundle",
    artist: "The 6-Pack",
    status: "Live · $79 ($5 off)",
    live: true,
  },
];

export default function CodexRoadmap() {
  return (
    <section className="bg-[#0A0A0A] border-t border-[#1F1F1D]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-28">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#D8FB32] mb-8">
          The first twelve months
        </div>
        <h2 className="font-semibold text-[40px] sm:text-[56px] leading-[1.02] tracking-[-1.5px] text-[#F5F5F0] mb-16 max-w-[620px]">
          Five artists,{" "}
          <span
            className="italic font-normal text-[#D8FB32]"
            style={{ fontFamily: "'Iowan Old Style', Georgia, serif" }}
          >
            one at a time
          </span>
          .
        </h2>

        <div className="border-t border-[#1F1F1D]">
          {ROADMAP.map((r) => (
            <div
              key={r.num}
              className="grid grid-cols-[auto_1fr_auto] gap-6 sm:gap-10 items-baseline py-6 border-b border-[#1F1F1D]"
            >
              <div
                className={`font-mono text-[20px] sm:text-[28px] ${
                  r.live ? "text-[#D8FB32]" : "text-[#5A5A55]"
                }`}
              >
                {r.num}
              </div>
              <div
                className={`text-[20px] sm:text-[26px] font-semibold tracking-[-0.5px] ${
                  r.live ? "text-[#F5F5F0]" : "text-[#A8A8A0]"
                }`}
              >
                {r.artist}
              </div>
              <div
                className={`font-mono text-[10px] tracking-[1.4px] uppercase ${
                  r.live ? "text-[#D8FB32]" : "text-[#5A5A55]"
                }`}
              >
                {r.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
