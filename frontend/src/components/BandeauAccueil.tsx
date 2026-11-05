import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Compass, Leaf } from 'lucide-react';
import type { Locale } from '@/lib/langues';

interface DonneesBandeau {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { area: string; river: string; carFree: string };
  seasonBadge: string;
}

export function BandeauAccueil({ data, locale }: { data: DonneesBandeau; locale: Locale }) {
  return (
    <section className="hero relative isolate flex min-h-[680px] items-end overflow-hidden bg-forest pt-24 text-white sm:min-h-[760px] lg:min-h-[820px]" aria-labelledby="hero-title">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Cap-Skirring-Beach-2007.jpg/1280px-Cap-Skirring-Beach-2007.jpg"
        alt="La plage de Cap Skirring et l’océan Atlantique en Casamance"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071b17]/85 via-[#071b17]/48 to-[#071b17]/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#071b17]/55 to-transparent" />

      <div className="container-main w-full pb-14 pt-16 sm:pb-20 lg:pb-24">
        <div className="max-w-4xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:text-sm">
            <Leaf className="h-4 w-4 text-lime" aria-hidden="true" /> {data.badge}
          </p>
          <h1 id="hero-title" className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {data.title.split(data.titleAccent)[0]}<span className="text-lime">{data.titleAccent}</span>{data.title.split(data.titleAccent).slice(1).join(data.titleAccent)}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">{data.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={`/${locale}/itineraires`} className="btn-primary h-14 justify-center bg-lime px-7 text-forest hover:bg-white">
              {data.ctaPrimary}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={`/${locale}/destinations`} className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/55 px-7 font-semibold text-white transition hover:bg-white/10">
              <Compass className="h-4 w-4" aria-hidden="true" /> {data.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="mt-14 grid max-w-3xl grid-cols-1 gap-3 border-t border-white/25 pt-5 sm:grid-cols-3 sm:gap-6">
          {[data.stats.area, data.stats.river, data.stats.carFree].map((stat) => (
            <p key={stat} className="flex items-center gap-2 text-sm font-medium text-white/90 sm:text-base">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime" /> {stat}
            </p>
          ))}
        </div>
        <a href="#destinations" className="absolute bottom-8 right-8 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 transition hover:text-white lg:flex">
          <ArrowDown className="h-4 w-4" aria-hidden="true" /> {data.seasonBadge}
        </a>
      </div>
    </section>
  );
}
