'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Hebergement, Destination } from '@/lib/content';
import { ClientMap } from '@/components/ClientMap';
import type { MapMarker } from '@/components/Map';
import { getContentImageUrl } from '@/lib/content';

interface HebergementDetailClientProps {
  hebergement: Hebergement;
  locale: 'fr' | 'en';
}

const typeLabels: Record<Hebergement['type'], { fr: string; en: string }> = {
  campement: { fr: 'Campement', en: 'Campsite' },
  ecolodge: { fr: 'Écolodge', en: 'Ecolodge' },
  hotel: { fr: 'Hôtel', en: 'Hotel' },
};

const typeIcons: Record<Hebergement['type'], string> = {
  campement: '🏕️',
  ecolodge: '🌿',
  hotel: '🏨',
};

export default function HebergementDetailClient({ hebergement, locale }: HebergementDetailClientProps) {
  const t = useTranslations('hebergements');
  const isFr = locale === 'fr';
  const typeLabel = typeLabels[hebergement.type][locale];
  const typeIcon = typeIcons[hebergement.type] || '🏠';

  // Map marker
  const markers: MapMarker[] = [];
  if (hebergement.destination?.latitude && hebergement.destination?.longitude) {
    markers.push({
      lat: hebergement.destination.latitude,
      lng: hebergement.destination.longitude,
      title: hebergement.nom,
      description: `${typeLabel} • ${hebergement.prixIndicatif || ''}`,
      slug: hebergement.slug,
      type: 'hebergement',
    });
  }

  return (
    <article className="mx-auto w-full max-w-[1320px] space-y-10 px-5 py-7 sm:space-y-12 sm:px-8 sm:py-10">
      <nav aria-label={isFr ? 'Fil d’Ariane' : 'Breadcrumb'} className="flex items-center gap-2 text-sm text-muted">
        <Link href={`/${locale}`} className="font-medium text-emerald hover:text-forest">{isFr ? 'Accueil' : 'Home'}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${locale}/hebergements`} className="hover:text-forest">{isFr ? 'Hébergements' : 'Places to stay'}</Link>
      </nav>
      {/* Hero with Gallery */}
      <header className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
        <div className="relative h-[270px] sm:h-[340px] lg:h-[400px]">
          {hebergement.galerie?.[0] ? (
            <Image
              src={getContentImageUrl(hebergement.galerie[0]) || ''}
              alt={hebergement.galerie[0].alternativeText || hebergement.nom}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL={hebergement.galerie[0].formats?.thumbnail?.url ? (getContentImageUrl(hebergement.galerie[0].formats.thumbnail) || '') : (getContentImageUrl(hebergement.galerie[0]) || '')}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-forest via-leaf to-emerald flex items-center justify-center">
              <span className="text-8xl">{typeIcon}</span>
            </div>
          )}
          {/* Type badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-forest/90 backdrop-blur text-cream text-sm font-medium">
              {typeIcon} {typeLabel}
            </span>
          </div>
          {/* Price badge */}
          {hebergement.prixIndicatif && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-lime text-forest font-semibold">
                {hebergement.prixIndicatif}
              </span>
            </div>
          )}
        </div>

        {/* Gallery thumbnails */}
        {hebergement.galerie && hebergement.galerie.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {hebergement.galerie.slice(0, 6).map((img, i) => (
              <button
                key={img.documentId}
                className={`w-16 h-16 rounded-card overflow-hidden border-2 transition-all ${
                  i === 0 ? 'border-lime' : 'border-cream/50 hover:border-cream'
                }`}
                aria-label={isFr ? `Photo ${i + 1}` : `Photo ${i + 1}`}
              >
                <Image
                  src={getContentImageUrl(img) || ''}
                  alt={img.alternativeText || `${hebergement.nom} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
            {hebergement.galerie.length > 6 && (
              <div className="w-16 h-16 rounded-card bg-forest/80 backdrop-blur flex items-center justify-center border-2 border-cream/50">
                <span className="text-cream font-medium">+{hebergement.galerie.length - 6}</span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="space-y-12">
        {/* Title & Location */}
        <div>
          <div className="flex items-center gap-2 text-muted mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{hebergement.destination?.nom || (isFr ? 'Casamance' : 'Casamance')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest tracking-tight">{hebergement.nom}</h1>
        </div>

        {/* Description */}
        <section className="prose prose-forest max-w-none">
          <p className="text-lg text-muted leading-relaxed">{isFr ? 'Description à venir.' : 'Description coming soon.'}</p>
        </section>

        {/* Gallery Grid */}
        {hebergement.galerie && hebergement.galerie.length > 1 && (
          <section aria-labelledby="gallery-title">
            <h2 id="gallery-title" className="sr-only">{t('galleryTitle')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hebergement.galerie.slice(1).map((img, i) => (
                <div key={img.documentId} className="relative aspect-[4/3] rounded-card-lg overflow-hidden">
                  <Image
                    src={getContentImageUrl(img) || ''}
                    alt={img.alternativeText || `${hebergement.nom} ${i + 2}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Map */}
        {markers.length > 0 && (
          <section className="rounded-card-xl overflow-hidden" aria-labelledby="map-title">
            <h2 id="map-title" className="sr-only">{t('mapTitle')}</h2>
            <ClientMap markers={markers} height="400px" />
          </section>
        )}

        {/* Contact & WhatsApp */}
        <section className="bg-cream rounded-card-xl p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-forest">{t('contactTitle')}</h2>

          {hebergement.destination && (
            <div className="flex items-center gap-3 text-muted">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{hebergement.destination.nom}</span>
            </div>
          )}

          {hebergement.contactWhatsApp && (
            <a
              href={`https://wa.me/${hebergement.contactWhatsApp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-card-lg bg-emerald text-cream font-semibold hover:bg-leaf transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.454.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.472.099-.174.05-.369-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.42.01-.643.078-.223.068-.482.14-.74.213-.257.073-.573.283-.95.627-1.089.979-2.373 3.504-2.676 3.811-.297.3-.787.998-.916 1.092-.128.094-.262.148-.4.148-.149 0-.333-.053-.472-.148-.139-.094-.256-.171-.347-.347a1.064 1.064 0 01-.185-.53c-.044-.284-.085-.567-.086-.61-.006-.139-.042-.249-.185-.446-.128-.184-.347-.454-.644-.52-.297-.068-.49-.07-.669-.047-.186.02-.372.095-.521.243-.149.148-.28.372-.373.587-.094.213-.148.426-.196.64-.05.21-.124.38-.255.515-.297.3-.888.666-1.39 1.013-.635.437-1.064.863-1.263 1.15-.198.287-.298.598-.298.916 0 .318.094.64.254.916.174.298.403.74.683 1.144.28.405.52.74.669.868.149.128.297.283.52.373.213.09.455.15.74.15.24 0 .482-.028.71-.085.242-.06.506-.163.805-.347.273-.173.506-.398.71-.668.198-.273.347-.554.447-.834.1-.283.174-.633.242-.948.07-.33.097-.627.097-.883 0-.186-.027-.372-.12-.57-.078-.173-.198-.33-.353-.473-.148-.14-.347-.254-.59-.347a1.066 1.066 0 00-.52-.14c-.186 0-.386.036-.57.108-.184.068-.397.15-.66.252-.257.102-.557.233-.88.347-.297.105-.62.213-.948.347-.328.134-.69.283-1.08.447-.388.164-.814.347-1.262.57-.448.223-.92.454-1.418.71-.498.257-1.02.52-1.565.797-.545.277-1.12.56-1.72.847-.6.287-1.142.58-1.63.868-.488.288-.925.58-1.31.867-.385.287-.738.59-.947.97-.209.38-.294.778-.294 1.18 0 .405.086.835.254 1.248.168.413.473.967.867 1.653.395.687.868 1.41 1.41 2.17.54.76 1.128 1.52 1.75 2.28.625.76 1.21 1.51 1.75 2.25.54.74.994 1.45 1.358 2.13.364.68.64 1.335.837 1.965.197.63.31 1.25.34 1.85.03.6-.05 1.19-.254 1.78-.203.59-.53 1.15-.98 1.69-.45.54-.994 1.04-1.62 1.49-.625.45-1.3.84-2.02 1.17-.72.33-1.47.605-2.25.82-.78.215-1.59.367-2.43.46-1.084.122-2.2.144-3.36.144-.667 0-1.32-.014-1.97-.04-.65-.026-1.29-.065-1.93-.11-.64-.045-1.27-.106-1.89-.19-.62-.084-1.23-.2-1.82-.36-.59-.16-1.14-.356-1.67-.59-.53-.234-1.04-.5-1.54-.79-.5-.29-1-.61-1.51-.96-.51-.35-1.01-.73-1.49-1.14-.48-.41-.93-.85-1.36-1.32-.43-.47-.85-.97-1.26-1.51-.41-.54-.8-.1.11-.12-.13-.15-.17-.18-.2-.22-.24-.26-.28-.3-.32-.34-.36-.38-.4-.42-.44-.46-.48-.5-.52-.54-.56-.58-.6-.62-.64-.66-.68-.7-.72-.74-.76-.78-.8-.82-.84-.86-.88-.9-.92-.94-.96-.98-1-1.02-1.04-1.06-1.08-1.1-1.12-1.14-1.16-1.18-1.2-1.22-1.24-1.26-1.28-1.3-1.32-1.34-1.36-1.38-1.4-1.42-1.44-1.46-1.48-1.5-1.52-1.54-1.56-1.58-1.6-1.62-1.64-1.66-1.68-1.7-1.72-1.74-1.76-1.78-1.8-1.82-1.84-1.86-1.88-1.9-1.92-1.94-1.96-1.98-2-2.02-2.04-2.06-2.08-2.1-2.12-2.14-2.16-2.18-2.2-2.22-2.24-2.26-2.28-2.3-2.32-2.34-2.36-2.38-2.4-2.42-2.44-2.46-2.48-2.5-2.52-2.54-2.56-2.58-2.6-2.62-2.64-2.66-2.68-2.7-2.72-2.74-2.76-2.78-2.8-2.82-2.84-2.86-2.88-2.9-2.92-2.94-2.96-2.98-3" />
              </svg>
              {t('contactWhatsApp')}
            </a>
          )}
        </section>

        {/* Back to list */}
        <div className="pt-4 border-t border-forest/10">
          <Link
            href={`/${locale}/hebergements`}
            className="inline-flex items-center gap-2 text-emerald font-semibold hover:gap-3 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToList')}
          </Link>
        </div>
      </div>
    </article>
  );
}
