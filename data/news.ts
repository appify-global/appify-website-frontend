export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  timestamp: string;
  slug: string;
  isFeatured?: boolean;
}

export const newsCategories = [
  "AI",
  "Automation",
  "Web",
  "Startups",
  "Defi",
  "Web3",
  "Work",
  "Design",
  "Culture",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    category: "AI",
    title: "Mappa's AI voice analysis helps you find the best job candidates and will show off its tech at TechCrunch Disrupt 2025",
    excerpt: "During Art Basel in Miami, Porsche is launching a brand experience in the digital world and unveiling its first collection of non-fungible tokens (NFT).",
    author: "Marco Ludovico Perego",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    timestamp: "4 HOURS AGO",
    slug: "mappas-ai-voice-analysis",
    isFeatured: true,
  },
  {
    id: "2",
    category: "STARTUPS",
    title: "Porsche unveils entry into virtual worlds during Art Basel in Miami",
    excerpt: "During Art Basel in Miami, Porsche is launching a brand experience in the digital world and unveiling its first collection of non-fungible tokens (NFT).",
    author: "Marco Ludovico Perego",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    timestamp: "4 HOURS AGO",
    slug: "porsche-virtual-worlds",
    isFeatured: true,
  },
  {
    id: "3",
    category: "STARTUPS",
    title: "Porsche unveils entry into virtual worlds during Art Basel in Miami",
    excerpt: "During Art Basel in Miami, Porsche is launching a brand experience in the digital world and unveiling its first collection of non-fungible tokens (NFT).",
    author: "Marco Ludovico Perego",
    imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    timestamp: "4 HOURS AGO",
    slug: "porsche-art-basel-miami",
    isFeatured: true,
  },
  {
    id: "4",
    category: "STARTUPS",
    title: "Porsche unveils entry into virtual worlds during Art Basel in Miami",
    excerpt: "During Art Basel in Miami, Porsche is launching a brand experience in the digital world and unveiling its first collection of non-fungible tokens (NFT).",
    author: "Marco Ludovico Perego",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
    timestamp: "4 HOURS AGO",
    slug: "porsche-virtual-worlds-2",
  },
  {
    id: "5",
    category: "STARTUPS",
    title: "And the winner of Startup Battlefield at Disrupt 2025 is: Glīd",
    excerpt: "During Art Basel in Miami, Porsche is launching a brand experience in the digital world and unveiling its first collection of non-fungible tokens (NFT).",
    author: "Marco Ludovico Perego",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
    timestamp: "4 HOURS AGO",
    slug: "startup-battlefield-winner",
  },
  {
    id: "6",
    category: "AI",
    title: "Mappa's AI voice analysis helps you find the best job candidates and will show off its tech at TechCrunch Disrupt 2025",
    excerpt: "During Art Basel in Miami, Porsche is launching a brand experience in the digital world and unveiling its first collection of non-fungible tokens (NFT).",
    author: "Marco Ludovico Perego",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    timestamp: "4 HOURS AGO",
    slug: "mappas-ai-voice-analysis-2",
  },
  {
    id: "7",
    category: "AI",
    title: "How AI labs use Mercor to get the data companies won't share",
    excerpt: "During Art Basel in Miami, Porsche is launching a brand experience in the digital world and unveiling its first collection of non-fungible tokens (NFT).",
    author: "Marco Ludovico Perego",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    timestamp: "4 HOURS AGO",
    slug: "ai-labs-mercor-data",
  },
];

export const featuredArticles = newsArticles.filter((article) => article.isFeatured);
export const latestArticles = newsArticles;

