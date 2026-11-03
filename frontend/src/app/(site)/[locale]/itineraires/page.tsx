import { getItineraires } from '@/lib/content';
import { getMessages } from '@/lib/messages';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ItinerairesClient from './ItinerairesClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = messages.itineraires;
  return {
    title: t.pageTitle,
    description: t.pageDescription,
    openGraph: {
      title: t.pageTitle,
      description: t.pageDescription,
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
    const messages = await getMessages(locale);
    const itineraires = await getItineraires(locale);
    return (
      <ItinerairesClient
        itineraires={itineraires}
        locale={locale as 'fr' | 'en'}
        labels={messages.itineraires}
      />
    );
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    notFound();
  }
}
