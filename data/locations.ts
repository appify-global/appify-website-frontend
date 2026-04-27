/**
 * City locations Appify operates in. Used to generate `/locations/[city]` pages
 * for local SEO. Add a new entry to launch a new city — the page is generated
 * automatically and the sitemap picks it up on the next revalidation.
 */

export interface CityLocation {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  region?: string;
  /** Time zone identifier — used for LocalBusiness opening-hours hints. */
  timeZone: string;
  /** One-line tagline shown on the city page hero. */
  tagline: string;
  /** Full intro paragraph — write 80–150 words of genuine local context. */
  intro: string;
  /** Optional address fragments for LocalBusiness schema. */
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  /** Approximate geo, used for LocalBusiness schema. */
  geo?: { latitude: number; longitude: number };
  /** Industries we focus on locally — surfaced in the page intro. */
  focusIndustries?: string[];
}

export const locations: CityLocation[] = [
  {
    slug: "melbourne",
    name: "Melbourne",
    country: "Australia",
    countryCode: "AU",
    region: "Victoria",
    timeZone: "Australia/Melbourne",
    tagline: "Custom software & AI engineering in Melbourne",
    intro:
      "Appify's Melbourne office partners with Victorian enterprises, scale-ups, and government bodies on AI engineering, custom software development, and digital transformation. From our base on Bourke Street we deliver mobile apps, ERP integrations, and automation platforms for clients across Australia — combining deep technical expertise with pragmatic strategy.",
    address: {
      streetAddress: "Level 2, 696 Bourke Street",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      postalCode: "3000",
      addressCountry: "AU",
    },
    geo: { latitude: -37.8175, longitude: 144.9645 },
    focusIndustries: ["Financial services", "Healthcare", "Government", "Retail"],
  },
  {
    slug: "sydney",
    name: "Sydney",
    country: "Australia",
    countryCode: "AU",
    region: "New South Wales",
    timeZone: "Australia/Sydney",
    tagline: "AI, ML & custom software development for Sydney businesses",
    intro:
      "Appify works with Sydney enterprises and startups on AI engineering, machine learning platforms, and custom software development. Whether you need to modernise legacy systems, ship a mobile app, or operationalise an LLM-powered product, our team delivers production-ready software for organisations across NSW.",
    address: {
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    geo: { latitude: -33.8688, longitude: 151.2093 },
    focusIndustries: ["Financial services", "Property tech", "Healthcare", "Logistics"],
  },
  {
    slug: "brisbane",
    name: "Brisbane",
    country: "Australia",
    countryCode: "AU",
    region: "Queensland",
    timeZone: "Australia/Brisbane",
    tagline: "Digital transformation partners for Brisbane organisations",
    intro:
      "Appify supports Brisbane and South-East Queensland businesses with custom software development, AI integration, and digital transformation programs. We work with mid-market enterprises and growth-stage companies to design, build, and operate the platforms that keep them competitive.",
    address: {
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
    geo: { latitude: -27.4698, longitude: 153.0251 },
    focusIndustries: ["Resources", "Construction", "Health", "Retail"],
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    timeZone: "Asia/Dubai",
    tagline: "Custom software & AI engineering for Dubai enterprises",
    intro:
      "From rapid MVP delivery to enterprise platform engineering, Appify partners with Dubai businesses across financial services, real estate, hospitality, and government. We bring senior engineering, AI/ML, and product teams to deliver outcomes that match Dubai's pace — and ship in weeks, not quarters.",
    address: {
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    geo: { latitude: 25.2048, longitude: 55.2708 },
    focusIndustries: ["Financial services", "Real estate", "Hospitality", "Government"],
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    country: "United Arab Emirates",
    countryCode: "AE",
    timeZone: "Asia/Dubai",
    tagline: "Enterprise software & AI delivery in Abu Dhabi",
    intro:
      "Appify partners with Abu Dhabi enterprises and government bodies on custom software development, AI engineering, and large-scale digital transformation. Our team has deep experience delivering ERP integrations, secure platforms, and modern mobile experiences across the UAE capital.",
    address: {
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
    geo: { latitude: 24.4539, longitude: 54.3773 },
    focusIndustries: ["Government", "Energy", "Financial services", "Education"],
  },
  {
    slug: "doha",
    name: "Doha",
    country: "Qatar",
    countryCode: "QA",
    timeZone: "Asia/Qatar",
    tagline: "Software engineering & digital transformation in Doha",
    intro:
      "Appify works with Doha-based enterprises, family offices, and government bodies on AI engineering, mobile app development, and platform modernisation. Our delivery teams combine deep technical chops with the cultural fluency needed to ship complex systems for Qatari organisations.",
    address: {
      addressLocality: "Doha",
      addressCountry: "QA",
    },
    geo: { latitude: 25.2854, longitude: 51.5310 },
    focusIndustries: ["Financial services", "Energy", "Government", "Sports & events"],
  },
];

export function getLocationBySlug(slug: string): CityLocation | undefined {
  return locations.find((l) => l.slug === slug);
}
