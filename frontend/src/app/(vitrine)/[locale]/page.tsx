import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/lib/langues';
import { getMessages } from '@/lib/traductions';
import { BandeauAccueil } from '@/components/BandeauAccueil';
import { SeparateurCanopee } from '@/components/SeparateurCanopee';
import { CasamanceVerte } from '@/components/CasamanceVerte';
import { Destinations } from '@/components/Destinations';
import { Activites } from '@/components/Activites';
import { Itineraires } from '@/components/Itineraires';
import { QuandPartir } from '@/components/QuandPartir';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = async () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const messages = await getMessages(locale);
  return {
    title: messages.seo.defaultTitle,
    description: messages.seo.defaultDescription,
    openGraph: {
      title: messages.seo.defaultTitle,
      description: messages.seo.defaultDescription,
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = await getMessages(locale);
  const currentLocale = locale;

  return (
      <div>
        <BandeauAccueil data={t.home.hero} locale={currentLocale} />
        <SeparateurCanopee data={t.home.canopy} />
        <CasamanceVerte data={t.home.greenCasamance} />
        <Destinations data={t.home.destinations} locale={currentLocale} />
        <Activites data={t.home.activities} locale={currentLocale} />
        <Itineraires data={t.home.itineraries} locale={currentLocale} />
        <QuandPartir data={t.home.whenToGo} locale={currentLocale} />
      </div>
  );
}
