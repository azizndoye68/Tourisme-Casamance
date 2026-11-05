import { getHebergements } from '@/lib/contenu';
import { getMessages } from '@/lib/traductions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ListeHebergements from './ListeHebergements';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = messages.hebergements;
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

export default async function HebergementsPage({ params }: PageProps) {
  const { locale } = await params;

  try {
    const hebergements = await getHebergements(locale);
    return <ListeHebergements hebergements={hebergements} locale={locale as 'fr' | 'en'} />;
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    notFound();
  }
}