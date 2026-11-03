'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Hebergement } from '@/lib/content';
import { getContentImageUrl } from '@/lib/content';
import { ClientMap } from '@/components/ClientMap';
import type { MapMarker } from '@/components/Map';

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
            {hebergement.contactWhatsApp && (
              <a
                href={`https://wa.me/${hebergement.contactWhatsApp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-pill bg-lime text-forest font-semibold hover:bg-lime/80 transition-colors whitespace-nowrap text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.472.099-.174.05-.372-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.42.01-.643.078-.223.068-.482.149-.748.373-.265.224-.46.569-.46.569s-.298.399-.536.748c-.238.347-.366.64-.44.713-.074.075-.124.148-.249.223-.124.074-.249.2-.423.273-.173.074-.414.224-.69.573-.112.148-.25.334-.386.521L3.493 4.867c-.123-.172-.372-.298-.644-.297-.273.009-.469.198-.617.573-.148.373-.149.774 0 1.151l2.688 5.445c.099.224.298.599.546.922.224.298.47.574.817.847.348.274.669.473 1.05.627.633.25 1.576.025 2.47-.642.572-.422 1.02-.898 1.328-1.279.149-.174.42-.52.798-1.071.372-.549.498-1.05.677-1.349.18-.301.27-.582.353-.847.099-.299.047-.573-.05-.748z" />
                </svg>
                {isFr ? 'WhatsApp' : 'WhatsApp'}
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
