'use client';

import { cn } from '@/lib/utils';

interface SeasonData {
  label: string;
  period: string;
  description: string;
}

interface WhenToGoData {
  title: string;
  drySeason: SeasonData;
  wetSeason: SeasonData;
}

interface WhenToGoProps {
  data: WhenToGoData;
}

const months = [
  'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
  'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
];

const dryMonths = [10, 11, 0, 1, 2, 3, 4]; // Nov-May
const wetMonths = [5, 6, 7, 8, 9]; // Jun-Oct

export function WhenToGo({ data }: WhenToGoProps) {
  return (
    <section className="section bg-cream" aria-labelledby="when-title">
      <div className="container-main">
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="when-title" className="section-title">
            {data.title}
          </h2>
        </header>
        <div className="grid md:grid-cols-2 gap-8 mb-12" role="list" aria-label="Saisons">
          <article
            className={cn(
              'card p-8 text-center relative overflow-hidden',
              'bg-gradient-to-br from-sun/10 to-sun/5 border-sun/20'
            )}
            role="listitem"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sun/20 rounded-full blur-2xl" aria-hidden="true" />
            <div className="relative">
              <span className="inline-block px-3 py-1 rounded-pill bg-sun/20 text-sun text-caption font-medium mb-4">
                {data.drySeason.period}
              </span>
              <h3 className="font-display text-2xl font-bold text-forest mb-4">
                {data.drySeason.label}
              </h3>
              <p className="text-muted mb-6">{data.drySeason.description}</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {['Idéal plages', 'Pirogue', 'Observation oiseaux', 'Randonnée'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-pill bg-sun/10 text-sun text-caption font-medium border border-sun/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
          <article
            className={cn(
              'card p-8 text-center relative overflow-hidden',
              'bg-gradient-to-br from-emerald/10 to-emerald/5 border-emerald/20'
            )}
            role="listitem"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/20 rounded-full blur-2xl" aria-hidden="true" />
            <div className="relative">
              <span className="inline-block px-3 py-1 rounded-pill bg-emerald/20 text-emerald text-caption font-medium mb-4">
                {data.wetSeason.period}
              </span>
              <h3 className="font-display text-2xl font-bold text-forest mb-4">
                {data.wetSeason.label}
              </h3>
              <p className="text-muted mb-6">{data.wetSeason.description}</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {['Verdure max', 'Prix doux', 'Moins de monde', 'Photos uniques'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-pill bg-emerald/10 text-emerald text-caption font-medium border border-emerald/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
        <div className="card p-8 bg-white">
          <h3 className="font-display text-lg font-bold text-forest mb-6 text-center">Calendrier annuel</h3>
          <div className="month-strip" role="list" aria-label="Mois de l'année">
            {months.map((month, index) => {
              const isDry = dryMonths.includes(index);
              const isWet = wetMonths.includes(index);
              return (
                <span
                  key={month}
                  className={cn(
                    'month-strip-item',
                    isDry ? 'active' : 'inactive'
                  )}
                  role="listitem"
                  aria-label={`${month} - ${isDry ? 'Saison sèche' : 'Hivernage'}`}
                >
                  {month}
                </span>
              );
            })}
          </div>
          <div className="flex justify-center gap-6 mt-6 text-caption">
            <span className="flex items-center gap-1.5 text-lime">
              <span className="w-3 h-3 rounded-full bg-lime" aria-hidden="true" />
              Saison sèche (nov-mai)
            </span>
            <span className="flex items-center gap-1.5 text-emerald">
              <span className="w-3 h-3 rounded-full bg-emerald" aria-hidden="true" />
              Hivernage (juin-oct)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}