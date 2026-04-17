import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;

function isValidVideoId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get("videoId");
  if (!videoId || !isValidVideoId(videoId)) {
    return NextResponse.json(
      { error: "Geçerli videoId gerekli (11 karakter)" },
      { status: 400 },
    );
  }

  const relayUrl = process.env.YOUTUBE_RELAY_URL?.replace(/\/+$/, "");
  const relayToken = process.env.YOUTUBE_RELAY_TOKEN;

  if (!relayUrl || !relayToken) {
    return NextResponse.json(
      { error: "Relay yapılandırılmamış" },
      { status: 503 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);

  let upstream: Response;
  try {
    upstream = await fetch(`${relayUrl}/audio?videoId=${videoId}`, {
      headers: { Authorization: `Bearer ${relayToken}` },
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (e) {
    clearTimeout(timeout);
    return NextResponse.json(
      {
        error: "Relay'a ulaşılamadı (offline olabilir)",
        detail: e instanceof Error ? e.message : String(e),
      },
      { status: 502 },
    );
  }
  clearTimeout(timeout);

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return NextResponse.json(
      {
        error: `Relay hatası (${upstream.status})`,
        detail: text.slice(0, 300),
      },
      { status: upstream.status === 401 ? 500 : 502 },
    );
  }

  const buf = await upstream.arrayBuffer();
  const truncated = buf.byteLength > MAX_BYTES ? buf.slice(0, MAX_BYTES) : buf;
  const bytes = new Uint8Array(truncated);
  const contentType = upstream.headers.get("content-type") ?? "audio/mp4";

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(bytes.byteLength),
      "Cache-Control": "public, max-age=3600",
      "X-Audio-Bytes": String(bytes.byteLength),
      "X-Audio-Source": "relay",
    },
  });
}
