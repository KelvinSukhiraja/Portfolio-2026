export function hasExternalProjectLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function externalLinkProps(href: string) {
  return {
    href,
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}
