'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Activite } from '@/lib/content';
import { getContentImageUrl } from '@/lib/content';

interface ActiviteDetailClientProps {
  activite: Activite;
  locale: 'fr' | 'en';
}

const themeIcons: Record<Activite['theme'], string> = {
  Nature: '🌿',
  Culture: '🏛️',
  Gastronomie: '🍽️',
  Aventure: '🏔️',
  Detente: '🧘',
};

const themeLabels: Record<Activite['theme'], { fr: string; en: string }> = {
  Nature: { fr: 'Nature', en: 'Nature' },
  Culture: { fr: 'Culture', en: 'Culture' },
  Gastronomie: { fr: 'Gastronomie', en: 'Gastronomy' },
  Aventure: { fr: 'Aventure', en: 'Adventure' },
  Detente: { fr: 'Détente', en: 'Relaxation' },
};

export default function ActiviteDetailClient({ activite, locale }: ActiviteDetailClientProps) {
  const t = useTranslations('activites');
  const isFr = locale === 'fr';
  const themeIcon = themeIcons[activite.theme] || '🎯';
  const themeLabel = themeLabels[activite.theme][locale];

  return (
    <article className="mx-auto w-full max-w-[1320px] space-y-10 px-5 py-7 sm:space-y-12 sm:px-8 sm:py-10">
      <nav aria-label={isFr ? 'Fil d’Ariane' : 'Breadcrumb'} className="flex items-center gap-2 text-sm text-muted">
        <Link href={`/${locale}`} className="font-medium text-emerald hover:text-forest">{isFr ? 'Accueil' : 'Home'}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${locale}/activites`} className="hover:text-forest">{isFr ? 'Activités' : 'Activities'}</Link>
      </nav>
      {/* Hero */}
      <header className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
        <div className="relative h-[270px] sm:h-[340px] lg:h-[400px]">
          {activite.galerie?.[0] ? (
            <Image
              src={getContentImageUrl(activite.galerie[0]) || ''}
              alt={activite.galerie[0].alternativeText || activite.titre}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={activite.galerie[0].formats?.thumbnail?.url || activite.galerie[0].url}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-forest via-leaf to-emerald flex items-center justify-center">
              <span className="text-9xl">{themeIcon}</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 text-cream sm:p-8 md:p-10">
            <div className="max-w-4xl mx-auto">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-pill text-sm font-medium ${themeIcon === '🌿' ? 'bg-emerald text-forest' : themeIcon === '🏛️' ? 'bg-leaf text-cream' : themeIcon === '🍽️' ? 'bg-coral text-cream' : themeIcon === '🏔️' ? 'bg-sun text-forest' : 'bg-mint text-forest'}`}>
                {themeIcon} {themeLabel}
              </span>
              <h1 className="mt-3 mb-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                {activite.titre}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">{activite.resume}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 bg-mint/30 rounded-card-lg p-5">
          {activite.duree && (
            <div className="flex items-center gap-2 text-forest">
              <svg className="w-6 h-6 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{activite.duree}</span>
            </div>
          )}
          {activite.destinations && activite.destinations.length > 0 && (
            <div className="flex items-center gap-2 text-forest">
              <svg className="w-6 h-6 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">
                {activite.destinations.map(d => d.nom).join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <section className="prose prose-forest max-w-none" aria-labelledby="description-title">
          <h2 id="description-title" className="text-3xl font-bold text-forest mb-6 tracking-tight">
            {isFr ? 'Description' : 'Description'}
          </h2>
          <div className="text-muted text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: activite.description }} />
        </section>

        {/* Gallery */}
        {activite.galerie && activite.galerie.length > 1 && (
          <section aria-labelledby="gallery-title">
            <h2 id="gallery-title" className="sr-only">{isFr ? 'Galerie photos' : 'Photo gallery'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {activite.galerie.slice(1).map((img, i) => (
                <div key={img.documentId} className="relative aspect-[4/3] rounded-card overflow-hidden">
                  <Image
                    src={getContentImageUrl(img) || ''}
                    alt={img.alternativeText || `${activite.titre} - ${isFr ? 'Image' : 'Image'} ${i + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={img.formats?.thumbnail?.url || img.url}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Destinations */}
        {activite.destinations && activite.destinations.length > 0 && (
          <section aria-labelledby="destinations-title">
            <h2 id="destinations-title" className="text-3xl font-bold text-forest mb-6 tracking-tight">
              {t('relatedDestinations')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activite.destinations.map(dest => (
                <Link
                  key={dest.documentId}
                  href={`/${locale}/destinations/${dest.slug}`}
                  className="group bg-white rounded-card-lg overflow-hidden shadow-soft hover:shadow-medium transition-shadow border border-cream"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {dest.galerie?.[0] ? (
                      <Image
                        src={getContentImageUrl(dest.galerie[0]) || ''}
                        alt={dest.galerie[0].alternativeText || dest.nom}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={dest.galerie[0].formats?.thumbnail?.url || dest.galerie[0].url}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                        <span className="text-4xl">📍</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-forest mb-1 group-hover:text-emerald transition-colors">
                      {dest.nom}
                    </h3>
                    <p className="text-muted text-sm line-clamp-2">{dest.resume}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="pt-8 border-t border-cream">
          <Link
            href={`/${locale}/activites`}
            className="inline-flex items-center gap-2 text-emerald font-semibold hover:gap-3 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isFr ? 'Toutes les activités' : 'All activities'}
          </Link>
        </div>
      </div>
    </article>
  );
}
