import Link from 'next/link';
import { ArrowRight, Bird, Compass, Landmark, Utensils, Waves } from 'lucide-react';
import type { Locale } from '@/lib/langues';

interface ActivityItem {
  number: string;
  title: string;
  description: string;
  theme: string;
}

interface ActivitesProps {
  data: { title: string; items: ActivityItem[] };
  locale: Locale;
}

const activitySlugs = ['pirogue-bolongs', 'observation-oiseaux', 'villages-poterie-diola', 'marches-gastronomie'];
const activityIcons = [Waves, Bird, Landmark, Utensils];
const activityLabels = {
  fr: { eyebrow: 'À vivre sur place', explore: 'Découvrir', all: 'Toutes les expériences' },
  en: { eyebrow: 'Experiences to remember', explore: 'Discover', all: 'Explore all experiences' },
};

export function Activites({ data, locale }: ActivitesProps) {
  const labels = activityLabels[locale];

  return (
    <section className="section bg-[#102c22] text-white" aria-labelledby="activities-title">
      <div className="container-main">
        <header className="mb-9 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-lime">{labels.eyebrow}</p>
            <h2 id="activities-title" className="section-title mt-3 text-white">{data.title}</h2>
          </div>
          <Link href={`/${locale}/activites`} className="hidden shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-lime transition hover:text-white sm:inline-flex">
            {labels.all}<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label={labels.eyebrow}>
          {data.items.map((item, index) => {
            const Icon = activityIcons[index] || Compass;
            return (
              <article key={item.number} className="group flex min-h-[250px] flex-col rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition-colors hover:bg-white/[0.09] sm:min-h-[280px] sm:p-6" role="listitem">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-lime/15 text-lime">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold tracking-[0.14em] text-white/40">{item.number}</span>
                </div>
                <div className="mt-auto pt-9">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-lime">{item.theme}</p>
                  <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{item.description}</p>
                  <Link href={`/${locale}/activites/${activitySlugs[index] || activitySlugs[0]}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-lime transition-colors hover:text-white">
                    {labels.explore}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <Link href={`/${locale}/activites`} className="btn-primary mt-7 w-full justify-center bg-lime text-forest hover:bg-white sm:hidden">
          {labels.all}<ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
