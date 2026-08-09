import { NextResponse } from "next/server";

const STATS_API_URL =
  process.env.STATS_API_URL ??
  process.env.NEXT_PUBLIC_STATS_API_URL ??
  "https://flodlol-stats.onrender.com";

const UPSTREAM_TIMEOUT_MS = 4_000;

const unavailableStats = {
  visits: { total: null, uniqueToday: null },
  stars: { total: null, repos: [] },
};

export async function GET() {
  try {
    const response = await fetch(`${STATS_API_URL}/stats`, {
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!response.ok) {
      return NextResponse.json(unavailableStats);
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(unavailableStats);
  }
}

export async function POST() {
  try {
    await fetch(`${STATS_API_URL}/visit`, {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch {
    // A sleeping analytics service must not affect the portfolio response.
  }

  return new NextResponse(null, { status: 204 });
}
