import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Locale } from '@/lib/langues';

interface ItineraryItem {
  days: number;
  title: string;
  steps: string[];
}

interface ItinerairesProps {
  data: { title: string; items: ItineraryItem[] };
  locale: Locale;
}

const itinerarySlugs = {
  fr: ['le-grand-classique', 'nature-et-culture', 'la-casamance-complete'],
  en: ['the-great-classic', 'nature-and-culture', 'complete-casamance'],
};
const labels = {
  fr: { eyebrow: 'Le voyage, tout simplement', days: 'jours', stages: 'étapes', discover: 'Voir le circuit', all: 'Voir tous les itinéraires' },
  en: { eyebrow: 'A journey at your own pace', days: 'days', stages: 'stops', discover: 'View itinerary', all: 'Explore all itineraries' },
};

export function Itineraires({ data, locale }: ItinerairesProps) {
  const copy = labels[locale];

  return (
    <section className="section bg-[#f4f3eb]" aria-labelledby="itineraries-title">
      <div className="container-main">
        <header className="mb-9 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="itineraries-title" className="section-title mt-3">{data.title}</h2>
          </div>
          <Link href={`/${locale}/itineraires`} className="hidden shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-emerald transition hover:text-forest sm:inline-flex">
            {copy.all}<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </header>

        <div className="grid gap-4 lg:grid-cols-3" role="list" aria-label={data.title}>
          {data.items.map((item, index) => (
            <article key={item.title} className="flex flex-col rounded-2xl border border-forest/10 bg-white p-5 shadow-[0_10px_30px_-25px_rgba(14,42,32,.5)] sm:p-7" role="listitem">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {String(data.items.length).padStart(2, '0')}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-forest sm:text-2xl">{item.title}</h3>
                </div>
                <div className="shrink-0 rounded-xl bg-lime/35 px-3 py-2 text-center text-forest">
                  <span className="block font-display text-2xl font-bold leading-none">{item.days}</span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-wide">{copy.days}</span>
                </div>
              </div>

              <div className="mt-6 flex-1 border-l border-emerald/20 pl-4">
                <ol className="space-y-3">
                  {item.steps.slice(0, 4).map((step, stepIndex) => (
                    <li key={`${item.title}-${stepIndex}`} className="relative flex items-start gap-2 text-sm leading-5 text-muted">
                      <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full border-2 border-emerald bg-white" aria-hidden="true" />
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" aria-hidden="true" />
                      {step}
                    </li>
                  ))}
                </ol>
                {item.steps.length > 4 && <p className="mt-3 text-xs font-semibold text-emerald">+ {item.steps.length - 4} {copy.stages}</p>}
              </div>

              <Link href={`/${locale}/itineraires/${itinerarySlugs[locale][index] || itinerarySlugs[locale][0]}`} className="mt-7 inline-flex min-h-11 items-center justify-between border-t border-forest/10 pt-4 text-sm font-semibold text-forest transition-colors hover:text-emerald">
                {copy.discover}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <Link href={`/${locale}/itineraires`} className="btn-outline mt-7 w-full justify-center sm:hidden">
          {copy.all}<ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
