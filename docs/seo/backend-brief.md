# Backend SEO Brief — News API

This is a brief for whoever owns the news backend (the Railway service serving `/api/news`). Two changes are blocking SEO performance on the frontend.

## 1. Populate per-article SEO fields on every published article

The frontend already reads these fields from the API and falls back smartly when they're missing — but human-written meta beats generated meta every time, especially for AI-search citations and CTR from Google SERPs.

### Fields to populate

| Field | Required? | Length | Purpose |
|---|---|---|---|
| `metaTitle` | Recommended | ≤ 60 chars | Overrides `<title>` in SERP. If empty, falls back to `title`. |
| `metaDescription` | Recommended | ≤ 155 chars | The SERP snippet. Falls back to first paragraph, then `excerpt`. |
| `updatedAt` | Required when an article is edited | ISO 8601 | Drives `dateModified` in NewsArticle JSON-LD + sitemap freshness. |
| `author` | Required | string | Drives the byline + `/team/{slug}` author entity page. Use a stable real name, not "Editorial Team". |
| `excerpt` | Required | 100–250 chars | Used as a fallback meta description and in cards. |

### Example payload (added/changed fields in **bold**)

```json
{
  "id": "art_01HK...",
  "slug": "mappas-ai-voice-analysis",
  "title": "Mappa's AI voice analysis helps you find the best job candidates...",
  "category": "AI",
  "topics": "AI",
  "author": "Marco Ludovico Perego",
  "excerpt": "How Mappa's voice-analysis pipeline ranks candidates by competency rather than résumé keywords.",
  "imageUrl": "https://...",
  "date": "2026-04-21",
  "updatedAt": "2026-04-22T09:30:00Z",
  "metaTitle": "Mappa's AI Voice Analysis: How Competency Beats Résumé Keywords",
  "metaDescription": "Inside Mappa's voice-analysis pipeline — ranking candidates by competency signals rather than keyword matching. Insights for hiring teams.",
  "content": [...]
}
```

### Validation rule (soft)

When publishing, log a warning (don't block) if any of these are empty for non-fixture articles. Add an admin column showing which articles are missing meta so the editorial team can backfill.

## 2. Deduplicate articles before insert

The static fixtures shipped three identical "Porsche unveils entry into virtual worlds during Art Basel in Miami" articles with three different slugs. If the live RSS-driven generator does the same (which the duplicated test data suggests), Google's deduplication filter is collapsing entire ranking signals across three URLs.

### Recommended dedup logic at insert time

```typescript
// pseudo-code at the article generation/insert path
function shouldInsert(candidate: Article): boolean {
  // 1) Exact match on canonical title (case + whitespace normalised)
  const canonicalTitle = candidate.title
    .toLowerCase()
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim();
  const titleHash = sha1(canonicalTitle);
  if (await articleExistsByTitleHash(titleHash)) return false;

  // 2) Source-URL match — same RSS link should not produce two articles
  if (candidate.sourceUrl && await articleExistsBySourceUrl(candidate.sourceUrl)) {
    return false;
  }

  // 3) Near-duplicate body — articles with >90% body overlap merge into one
  //    (use trigram or simhash; cheap with PostgreSQL pg_trgm).
  if (await nearDuplicateBodyExists(candidate.body, 0.9)) return false;

  return true;
}
```

### Schema additions

Add the following indexed columns if not present:
- `title_hash` — `varchar(40)`, indexed, populated at insert
- `source_url` — already exists if pulled from RSS; if not, add and index
- (Optional) `body_simhash` — for cheap near-duplicate detection

### Backfill

Run a one-off migration that:
1. Computes `title_hash` for every existing article
2. Identifies groups with the same `title_hash`
3. Keeps the earliest `created_at` and 301-redirects the others
   (or marks them `status = "merged"`)

The frontend handles 404s on stale slugs gracefully — but better is a 301 from the dead slug to the canonical one, so any external links and indexed URLs preserve their PageRank.

## 3. Bonus — add a `topics` array (not just a single category)

The frontend `data/topics.ts` registry expects to match articles into multiple topical clusters. Currently `category` is a single string ("AI"). If the backend can publish a `topics: string[]` field as well, articles can surface on multiple topic pages (e.g. `/topics/ai-engineering` + `/topics/automation`).

This is a nice-to-have, not a blocker — the current single-category model already works.

## Frontend-side context (for reference)

- The frontend uses these fields here:
  - `lib/seo.ts` — fallback title/description builders
  - `app/news/[slug]/layout.tsx` — NewsArticle JSON-LD schema
  - `app/sitemap.ts` — `lastmod` from `updatedAt`
  - `app/news/feed.xml/route.ts` — RSS `pubDate` from `updatedAt`
- ISR revalidation interval is 1 hour, so backfilled meta will appear within an hour of publish.

## Acceptance criteria

- [ ] Every new article has non-empty `metaTitle`, `metaDescription`, `updatedAt`
- [ ] Editing an article updates `updatedAt`
- [ ] Insert path rejects exact-title duplicates and same-source-URL duplicates
- [ ] Backfill complete: zero `title_hash` collisions in published articles
