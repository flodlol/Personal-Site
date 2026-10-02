import { NextResponse } from "next/server";

const CACHE_CONTROL =
  "public, max-age=600, s-maxage=86400, stale-while-revalidate=604800";

const ALLOWED_URLS = new Set([
  "https://iiw.kuleuven.be/english/index.html",
  "https://study-track.app",
  "https://study-track.app/",
]);

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'");
}

function readMeta(html: string, key: string) {
  const patterns = [
    new RegExp(
      `<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${key}["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${key}["']`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeEntities(match[1].trim());
  }

  return null;
}

function readTitle(html: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1] ? decodeEntities(match[1].trim()) : null;
}

function resolveUrl(baseUrl: URL, value: string) {
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url")?.trim() ?? "";

  if (!ALLOWED_URLS.has(rawUrl)) {
    return NextResponse.json(
      { ok: false },
      { status: 400, headers: { "Cache-Control": CACHE_CONTROL } },
    );
  }

  try {
    const response = await fetch(rawUrl, {
      headers: {
        Accept: "text/html",
        "User-Agent":
          "Mozilla/5.0 (compatible; flodlol.dev/1.0; +https://flodlol.dev)",
      },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false },
        { headers: { "Cache-Control": CACHE_CONTROL } },
      );
    }

    const html = await response.text();
    const baseUrl = new URL(response.url || rawUrl);

    const title = readMeta(html, "og:title") ?? readTitle(html) ?? null;
    const description =
      readMeta(html, "og:description") ?? readMeta(html, "description") ?? null;
    const ogImage = readMeta(html, "og:image");
    const image = ogImage ? resolveUrl(baseUrl, ogImage) : null;

    const favicon = new URL("/favicon.ico", baseUrl.origin).toString();
    const hostname = baseUrl.hostname.replace(/^www\./, "");

    return NextResponse.json(
      {
        ok: true,
        title,
        description,
        image,
        favicon,
        hostname,
        url: baseUrl.toString(),
      },
      { headers: { "Cache-Control": CACHE_CONTROL } },
    );
  } catch {
    return NextResponse.json(
      { ok: false },
      { headers: { "Cache-Control": CACHE_CONTROL } },
    );
  }
}
