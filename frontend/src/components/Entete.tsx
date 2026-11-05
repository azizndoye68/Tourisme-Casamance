import Link from 'next/link';
import { Bed, Calendar, Compass, Globe, MapPin } from 'lucide-react';
import { cn } from '@/lib/utilitaires';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/langues';
import { LogoCasamance } from '@/components/LogoCasamance';

const navItems = [
  { href: '/destinations', icon: MapPin, key: 'destinations' },
  { href: '/activites', icon: Compass, key: 'activities' },
  { href: '/itineraires', icon: Calendar, key: 'itineraries' },
  { href: '/hebergements', icon: Bed, key: 'whereToStay' },
] as const;

interface EnteteProps {
  locale: Locale;
  pathname?: string;
  t: {
    menu: { destinations: string; activities: string; itineraries: string; whereToStay: string };
    common: { siteName: string; cta: string };
    header: { navAriaLabel: string; languageAriaLabel: string };
  };
}

export function Entete({ locale, pathname = '', t }: EnteteProps) {
  const currentPath = pathname.replace(`/${locale}`, '') || '/';
  const languageLinks = (
    <div className="flex items-center gap-1" aria-label={t.header.languageAriaLabel}>
      {locales.map((nextLocale) => (
        <Link
          key={nextLocale}
          href={`/${nextLocale}${currentPath}`}
          aria-current={nextLocale === locale ? 'page' : undefined}
          hrefLang={nextLocale}
          className={cn(
            'rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors',
            nextLocale === locale ? 'bg-forest/10 text-forest' : 'text-muted hover:bg-forest/5 hover:text-forest',
          )}
        >
          <span aria-hidden="true">{localeFlags[nextLocale]}</span> {nextLocale.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-[#fbfaf5]/95 backdrop-blur-md">
      <nav className="container-main" aria-label={t.header.navAriaLabel}>
        <div className="flex h-[68px] items-center justify-between gap-4">
          <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2.5" aria-label={t.common.siteName}>
            <LogoCasamance className="h-11 w-11" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold tracking-tight text-forest">Casamance</span>
              <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.17em] text-emerald">Sénégal · Afrique de l’Ouest</span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 lg:flex xl:gap-7">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={cn(
                  'whitespace-nowrap text-sm font-medium transition-colors',
                  pathname === `/${locale}${item.href}` || pathname.startsWith(`/${locale}${item.href}/`)
                    ? 'text-emerald'
                    : 'text-muted hover:text-forest',
                )}
                aria-current={pathname === `/${locale}${item.href}` ? 'page' : undefined}
              >
                {t.menu[item.key]}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {languageLinks}
            <Link href={`/${locale}/itineraires`} className="btn-primary h-10 px-4 text-xs">
              {t.common.cta}
            </Link>
          </div>
          <div className="lg:hidden">{languageLinks}</div>
        </div>

        <div className="-mx-1 flex gap-1 overflow-x-auto border-t border-forest/10 py-2.5 lg:hidden" aria-label={t.header.navAriaLabel}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors',
                pathname === `/${locale}${item.href}` || pathname.startsWith(`/${locale}${item.href}/`)
                  ? 'bg-forest text-white'
                  : 'text-muted hover:bg-forest/5',
              )}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {t.menu[item.key]}
            </Link>
          ))}
          <Link href={`/${locale}/itineraires`} className="flex shrink-0 items-center gap-1.5 rounded-full bg-lime px-3 py-2 text-xs font-bold text-forest">
            <Globe className="h-4 w-4" aria-hidden="true" /> {t.common.cta}
          </Link>
        </div>
      </nav>
    </header>
  );
}
