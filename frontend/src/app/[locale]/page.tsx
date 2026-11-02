import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale, type Locale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
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

interface Messages {
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
  common: {
    siteName: string;
    tagline: string;
    menu: {
      destinations: string;
      activities: string;
      itineraries: string;
      whenToGo: string;
      whereToStay: string;
    };
    cta: string;
    whatsapp: string;
    newsletter: string;
    emailPlaceholder: string;
    submit: string;
    loading: string;
    error: string;
    readMore: string;
    viewAll: string;
    back: string;
    next: string;
    previous: string;
  };
  header: {
    logoAlt: string;
    navAriaLabel: string;
    languageAriaLabel: string;
    menuAriaLabel: string;
  };
  footer: {
    description: string;
    practicalInfo: string;
    legal: string;
    links: {
      legal: string;
      privacy: string;
      contact: string;
    };
    social: {
      instagram: string;
      facebook: string;
      youtube: string;
    };
    copyright: string;
  };
  home: {
    hero: any;
    canopy: any;
    greenCasamance: any;
    destinations: any;
    activities: any;
    itineraries: any;
    whenToGo: any;
    whereToStay: any;
    testimonial: any;
    cta: any;
  };
}

export const generateStaticParams = async () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const messages = await getMessages(locale) as Messages;
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

  const messages = await getMessages(locale) as Messages;
  const t = messages;
  const currentLocale = locale as Locale;

  return (
    <>
      <Header
        locale={currentLocale}
        pathname={`/${locale}`}
        t={{
          menu: t.common.menu,
          common: {
            siteName: t.common.siteName,
            cta: t.common.cta,
          },
          header: t.header,
        }}
      />
      <main id="main-content" className="flex-1">
        <Hero data={t.home.hero} />
        <CanopyDivider data={t.home.canopy} />
        <GreenCasamance data={t.home.greenCasamance} />
        <Destinations data={t.home.destinations} />
        <Activities data={t.home.activities} />
        <Itineraries data={t.home.itineraries} />
        <WhenToGo data={t.home.whenToGo} />
      </main>
      <Footer
        locale={currentLocale}
        t={{
          footer: t.footer,
          common: t.common,
        }}
      />
    </>
  );
}