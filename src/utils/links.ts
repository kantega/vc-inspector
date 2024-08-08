export const Links = {
  GITHUB_LINK: 'https://github.com/kantega/vc-inspector',
} as const;

export type LinksKey = keyof typeof Links;

export type Link = (typeof Links)[LinksKey];
