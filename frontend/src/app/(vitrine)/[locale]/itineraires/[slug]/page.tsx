import { getItineraireBySlug } from '@/lib/contenu';
import { getMessages } from '@/lib/traductions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DetailItineraire from './DetailItineraire';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const itineraire = await getItineraireBySlug(slug, locale);

  if (!itineraire) {
    return { title: 'Itinéraire non trouvé' };
  }

  const messages = await getMessages(locale);
  const t = messages.itineraires;

  return {
    title: `${itineraire.titre} | ${t.pageTitle}`,
    description: itineraire.resume,
    openGraph: {
      title: itineraire.titre,
      description: itineraire.resume,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params = [];

  for (const locale of locales) {
    try {
      const itineraires = await getItineraires(locale);
      for (const itin of itineraires) {
        params.push({ locale, slug: itin.slug });
      }
    } catch (error) {
      console.error(`Error generating static params for ${locale}:`, error);
    }
  }

  return params;
}

import { getItineraires } from '@/lib/contenu';

export default async function ItinerairePage({ params }: PageProps) {
  const { locale, slug } = await params;

  try {
    const itineraire = await getItineraireBySlug(slug, locale);

    if (!itineraire) {
      notFound();
    }

    return <DetailItineraire itineraire={itineraire} locale={locale as 'fr' | 'en'} />;
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    notFound();
  }
}