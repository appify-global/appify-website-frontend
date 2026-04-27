/**
 * Author bios for E-E-A-T (Experience, Expertise, Authoritativeness, Trust) signals.
 * Populate this file with real bios for authors that publish frequently — Google
 * weights author entity pages heavily for content ranking and AI search citations.
 *
 * Authors not listed here still get an auto-generated page (slug from name) so
 * bylines remain crawlable, but the page will only contain article listings
 * without bio/sameAs signals. Add an entry to upgrade an author from "thin" to
 * "rich" entity status.
 */

export interface AuthorBio {
  name: string;
  slug: string;
  jobTitle?: string;
  /** Short paragraph rendered on the author page and used in Person schema. */
  bio?: string;
  /** Headshot path under /public, or absolute URL. */
  imageUrl?: string;
  /** External profile URLs — emit as schema.org `sameAs` for entity linking. */
  sameAs?: string[];
}

export const authorBios: AuthorBio[] = [
  {
    name: "Appify",
    slug: "appify",
    jobTitle: "Editorial Team",
    bio: "The Appify editorial team covers AI engineering, custom software development, automation, and digital transformation across Australia, the UAE, and Qatar.",
    imageUrl: "/appify.png",
    sameAs: ["https://www.linkedin.com/company/appify-global"],
  },
];

const bySlug = new Map(authorBios.map((a) => [a.slug, a]));
const byName = new Map(authorBios.map((a) => [a.name.toLowerCase(), a]));

export function slugifyAuthor(name: string): string {
  return (name || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "anonymous";
}

export function getAuthorBio(nameOrSlug: string): AuthorBio | undefined {
  if (!nameOrSlug) return undefined;
  const lower = nameOrSlug.toLowerCase();
  return bySlug.get(lower) ?? byName.get(lower);
}
