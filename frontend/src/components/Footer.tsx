'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

const socialLinks = [
  { name: 'instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'youtube', icon: Youtube, href: 'https://youtube.com' },
] as const;

const footerLinks = [
  { key: 'destinations', href: '/destinations' },
  { key: 'activities', href: '/activites' },
  { key: 'itineraries', href: '/itineraires' },
  { key: 'whenToGo', href: '/quand-partir' },
  { key: 'whereToStay', href: '/hebergements' },
] as const;

const legalLinks = ['legal', 'privacy', 'contact'] as const;

export function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream" role="contentinfo">
      <div className="container-main py-18 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1 max-w-xs">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-6" aria-label={tCommon.siteName}>
              <svg className="w-8 h-8 text-lime" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 26C10.477 28 6 23.523 6 18S10.477 8 16 8s10 4.477 10 10-4.477 10-10 10z" stroke="currentColor" strokeWidth="2" />
                <path d="M16 6v20M6 16h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-display text-xl font-bold">Casamance</span>
            </Link>
            <p className="text-mint text-body-sm mb-6">{t.description}</p>
            <div className="flex gap-4" role="list" aria-label={t.social.instagram}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint hover:text-lime transition-colors"
                  aria-label={t.social[social.name as keyof typeof t.social]}
                  role="listitem"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Navigation principale">
            <h3 className="font-display text-lg font-bold mb-4">{tCommon.menu.destinations}</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-mint hover:text-lime transition-colors text-body-sm"
                  >
                    {tCommon.menu[link.key as keyof typeof tCommon.menu]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Informations pratiques">
            <h3 className="font-display text-lg font-bold mb-4">Infos pratiques</h3>
            <ul className="space-y-3 text-body-sm" role="list">
              <li className="flex items-center gap-2 text-mint">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>Ziguinchor, Sénégal</span>
              </li>
              <li className="flex items-center gap-2 text-mint">
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+221339900000" className="hover:text-lime transition-colors">+221 33 990 00 00</a>
              </li>
              <li className="flex items-center gap-2 text-mint">
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:contact@visitecasamance.com" className="hover:text-lime transition-colors">contact@visitecasamance.com</a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Mentions légales">
            <h3 className="font-display text-lg font-bold mb-4">Légal</h3>
            <ul className="space-y-3" role="list">
              {legalLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${locale}/${link === 'legal' ? 'mentions-legales' : link}`}
                    className="text-mint hover:text-lime transition-colors text-body-sm"
                  >
                    {t.links[link as keyof typeof t.links]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-forest/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-mint text-body-sm">
            {t.copyright.replace('{year}', currentYear.toString())}
          </p>
          <p className="text-mint/70 text-caption">
            Fait avec passion pour la Casamance 🌿
          </p>
        </div>
      </div>
    </footer>
  );
}