import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utilitaires';
import type { Locale } from '@/lib/langues';

interface DestinationItem {
  name: string;
  subtitle: string;
  featured: boolean;
}

interface DestinationsData {
  title: string;
  items: DestinationItem[];
}

interface DestinationsProps {
  data: DestinationsData;
  locale: Locale;
}

const destinationImages: Record<string, string> = {
  'Île de Carabane': 'photo-1473116763249-2faaef81ccda',
  'Carabane Island': 'photo-1473116763249-2faaef81ccda',
  'Cap Skirring': 'photo-1500375592092-40eb2168fd21',
  Oussouye: 'photo-1516026672322-bc52d61a55d5',
  'Kafountine & Abéné': 'photo-1518837695005-2083093ee35b',
  'Kafountine & Abené': 'photo-1518837695005-2083093ee35b',
  'Basse Casamance': 'photo-1448375240586-882707db888b',
  'Lower Casamance': 'photo-1448375240586-882707db888b',
};

const destinationSlugs = ['ile-de-carabane', 'cap-skirring', 'oussouye', 'kafountine-abene', 'basse-casamance'];

export function Destinations({ data, locale }: DestinationsProps) {
  return (
    <section id="destinations" className="section bg-[#fbfaf5]" aria-labelledby="destinations-title">
      <div className="container-main">
        <header className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow">La Casamance, à votre rythme</p>
          <h2 id="destinations-title" className="section-title mt-3">
            {data.title}
          </h2>
        </header>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {data.items.map((item, index) => {
            const isFeatured = item.featured;
            const photo = destinationImages[item.name] || 'photo-1448375240586-882707db888b';
            const imgSrc = `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=800&q=70`;

            return (
              <article
                key={item.name}
                className={cn(
                  'destination-card group',
                  isFeatured && 'sm:col-span-2 lg:col-span-2'
                )}
              >
                <Link href={`/${locale}/destinations/${destinationSlugs[index] || 'basse-casamance'}`} className="block">
                  <div className="relative h-[300px] overflow-hidden sm:h-[350px] lg:h-[390px]">
                    <Image
                      src={imgSrc}
                      alt=""
                      fill
                      sizes={isFeatured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071b17]/80 via-[#071b17]/10 to-transparent transition-colors group-hover:from-[#071b17]/65" aria-hidden="true" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-left sm:p-8">
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {item.name}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">{item.subtitle}</p>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Link href={`/${locale}/destinations`} className="btn-outline">
            Voir toutes les destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
