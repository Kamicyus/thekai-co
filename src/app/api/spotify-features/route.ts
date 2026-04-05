import { NextRequest, NextResponse } from "next/server";

// ─── Spotify Client Credentials flow ────────────────────────────────────────
// Reads SPOTIFY_CLIENT_ID + SPOTIFY_CLIENT_SECRET from env.
// Returns: { bpm, key, mode, spotifyId } or 404 if not found.

const TOKEN_CACHE: { token: string; expiresAt: number } = {
  token: "",
  expiresAt: 0,
};

async function getSpotifyToken(): Promise<string> {
  const now = Date.now();
  if (TOKEN_CACHE.token && now < TOKEN_CACHE.expiresAt - 5000) {
    return TOKEN_CACHE.token;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET not set");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Spotify token error: ${res.status}`);
  }

  const data = await res.json();
  TOKEN_CACHE.token = data.access_token;
  TOKEN_CACHE.expiresAt = now + data.expires_in * 1000;
  return TOKEN_CACHE.token;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "";
  const artist = searchParams.get("artist") ?? "";

  if (!title) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }

  try {
    const token = await getSpotifyToken();

    // ── 1. Search for the track ──────────────────────────────────────────
    // Build a clean query — strip feat., (Official Video) etc.
    const cleanTitle = title
      .replace(/\(.*?\)/g, "")
      .replace(/\[.*?\]/g, "")
      .replace(/ft\..*/i, "")
      .replace(/feat\..*/i, "")
      .replace(/official\s*(video|audio|lyric|music)?.*/i, "")
      .trim();

    const cleanArtist = artist
      .replace(/VEVO$/i, "")
      .replace(/ - Topic$/i, "")
      .trim();

    const query = cleanArtist
      ? `track:${cleanTitle} artist:${cleanArtist}`
      : cleanTitle;

    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1&market=TR`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (!searchRes.ok) {
      return NextResponse.json({ error: "Spotify search failed" }, { status: 502 });
    }

    const searchData = await searchRes.json();
    const tracks = searchData?.tracks?.items ?? [];

    if (tracks.length === 0) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    const track = tracks[0];
    const spotifyId: string = track.id;

    // ── 2. Get audio features ─────────────────────────────────────────────
    const featRes = await fetch(
      `https://api.spotify.com/v1/audio-features/${spotifyId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (!featRes.ok) {
      // Return partial result without audio features
      return NextResponse.json({ spotifyId, bpm: null, key: null, mode: null });
    }

    const feat = await featRes.json();

    return NextResponse.json({
      spotifyId,
      bpm: feat.tempo ?? null,            // float, e.g. 128.034
      key: feat.key ?? null,              // 0–11 pitch class, -1 = no key
      mode: feat.mode ?? null,            // 0 = minor, 1 = major
      energy: feat.energy ?? null,
      danceability: feat.danceability ?? null,
      valence: feat.valence ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    // If Spotify creds aren't set, return 503 gracefully (not 500)
    if (message.includes("not set")) {
      return NextResponse.json(
        { error: "Spotify API credentials not configured" },
        { status: 503 }
      );
    }

    console.error("[spotify-features]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
