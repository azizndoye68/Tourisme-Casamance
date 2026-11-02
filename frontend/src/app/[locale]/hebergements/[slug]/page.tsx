import { getHebergementBySlug } from '@/lib/strapi';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HebergementDetailClient from './HebergementDetailClient';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const hebergement = await getHebergementBySlug(slug, locale);

  if (!hebergement) {
    return { title: 'Hébergement non trouvé' };
  }

  const t = await getTranslations({ locale, namespace: 'hebergements' });

  return {
    title: `${hebergement.nom} | ${t('pageTitle')}`,
    description: `${hebergement.type} à ${hebergement.destination?.nom || 'Casamance'} - ${hebergement.prixIndicatif || ''}`,
    openGraph: {
      title: hebergement.nom,
      description: `${hebergement.type} à ${hebergement.destination?.nom || 'Casamance'}`,
      type: 'website',
      images: hebergement.galerie?.[0]?.url ? [`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${hebergement.galerie[0].url}`] : [],
    },
  };
}

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params = [];

  for (const locale of locales) {
    try {
      const hebergements = await getHebergements(locale);
      for (const h of hebergements) {
        params.push({ locale, slug: h.slug });
      }
    } catch (error) {
      console.error(`Error generating static params for ${locale}:`, error);
    }
  }

  return params;
}

import { getHebergements } from '@/lib/strapi';

export default async function HebergementPage({ params }: PageProps) {
  const { locale, slug } = await params;

  try {
    const hebergement = await getHebergementBySlug(slug, locale);

    if (!hebergement) {
      notFound();
    }

    return <HebergementDetailClient hebergement={hebergement} locale={locale as 'fr' | 'en'} />;
  } catch (error) {
    console.error('Error fetching accommodation:', error);
    notFound();
  }
}