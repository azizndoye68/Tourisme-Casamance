import { getDestinationBySlug, getActivitesByDestination, getHebergementsByDestination, getStrapiImageUrl } from '@/lib/strapi';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DestinationDetailClient from './DestinationDetailClient';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const destination = await getDestinationBySlug(slug, locale);

  if (!destination) {
    return { title: 'Destination non trouvée' };
  }

  const t = await getTranslations({ locale, namespace: 'destinations' });

  return {
    title: `${destination.nom} | ${t('pageTitle')}`,
    description: destination.resume,
    openGraph: {
      title: destination.nom,
      description: destination.resume,
      type: 'website',
      images: destination.galerie?.[0]?.url ? [`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${destination.galerie[0].url}`] : [],
    },
  };
}

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params = [];

  for (const locale of locales) {
    try {
      const destinations = await getDestinations(locale);
      for (const dest of destinations) {
        params.push({ locale, slug: dest.slug });
      }
    } catch (error) {
      console.error(`Error generating static params for ${locale}:`, error);
    }
  }

  return params;
}

// Need to import getDestinations for generateStaticParams
import { getDestinations } from '@/lib/strapi';

export default async function DestinationPage({ params }: PageProps) {
  const { locale, slug } = await params;

  try {
    const [destination, activites, hebergements] = await Promise.all([
      getDestinationBySlug(slug, locale),
      getActivitesByDestination(slug, locale),
      getHebergementsByDestination(slug, locale),
    ]);

    if (!destination) {
      notFound();
    }

    return <DestinationDetailClient destination={destination} activites={activites} hebergements={hebergements} locale={locale as 'fr' | 'en'} />;
  } catch (error) {
    console.error('Error fetching destination:', error);
    notFound();
  }
}