import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, locale: string = 'fr-FR'): string {
  return new Intl.NumberFormat(locale).format(num);
}

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '/images/placeholder.svg';
  if (path.startsWith('http') || path.startsWith('/')) return path;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${path}`;
}

export function constructMetadata(title: string, description: string) {
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}