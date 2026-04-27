/**
 * Topic clusters for SEO. Each topic gets its own landing page at
 * /topics/[slug] that aggregates articles tagged with the topic and ranks for
 * the listed primary/secondary keywords.
 *
 * Adding a new topic:
 *   1. Add an entry below with `intro` of 100+ words (avoid thin content).
 *   2. Brief writers to publish 5–10 articles tagged with `matchCategories`.
 *   3. The page is generated automatically and the sitemap picks it up on
 *      next revalidation.
 */

export interface Topic {
  slug: string;
  name: string;
  /** SERP-ready meta title — under 60 chars. */
  metaTitle: string;
  /** SERP-ready meta description — under 155 chars. */
  metaDescription: string;
  /** 100+ words of unique intro copy. Renders as the H1 + lead paragraph. */
  tagline: string;
  intro: string;
  /** Primary keyword phrases this page should rank for. */
  primaryKeywords: string[];
  /** Article categories (case-insensitive) that belong to this topic. */
  matchCategories: string[];
  /** Free-form term match for additional surfacing in the topic page. */
  matchTerms?: string[];
}

export const topics: Topic[] = [
  {
    slug: "ai-engineering",
    name: "AI Engineering",
    metaTitle: "AI Engineering — News, Insights & Case Studies | Appify",
    metaDescription:
      "Practical AI engineering coverage: LLM systems, retrieval, evaluation, and production ML. Insights from the Appify team across Australia, UAE, and Qatar.",
    tagline: "AI engineering, in production",
    intro:
      "AI engineering is what happens after the demo. It's the work of taking a model that looked impressive in a notebook and turning it into a system that's reliable, observable, and economically sustainable in production. Our coverage focuses on the parts of AI that vendors gloss over: retrieval pipelines that don't hallucinate, evaluation harnesses that catch regressions before users do, prompt and tool-use patterns that survive model updates, and the boring-but-critical engineering around cost, latency, and safety. We write about real systems we've shipped for clients across Australia, the UAE, and Qatar — what worked, what we'd build differently, and what the hype cycle gets wrong.",
    primaryKeywords: [
      "AI engineering",
      "LLM applications",
      "production AI",
      "AI evaluation",
      "retrieval augmented generation",
    ],
    matchCategories: ["AI"],
    matchTerms: ["LLM", "machine learning", "ML", "GPT", "Claude", "RAG"],
  },
  {
    slug: "custom-software",
    name: "Custom Software Development",
    metaTitle: "Custom Software Development News & Insights | Appify",
    metaDescription:
      "How modern custom software gets built: architecture, delivery, and the trade-offs that decide whether a product ships. Insights from Appify's engineers.",
    tagline: "Custom software, built to last",
    intro:
      "Custom software is rarely about technology — it's about decisions made under pressure, with incomplete information, against a deadline. Our writing on custom software development covers the decisions that actually shape outcomes: when to buy versus build, how to scope a delivery so it survives contact with reality, which architectural bets pay off, and how teams maintain velocity past the initial release. We draw on years of building enterprise platforms, ERP integrations, and consumer applications to share the patterns we use ourselves — and the anti-patterns we've learned to avoid. Whether you're commissioning your first custom platform or modernising a legacy system, this is engineering writing for people who have to make it work.",
    primaryKeywords: [
      "custom software development",
      "software architecture",
      "enterprise software",
      "software delivery",
      "legacy modernisation",
    ],
    matchCategories: ["Web", "Startups"],
    matchTerms: ["software", "architecture", "platform"],
  },
  {
    slug: "automation",
    name: "Automation",
    metaTitle: "Business Automation News & Engineering Insights | Appify",
    metaDescription:
      "Process automation, workflow engines, and AI-augmented operations — practical coverage of where automation actually moves the needle for businesses.",
    tagline: "Automation that earns its keep",
    intro:
      "Automation is one of the most over-pitched and under-delivered categories in enterprise software. Most automation projects either solve the wrong problem or solve a small problem expensively. Our coverage focuses on automation that earns its keep: workflow engines that scale, integration patterns that don't fall over when an API changes, AI-augmented operations that reduce headcount in functions where headcount actually was the bottleneck, and the unglamorous data plumbing that makes any of it possible. We write for operators and engineers who have to choose tools, justify spend, and live with the consequences for years.",
    primaryKeywords: [
      "business process automation",
      "workflow automation",
      "AI automation",
      "RPA",
      "integration",
    ],
    matchCategories: ["Automation"],
    matchTerms: ["automation", "workflow", "RPA", "integration"],
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    metaTitle: "Digital Transformation News & Strategy | Appify",
    metaDescription:
      "Digital transformation coverage from teams that ship the work — strategy, architecture, change management, and the patterns that separate success from theatre.",
    tagline: "Digital transformation, without the theatre",
    intro:
      "Digital transformation is the most over-funded category in enterprise IT and the most poorly defined. Our writing strips the term back to what it actually means in practice: replatforming, rationalising, and re-skilling so a business can move at the pace its market demands. We cover the strategic decisions (which capabilities to insource, what to retire, where AI changes the operating model), the architectural decisions (composable systems, event-driven patterns, data foundations), and the change-management decisions (how teams adopt new ways of working). Drawn from programs we've delivered across Australia, the UAE, and Qatar — written for executives and engineering leaders who have to make these decisions, not consultants who only have to recommend them.",
    primaryKeywords: [
      "digital transformation",
      "enterprise modernisation",
      "technology strategy",
      "operating model",
      "platform engineering",
    ],
    matchCategories: ["Strategy", "Startups"],
    matchTerms: ["transformation", "modernisation", "strategy"],
  },
  {
    slug: "mobile-apps",
    name: "Mobile App Development",
    metaTitle: "Mobile App Development News & Engineering | Appify",
    metaDescription:
      "Mobile development insights from teams shipping iOS, Android, and cross-platform apps in production — performance, architecture, and product engineering.",
    tagline: "Mobile apps, engineered for the long haul",
    intro:
      "Shipping a great mobile app is harder than it should be. The platforms move quickly, the user expectations are high, and most projects underestimate the gap between a working prototype and a maintainable production app. Our mobile coverage focuses on the decisions that determine long-term cost and quality: native versus cross-platform, architecture patterns that survive feature growth, performance optimisation that users actually feel, offline-first patterns for unreliable networks, and the testing strategies that catch regressions before App Store reviewers do. We share what we've learned shipping iOS and Android products for startups and enterprises across Australia, the UAE, and Qatar.",
    primaryKeywords: [
      "mobile app development",
      "iOS development",
      "Android development",
      "React Native",
      "Flutter",
    ],
    matchCategories: ["Web"],
    matchTerms: ["mobile", "iOS", "Android", "React Native", "Flutter", "app"],
  },
  {
    slug: "design",
    name: "Product Design",
    metaTitle: "Product Design News & Engineering Insights | Appify",
    metaDescription:
      "Product design coverage from teams who ship — interaction patterns, design systems, and the engineering–design boundary that decides whether products feel good.",
    tagline: "Product design, where it meets engineering",
    intro:
      "Product design lives or dies at the boundary with engineering. Our coverage focuses on what makes that boundary work: interaction patterns that scale across teams, design systems that engineers actually adopt, prototyping workflows that reduce hand-off friction, and the smaller-than-you'd-think decisions about typography, motion, and information density that compound into how a product feels to use. We write for designers and engineers who collaborate every day and who care about shipping products that respect their users' time and attention.",
    primaryKeywords: [
      "product design",
      "design systems",
      "UX engineering",
      "interaction design",
    ],
    matchCategories: ["Design"],
    matchTerms: ["design", "UX", "UI"],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

/**
 * Match an article to topics. An article belongs to a topic if its category
 * is in the topic's `matchCategories` or its title/excerpt contains any of
 * the topic's `matchTerms`.
 */
export function matchArticleToTopic(
  topic: Topic,
  article: { category?: string; topics?: string; title?: string; excerpt?: string },
): boolean {
  const cats = (article.category || article.topics || "")
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);
  const matchCats = topic.matchCategories.map((c) => c.toLowerCase());
  if (cats.some((c) => matchCats.includes(c))) return true;
  if (topic.matchTerms && topic.matchTerms.length > 0) {
    const haystack = `${article.title || ""} ${article.excerpt || ""}`.toLowerCase();
    if (topic.matchTerms.some((t) => haystack.includes(t.toLowerCase()))) return true;
  }
  return false;
}
