'use client';

import Image from 'next/image';
import { MapPin, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

interface WhereToStayData {
  title: string;
  types: string[];
}

interface WhereToStayProps {
  data: WhereToStayData;
}

const accommodations = [
  {
    type: 'Campement',
    name: 'Campement de l\'Embouchure',
    location: 'Carabane',
    price: '35 000 CFA/nuit',
    image: '/images/stay-campement.jpg',
  },
  {
    type: 'Écolodge',
    name: 'Kadiandoumagne Ecolodge',
    location: 'Oussouye',
    price: '55 000 CFA/nuit',
    image: '/images/stay-ecolodge.jpg',
  },
  {
    type: 'Hôtel',
    name: 'Hotel Kadiandoumagne',
    location: 'Cap Skirring',
    price: '85 000 CFA/nuit',
    image: '/images/stay-hotel.jpg',
  },
];

export function WhereToStay({ data }: WhereToStayProps) {
  const locale = useLocale();

  return (
    <section className="section bg-cream" aria-labelledby="stay-title">
      <div className="container-main">
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="stay-title" className="section-title">
            {data.title}
          </h2>
        </header>
        <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Hébergements">
          {accommodations.map((item, index) => (
            <article
              key={index}
              className="card group"
              role="listitem"
            >
              <div className="card-arch-image relative">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-pill bg-white/90 backdrop-blur text-caption font-medium text-forest">
                  {item.type}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-forest mb-1">{item.name}</h3>
                <p className="flex items-center gap-1.5 text-muted text-body-sm mb-4">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  {item.location}
                </p>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1.5 font-display text-lg font-bold text-emerald">
                    <Tag className="w-4 h-4" aria-hidden="true" />
                    {item.price}
                  </p>
                  <a
                    href={`/${locale}/hebergements/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="btn-outline text-body-sm py-2 px-4 border-emerald/30 text-emerald hover:bg-emerald/10"
                  >
                    Voir détails
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href={`/${locale}/hebergements`} className="btn-outline">
            Voir tous les hébergements
          </a>
        </div>
      </div>
    </section>
  );
}