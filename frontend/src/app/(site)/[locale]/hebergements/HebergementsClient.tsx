'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Hebergement } from '@/lib/content';
import { getContentImageUrl } from '@/lib/content';
import { ClientMap } from '@/components/ClientMap';
import type { MapMarker } from '@/components/Map';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface HebergementsClientProps {
  hebergements: Hebergement[];
  locale: 'fr' | 'en';
}

const typeConfig: Record<Hebergement['type'], { icon: string; label: { fr: string; en: string }; color: string }> = {
  hotel: { icon: '🏨', label: { fr: 'Hôtel', en: 'Hotel' }, color: 'bg-emerald/10 text-emerald border-emerald/20' },
  ecolodge: { icon: '🌿', label: { fr: 'Écolodge', en: 'Ecolodge' }, color: 'bg-leaf/10 text-leaf border-leaf/20' },
  campement: { icon: '🏕️', label: { fr: 'Campement', en: 'Campsite' }, color: 'bg-lime/20 text-lime border-lime/30' },
};

export default function HebergementsClient({ hebergements, locale }: HebergementsClientProps) {
  const t = useTranslations('hebergements');
  const isFr = locale === 'fr';

  // Prepare map markers
  const markers: MapMarker[] = hebergements
    .filter(h => h.destination?.latitude && h.destination?.longitude)
    .map(h => ({
      lat: h.destination!.latitude!,
      lng: h.destination!.longitude!,
      title: h.nom,
      description: `${typeConfig[h.type].label[locale]} • ${h.prixIndicatif || ''}`,
      slug: h.slug,
      type: 'hebergement' as const,
    }));

  // Group by type
  const grouped = hebergements.reduce((acc, h) => {
    if (!acc[h.type]) acc[h.type] = [];
    acc[h.type].push(h);
    return acc;
  }, {} as Record<Hebergement['type'], Hebergement[]>);

  const typeOrder: Hebergement['type'][] = ['hotel', 'ecolodge', 'campement'];

  const renderCard = (hebergement: Hebergement) => {
    const config = typeConfig[hebergement.type];
    const whatsappUrl = getWhatsAppUrl(
      hebergement.contactWhatsApp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
      isFr
        ? `Bonjour, je souhaite réserver ou obtenir des informations sur ${hebergement.nom}.`
        : `Hello, I would like to book or get information about ${hebergement.nom}.`,
    );

    return (
      <article
        key={hebergement.documentId}
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
              <span className="text-5xl">{config.icon}</span>
            </div>
          )}

          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-sm font-medium border ${config.color}`}>
              {config.icon} {config.label[locale]}
            </span>
          </div>

          {hebergement.prixIndicatif && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-pill bg-forest/90 backdrop-blur text-cream text-sm font-semibold">
                {hebergement.prixIndicatif}
              </span>
            </div>
          )}
        </div>

        <div className="p-5 space-y-3">
          <h3 className="text-xl font-semibold text-forest group-hover:text-emerald transition-colors">
            <Link href={`/${locale}/hebergements/${hebergement.slug}`}>{hebergement.nom}</Link>
          </h3>

          <p className="line-clamp-2 text-sm leading-6 text-muted">{hebergement.description}</p>

          {hebergement.destination && (
            <Link
              href={`/${locale}/destinations/${hebergement.destination.slug}`}
              className="inline-flex items-center gap-1.5 text-muted text-sm hover:text-emerald transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {hebergement.destination.nom}
            </Link>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-cream">
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1fb85a]" onClick={(event) => event.stopPropagation()}>
                <span aria-hidden="true">◉</span>
                WhatsApp
              </a>
            )}
            <Link
              href={`/${locale}/hebergements/${hebergement.slug}`}
              className="inline-flex items-center gap-1.5 text-emerald font-medium hover:gap-3 transition-all text-sm"
            >
              {t('viewDetails')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="container-main space-y-12 py-10 sm:space-y-16 sm:py-14">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest tracking-tight mb-4">
          {t('pageTitle')}
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          {t('pageDescription')}
        </p>
      </header>

      {/* By Type Sections */}
      {typeOrder.map(type => {
        const items = grouped[type];
        if (!items || items.length === 0) return null;
        const config = typeConfig[type];

        return (
          <section key={type} aria-labelledby={`type-${type}`} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 id={`type-${type}`} className="text-3xl font-bold text-forest tracking-tight">
                {config.icon} {config.label[locale]}
              </h2>
              <div className="flex-1 h-px bg-cream" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => renderCard(item))}
            </div>
          </section>
        );
      })}

      {markers.length > 0 && (
        <section className="rounded-2xl bg-white p-3 shadow-soft sm:p-5" aria-labelledby="map-title">
          <h2 id="map-title" className="section-title mb-5 text-2xl">{t('mapTitle')}</h2>
          <ClientMap markers={markers} height="min(60vh, 420px)" fitBounds />
        </section>
      )}

      {hebergements.length === 0 && (
        <div className="text-center py-16 text-muted">
          <p>{t('noAccommodations')}</p>
        </div>
      )}
    </div>
  );
}
