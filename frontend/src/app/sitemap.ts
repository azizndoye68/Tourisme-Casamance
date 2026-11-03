import type { MetadataRoute } from 'next';
import content from '@/data/content.json';
import { locales } from '@/lib/i18n';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://visitecasamance.com').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = locales.flatMap((locale) => [
    `/${locale}`,
    `/${locale}/destinations`,
    `/${locale}/activites`,
    `/${locale}/itineraires`,
    `/${locale}/hebergements`,
    ...content.destinations[locale].map((item) => `/${locale}/destinations/${item.slug}`),
    ...content.activites[locale].map((item) => `/${locale}/activites/${item.slug}`),
    ...content.itineraires[locale].map((item) => `/${locale}/itineraires/${item.slug}`),
    ...content.hebergements[locale].map((item) => `/${locale}/hebergements/${item.slug}`),
  ]);

  return pages.map((page) => ({ url: `${siteUrl}${page}` }));
}
