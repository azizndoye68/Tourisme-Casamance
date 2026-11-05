import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/lib/langues';
import { getMessages } from '@/lib/traductions';
import { NextIntlClientProvider } from 'next-intl';
import { Entete } from '@/components/Entete';
import { PiedDePage } from '@/components/PiedDePage';
import '@/styles/globals.css';

export const generateStaticParams = async () => locales.map((locale) => ({ locale }));

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const messages = await getMessages(locale);

  return {
    icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
    title: {
      default: messages.seo.defaultTitle,
      template: '%s | Casamance',
    },
    description: messages.seo.defaultDescription,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://visitecasamance.com'),
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}`])
      ),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      siteName: 'Casamance',
      title: messages.seo.defaultTitle,
      description: messages.seo.defaultDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.seo.defaultTitle,
      description: messages.seo.defaultDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateViewport({ params }: LayoutProps): Promise<Viewport> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  return {
    themeColor: '#0E2A20',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);
  const { home: _homePageContent, ...intlMessages } = messages;

  return (
    <html lang={locale} dir="ltr">
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider
          locale={locale}
          messages={intlMessages}
          now={new Date()}
          timeZone="Africa/Dakar"
        >
          <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2" href="#main-content">
            {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
          </a>
          <Entete
            locale={locale}
            t={{ menu: messages.common.menu, common: messages.common, header: messages.header }}
          />
          <main id="main-content" className="flex-1">{children}</main>
          <PiedDePage locale={locale} t={{ footer: messages.footer, common: messages.common }} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
