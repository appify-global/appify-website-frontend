/**
 * Sanitize untrusted HTML strings before injecting into the DOM.
 * The article API may return rich HTML (formatting, links, lists). DOMPurify
 * strips scripts, event handlers, and unknown tags while keeping common
 * inline formatting that editors actually use.
 */
import DOMPurify from "isomorphic-dompurify";

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

/**
 * Sanitize an article body HTML fragment. Adds rel="noopener noreferrer" to
 * external links so we don't leak referrer or page handle.
 */
export function sanitizeArticleHtml(input: string | null | undefined): string {
  if (!input) return "";
  const dirty = String(input);
  const clean = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });
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
