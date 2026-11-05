'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Destination } from '@/lib/contenu';
import { CarteInteractive } from '@/components/CarteInteractive';
import type { RepereCarte } from '@/components/Carte';

interface ListeDestinationsProps {
  destinations: Destination[];
  locale: 'fr' | 'en';
}

const typeLabels: Record<Destination['type'], { fr: string; en: string }> = {
  ville: { fr: 'Ville', en: 'City' },
  ile: { fr: 'Île', en: 'Island' },
  plage: { fr: 'Plage', en: 'Beach' },
  nature: { fr: 'Nature', en: 'Nature' },
  culture: { fr: 'Culture', en: 'Culture' },
};

const typeIcons: Record<Destination['type'], string> = {
  ville: '🏙️',
  ile: '🏝️',
  plage: '🏖️',
  nature: '🌿',
  culture: '🏛️',
};

export default function ListeDestinations({ destinations, locale }: ListeDestinationsProps) {
  const t = useTranslations('destinations');
  const isFr = locale === 'fr';

  // Prepare markers for map
  const markers: RepereCarte[] = destinations
    .filter(d => d.latitude && d.longitude)
    .map(d => ({
      lat: d.latitude!,
      lng: d.longitude!,
      title: d.nom,
      description: d.resume,
      slug: d.slug,
      type: 'destination' as const,
    }));

  // Featured destinations (miseEnAvant)
  const featured = destinations.filter(d => d.miseEnAvant);
  const others = destinations.filter(d => !d.miseEnAvant);

  const renderDestinationCard = (dest: Destination) => {
    const typeLabel = typeLabels[dest.type][locale];
    const typeIcon = typeIcons[dest.type] || '📍';

    // Get first gallery image
    const mainImage = dest.galerie?.[0];

    return (
      <article
        key={dest.documentId}
        className="group overflow-hidden rounded-card-lg border border-forest/10 bg-white shadow-[0_14px_38px_-30px_rgba(14,42,32,.65)] transition-shadow hover:shadow-[0_20px_48px_-30px_rgba(14,42,32,.65)]"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-[#e8efe1] sm:h-64 lg:h-60">
          {mainImage ? (
            <Image
              src={mainImage.formats?.thumbnail?.url || mainImage.url}
              alt={mainImage.alternativeText || dest.nom}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted/20 flex items-center justify-center">
              <span className="text-6xl">{typeIcon}</span>
            </div>
          )}

          {/* Type badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-forest/90 backdrop-blur text-cream text-sm font-medium">
              {typeIcon} {typeLabel}
            </span>
          </div>

          {/* Featured badge */}
          {dest.miseEnAvant && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-pill bg-lime text-forest text-sm font-semibold">
                ⭐ {isFr ? 'À la une' : 'Featured'}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex min-h-[260px] flex-col p-5 sm:p-6">
          <h3 className="mb-2 text-xl font-bold tracking-tight text-forest sm:text-2xl">
            <Link href={`/${locale}/destinations/${dest.slug}`} className="hover:text-emerald transition-colors">
              {dest.nom}
            </Link>
          </h3>
          <p className="mb-4 line-clamp-3 text-sm leading-6 text-muted sm:text-base">{dest.resume}</p>

          {/* Tags */}
          {dest.tags && dest.tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {dest.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-pill bg-emerald/10 text-emerald text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
              {dest.tags.length > 4 && (
                <span className="px-2.5 py-1 rounded-pill bg-forest/10 text-muted text-xs">
                  +{dest.tags.length - 4}
                </span>
              )}
            </div>
          )}

          <Link
            href={`/${locale}/destinations/${dest.slug}`}
            className="mt-auto inline-flex items-center gap-1.5 font-semibold text-emerald transition-all hover:gap-3"
          >
            {t('viewDetails')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </article>
    );
  };

  return (
    <div className="container-main space-y-12 py-10 sm:space-y-16 sm:py-14">
      {/* Entete */}
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest tracking-tight mb-4">
          {t('pageTitle')}
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          {t('pageDescription')}
        </p>
      </header>

      {/* Featured Destinations */}
      {featured.length > 0 && (
        <section aria-labelledby="featured-title">
          <h2 id="featured-title" className="sr-only">{t('featuredTitle')}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((dest) => renderDestinationCard(dest))}
          </div>
        </section>
      )}

      {/* Other Destinations */}
      {others.length > 0 && (
        <section aria-labelledby="other-title">
          <h2 id="other-title" className="sr-only">{t('otherTitle')}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {others.map((dest) => renderDestinationCard(dest))}
          </div>
        </section>
      )}

      {/* Load map code and tiles after visitors reach it, below the destination cards. */}
      {markers.length > 0 && (
        <section className="rounded-2xl bg-white p-3 shadow-soft sm:p-5" aria-labelledby="map-title">
          <h2 id="map-title" className="section-title mb-5 text-2xl">{t('mapTitle')}</h2>
          <CarteInteractive markers={markers} height="min(60vh, 450px)" fitBounds />
        </section>
      )}

      {destinations.length === 0 && (
        <div className="text-center py-16 text-muted">
          <p>{t('noDestinations')}</p>
        </div>
      )}
    </div>
  );
}
