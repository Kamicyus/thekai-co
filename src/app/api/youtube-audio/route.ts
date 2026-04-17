import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024;

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

  const url = `https://www.youtube.com/watch?v=${videoId}`;

  let info;
  try {
    info = await ytdl.getInfo(url);
  } catch (e) {
    return NextResponse.json(
      {
        error:
          "YouTube videosuna erişilemedi (geo-block / private / silinmiş olabilir)",
        detail: e instanceof Error ? e.message : String(e),
      },
      { status: 502 },
    );
  }

  const audioFormats = info.formats.filter(
    (f) => f.hasAudio && !f.hasVideo && f.contentLength,
  );

  if (audioFormats.length === 0) {
    return NextResponse.json(
      { error: "Bu video için ses akışı bulunamadı" },
      { status: 404 },
    );
  }

  audioFormats.sort(
    (a, b) => Number(a.contentLength ?? 0) - Number(b.contentLength ?? 0),
  );

  const chosen = audioFormats[0];
  const contentType = chosen.mimeType?.split(";")[0] ?? "audio/webm";

  let stream;
  try {
    stream = ytdl.downloadFromInfo(info, {
      format: chosen,
      highWaterMark: 1 << 20,
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Stream başlatılamadı",
        detail: e instanceof Error ? e.message : String(e),
      },
      { status: 502 },
    );
  }

  const chunks: Buffer[] = [];
  let total = 0;

  try {
    await new Promise<void>((resolve, reject) => {
      stream.on("data", (chunk: Buffer) => {
        if (total >= MAX_BYTES) return;
        const remaining = MAX_BYTES - total;
        const slice =
          chunk.length > remaining ? chunk.subarray(0, remaining) : chunk;
        chunks.push(slice);
        total += slice.length;
        if (total >= MAX_BYTES) {
          stream.destroy();
          resolve();
        }
      });
      stream.on("end", () => resolve());
      stream.on("error", (err) => reject(err));
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Ses indirme başarısız",
        detail: e instanceof Error ? e.message : String(e),
      },
      { status: 502 },
    );
  }

  const buffer = Buffer.concat(chunks, total);
  const out = new Uint8Array(buffer);

  return new Response(out, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(out.byteLength),
      "Cache-Control": "public, max-age=3600",
      "X-Audio-Bytes": String(out.byteLength),
    },
  });
}
