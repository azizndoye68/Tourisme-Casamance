'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Itineraire } from '@/lib/strapi';
import { getStrapiImageUrl } from '@/lib/strapi';

interface ItinerairesClientProps {
  itineraires: Itineraire[];
  locale: string;
}

const colorSchemes = [
  { bg: 'bg-emerald', text: 'text-cream', accent: 'bg-emerald/10 text-emerald' },
  { bg: 'bg-leaf', text: 'text-cream', accent: 'bg-leaf/10 text-leaf' },
  { bg: 'bg-forest', text: 'text-cream', accent: 'bg-forest/10 text-forest' },
  { bg: 'bg-lime', text: 'text-forest', accent: 'bg-lime/20 text-lime' },
  { bg: 'bg-coral', text: 'text-cream', accent: 'bg-coral/10 text-coral' },
];

export default function ItinerairesClient({ itineraires, locale }: ItinerairesClientProps) {
  const t = useTranslations('itineraires');
  const isFr = locale === 'fr';

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest tracking-tight mb-4">
          {t('pageTitle')}
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          {t('pageDescription')}
        </p>
      </header>

      {/* Itinerary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {itineraires.map((itineraire, index) => {
          const colors = colorSchemes[index % colorSchemes.length];
          const firstDestination = itineraire.etapes[0]?.destination;

          return (
            <article
              key={itineraire.documentId}
              className={`group relative overflow-hidden rounded-card-xl ${colors.bg} ${colors.text} shadow-soft hover:shadow-xl transition-all`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="leaf-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M10 0 C15 5 15 15 10 20 C5 15 5 5 10 0" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
                </svg>
              </div>

              <div className="relative p-6 md:p-8 h-full flex flex-col">
                {/* Header with days */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-sm font-medium ${colors.accent}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {itineraire.nombreJours} {isFr ? 'jours' : 'days'}
                    </span>
                  </div>
                  {firstDestination && firstDestination.galerie?.[0] && (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 border-current/20 flex-shrink-0">
                      <Image
                        src={getStrapiImageUrl(firstDestination.galerie[0]) || ''}
                        alt={firstDestination.galerie[0].alternativeText || firstDestination.nom}
                        fill
                        className="object-cover"
                        sizes="80px"
                        placeholder="blur"
                        blurDataURL={firstDestination.galerie[0].formats?.thumbnail?.url || firstDestination.galerie[0].url}
                      />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 flex-1">
                  <Link href={`/${locale}/itineraires/${itineraire.slug}`} className="hover:underline transition-colors">
                    {itineraire.titre}
                  </Link>
                </h2>

                {/* Summary */}
                <p className="text-current/80 mb-6 line-clamp-3 flex-1">{itineraire.resume}</p>

                {/* Steps preview */}
                <div className="space-y-3 mb-6 border-t border-current/20 pt-4">
                  {itineraire.etapes.slice(0, 3).map((etape, i) => (
                    <div key={etape.id} className="flex items-start gap-3 text-sm">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${colors.bg} ${colors.text}`}>
                        {etape.jour}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{etape.titre}</p>
                        {etape.destination && (
                          <p className="text-current/70 text-xs">{etape.destination.nom}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {itineraire.etapes.length > 3 && (
                    <p className="text-current/60 text-sm text-center">
                      {isFr ? `... et ${itineraire.etapes.length - 3} autre${itineraire.etapes.length - 3 > 1 ? 's' : ''} jour${itineraire.etapes.length - 3 > 1 ? 's' : ''}` : `... and ${itineraire.etapes.length - 3} more day${itineraire.etapes.length - 3 > 1 ? 's' : ''}`}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={`/${locale}/itineraires/${itineraire.slug}`}
                  className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-card font-semibold transition-all ${colors.bg === 'bg-lime' ? 'bg-forest text-cream hover:bg-leaf' : 'bg-forest/20 hover:bg-forest/30'}`}
                >
                  {t('viewItinerary')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {itineraires.length === 0 && (
        <div className="text-center py-16 text-muted">
          <p>{t('noItineraries')}</p>
        </div>
      )}
    </div>
  );
}