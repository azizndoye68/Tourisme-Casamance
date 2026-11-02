import { getItineraires } from '@/lib/strapi';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ItinerairesClient from './ItinerairesClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'itineraires' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function ItinerairesPage({ params }: PageProps) {
  const { locale } = await params;

  try {
    const itineraires = await getItineraires(locale);
    return <ItinerairesClient itineraires={itineraires} locale={locale} />;
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    notFound();
  }
}