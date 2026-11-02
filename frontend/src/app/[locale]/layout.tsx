import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Manrope } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, isValidLocale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import '@/styles/globals.css';

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
  weight: ['600', '800'],
});

const manrope = Manrope({
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

interface Messages {
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const messages = await getMessages(locale) as Messages;

  return {
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

  const langDir = 'ltr';

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