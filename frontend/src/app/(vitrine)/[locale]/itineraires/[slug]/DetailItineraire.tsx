'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Itineraire, ItineraireEtape } from '@/lib/contenu';
import { CarteInteractive } from '@/components/CarteInteractive';
import type { RepereCarte } from '@/components/Carte';
import { getContentImageUrl } from '@/lib/contenu';

interface DetailItineraireProps {
  itineraire: Itineraire;
  locale: 'fr' | 'en';
}

export default function DetailItineraire({ itineraire, locale }: DetailItineraireProps) {
  const t = useTranslations('itineraires');
  const isFr = locale === 'fr';

  // Prepare map markers from etapes
  const markers: RepereCarte[] = itineraire.etapes
    .filter(etape => etape.destination?.latitude && etape.destination?.longitude)
    .map((etape, index) => ({
      lat: etape.destination!.latitude!,
      lng: etape.destination!.longitude!,
      title: `Jour ${etape.jour}: ${etape.titre}`,
      description: etape.destination?.nom,
      slug: etape.destination?.slug,
      type: 'destination' as const,
    }));

  // Get unique destinations for map
  const uniqueDestinations: Record<string, NonNullable<ItineraireEtape['destination']>> = {};
  itineraire.etapes
    .filter(e => e.destination)
    .forEach(e => {
      const key = e.destination!.documentId;
      if (!uniqueDestinations[key]) {
        uniqueDestinations[key] = e.destination!;
      }
    });

  const destinationMarkers: RepereCarte[] = Object.values(uniqueDestinations)
    .filter((d): d is NonNullable<ItineraireEtape['destination']> => d != null && d.latitude != null && d.longitude != null)
    .map(d => ({
      lat: d.latitude!,
      lng: d.longitude!,
      title: d.nom,
      description: d.resume,
      slug: d.slug,
      type: 'destination' as const,
    }));

  return (
    <article className="mx-auto w-full max-w-[1320px] space-y-10 px-5 py-7 sm:space-y-12 sm:px-8 sm:py-10">
      <nav aria-label={isFr ? 'Fil d’Ariane' : 'Breadcrumb'} className="flex items-center gap-2 text-sm text-muted">
        <Link href={`/${locale}`} className="font-medium text-emerald hover:text-forest">{isFr ? 'Accueil' : 'Home'}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${locale}/itineraires`} className="hover:text-forest">{isFr ? 'Itinéraires' : 'Itineraires'}</Link>
      </nav>
      {/* BandeauAccueil */}
      <header className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
        <div className="relative h-[260px] bg-gradient-to-br from-forest via-leaf to-emerald sm:h-[320px]">
          <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-cream">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-emerald text-forest font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {itineraire.nombreJours} {isFr ? 'jours' : 'days'}
                </span>
                {Object.keys(uniqueDestinations).length > 0 && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-lime text-forest font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {Object.keys(uniqueDestinations).length} {isFr ? 'étapes' : 'stops'}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                {itineraire.titre}
              </h1>
              <p className="text-lg md:text-xl text-mint/90 max-w-2xl">{itineraire.resume}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 space-y-16">
        {/* Map Overview */}
        {destinationMarkers.length > 0 && (
          <section aria-labelledby="map-title">
            <h2 id="map-title" className="sr-only">{isFr ? 'Carte de l\'itinéraire' : 'Itinerary map'}</h2>
            <CarteInteractive
              markers={destinationMarkers}
              height="450px"
              fitBounds
              center={destinationMarkers[0] ? [destinationMarkers[0].lat, destinationMarkers[0].lng] : [12.5, -16.3]}
            />
          </section>
        )}

        {/* Day by Day */}
        <section aria-labelledby="steps-title">
          <h2 id="steps-title" className="text-3xl font-bold text-forest mb-8 tracking-tight">
            {t('dayByDay')}
          </h2>
          <div className="space-y-8">
            {itineraire.etapes.map((etape, index) => (
              <article
                key={etape.id}
                className="group relative bg-white rounded-card-xl p-6 md:p-8 shadow-soft hover:shadow-medium transition-shadow border border-cream before:absolute before:left-6 before:top-[50px] before:bottom-[50px] before:w-0.5 before:bg-cream last:before:hidden"
              >
                {/* Day number */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-emerald text-cream flex items-center justify-center text-xl font-bold -translate-x-1/2">
                  {etape.jour}
                </div>

                <div className="ml-12 space-y-4">
                  {/* Title and destination */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-forest mb-1">{etape.titre}</h3>
                      {etape.destination && (
                        <Link
                          href={`/${locale}/destinations/${etape.destination.slug}`}
                          className="inline-flex items-center gap-1.5 text-emerald font-medium hover:gap-3 transition-all text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {etape.destination.nom}
                        </Link>
                      )}
                    </div>
                    {etape.destination?.galerie?.[0] && (
                      <Link
                        href={`/${locale}/destinations/${etape.destination.slug}`}
                        className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-cream"
                      >
                        <Image
                          src={getContentImageUrl(etape.destination.galerie[0]) || ''}
                          alt={etape.destination.galerie[0].alternativeText || etape.destination.nom}
                          fill
                          className="object-cover"
                          sizes="96px"
                          placeholder="blur"
                          blurDataURL={etape.destination.galerie[0].formats?.thumbnail?.url || etape.destination.galerie[0].url}
                        />
                      </Link>
                    )}
                  </div>

                  {/* Description */}
                  <div className="prose prose-forest max-w-none text-muted" dangerouslySetInnerHTML={{ __html: etape.texte }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="bg-mint/30 rounded-card-xl p-8" aria-labelledby="summary-title">
          <h2 id="summary-title" className="text-2xl font-bold text-forest mb-6 tracking-tight">
            {t('summary')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-card bg-white shadow-soft">
              <div className="text-4xl font-bold text-emerald mb-1">{itineraire.nombreJours}</div>
              <div className="text-muted">{isFr ? 'Jours' : 'Days'}</div>
            </div>
            <div className="text-center p-4 rounded-card bg-white shadow-soft">
              <div className="text-4xl font-bold text-leaf mb-1">{Object.keys(uniqueDestinations).length}</div>
              <div className="text-muted">{isFr ? 'Destinations' : 'Destinations'}</div>
            </div>
            <div className="text-center p-4 rounded-card bg-white shadow-soft">
              <div className="text-4xl font-bold text-forest mb-1">
                {itineraire.etapes.reduce((acc, e) => acc + (e.texte?.length || 0), 0) > 0 ? '✓' : '—'}
              </div>
              <div className="text-muted">{isFr ? 'Étapes détaillées' : 'Detailed steps'}</div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="pt-8 border-t border-cream">
          <Link
            href={`/${locale}/itineraires`}
            className="inline-flex items-center gap-2 text-emerald font-semibold hover:gap-3 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isFr ? 'Tous les itinéraires' : 'All itineraries'}
          </Link>
        </div>
      </div>
    </article>
  );
}
