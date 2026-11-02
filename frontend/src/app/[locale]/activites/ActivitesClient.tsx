'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Activite } from '@/lib/strapi';
import { getStrapiImageUrl } from '@/lib/strapi';

interface ActivitesClientProps {
  activites: Activite[];
  locale: string;
}

const themeIcons: Record<string, string> = {
  Nature: '🌿',
  Culture: '🏛️',
  Gastronomie: '🍽️',
  Aventure: '🧗',
  Detente: '🧘',
};

const themeColors: Record<string, string> = {
  Nature: 'bg-emerald/10 text-emerald border-emerald/20',
  Culture: 'bg-leaf/10 text-leaf border-leaf/20',
  Gastronomie: 'bg-coral/10 text-coral border-coral/20',
  Aventure: 'bg-sun/10 text-sun border-sun/20',
  Detente: 'bg-mint/10 text-mint border-mint/20',
};

export default function ActivitesClient({ activites, locale }: ActivitesClientProps) {
  const t = useTranslations('activites');
  const isFr = locale === 'fr';

  // Group activities by theme
  const grouped = activites.reduce((acc, activite) => {
    const theme = activite.theme || 'Nature';
    if (!acc[theme]) acc[theme] = [];
    acc[theme].push(activite);
    return acc;
  }, {} as Record<string, Activite[]>);

  const themes = Object.keys(grouped).sort();

  return (
    <div className="space-y-16">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest tracking-tight mb-4">
          {t('pageTitle')}
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          {t('pageDescription')}
        </p>
      </header>

      {/* Activities by theme */}
      {themes.map((theme, themeIndex) => (
        <section key={theme} className="space-y-6" aria-labelledby={`theme-${theme}`}>
          <div className="flex items-center gap-4">
            <h2 id={`theme-${theme}`} className="text-3xl font-bold text-forest tracking-tight">
              {themeIcons[theme] || '🎯'} {theme}
            </h2>
            <div className="flex-1 h-px bg-cream" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grouped[theme].map((activite, index) => (
              <article
                key={activite.documentId}
                className="group bg-white rounded-card-lg overflow-hidden shadow-soft hover:shadow-medium transition-all border border-cream"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {activite.galerie?.[0] ? (
                    <Image
                      src={getStrapiImageUrl(activite.galerie[0]) || ''}
                      alt={activite.galerie[0].alternativeText || activite.titre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={activite.galerie[0].formats?.thumbnail?.url || activite.galerie[0].url}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                      <span className="text-6xl">{themeIcons[theme] || '🎯'}</span>
                    </div>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-sm font-medium border ${themeColors[theme] || 'bg-emerald/10 text-emerald border-emerald/20'}`}>
                      {themeIcons[theme]} {theme}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-forest/90 backdrop-blur rounded-card p-4 text-cream">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-lime transition-colors">
                        <Link href={`/${locale}/activites/${activite.slug}`}>{activite.titre}</Link>
                      </h3>
                      <p className="text-sm text-mint/80 line-clamp-2">{activite.resume}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    {activite.duree && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-pill bg-cream border border-cream/50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {activite.duree}
                      </span>
                    )}
                    {activite.destinations && activite.destinations.length > 0 && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-pill bg-cream border border-cream/50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {activite.destinations.slice(0, 2).map(d => d.nom).join(', ')}
                        {activite.destinations.length > 2 && ` +${activite.destinations.length - 2}`}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/${locale}/activites/${activite.slug}`}
                    className="inline-flex items-center gap-1.5 w-full justify-center py-3 rounded-card bg-forest text-cream font-semibold hover:bg-leaf transition-colors"
                  >
                    {t('viewDetails')}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {activites.length === 0 && (
        <div className="text-center py-16 text-muted">
          <p>{t('noActivities')}</p>
        </div>
      )}
    </div>
  );
}