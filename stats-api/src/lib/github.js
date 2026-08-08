import { getRedis } from "./redis.js";

const REPO_REGEX = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const STAR_CACHE_PREFIX = "stars:repo:";
const STAR_CACHE_TTL_SECONDS = 60 * 60;
const STARS_TOTAL_TTL_SECONDS = 60 * 10;
const STARS_TOTAL_KEY = "stars:total";

function sanitizeRepo(repo) {
  const trimmed = repo.trim().replace(/\.git$/, "");
  if (!REPO_REGEX.test(trimmed)) return null;
  return trimmed;
}

export function getConfiguredRepos() {
  const raw = process.env.REPOS ?? "";
  return raw
    .split(",")
    .map((entry) => sanitizeRepo(entry))
    .filter((entry) => entry !== null);
}

async function fetchStarsFromGitHub(ownerRepo) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "flodlol-stats-api",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetch(`https://api.github.com/repos/${ownerRepo}`, {
    headers,
  });
  if (!response.ok) {
    throw new Error(
      `GitHub API ${response.status} for ${ownerRepo}: ${await response
        .text()
        .catch(() => "")}`,
    );
  }
  const data = await response.json();
  if (
    typeof data !== "object" ||
    data === null ||
    typeof data.stargazers_count !== "number"
  ) {
    throw new Error(`Unexpected GitHub response for ${ownerRepo}`);
  }
  return data.stargazers_count;
}

export async function getRepoStars(ownerRepo) {
  if (!REPO_REGEX.test(ownerRepo)) {
    throw new Error(`Invalid repo: ${ownerRepo}`);
  }
  const redis = getRedis();
  const cacheKey = `${STAR_CACHE_PREFIX}${ownerRepo}`;
  const cached = await redis.get(cacheKey);
  if (cached && typeof cached === "object" && typeof cached.stars === "number") {
    return { ...cached, cached: true };
  }
  const stars = await fetchStarsFromGitHub(ownerRepo);
  const payload = { stars, fetchedAt: new Date().toISOString() };
  await redis.set(cacheKey, payload, { ex: STAR_CACHE_TTL_SECONDS });
  return { ...payload, cached: false };
}

export async function getAggregateStars(repos = getConfiguredRepos()) {
  if (repos.length === 0) {
    return {
      total: 0,
      repos: [],
      fetchedAt: new Date().toISOString(),
      cached: false,
    };
  }

  const redis = getRedis();
  const cachedTotal = await redis.get(STARS_TOTAL_KEY);
  if (
    cachedTotal &&
    typeof cachedTotal === "object" &&
    Array.isArray(cachedTotal.repos) &&
    typeof cachedTotal.total === "number"
  ) {
    return { ...cachedTotal, cached: true };
  }

  const results = await Promise.allSettled(repos.map((repo) => getRepoStars(repo)));
  const entries = results.map((result, index) => {
    const repo = repos[index];
    if (result.status === "fulfilled") {
      return { repo, stars: result.value.stars, ok: true };
    }
    return { repo, stars: null, ok: false, error: String(result.reason) };
  });
  const total = entries.reduce(
    (sum, entry) => sum + (entry.ok ? entry.stars : 0),
    0,
  );
  const payload = {
    total,
    repos: entries,
    fetchedAt: new Date().toISOString(),
  };
  await redis.set(STARS_TOTAL_KEY, payload, { ex: STARS_TOTAL_TTL_SECONDS });
  return { ...payload, cached: false };
}
