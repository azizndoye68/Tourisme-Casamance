'use client';

import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

interface ActivityItem {
  number: string;
  title: string;
  description: string;
  theme: string;
}

interface ActivitiesData {
  title: string;
  items: ActivityItem[];
}

interface ActivitiesProps {
  data: ActivitiesData;
}

const themeColors: Record<string, string> = {
  Nature: 'bg-emerald/10 text-emerald border-emerald/20',
  Culture: 'bg-coral/10 text-coral border-coral/20',
  Gastronomie: 'bg-sun/10 text-sun border-sun/20',
  Gastronomy: 'bg-sun/10 text-sun border-sun/20',
};

export function Activities({ data }: ActivitiesProps) {
  const locale = useLocale();

  return (
    <section className="section bg-forest text-cream" aria-labelledby="activities-title">
      <div className="container-main">
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="activities-title" className="section-title text-cream">
            {data.title}
          </h2>
        </header>
        <div className="space-y-6 max-w-4xl mx-auto" role="list" aria-label="Activités">
          {data.items.map((item, index) => (
            <article
              key={index}
              className={cn(
                'card bg-forest/50 border border-forest/20 group',
                'flex flex-col sm:flex-row sm:items-center gap-6 p-6 sm:p-8'
              )}
              role="listitem"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-pill bg-emerald/20 flex items-center justify-center font-display text-2xl font-bold text-emerald">
                {item.number}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-display text-xl font-bold text-cream mb-2">
                  {item.title}
                </h3>
                <p className="text-mint text-body mb-4">{item.description}</p>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'px-3 py-1 rounded-pill text-caption font-medium border',
                      themeColors[item.theme] || 'bg-forest/20 text-lime border-lime/20'
                    )}
                  >
                    {item.theme}
                  </span>
                  <Link
                    href={`/${locale}/activites/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="flex items-center gap-1 text-lime hover:text-cream font-medium text-body-sm transition-colors group"
                  >
                    Découvrir
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href={`/${locale}/activites`} className="btn-outline border-lime/30 text-lime hover:bg-lime/10">
            Voir toutes les activités
          </a>
        </div>
      </div>
    </section>
  );
}