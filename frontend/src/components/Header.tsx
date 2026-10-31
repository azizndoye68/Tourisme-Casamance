'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe, MapPin, Calendar, Bed, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n';
import { useTranslations, useLocale } from 'next-intl';

const navItems = [
  { href: '/destinations', icon: MapPin, key: 'destinations' },
  { href: '/activites', icon: Compass, key: 'activities' },
  { href: '/itineraires', icon: Calendar, key: 'itineraries' },
  { href: '/quand-partir', icon: Calendar, key: 'whenToGo' },
  { href: '/hebergements', icon: Bed, key: 'whereToStay' },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const t = useTranslations('common.menu');
  const tCommon = useTranslations('common');
  const tHeader = useTranslations('header');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-soft border-b border-forest/10'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav
        className="container-main"
        aria-label={tHeader.navAriaLabel}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 shrink-0"
            aria-label={tCommon.siteName}
          >
            <span className="relative">
              <svg
                className="w-8 h-8 text-emerald"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 26C10.477 28 6 23.523 6 18S10.477 8 16 8s10 4.477 10 10-4.477 10-10 10z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16 6v20M6 16h20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-coral rounded-full" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-bold text-forest hidden sm:block">
              Casamance
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={cn(
                  'flex items-center gap-1.5 text-body-sm font-medium transition-colors',
                  pathname === `/${locale}${item.href}` || pathname.startsWith(`/${locale}${item.href}/`)
                    ? 'text-emerald'
                    : 'text-muted hover:text-forest'
                )}
                aria-current={pathname === `/${locale}${item.href}` ? 'page' : undefined}
              >
                <item.icon className="w-4 h-4" aria-hidden="true" />
                {t(item.key)}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-3">
            <div className="relative" role="group" aria-label={tHeader.languageAriaLabel}>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 text-body-sm font-medium text-forest bg-forest/5 rounded-pill hover:bg-forest/10 transition-colors"
                aria-haspopup="listbox"
                aria-expanded={false}
              >
                <span aria-hidden="true">{localeFlags[locale]}</span>
                <span>{localeNames[locale]}</span>
                <Globe className="w-4 h-4" aria-hidden="true" />
              </button>
              <ul className="absolute right-0 mt-2 w-40 bg-white rounded-card shadow-card border border-forest/10 py-2 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all" role="listbox">
                {locales.map((loc) => (
                  <li key={loc} role="option" aria-selected={loc === locale}>
                    <button
                      onClick={() => handleLocaleChange(loc)}
                      className={cn(
                        'w-full flex items-center gap-2 px-4 py-2 text-body-sm transition-colors',
                        loc === locale ? 'bg-emerald/10 text-emerald font-medium' : 'text-muted hover:text-forest hover:bg-forest/5'
                      )}
                    >
                      <span aria-hidden="true">{localeFlags[loc]}</span>
                      <span>{localeNames[loc]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`/${locale}/contact`}
              className="btn-primary hidden sm:inline-flex"
            >
              {tCommon.cta}
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-forest hover:bg-forest/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? tHeader.menuAriaLabel.replace('Ouvrir', 'Fermer') : tHeader.menuAriaLabel}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-spring',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
          role="navigation"
          aria-label={tHeader.navAriaLabel}
        >
          <div className="py-4 space-y-3 border-t border-forest/10">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={cn(
                  'flex items-center gap-3 px-2 py-2 rounded-lg text-body font-medium transition-colors',
                  pathname === `/${locale}${item.href}` || pathname.startsWith(`/${locale}${item.href}/`)
                    ? 'bg-emerald/10 text-emerald'
                    : 'text-muted hover:text-forest hover:bg-forest/5'
                )}
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === `/${locale}${item.href}` ? 'page' : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-4 border-t border-forest/10 flex items-center gap-3">
              <div className="flex items-center gap-2" role="group" aria-label={tHeader.languageAriaLabel}>
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { handleLocaleChange(loc); setIsMenuOpen(false); }}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-pill text-body-sm font-medium transition-colors',
                      loc === locale ? 'bg-emerald text-cream' : 'text-muted hover:text-forest hover:bg-forest/10'
                    )}
                    aria-pressed={loc === locale}
                  >
                    <span aria-hidden="true">{localeFlags[loc]}</span>
                    <span>{localeNames[loc]}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="btn-primary w-full justify-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {tCommon.cta}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}