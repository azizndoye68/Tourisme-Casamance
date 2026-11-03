'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Destination, Activite, Hebergement } from '@/lib/content';
import { ClientMap } from '@/components/ClientMap';
import type { MapMarker } from '@/components/Map';
import { getContentImageUrl } from '@/lib/content';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface DestinationDetailClientProps {
  destination: Destination;
  activites: Activite[];
  hebergements: Hebergement[];
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

export default function DestinationDetailClient({ destination, activites, hebergements, locale }: DestinationDetailClientProps) {
  const t = useTranslations('destinations');
  const isFr = locale === 'fr';
  const typeLabel = typeLabels[destination.type][locale];
  const typeIcon = typeIcons[destination.type] || '📍';
  const whatsappUrl = getWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    isFr
      ? `Bonjour, je prépare un séjour en Casamance et je souhaite des informations pour découvrir ${destination.nom}.`
      : `Hello, I am planning a trip to Casamance and would like information about visiting ${destination.nom}.`,
  );

  // Map markers
  const markers: MapMarker[] = [];
  if (destination.latitude && destination.longitude) {
    markers.push({
      lat: destination.latitude,
      lng: destination.longitude,
      title: destination.nom,
      description: destination.resume,
      slug: destination.slug,
      type: 'destination',
    });
  }

  // Activity markers
  activites.forEach(a => {
    // Activities don't have direct lat/lng, but we could link to destination
  });

  // Accommodation markers
  hebergements.forEach(h => {
    if (h.destination?.latitude && h.destination?.longitude) {
      markers.push({
        lat: h.destination.latitude,
        lng: h.destination.longitude,
        title: h.nom,
        description: `${h.type} • ${h.prixIndicatif || ''}`,
        slug: h.slug,
        type: 'hebergement',
      });
    }
  });

  return (
    <article className="mx-auto w-full max-w-[1320px] space-y-10 px-5 py-7 sm:space-y-12 sm:px-8 sm:py-10">
      <nav aria-label={isFr ? 'Fil d’Ariane' : 'Breadcrumb'} className="flex items-center gap-2 text-sm text-muted">
        <Link href={`/${locale}`} className="font-medium text-emerald hover:text-forest">{isFr ? 'Accueil' : 'Home'}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${locale}/destinations`} className="hover:text-forest">{isFr ? 'Destinations' : 'Destinations'}</Link>
      </nav>
      {/* Hero with Gallery */}
      <header className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
        <div className="relative h-[270px] sm:h-[340px] lg:h-[400px]">
          {destination.galerie?.[0] ? (
            <Image
              src={getContentImageUrl(destination.galerie[0]) || ''}
              alt={destination.galerie[0].alternativeText || destination.nom}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={destination.galerie[0].formats?.thumbnail?.url || destination.galerie[0].url}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-forest via-leaf to-emerald flex items-center justify-center">
              <span className="text-9xl">{typeIcon}</span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-cream sm:p-8 md:p-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1.5 text-sm font-semibold text-forest">
                  {typeIcon} {typeLabel}
                </span>
                {destination.miseEnAvant && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-forest">
                    ⭐ {isFr ? 'À la une' : 'Featured'}
                  </span>
                )}
              </div>
              <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                {destination.nom}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">{destination.resume}</p>
            </div>
          </div>
        </div>

        {/* Gallery thumbnails */}
        {destination.galerie && destination.galerie.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {destination.galerie.slice(0, 6).map((img, i) => (
              <button
                key={img.documentId}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  i === 0 ? 'border-emerald scale-110' : 'border-cream/50 hover:border-emerald'
                }`}
                aria-label={`${isFr ? 'Image' : 'Image'} ${i + 1}`}
              >
                <Image
                  src={getContentImageUrl(img) || ''}
                  alt={`${destination.nom} - ${isFr ? 'Image' : 'Image'} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* Description */}
        <section className="prose prose-forest max-w-none" aria-labelledby="description-title">
          <h2 id="description-title" className="text-3xl font-bold text-forest mb-6 tracking-tight">
            {isFr ? 'Description' : 'Description'}
          </h2>
          <div className="text-muted text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: destination.description }} />
        </section>

        <section className="relative overflow-hidden rounded-3xl bg-forest px-6 py-8 text-white sm:px-9 sm:py-10" aria-labelledby="destination-contact-title">
          <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border-[36px] border-lime/10" aria-hidden="true" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime">{isFr ? 'On prépare votre escapade' : 'Let’s plan your trip'}</p>
              <h2 id="destination-contact-title" className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                {isFr ? `Envie de découvrir ${destination.nom} ?` : `Ready to discover ${destination.nom}?`}
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/75 sm:text-base">
                {isFr ? 'Écrivez-nous pour préparer votre séjour et trouver les bonnes adresses.' : 'Message us to plan your stay and find local recommendations.'}
              </p>
            </div>
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1fb85a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {isFr ? 'Nous écrire sur WhatsApp' : 'Message us on WhatsApp'}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </section>

        {/* Map */}
        {markers.length > 0 && (
          <section aria-labelledby="map-title">
            <h2 id="map-title" className="sr-only">{isFr ? 'Localisation sur la carte' : 'Location on map'}</h2>
            <ClientMap markers={markers} height="450px" center={[destination.latitude!, destination.longitude!]} zoom={11} />
          </section>
        )}

        {/* Coordinates */}
        {destination.latitude && destination.longitude && (
          <section className="bg-mint/30 rounded-card-lg p-6">
            <h3 className="text-xl font-semibold text-forest mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {isFr ? 'Coordonnées GPS' : 'GPS Coordinates'}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-muted">
              <div>
                <span className="font-medium">{isFr ? 'Latitude' : 'Latitude'}</span>
                <p className="font-mono">{destination.latitude.toFixed(6)}°</p>
              </div>
              <div>
                <span className="font-medium">{isFr ? 'Longitude' : 'Longitude'}</span>
                <p className="font-mono">{destination.longitude.toFixed(6)}°</p>
              </div>
            </div>
            <div className="mt-4">
              <a
                href={`https://www.openstreetmap.org/?mlat=${destination.latitude}&mlon=${destination.longitude}#map=14/${destination.latitude}/${destination.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald font-medium hover:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {isFr ? 'Voir sur OpenStreetMap' : 'View on OpenStreetMap'}
              </a>
            </div>
          </section>
        )}

        {/* Tags */}
        {destination.tags && destination.tags.length > 0 && (
          <section aria-labelledby="tags-title">
            <h3 id="tags-title" className="sr-only">{isFr ? 'Thèmes' : 'Themes'}</h3>
            <div className="flex flex-wrap gap-2">
              {destination.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-card bg-emerald/10 text-emerald font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Related Activities */}
        {activites.length > 0 && (
          <section aria-labelledby="activities-title">
            <h2 id="activities-title" className="text-3xl font-bold text-forest mb-6 tracking-tight">
              {t('relatedActivities')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activites.map(activite => (
                <Link
                  key={activite.documentId}
                  href={`/${locale}/activites/${activite.slug}`}
                  className="group bg-white rounded-card-lg p-6 shadow-soft hover:shadow-medium transition-shadow border border-cream"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-emerald/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{activite.theme === 'Nature' ? '🌿' : activite.theme === 'Culture' ? '🏛️' : activite.theme === 'Gastronomie' ? '🍽️' : '🎯'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-forest group-hover:text-emerald transition-colors mb-1">
                        {activite.titre}
                      </h3>
                      <p className="text-muted text-sm mb-2 line-clamp-2">{activite.resume}</p>
                      <div className="flex items-center gap-3 text-sm text-muted">
                        <span className="px-2 py-1 rounded-pill bg-forest/10 text-forest font-medium">
                          {activite.theme}
                        </span>
                        {activite.duree && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {activite.duree}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Accommodations */}
        {hebergements.length > 0 && (
          <section aria-labelledby="hebergements-title">
            <h2 id="hebergements-title" className="text-3xl font-bold text-forest mb-6 tracking-tight">
              {t('whereToStay')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hebergements.map(hebergement => (
                <Link
                  key={hebergement.documentId}
                  href={`/${locale}/hebergements/${hebergement.slug}`}
                  className="group bg-white rounded-card-lg overflow-hidden shadow-soft hover:shadow-medium transition-shadow border border-cream"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {hebergement.galerie?.[0] ? (
                      <Image
                        src={getContentImageUrl(hebergement.galerie[0]) || ''}
                        alt={hebergement.galerie[0].alternativeText || hebergement.nom}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={hebergement.galerie[0].formats?.thumbnail?.url || hebergement.galerie[0].url}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                        <span className="text-4xl">🛏️</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-pill text-sm font-medium ${
                        hebergement.type === 'hotel' ? 'bg-emerald text-cream' :
                        hebergement.type === 'ecolodge' ? 'bg-leaf text-cream' :
                        'bg-lime text-forest'
                      }`}>
                        {hebergement.type === 'hotel' ? '🏨' : hebergement.type === 'ecolodge' ? '🌿' : '⛺'} {hebergement.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-forest mb-1 group-hover:text-emerald transition-colors">
                      {hebergement.nom}
                    </h3>
                    {hebergement.destination && (
                      <p className="text-muted text-sm mb-3">{hebergement.destination.nom}</p>
                    )}
                    <div className="flex items-center justify-between">
                      {hebergement.prixIndicatif && (
                        <span className="text-emerald font-bold text-lg">{hebergement.prixIndicatif}</span>
                      )}
                      {hebergement.contactWhatsApp && (
                        <a
                          href={`https://wa.me/${hebergement.contactWhatsApp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-lime text-forest text-sm font-semibold hover:bg-lime/80 transition-colors whitespace-nowrap"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.472.099-.174.05-.372-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.42.01-.643.078-.223.068-.482.149-.748.373-.265.224-.46.569-.46.569s-.298.399-.536.748c-.238.347-.366.64-.44.713-.074.075-.124.148-.249.223-.124.074-.249.2-.423.273-.173.074-.414.224-.69.573-.112.148-.25.334-.386.521L3.493 4.867c-.123-.172-.372-.298-.644-.297-.273.009-.469.198-.617.573-.148.373-.149.774 0 1.151l2.688 5.445c.099.224.298.599.546.922.224.298.47.574.817.847.348.274.669.473 1.05.627.633.25 1.576.025 2.47-.642.572-.422 1.02-.898 1.328-1.279.149-.174.42-.52.798-1.071.372-.549.498-1.05.677-1.349.18-.301.27-.582.353-.847.099-.299.047-.573-.05-.748z" />
                          </svg>
                          {isFr ? 'WhatsApp' : 'WhatsApp'}
                        </a>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="pt-8 border-t border-cream">
          <Link
            href={`/${locale}/destinations`}
            className="inline-flex items-center gap-2 text-emerald font-semibold hover:gap-3 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isFr ? 'Toutes les destinations' : 'All destinations'}
          </Link>
        </div>
      </div>
    </article>
  );
}
