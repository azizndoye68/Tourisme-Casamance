import { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { CanopyDivider } from '@/components/CanopyDivider';
import { GreenCasamance } from '@/components/GreenCasamance';
import { Destinations } from '@/components/Destinations';
import { Activities } from '@/components/Activities';
import { Itineraries } from '@/components/Itineraries';
import { WhenToGo } from '@/components/WhenToGo';
import { WhereToStay } from '@/components/WhereToStay';
import { Testimonial } from '@/components/Testimonial';
import { CTA } from '@/components/CTA';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = async () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const messages = await getMessages();
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

  const messages = await getMessages();
  const t = messages.home;

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero data={t.hero} />
        <CanopyDivider data={t.canopy} />
        <GreenCasamance data={t.greenCasamance} />
        <Destinations data={t.destinations} />
        <Activities data={t.activities} />
        <Itineraries data={t.itineraries} />
        <WhenToGo data={t.whenToGo} />
        <WhereToStay data={t.whereToStay} />
        <Testimonial data={t.testimonial} />
        <CTA data={t.cta} />
      </main>
      <Footer />
    </>
  );
}