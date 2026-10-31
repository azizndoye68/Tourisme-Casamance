'use client';

import Image from 'next/image';
import { ArrowRight, Users, Waves, TreePine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface HeroData {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: {
    area: string;
    river: string;
    carFree: string;
  };
  seasonBadge: string;
}

interface HeroProps {
  data: HeroData;
}

export function Hero({ data }: HeroProps) {
  const t = useTranslations('common');

  const stats = [
    { icon: TreePine, label: data.stats.area },
    { icon: Waves, label: data.stats.river },
    { icon: Users, label: data.stats.carFree },
  ];

  return (
    <section className="relative pt-32 pb-18 lg:pt-40 lg:pb-22" aria-labelledby="hero-title">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 rounded-pill bg-emerald/10 text-emerald text-caption font-medium mb-6 animate-fade-in-up">
              {data.badge}
            </span>
            <h1
              id="hero-title"
              className="h1-hero animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Là où la <span className="h1-hero-accent">{data.titleAccent}</span> rencontre l'océan
            </h1>
            <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {data.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '300ms' }} role="group" aria-label="Actions principales">
              <a href="/itineraires" className="btn-primary group">
                {data.ctaPrimary}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href="/destinations" className="btn-outline">
                {data.ctaSecondary}
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-16 animate-fade-in-up" style={{ animationDelay: '400ms' }} role="list" aria-label="Chiffres clés">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" role="listitem">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-emerald" aria-hidden="true" />
                  </div>
                  <p className="text-body-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-lime/30 rounded-arch blur-2xl opacity-60 animate-pulse" aria-hidden="true" />
              <div className="card-arch-image relative">
                <Image
                  src="/images/hero-mangrove.jpg"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
                <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-cream shadow-card overflow-hidden" aria-hidden="true">
                  <Image
                    src="/images/hero-badge.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              </div>
              <div className="arch-badge" aria-label={data.seasonBadge}>
                {data.seasonBadge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}