import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { locales, defaultLocale, isValidLocale } from '@/lib/i18n';
import '@/styles/globals.css';

const bricolageGrotesque = Inter({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
  weight: ['600', '800'],
});

const manrope = Inter({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const generateStaticParams = async () => locales.map((locale) => ({ locale }));

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const langDir = locale === 'ar' ? 'rtl' : 'ltr';

  const metadata: Metadata = {
    title: {
      default: messages.seo.defaultTitle,
      template: '%s | Casamance',
    },
    description: messages.seo.defaultDescription,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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

  const viewport: Viewport = {
    themeColor: '#0E2A20',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  };

  return (
    <html lang={locale} dir={langDir} className={`${bricolageGrotesque.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

export { metadata, viewport };