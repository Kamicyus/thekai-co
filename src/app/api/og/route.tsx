import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blog-data";

// nodejs runtime — blog-data.ts (10K+ satır pure data) edge bundle limitini aşıyor,
// önceki edge runtime build'de Vercel endpoint'i hiç oluşturmadı (canlıda 404).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KAI_BG = "#0A0A0A";
const KAI_INK = "#F5F5F5";
const KAI_ACCENT = "#D8FB32";
const KAI_MUTED = "#999999";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "";
  const titleParam = searchParams.get("title");
  const eyebrowParam = searchParams.get("eyebrow") ?? "The Kai · Blog";

  let title = titleParam ?? "AI-Native Creative Studio";
  let eyebrow = eyebrowParam;

  if (slug && !titleParam) {
    const post = getBlogPost(slug);
    if (post) {
      title = post.title;
      const firstKw = post.keywords?.[0];
      if (firstKw) eyebrow = `The Kai · ${firstKw}`;
    }
  }

  if (title.length > 110) title = title.slice(0, 107) + "…";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: KAI_BG,
        backgroundImage: `radial-gradient(circle at 80% 20%, rgba(216,251,50,0.12), transparent 50%), radial-gradient(circle at 10% 90%, rgba(216,251,50,0.06), transparent 60%)`,
        display: "flex",
        flexDirection: "column",
        padding: "70px 80px",
        fontFamily: "Inter, system-ui, sans-serif",
        color: KAI_INK,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: KAI_ACCENT,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: KAI_ACCENT,
            boxShadow: `0 0 22px ${KAI_ACCENT}`,
            display: "block",
          }}
        />
        <span style={{ display: "block" }}>{eyebrow}</span>
      </div>

      <div
        style={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <div
          style={{
            fontSize: title.length > 70 ? 56 : title.length > 40 ? 68 : 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: KAI_INK,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 28,
          borderTop: `1px solid rgba(255,255,255,0.08)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            color: KAI_INK,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ display: "block" }}>The Kai</span>
          <span
            style={{
              display: "block",
              color: KAI_MUTED,
              fontSize: 22,
              fontWeight: 400,
            }}
          >
            thekai.co
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
            color: KAI_MUTED,
            fontSize: 20,
          }}
        >
          <span style={{ display: "block" }}>72+ AI Ajan</span>
          <span style={{ display: "block", color: "rgba(255,255,255,0.2)" }}>
            ·
          </span>
          <span style={{ display: "block" }}>20M+ Dinlenme</span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
