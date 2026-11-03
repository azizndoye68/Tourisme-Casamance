import { getDestinations } from '@/lib/content';
import { getMessages } from '@/lib/messages';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import DestinationsClient from './DestinationsClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = messages.destinations;
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

export default async function DestinationsPage({ params }: PageProps) {
  const { locale } = await params;

  try {
    const destinations = await getDestinations(locale);
    return <DestinationsClient destinations={destinations} locale={locale as 'fr' | 'en'} />;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    notFound();
  }
}