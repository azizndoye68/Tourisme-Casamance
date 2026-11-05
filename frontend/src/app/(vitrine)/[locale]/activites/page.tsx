import { getActivites } from '@/lib/contenu';
import { getMessages } from '@/lib/traductions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ListeActivites from './ListeActivites';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = messages.activites;
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

export default async function ActivitesPage({ params }: PageProps) {
  const { locale } = await params;

  try {
    const activites = await getActivites(locale);
    return <ListeActivites activites={activites} locale={locale} />;
  } catch (error) {
    console.error('Error fetching activities:', error);
    notFound();
  }
}