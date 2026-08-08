import { createHash } from "node:crypto";
import { getRedis } from "./redis.js";

const VISITS_TOTAL_KEY = "visits:total";
const VISITS_FIRST_KEY = "visits:first";
const VISIT_DEDUP_PREFIX = "visits:dedup:";

function hashVisitor(ip, userAgent) {
  return createHash("sha256")
    .update(`${ip ?? ""}|${userAgent ?? ""}`)
    .digest("hex")
    .slice(0, 24);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export async function recordVisit({ ip, userAgent, dedupSeconds }) {
  const redis = getRedis();
  const dedup = Math.max(0, Number(dedupSeconds) || 0);
  const visitorHash = hashVisitor(ip, userAgent);
  const dedupKey = `${VISIT_DEDUP_PREFIX}${visitorHash}`;
  const dayKey = `visits:unique:${todayKey()}`;

  const pipeline = redis.multi();
  pipeline.incr(VISITS_TOTAL_KEY);
  pipeline.setnx(VISITS_FIRST_KEY, new Date().toISOString());
  pipeline.incr(dayKey);
  pipeline.expire(dayKey, 60 * 60 * 26);

  let countedAsUnique = true;
  if (dedup > 0) {
    const dedupSet = await redis.set(dedupKey, "1", {
      nx: true,
      ex: dedup,
    });
    countedAsUnique = Boolean(dedupSet);
  }

  const results = await pipeline.exec();
  const total = Number(results?.[0] ?? 0);
  const uniqueToday = Number(results?.[2] ?? 0);

  return {
    total,
    uniqueToday,
    countedAsUnique,
  };
}

export async function getVisitStats() {
  const redis = getRedis();
  const [total, first, today] = await Promise.all([
    redis.get(VISITS_TOTAL_KEY),
    redis.get(VISITS_FIRST_KEY),
    redis.get(`visits:unique:${todayKey()}`),
  ]);
  return {
    total: Number(total ?? 0),
    uniqueToday: Number(today ?? 0),
    since: typeof first === "string" ? first : null,
  };
}
