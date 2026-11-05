import Link from 'next/link';
import { ArrowUpRight, Facebook, Instagram, MapPin, MessageCircle } from 'lucide-react';
import { type Locale } from '@/lib/langues';
import { LogoCasamance } from '@/components/LogoCasamance';

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
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '');
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL?.startsWith('https://')
    ? process.env.NEXT_PUBLIC_FACEBOOK_URL
    : undefined;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.startsWith('https://')
    ? process.env.NEXT_PUBLIC_INSTAGRAM_URL
    : undefined;
  const isFr = locale === 'fr';

  return (
    <footer className="bg-forest text-cream" role="contentinfo">
      <div className="container-main py-14 sm:py-16 lg:py-20">
        <div className="mb-12 flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-lime">{isFr ? 'Votre prochain voyage commence ici' : 'Your next journey starts here'}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              {isFr ? 'Prêt à découvrir la Casamance ?' : 'Ready to discover Casamance?'}
            </h2>
          </div>
          {whatsappNumber && (
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1fb85a]">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {isFr ? 'Écrivez-nous sur WhatsApp' : 'Chat with us on WhatsApp'}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="grid gap-10 border-b border-white/15 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div className="max-w-sm">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-6" aria-label={t.common.siteName}>
              <LogoCasamance className="h-11 w-11" />
              <span className="font-display text-xl font-bold">Casamance</span>
            </Link>
            <p className="text-mint text-body-sm mb-6">{t.footer.description}</p>
            <p className="mb-4 text-sm font-semibold text-white">{isFr ? 'Suivez nos actualités' : 'Follow our updates'}</p>
            <div className="flex gap-3">
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-lime hover:bg-lime hover:text-forest">
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-lime hover:bg-lime hover:text-forest">
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              {!facebookUrl && !instagramUrl && (
                <p className="max-w-xs text-xs leading-5 text-mint/75">
                  {isFr ? 'Nos actualités sur les réseaux arrivent bientôt.' : 'Follow our social updates soon.'}
                </p>
              )}
            </div>
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

          <nav aria-label={isFr ? 'Informations pratiques' : 'Practical information'}>
            <h3 className="font-display text-lg font-bold mb-4">{isFr ? 'Nous contacter' : 'Contact us'}</h3>
            <ul className="space-y-3 text-body-sm" role="list">
              <li className="flex items-center gap-2 text-mint">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a href="https://www.google.com/maps/search/?api=1&query=Ziguinchor%2C+S%C3%A9n%C3%A9gal" target="_blank" rel="noopener noreferrer" className="transition hover:text-lime">Ziguinchor, Sénégal</a>
              </li>
              {whatsappNumber && (
                <li className="flex items-center gap-2 text-mint">
                  <MessageCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="transition hover:text-lime">+221 77 315 20 07 · WhatsApp</a>
                </li>
              )}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold">{isFr ? 'Préparer son séjour' : 'Plan your stay'}</h3>
            <p className="max-w-xs text-body-sm leading-6 text-mint">
              {isFr ? 'Des plages de l’Atlantique aux bolongs de la mangrove, nous vous aidons à trouver les idées et les bonnes étapes pour votre voyage.' : 'From Atlantic beaches to mangrove waterways, find inspiration and plan the right stops for your journey.'}
            </p>
          </div>

        </div>

        <div className="mt-8 flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
          <p className="text-mint text-body-sm">
            {t.footer.copyright.replace('{year}', currentYear.toString())}
          </p>
          <p className="text-mint/70 text-caption">{isFr ? 'Fait avec passion pour la Casamance 🌿' : 'Made with care for Casamance 🌿'}</p>
        </div>
      </div>
    </footer>
  );
}
