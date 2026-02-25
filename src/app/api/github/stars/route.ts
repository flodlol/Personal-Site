import { NextResponse } from "next/server";

const CACHE_CONTROL = "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400";
const REPO_REGEX = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

function sanitizeRepo(repo: string) {
  const trimmed = repo.trim().replace(/\.git$/, "");
  if (!REPO_REGEX.test(trimmed)) return null;
  return trimmed;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = sanitizeRepo(searchParams.get("repo") ?? "");

  if (!repo) {
    return NextResponse.json(
      { stars: null },
      { status: 400, headers: { "Cache-Control": CACHE_CONTROL } },
    );
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "personal-site",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { stars: null },
        { headers: { "Cache-Control": CACHE_CONTROL } },
      );
    }

    const data: unknown = await response.json();
    const stars =
      typeof data === "object" &&
      data !== null &&
      "stargazers_count" in data &&
      typeof (data as { stargazers_count?: unknown }).stargazers_count === "number"
        ? (data as { stargazers_count: number }).stargazers_count
        : null;

    return NextResponse.json({ stars }, { headers: { "Cache-Control": CACHE_CONTROL } });
  } catch {
    return NextResponse.json(
      { stars: null },
      { headers: { "Cache-Control": CACHE_CONTROL } },
    );
  }
}
