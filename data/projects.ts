export interface Project {
  slug: string;
  title: string;
  metadata: string[];
  imageUrl: string;
  linkUrl: string;
  description: string;
  client?: string;
  year?: string;
  services?: string[];
  challenge?: string;
  solution?: string;
  galleryImages?: string[];
  recognitions?: string[];
  launchUrl?: string;
}

export const projectsData: Project[] = [
  {
    slug: "booked-ai",
    title: "Booked AI",
    metadata: ["AI DEVELOPMENT", "UI/UX DESIGN", "APP DEVELOPMENT", "TRAVEL"],
    imageUrl: "/projects/booked-ai.png",
    linkUrl: "/projects/booked-ai",
    description: "Expanding Boundaries through Cinematic Innovation. An R&D feat by Lusion, this project showcases team versatility and artistry. We crafted 3D assets from scratch and seamlessly blended hand-drawn sketches into a captivating WebGL environment for a unique experience.",
    client: "Booked AI",
    year: "2024",
    services: ["Concept", "Web Design", "Web Development", "3D Design", "WebGL"],
    challenge: "Crafting My Little Storybook's Triumph. The Lusion team meticulously shaped every element in this challenging one-month project. Their dedication resulted in acclaim, with multiple awards, including the coveted 2022 Webby Award for Best Visual Design Aesthetic, recognizing the blend of innovation and creativity.",
    solution: "We developed a sophisticated AI engine that learns user preferences and behaviors to deliver hyper-personalized travel suggestions, combined with a beautiful, intuitive interface.",
    galleryImages: [
      "/projects/booked-ai.png",
      "/projects/booked-ai.png",
      "/projects/booked-ai.png",
      "/projects/booked-ai.png"
    ],
    recognitions: ["FWA SOTD", "Awwwards SOTD", "Webby Winner"],
    launchUrl: "https://bookedai.com"
  },
  {
    slug: "lifecard",
    title: "LifeCard",
    metadata: ["APP DEVELOPMENT", "UI/UX DESIGN", "HEALTHTECH", "DIGITAL TRANSFORMATION"],
    imageUrl: "/projects/life-card.png",
    linkUrl: "/projects/lifecard",
    description: "A comprehensive healthtech solution that empowers users to manage their medical information and healthcare journey in one secure, accessible platform.",
    client: "LifeCard Health",
    year: "2024",
    services: ["App Development", "UI/UX Design", "Healthcare Integration", "Security Architecture"],
    challenge: "Building a secure, HIPAA-compliant platform that makes complex medical information accessible and manageable for everyday users.",
    solution: "We created a user-centric mobile application with enterprise-grade security, intuitive data visualization, and seamless integration with healthcare providers.",
    galleryImages: [
      "/projects/life-card.png",
      "/projects/life-card.png",
      "/projects/life-card.png"
    ],
    recognitions: ["Awwwards SOTD"],
    launchUrl: "https://lifecard.com"
  },
  {
    slug: "prelo",
    title: "Prelo",
    metadata: ["MVP DEVELOPMENT", "UI/UX DESIGN", "ARCHITECTURE DESIGN", "APP DEVELOPMENT"],
    imageUrl: "/projects/prelo.png",
    linkUrl: "/projects/prelo",
    description: "A revolutionary MVP platform designed to help startups validate ideas and launch products faster with a robust, scalable foundation.",
    client: "Prelo Technologies",
    year: "2024",
    services: ["MVP Development", "UI/UX Design", "Architecture Design", "Technical Consulting"],
    challenge: "Delivering a full-featured MVP within tight timelines while ensuring the architecture could scale with the company's growth.",
    solution: "We implemented an agile development process with modular architecture, allowing rapid iteration while maintaining code quality and scalability.",
    galleryImages: [
      "/projects/prelo.png",
      "/projects/prelo.png",
      "/projects/prelo.png"
    ],
    launchUrl: "https://prelo.io"
  },
  {
    slug: "endota",
    title: "Endota",
    metadata: ["CASE STUDY", "UI/UX DESIGN", "ARCHITECTURE DESIGN", "DIGITAL TRANSFORMATION"],
    imageUrl: "/projects/entoda.png",
    linkUrl: "/projects/endota",
    description: "A complete digital transformation for Australia's leading wellness brand, modernizing their digital presence and customer experience.",
    client: "Endota Spa",
    year: "2023",
    services: ["Digital Strategy", "UI/UX Design", "Architecture Design", "E-commerce Development"],
    challenge: "Transforming a traditional spa and wellness brand into a digital-first company while preserving the essence of their premium brand experience.",
    solution: "We designed and implemented a comprehensive digital ecosystem that seamlessly blends online and offline experiences, driving engagement and revenue growth.",
    galleryImages: [
      "/projects/entoda.png",
      "/projects/entoda.png",
      "/projects/entoda.png"
    ],
    launchUrl: "https://endotaspa.com.au"
  },
  {
    slug: "guardian-childcare",
    title: "Guardian Childcare & Education",
    metadata: ["UI/UX DESIGN", "ARCHITECTURE DESIGN", "SOFTWARE DEVELOPMENT"],
    imageUrl: "/projects/guardian.png",
    linkUrl: "/projects/guardian-childcare",
    description: "A comprehensive software solution for one of Australia's largest childcare providers, streamlining operations and enhancing parent communication.",
    client: "Guardian Childcare & Education",
    year: "2023",
    services: ["UI/UX Design", "Architecture Design", "Software Development", "System Integration"],
    challenge: "Creating a unified platform that serves the complex needs of childcare centers, educators, and parents while ensuring data security and compliance.",
    solution: "We built an integrated platform that simplifies daily operations, enhances communication between educators and families, and provides valuable insights through analytics.",
    galleryImages: [
      "/projects/guardian.png",
      "/projects/guardian.png"
    ],
    launchUrl: "https://guardian.edu.au"
  },
  {
    slug: "construction-supply",
    title: "Construction Supply Specialists",
    metadata: ["CASE STUDY", "UI/UX DESIGN", "ARCHITECTURE DESIGN", "DIGITAL TRANSFORMATION"],
    imageUrl: "/projects/construction.png",
    linkUrl: "/projects/construction-supply",
    description: "Digital transformation of a leading construction supply company, modernizing their B2B operations and customer experience.",
    client: "Construction Supply Specialists",
    year: "2023",
    services: ["Digital Transformation", "UI/UX Design", "Architecture Design", "E-commerce Development"],
    challenge: "Modernizing a traditional B2B construction supply business with complex inventory, pricing, and customer relationship requirements.",
    solution: "We delivered a comprehensive digital platform that streamlines ordering, provides real-time inventory visibility, and enhances customer relationships through personalized experiences.",
    galleryImages: [
      "/projects/construction.png",
      "/projects/construction.png"
    ],
    launchUrl: "https://constructionsupply.com"
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(project => project.slug === slug);
}
