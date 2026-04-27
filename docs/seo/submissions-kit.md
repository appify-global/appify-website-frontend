# SEO Submissions Kit

Five external submissions to make once. All copy is pre-written — paste directly into the corresponding consoles. Total time: ~30–45 minutes.

## 0. Prerequisites — verification env vars

The site already supports verification meta tags via env vars on the Railway frontend service. Set these once after each console asks for verification:

| Env var | Used by |
|---|---|
| `GOOGLE_SITE_VERIFICATION` | Google Search Console |
| `BING_SITE_VERIFICATION` | Bing Webmaster Tools |
| `YANDEX_VERIFICATION` | Yandex Webmaster (optional, low ROI) |

Each console gives a meta tag like `<meta name="google-site-verification" content="abc123" />`. **Set the env var to just the `content` value (no quotes, no tag), redeploy, then click "Verify" in the console.**

DNS verification works too — TXT record with the value Google gives — but env-var meta is faster on Railway.

---

## 1. Google Search Console (10 min)

1. Go to https://search.google.com/search-console/welcome
2. Add property → URL prefix → `https://appify.global`
3. Choose "HTML tag" verification → copy the `content` value
4. Set `GOOGLE_SITE_VERIFICATION` env var on Railway frontend → redeploy
5. Click "Verify"
6. Once verified:
   - **Sitemaps** (left nav) → Add new sitemap → enter `sitemap.xml` → Submit
   - **URL Inspection** → paste these URLs one by one and click "Request Indexing":
     - `https://appify.global/`
     - `https://appify.global/news`
     - `https://appify.global/news/archive`
     - `https://appify.global/topics`
     - `https://appify.global/topics/ai-engineering`
     - `https://appify.global/topics/custom-software`
     - `https://appify.global/topics/digital-transformation`
     - `https://appify.global/locations/melbourne`
     - `https://appify.global/locations/sydney`
     - `https://appify.global/locations/dubai`
     - Top 5 published `/news/{slug}` URLs
7. Bookmark the **Performance** report and check weekly.

---

## 2. Bing Webmaster Tools (5 min)

1. Go to https://www.bing.com/webmasters
2. Sign in (Microsoft / Google / Facebook)
3. Add site → `https://appify.global`
4. Choose "Add a meta tag" → copy the `content` value
5. Set `BING_SITE_VERIFICATION` env var on Railway → redeploy
6. Click "Verify"
7. Once verified:
   - Submit sitemap: `https://appify.global/sitemap.xml`
   - Use **Submit URLs** to push the same priority URL list as Search Console
8. Bing also feeds DuckDuckGo and Yahoo — worth doing.

---

## 3. Google News Publisher Center (10 min)

The site is now eligible for Google News inclusion (NewsArticle JSON-LD shipped, RSS feed live, named author entities exist).

1. Go to https://publishercenter.google.com
2. Add publication → use the values below

### Publication details — copy/paste

| Field | Value |
|---|---|
| **Publication name** | Appify |
| **Primary website URL** | https://appify.global |
| **Publication description** | Insights on AI engineering, custom software development, automation, and digital transformation from the Appify team across Australia, the UAE, and Qatar. |
| **Country** | Australia |
| **Languages** | English |
| **Categories** | Technology, Business |
| **Logo** | use `/public/appify.png` (square version preferred) |

### News content

- **News content URL**: `https://appify.global/news`
- **News sitemap or RSS**: `https://appify.global/news/feed.xml`
- **Sections** to add:
  - AI Engineering — `https://appify.global/topics/ai-engineering`
  - Custom Software — `https://appify.global/topics/custom-software`
  - Digital Transformation — `https://appify.global/topics/digital-transformation`
  - Automation — `https://appify.global/topics/automation`

### Contact

- **Editorial contact email**: hello@appify.global (or a dedicated editorial@ if available)
- **Press contact**: same

Submit for review. Approval typically takes 2–4 weeks.

---

## 4. IndexNow (one-line — pushes future updates instantly)

[IndexNow](https://www.indexnow.org/) pushes URL changes to Bing/Yandex/etc. instantly. Optional but cheap.

To enable: generate a 32-char hex key, expose it at `https://appify.global/{key}.txt` (the file content is the key itself), and POST URLs to `https://www.bing.com/indexnow`. Worth ~10 min if you want fresher indexing on news.

(Skip if you're time-pressed — Search Console/Bing both already do this when sitemaps refresh.)

---

## 5. Schema.org validation (5 min — sanity check, no submission)

Before requesting indexing, verify the structured data on a few pages:

1. Go to https://search.google.com/test/rich-results
2. Paste each URL and confirm:
   - `https://appify.global/` → `Organization` + `WebSite`
   - `https://appify.global/news` → `BreadcrumbList` + `ItemList` + `CollectionPage`
   - `https://appify.global/news/{any-slug}` → `NewsArticle` + `BreadcrumbList`
   - `https://appify.global/team/{any-slug}` → `Person` + `BreadcrumbList`
   - `https://appify.global/locations/melbourne` → `ProfessionalService` + `BreadcrumbList`
   - `https://appify.global/topics/ai-engineering` → `CollectionPage` + `ItemList` + `BreadcrumbList`
3. If anything errors, fix before requesting indexing.

---

## 6. Internal — populate `data/authors.ts` for E-E-A-T

The `/team/{slug}` pages render today, but they're "thin" until each frequent author has a bio populated.

Edit `data/authors.ts` and add an entry per author:

```typescript
{
  name: "Marco Ludovico Perego",
  slug: "marco-ludovico-perego",
  jobTitle: "Founder",
  bio: "Marco founded Appify in 2018 after a decade building enterprise software at... [80–150 words covering experience, focus areas, perspective].",
  imageUrl: "/team/marco.jpg", // place under /public/team/
  sameAs: [
    "https://www.linkedin.com/in/marco-ludovico-perego",
    "https://x.com/marcoludovico",
  ],
},
```

`sameAs` is the magic field — it tells Google "this Appify byline is the same person as this LinkedIn profile". Author entity unification is one of the strongest E-E-A-T signals available.

---

## Acceptance criteria

- [ ] Search Console: domain verified, sitemap submitted, top 10 URLs requested for indexing
- [ ] Bing: domain verified, sitemap submitted
- [ ] Google News Publisher Center: publication submitted for review
- [ ] Rich Results Test: zero errors on the 6 URL types above
- [ ] `data/authors.ts`: bios populated for the top 3 most frequent authors

## What to expect

- **Week 1**: Search Console starts showing impression data
- **Week 2–3**: Bing index populates
- **Week 2–4**: Publisher Center approval
- **Week 4–6**: First sustained ranking improvements visible in Semrush, *if* topical-cluster content has been published in parallel
- **Week 8–12**: Topical clusters with 5+ articles start ranking for cluster keywords

The infrastructure is done. Speed of impact now depends entirely on:
1. How fast the backend gets `metaTitle` / `metaDescription` populated (see `backend-brief.md`)
2. How fast editorial publishes the cluster articles (see `topical-clusters.md`)
