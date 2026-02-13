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
}

export const newsCategories = [
  "AI",
  "Web",
  "Startups",
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
    date: "21/08/2023",
    slug: "mappas-ai-voice-analysis",
    isFeatured: true,
    content: [
      {
        type: "paragraph",
        text: "In celebration of 75 years of Porsche sports cars, this week (January 13), Porsche Cars GB creates a cinematic digital representation of the inspiration of the first Porsche — the 356 — at Cyclists' in the New Building, Caerns Point, Cymru's Low Road, London from 1845. 1963 the public will be able to experience this unique work of art via an immersive presentation using four story high, 360-degree, 96 high-definition screens.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80",
        alt: "Colorful confetti explosion",
      },
      {
        type: "paragraph",
        text: "Every Porsche can trace its roots to the original vision of the company founder, Ferdinand 'Ferry' Porsche, casting aside the German engineer could not find quite the car he dreamed of, so he decided to build himself. The first car badged as a Porsche, the 356 No 1 Roadster, hit the road on June 8, 1948.",
      },
      {
        type: "paragraph",
        text: "Porsche continues to build on this heritage as a luxury brand driven by dreams, which in turn aims to inspire and enable people to make their own dreams a reality.",
      },
      {
        type: "paragraph",
        text: "Powered by Porsche with Wallpaper* magazine and driven by the noted contemporary artist, Lucien, the original dream of Ferry is imagined as a visual synthesis of the intangible human creative process, beautifully exploring the stages of a dream through surrealism to perceptible existence.",
      },
      {
        type: "heading",
        text: "ICELAND: THE WORLD'S SAFEST COUNTRY FOR SOLO TRAVEL",
      },
      {
        type: "paragraph",
        text: "Iceland consistently ranks as one of the safest countries in the world, making it a top choice for solo female travelers. Violent crime is virtually non-existent, and locals are known for their friendliness and willingness to help. In Reykjavik, you can explore the city's vibrant street cafes, art galleries, and nightlife without feeling unsafe. Venturing outside the city, you'll find thermal hot springs, waterfalls, glaciers, black sand beaches, and the Northern Lights. For added convenience, most tours and excursions offer pickup and drop-off from central locations, making it easy to join activities without needing a vehicle.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        alt: "Architectural rooftop detail",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
        alt: "Winter scene with person",
      },
      {
        type: "paragraph",
        text: "Iceland consistently ranks as one of the safest countries in the world, making it a top choice for solo female travelers. Violent crime is virtually non-existent, and locals are known for their friendliness and willingness to help. In Reykjavik, you can explore the city's vibrant street cafes, art galleries, and nightlife without feeling unsafe. Venturing outside the city, you'll find thermal hot springs, waterfalls, glaciers, black sand beaches, and the Northern Lights. For added convenience, most tours and excursions offer pickup and drop-off from central locations, making it easy to join activities without needing a vehicle.",
      },
    ],
  },
  {
    id: "2",
    category: "STARTUPS",
    title: "Porsche unveils entry into virtual worlds during Art Basel in Miami",
    excerpt: "During Art Basel in Miami, Porsche is launching a brand experience in the digital world and unveiling its first collection of non-fungible tokens (NFT).",
    author: "Marco Ludovico Perego",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    timestamp: "4 HOURS AGO",
    date: "21/08/2023",
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
    date: "21/08/2023",
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
    date: "21/08/2023",
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
    date: "21/08/2023",
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
    date: "21/08/2023",
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
    date: "21/08/2023",
    slug: "ai-labs-mercor-data",
  },
];

export const featuredArticles = newsArticles.filter((article) => article.isFeatured);
export const latestArticles = newsArticles;

