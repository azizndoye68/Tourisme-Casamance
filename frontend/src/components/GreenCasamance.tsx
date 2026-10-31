'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface GreenCasamanceData {
  title: string;
  plants: string[];
}

interface GreenCasamanceProps {
  data: GreenCasamanceData;
}

export function GreenCasamance({ data }: GreenCasamanceProps) {
  return (
    <section className="section bg-emerald text-cream" aria-labelledby="green-title">
      <div className="container-main">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="green-title" className="section-title text-cream">
            {data.title}
          </h2>
        </header>
        <div className="flex flex-wrap justify-center gap-3" role="list" aria-label="Essences végétales">
          {data.plants.map((plant, index) => (
            <span
              key={index}
              className={cn(
                'leaf-chip',
                'bg-forest/20 text-lime border-lime/30 hover:bg-forest/30'
              )}
              role="listitem"
            >
              {plant}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}