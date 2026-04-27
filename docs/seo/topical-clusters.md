# Topical Cluster Plan — Editorial Brief

The site infrastructure now supports topical clustering: per-topic landing pages, related-articles linking, RSS, author entities, and structured data. The remaining lever is **content** — Google ranks topical authority, and topical authority comes from clusters of 5–10 well-linked articles per theme, not isolated articles.

This doc proposes 5 clusters, in priority order, with concrete article briefs.

## How clusters work

For each cluster:
1. The **landing page** at `/topics/{slug}` already exists with hand-written intro copy.
2. Editorial publishes **5–10 articles** with the matching category. The landing page surfaces them automatically.
3. Each article links to **2–3 sibling articles** in the same cluster (using normal `<a>` links inside the body, not just the auto-generated related block).
4. Each article links **once** to the cluster landing page (e.g. "More on [AI engineering](/topics/ai-engineering)").
5. Articles tagged `category = "AI"` already auto-surface on `/topics/ai-engineering`.

When a cluster has 5+ published articles, the landing page becomes a real ranking surface for the cluster keywords. Below 5 articles, it's a placeholder.

---

## Cluster 1 — AI Engineering (priority: highest)

- **Landing page**: https://appify.global/topics/ai-engineering
- **Primary keywords**: "AI engineering", "LLM applications", "production AI", "RAG", "AI evaluation"
- **Article category to use**: `AI`

### Article briefs

| # | Working title | Target keyword | Length |
|---|---|---|---|
| 1 | Why most LLM demos break in production | "LLM production" | 1500 words |
| 2 | Building a RAG pipeline that doesn't hallucinate | "retrieval augmented generation" | 2000 words |
| 3 | A practical evaluation harness for LLM applications | "LLM evaluation" | 1800 words |
| 4 | Cost engineering for AI products | "LLM cost optimisation" | 1500 words |
| 5 | When to fine-tune vs. prompt engineer vs. retrieve | "fine-tuning vs prompting" | 1800 words |
| 6 | The tools that actually scale: prompt versioning, observability, regression testing | "LLM observability" | 1500 words |
| 7 | Case study: AI for [client industry] in Australia | "AI engineering Australia" | 1200 words |

### Internal linking rule

- Each article must link to 2 others in this list, plus the landing page.
- Articles should also link to relevant `/services/intelligence/*` pages where contextually fitting.

---

## Cluster 2 — Custom Software Development (priority: high)

- **Landing page**: https://appify.global/topics/custom-software
- **Primary keywords**: "custom software development", "software architecture", "enterprise software"
- **Article category to use**: `Web` or `Startups`

### Article briefs

| # | Working title | Target keyword | Length |
|---|---|---|---|
| 1 | Buy vs build: a decision framework for enterprise software | "buy vs build software" | 1800 words |
| 2 | The architecture decisions that age well | "software architecture" | 1500 words |
| 3 | How to scope a custom software delivery so it survives reality | "software delivery" | 1500 words |
| 4 | Modernising legacy systems without freezing the business | "legacy modernisation" | 2000 words |
| 5 | Why your custom software vendor should obsess over telemetry | "production telemetry" | 1200 words |
| 6 | Case study: [client name] custom platform | "custom software [client industry]" | 1200 words |

---

## Cluster 3 — Digital Transformation (priority: high — pairs with consultancy positioning)

- **Landing page**: https://appify.global/topics/digital-transformation
- **Primary keywords**: "digital transformation", "enterprise modernisation", "platform engineering"
- **Article category to use**: `Strategy` or `Startups`

### Article briefs

| # | Working title | Target keyword | Length |
|---|---|---|---|
| 1 | Digital transformation, without the consulting theatre | "digital transformation strategy" | 2000 words |
| 2 | The five most expensive mistakes in transformation programs | "digital transformation mistakes" | 1500 words |
| 3 | Composable architecture: when it pays off and when it doesn't | "composable architecture" | 1800 words |
| 4 | A pragmatic guide to data foundations | "data foundation strategy" | 2000 words |
| 5 | Change management for engineering-led transformation | "change management transformation" | 1500 words |
| 6 | Case study: transforming [client] in 18 months | "digital transformation case study" | 1500 words |

---

## Cluster 4 — Mobile App Development (priority: medium)

- **Landing page**: https://appify.global/topics/mobile-apps
- **Primary keywords**: "mobile app development", "iOS development", "React Native"
- **Article category to use**: `Web`

### Article briefs

| # | Working title | Target keyword | Length |
|---|---|---|---|
| 1 | Native vs cross-platform: a 2026 decision matrix | "native vs cross platform" | 1800 words |
| 2 | The performance budget every mobile team should set | "mobile app performance" | 1200 words |
| 3 | Offline-first patterns for unreliable networks | "offline first mobile" | 1500 words |
| 4 | Mobile app testing strategies that catch real regressions | "mobile app testing" | 1500 words |
| 5 | Case study: [client] mobile app | "mobile app case study" | 1200 words |

---

## Cluster 5 — Automation (priority: medium)

- **Landing page**: https://appify.global/topics/automation
- **Primary keywords**: "business process automation", "workflow automation", "AI automation"
- **Article category to use**: `Automation`

### Article briefs

| # | Working title | Target keyword | Length |
|---|---|---|---|
| 1 | Automation that earns its keep — and the kind that doesn't | "business automation ROI" | 1500 words |
| 2 | When RPA is the wrong answer | "RPA alternatives" | 1200 words |
| 3 | Workflow engines: a buyer's guide for 2026 | "workflow engine comparison" | 2000 words |
| 4 | AI-augmented operations: where it works | "AI automation use cases" | 1500 words |
| 5 | Integration patterns that don't fall over | "integration patterns" | 1800 words |

---

## Production guidelines for every article

1. **Title** under 60 chars where possible — fits in SERP without truncation.
2. **First paragraph** answers the search intent in 2–3 sentences. Don't bury it.
3. **2–3 H2s minimum** — hierarchical headings let Google extract featured snippets.
4. **Internal links** as outlined in cluster rules.
5. **Author byline** uses a real person's name (not "Editorial Team") — drives the `/team/{slug}` author entity.
6. **Hero image** with descriptive alt (alt is the article title by default; override with editor copy when possible).
7. **Outbound links** to authoritative sources (Google sees these as quality signals when relevant).
8. **`metaTitle` + `metaDescription`** filled by the editor before publish (see `backend-brief.md`).

## Cadence target

- 1 article per cluster per week × 5 clusters = 5 articles/week
- After 8 weeks: 40 articles, 5 fully populated clusters, real topical authority signals
- Realistic SEO impact window: 8–12 weeks after the last article in a cluster lands

## How we'll measure

- Search Console: track impressions and clicks for the primary keyword set per cluster
- Semrush: re-check organic keyword count and authority score monthly
- Internal: each cluster landing page should appear in Search Console's "Pages" report with non-zero impressions within 30 days of having 5+ articles
