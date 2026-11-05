import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { type Locale } from '@/lib/langues';

const footerLinks = [
  { key: 'destinations', href: '/destinations' },
  { key: 'activities', href: '/activites' },
  { key: 'itineraries', href: '/itineraires' },
  { key: 'whereToStay', href: '/hebergements' },
] as const;

interface PiedDePageProps {
  locale: Locale;
  t: {
    footer: {
      description: string;
      practicalInfo: string;
      copyright: string;
    };
    common: {
      siteName: string;
      menu: {
        destinations: string;
        activities: string;
        itineraries: string;
        whereToStay: string;
      };
    };
  };
}

export function PiedDePage({ locale, t }: PiedDePageProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream" role="contentinfo">
      <div className="container-main py-18 lg:py-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1 max-w-xs">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-6" aria-label={t.common.siteName}>
              <svg className="w-8 h-8 text-lime" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 26C10.477 28 6 23.523 6 18S10.477 8 16 8s10 4.477 10 10-4.477 10-10 10z" stroke="currentColor" strokeWidth="2" />
                <path d="M16 6v20M6 16h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-display text-xl font-bold">Casamance</span>
            </Link>
            <p className="text-mint text-body-sm mb-6">{t.footer.description}</p>
          </div>

          <nav aria-label={t.common.menu.destinations}>
            <h3 className="font-display text-lg font-bold mb-4">{t.common.menu.destinations}</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-mint hover:text-lime transition-colors text-body-sm"
                  >
                    {t.common.menu[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.practicalInfo}>
            <h3 className="font-display text-lg font-bold mb-4">{t.footer.practicalInfo}</h3>
            <ul className="space-y-3 text-body-sm" role="list">
              <li className="flex items-center gap-2 text-mint">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>Ziguinchor, Sénégal</span>
              </li>
            </ul>
          </nav>

        </div>

        <div className="mt-12 pt-8 border-t border-forest/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-mint text-body-sm">
            {t.footer.copyright.replace('{year}', currentYear.toString())}
          </p>
          <p className="text-mint/70 text-caption">
            Fait avec passion pour la Casamance 🌿
          </p>
        </div>
      </div>
    </footer>
  );
}
