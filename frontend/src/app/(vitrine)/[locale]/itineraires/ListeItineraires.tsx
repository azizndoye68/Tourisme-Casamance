import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin, Route } from 'lucide-react';
import type { Itineraire } from '@/lib/contenu';

interface ListeItinerairesProps {
  itineraires: Itineraire[];
  locale: 'fr' | 'en';
  labels: {
    pageTitle: string;
    pageDescription: string;
    viewItinerary: string;
    noItineraries: string;
  };
}

const editorialPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Cap-Skirring-Beach-2007.jpg/960px-Cap-Skirring-Beach-2007.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mangroves_in_Casamance.jpg/960px-Mangroves_in_Casamance.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/c4/Fleuve_casamance.jpg',
];

const translations = {
  fr: { eyebrow: 'Des idées de séjour', days: 'jours', stops: 'étapes', route: 'Le parcours', duration: 'De 3 à 7 jours', region: 'Du fleuve à l’océan' },
  en: { eyebrow: 'Ideas for your trip', days: 'days', stops: 'stops', route: 'The route', duration: '3 to 7 days', region: 'From river to ocean' },
};

function shortPlace(title: string) {
  return title.split(' - ')[0].split(' — ')[0].trim();
}

export default function ListeItineraires({ itineraires, locale, labels }: ListeItinerairesProps) {
  const copy = translations[locale];

  return (
    <div className="container-main space-y-8 py-8 sm:space-y-10 sm:py-12">
      <header className="grid gap-7 overflow-hidden rounded-3xl bg-[#e8efe1] p-6 sm:p-9 md:grid-cols-[1fr_auto] md:items-end md:p-12">
        <div className="max-w-2xl">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="section-title mt-3">{labels.pageTitle}</h1>
          <p className="section-subtitle mx-0">{labels.pageDescription}</p>
        </div>
        <div className="flex flex-wrap gap-2 md:max-w-56 md:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2.5 text-sm font-semibold text-forest">
            <CalendarDays className="h-4 w-4 text-emerald" aria-hidden="true" /> {copy.duration}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2.5 text-sm font-semibold text-forest">
            <Route className="h-4 w-4 text-emerald" aria-hidden="true" /> {copy.region}
          </span>
        </div>
      </header>

      {itineraires.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" role="list" aria-label={labels.pageTitle}>
          {itineraires.map((itineraire, index) => {
            const photo = editorialPhotos[index % editorialPhotos.length];
            const places = itineraire.etapes.map((step) => shortPlace(step.titre)).filter(Boolean);

            return (
              <article key={itineraire.documentId} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-[0_10px_35px_-25px_rgba(14,42,32,.5)] transition-shadow hover:shadow-[0_18px_42px_-24px_rgba(14,42,32,.4)]" role="listitem">
                <div className="relative h-48 overflow-hidden bg-forest sm:h-52">
                  <Image
                    src={photo}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/65 via-transparent to-forest/10" aria-hidden="true" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-forest shadow-sm">
                    <CalendarDays className="h-4 w-4 text-emerald" aria-hidden="true" />
                    {itineraire.nombreJours} {copy.days}
                  </span>
                  <span className="absolute bottom-4 right-4 rounded-full border border-white/40 bg-forest/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    {places.length} {copy.stops}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-forest sm:text-2xl">
                    <Link href={`/${locale}/itineraires/${itineraire.slug}`} className="hover:text-emerald focus-visible:text-emerald">
                      {itineraire.titre}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{itineraire.resume}</p>

                  <div className="mt-5 border-t border-forest/10 pt-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-emerald">{copy.route}</p>
                    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
                      {places.slice(0, 4).map((place, placeIndex) => (
                        <li key={`${itineraire.slug}-${placeIndex}`} className="inline-flex items-center gap-2 text-xs font-medium text-forest/75">
                          {placeIndex > 0 && <span className="text-emerald/50" aria-hidden="true">·</span>}
                          <span>{place}</span>
                        </li>
                      ))}
                      {places.length > 4 && <li className="text-xs font-semibold text-emerald">+{places.length - 4}</li>}
                    </ol>
                  </div>

                  <Link href={`/${locale}/itineraires/${itineraire.slug}`} className="mt-auto flex min-h-12 items-center justify-between border-t border-forest/10 pt-4 text-sm font-semibold text-forest transition-colors hover:text-emerald">
                    {labels.viewItinerary}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl bg-white px-5 py-16 text-center text-muted shadow-soft">
          <MapPin className="mx-auto h-8 w-8 text-emerald" aria-hidden="true" />
          <p className="mt-4">{labels.noItineraries}</p>
        </div>
      )}
    </div>
  );
}
