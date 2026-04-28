/**
 * Sanitize untrusted HTML strings before injecting into the DOM.
 * The article API may return rich HTML (formatting, links, lists). We strip
 * scripts, handlers, and unknown tags while keeping common inline formatting.
 *
 * Uses `sanitize-html` (no JSDOM) so server prerender/static export does not
 * load browser stylesheets like `default-stylesheet.css` (see isomorphic-dompurify + jsdom).
 */
import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "a",
  "b",
  "strong",
  "i",
  "em",
  "u",
  "br",
  "span",
  "code",
  "mark",
  "small",
  "sub",
  "sup",
  "ul",
  "ol",
  "li",
  "blockquote",
];

const ALLOWED_ATTR = ["href", "title", "target", "rel"];

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    span: [],
    code: [],
    mark: [],
    small: [],
    sub: [],
    sup: [],
    ul: [],
    ol: [],
    li: [],
    blockquote: [],
    b: [],
    strong: [],
    i: [],
    em: [],
    u: [],
    br: [],
  },
  // Block any on* or data-* attributes.
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowProtocolRelative: false,
};

/**
 * Sanitize an article body HTML fragment. Adds rel="noopener noreferrer" to
 * external links so we don't leak referrer or page handle.
 */
export function sanitizeArticleHtml(input: string | null | undefined): string {
  if (!input) return "";
  const dirty = String(input);
  const clean = sanitizeHtml(dirty, SANITIZE_OPTIONS);
  // Force safe link relationships on any anchors that survived sanitization.
  return clean.replace(/<a\s+([^>]*?)>/gi, (match, attrs: string) => {
    const hasHref = /href\s*=/i.test(attrs);
    if (!hasHref) return match;
    let next = attrs;
    if (!/rel\s*=/i.test(next)) next = `${next} rel="noopener noreferrer"`;
    if (!/target\s*=/i.test(next)) next = `${next} target="_blank"`;
    return `<a ${next.trim()}>`;
  });
}
