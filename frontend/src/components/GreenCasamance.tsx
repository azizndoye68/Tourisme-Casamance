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
    <section
      className="relative isolate overflow-hidden bg-forest text-cream"
      aria-labelledby="green-title"
      style={{ backgroundImage: 'linear-gradient(90deg, rgba(7,27,23,.96), rgba(7,27,23,.76)), url(https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=68)', backgroundPosition: 'center', backgroundSize: 'cover' }}
    >
      <div className="container-main grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:py-24">
        <header className="max-w-3xl">
          <p className="eyebrow text-lime">Une nature vivante</p>
          <h2 id="green-title" className="section-title mt-4 text-white">
            {data.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            Un territoire d’eau et de verdure, à découvrir au fil des rencontres et des paysages.
          </p>
        </header>
        <div className="flex flex-wrap gap-2.5 lg:justify-end" role="list" aria-label="Essences végétales">
          {data.plants.map((plant, index) => (
            <span
              key={index}
              className={cn(
                'leaf-chip',
                'border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15'
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
