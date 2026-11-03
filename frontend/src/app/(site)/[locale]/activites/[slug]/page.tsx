import { getActiviteBySlug } from '@/lib/content';
import { getMessages } from '@/lib/messages';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ActiviteDetailClient from './ActiviteDetailClient';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const activite = await getActiviteBySlug(slug, locale);

  if (!activite) {
    return { title: 'Activité non trouvée' };
  }

  const messages = await getMessages(locale);
  const t = messages.activites;

  return {
    title: `${activite.titre} | ${t.pageTitle}`,
    description: activite.resume,
    openGraph: {
      title: activite.titre,
      description: activite.resume,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params = [];

  for (const locale of locales) {
    try {
      const activites = await getActivites(locale);
      for (const act of activites) {
        params.push({ locale, slug: act.slug });
      }
    } catch (error) {
      console.error(`Error generating static params for ${locale}:`, error);
    }
  }

  return params;
}

import { getActivites } from '@/lib/content';

export default async function ActivitePage({ params }: PageProps) {
  const { locale, slug } = await params;

  try {
    const activite = await getActiviteBySlug(slug, locale);

    if (!activite) {
      notFound();
    }

    return <ActiviteDetailClient activite={activite} locale={locale as 'fr' | 'en'} />;
  } catch (error) {
    console.error('Error fetching activity:', error);
    notFound();
  }
}
