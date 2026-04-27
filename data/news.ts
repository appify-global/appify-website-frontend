export interface ArticleContentBlock {
  type: "paragraph" | "heading" | "subheading" | "image";
  text?: string;
  src?: string;
  alt?: string;
}

export interface NewsArticle {
  id: string;
  category: string;
  topics?: string; // Support both category and topics for API compatibility
  title: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  timestamp: string;
  date: string;
  slug: string;
  isFeatured?: boolean;
  content?: ArticleContentBlock[];
  metaTitle?: string;
  metaDescription?: string;
  status?: string;
  updatedAt?: string;
}

export const newsCategories = [
  "AI",
  "Automation",
  "Design",
  "Startups",
  "Web",
  "Web3",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

/**
 * Static fallback used only when the backend API is unreachable.
 * Kept intentionally minimal so duplicate fixture content cannot leak into
 * search engines and dilute topical authority for real articles.
 */
export const newsArticles: NewsArticle[] = [
  {
    id: "fallback-1",
    category: "AI",
    title: "Appify newsroom",
    excerpt:
      "We are loading the latest insights on AI, custom software development, and digital transformation. Please refresh in a moment.",
    author: "Appify",
    imageUrl: "/appify.png",
    timestamp: "",
    date: "",
    slug: "appify-newsroom",
    isFeatured: true,
  },
];

export const featuredArticles = newsArticles.filter((article) => article.isFeatured);
export const latestArticles = newsArticles;
