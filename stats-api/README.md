# flodlol-stats-api

Tiny Node.js / Express service that powers **flodlol.dev** with two things:

1. **Site visit counter** — total hits + unique visitors today, stored in Upstash Redis.
2. **GitHub star aggregator** — pulls stargazer counts for a configurable list of repos from the GitHub API, caches them in Redis, and exposes a total.

Designed to run on [Render](https://render.com) free tier.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Liveness check + configured repo list |
| `POST` | `/visit` | Increment visit counter (deduped per IP+UA) |
| `GET` | `/stats` | `{ visits: { total, uniqueToday, since }, stars: { total, repos, fetchedAt } }` |
| `GET` | `/stars/:owner/:repo` | `{ repo, stars, fetchedAt, cached }` for a single repo |

### Example

```bash
curl -X POST https://your-service.onrender.com/visit
# => { "total": 1247, "uniqueToday": 38, "countedAsUnique": true }

curl https://your-service.onrender.com/stats
# => {
#      "visits": { "total": 1247, "uniqueToday": 38, "since": "2026-08-08T..." },
#      "stars":  {
#        "total": 187,
#        "repos": [
#          { "repo": "flodlol/Personal-Site", "stars": 42, "ok": true },
#          ...
#        ],
#        "fetchedAt": "2026-08-08T..."
#      }
#    }
```

## Setup

```bash
cd stats-api
cp .env.example .env
# fill in UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
npm install
npm run dev
```

The service boots on `http://localhost:10000`.

## Deploying to Render

1. Create a free [Upstash](https://upstash.com) Redis database, grab the REST URL + token.
2. Push this repo to GitHub.
3. On Render: **New → Blueprint**, point it at this repo. Render reads `render.yaml` and provisions the service.
4. In the Render dashboard, add the two Upstash env vars (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) as secret env vars. Optionally add a `GITHUB_TOKEN` to raise the rate limit from 60/h to 5000/h.
5. Wait for the first deploy. Hit `https://<your-service>.onrender.com/health` to confirm.

Free-tier services on Render sleep after 15 minutes of inactivity, so the first request after a quiet period will be slow (cold start). The visit counter is unaffected — it lives in Upstash, not the container.

## Calling from the portfolio

From `flodlol.dev` you can fetch `/stats` (read-only) and fire-and-forget `POST /visit` on mount. Example:

```ts
// app/stats.ts (or inline in a client component)
useEffect(() => {
  fetch("https://stats.flodlol.dev/visit", { method: "POST" });
}, []);
```

## Caching

- **Per-repo stars**: cached 1 hour.
- **Aggregate total**: cached 10 minutes.
- **Visit dedup**: a single visitor (hashed `ip + user-agent`) only counts once per `VISIT_DEDUP_SECONDS` (default 30 min).

## Environment variables

See [`.env.example`](./.env.example). Required: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `REPOS`. Everything else has a sensible default.
