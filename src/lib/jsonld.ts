/**
 * Shared JSON-LD identifiers and node builders. Entity @ids connect the
 * WebSite / Person / BlogPosting / BreadcrumbList graph instead of
 * duplicating entities across pages.
 */
import { SITE } from '../config/site';

export const PERSON_ID = `${SITE.url}/about/#person`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export interface Crumb {
  label: string;
  href: string;
}

export function breadcrumbList(crumbs: readonly Crumb[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: new URL(crumb.href, SITE.url).href,
    })),
  };
}

export function blogPosting(post: {
  path: string;
  title: string;
  description: string;
  datePublished: Date;
  dateModified: Date;
  imageUrl: string;
}): Record<string, unknown> {
  const url = new URL(post.path, SITE.url).href;
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    datePublished: post.datePublished.toISOString(),
    dateModified: post.dateModified.toISOString(),
    image: post.imageUrl,
    inLanguage: 'en-GB',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}
