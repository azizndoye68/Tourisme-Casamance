'use client';

import { MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

interface ItineraryStep {
  day: number;
  title: string;
  description?: string;
}

interface ItineraryItem {
  days: number;
  title: string;
  steps: string[];
}

interface ItinerariesData {
  title: string;
  items: ItineraryItem[];
}

interface ItinerariesProps {
  data: ItinerariesData;
}

const itineraryColors = [
  'bg-emerald/10 border-emerald/20',
  'bg-coral/10 border-coral/20',
  'bg-sun/10 border-sun/20',
];

export function Itineraries({ data }: ItinerariesProps) {
  const locale = useLocale();

  return (
    <section className="section bg-cream" aria-labelledby="itineraries-title">
      <div className="container-main">
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="itineraries-title" className="section-title">
            {data.title}
          </h2>
        </header>
        <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Itinéraires">
          {data.items.map((item, index) => (
            <article
              key={index}
              className={cn(
                'card p-8 flex flex-col',
                itineraryColors[index % itineraryColors.length]
              )}
              role="listitem"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 text-emerald font-display text-3xl font-bold mb-4">
                  <span className="w-12 h-12 rounded-pill bg-emerald text-cream flex items-center justify-center text-xl">
                    {item.days}J
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-forest">{item.title}</h3>
              </div>
              <ul className="space-y-4 flex-1" role="list" aria-label={`Étapes de ${item.title}`}>
                {item.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex gap-4 text-body-sm">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-caption font-medium text-forest">
                      {stepIndex + 1}
                    </span>
                    <span className="text-muted flex-1">{step}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/itineraires/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="btn-outline mt-6 w-full justify-center border-emerald/30 text-emerald hover:bg-emerald/10"
              >
                Voir l'itinéraire complet
              </Link>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href={`/${locale}/itineraires`} className="btn-outline">
            Voir tous les itinéraires
          </a>
        </div>
      </div>
    </section>
  );
}