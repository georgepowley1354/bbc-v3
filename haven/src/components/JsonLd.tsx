// JSON-LD structured data component.
// dangerouslySetInnerHTML is safe here: `data` is always a developer-defined
// schema object (never user input), so there is no XSS risk.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
