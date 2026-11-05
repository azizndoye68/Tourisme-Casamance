'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import { Hebergement, Destination } from '@/lib/contenu';
import { CarteInteractive } from '@/components/CarteInteractive';
import type { RepereCarte } from '@/components/Carte';
import { getContentImageUrl } from '@/lib/contenu';
import { getWhatsAppUrl } from '@/lib/lienWhatsApp';

interface DetailHebergementProps {
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

export default function DetailHebergement({ hebergement, locale }: DetailHebergementProps) {
  const t = useTranslations('hebergements');
  const isFr = locale === 'fr';
  const typeLabel = typeLabels[hebergement.type][locale];
  const typeIcon = typeIcons[hebergement.type] || '🏠';
  const whatsappUrl = getWhatsAppUrl(
    hebergement.contactWhatsApp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    isFr
      ? `Bonjour, je souhaite réserver ou obtenir des informations sur ${hebergement.nom}${hebergement.destination ? ` à ${hebergement.destination.nom}` : ''}.`
      : `Hello, I would like to book or get information about ${hebergement.nom}${hebergement.destination ? ` in ${hebergement.destination.nom}` : ''}.`,
  );

  // Map marker
  const markers: RepereCarte[] = [];
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
      {/* BandeauAccueil with Gallery */}
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
        <section className="prose prose-forest max-w-3xl">
          <p className="text-lg leading-8 text-muted">{hebergement.description}</p>
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
            <CarteInteractive markers={markers} height="400px" />
          </section>
        )}

        {/* Contact & WhatsApp */}
        <section className="overflow-hidden rounded-3xl bg-[#e8efe1] p-6 sm:p-9" aria-labelledby="stay-contact-title">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald">{isFr ? 'Réservation directe' : 'Direct enquiry'}</p>
              <h2 id="stay-contact-title" className="mt-2 text-2xl font-bold text-forest sm:text-3xl">{isFr ? 'Préparez votre séjour' : 'Plan your stay'}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">{isFr ? 'Contactez notre équipe pour vérifier les disponibilités et organiser votre arrivée.' : 'Contact our team to check availability and plan your arrival.'}</p>
              {hebergement.destination && <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-forest"><MapPin className="h-4 w-4 text-emerald" aria-hidden="true" />{hebergement.destination.nom}</p>}
            </div>
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1fb85a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {isFr ? 'Réserver sur WhatsApp' : 'Enquire on WhatsApp'}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
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
