/**
 * Renders a JSON-LD script tag for structured data (schema.org).
 * Invisible to users; consumed by search engines only.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(Array.isArray(data) ? data : data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
