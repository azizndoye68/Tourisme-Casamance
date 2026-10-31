'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

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
}

const placeholderImages: Record<string, string> = {
  'Île de Carabane': '/images/dest-carabane.jpg',
  'Carabane Island': '/images/dest-carabane.jpg',
  'Cap Skirring': '/images/dest-capskirring.jpg',
  'Oussouye': '/images/dest-oussouye.jpg',
  'Kafountine & Abéné': '/images/dest-kafountine.jpg',
  'Kafountine & Abené': '/images/dest-kafountine.jpg',
  'Basse Casamance': '/images/dest-basse.jpg',
  'Lower Casamance': '/images/dest-basse.jpg',
};

export function Destinations({ data }: DestinationsProps) {
  const locale = useLocale();

  return (
    <section className="section bg-cream" aria-labelledby="destinations-title">
      <div className="container-main">
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="destinations-title" className="section-title">
            {data.title}
          </h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {data.items.map((item, index) => {
            const isFeatured = item.featured;
            const imgSrc = placeholderImages[item.name] || '/images/placeholder.jpg';

            return (
              <article
                key={item.name}
                className={cn(
                  'card group',
                  isFeatured && 'lg:col-span-2 lg:row-span-2'
                )}
              >
                <Link href={`/${locale}/destinations/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="block">
                  <div className="card-arch-image relative">
                    <Image
                      src={imgSrc}
                      alt=""
                      fill
                      sizes={isFeatured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-cream mb-1">
                        {item.name}
                      </h3>
                      <p className="text-mint text-body-sm font-medium">{item.subtitle}</p>
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