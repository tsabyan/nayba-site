/**
 * Serialise a JSON-LD node for embedding in a `<script>` element.
 *
 * A JSON string is allowed to contain the characters that end a script
 * element, and if one ever did — a stray `</script>` in an env var, a case
 * study title, a service FAQ — the rest of the document would be parsed as
 * markup. Escaping the three characters that can start a tag or a comment
 * costs nothing and removes the class of bug.
 *
 * Most values reaching here come from our own content, so for those this is
 * defence in depth. The MDX frontmatter is the exception: it is the one input
 * that gets edited without touching a component.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
