import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

export default function LanguageLandingPage() {
  return (
    <main className="relative isolate flex min-h-screen items-end overflow-hidden bg-forest px-5 pb-12 pt-12 text-white sm:px-10 sm:pb-16 lg:px-16">
      <Image
        src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=72"
        alt="Vagues de l’océan Atlantique"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071b17]/85 via-[#071b17]/35 to-[#071b17]/10" />
      <div className="container-main">
        <p className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-lime sm:text-sm">
          <Leaf className="h-4 w-4" aria-hidden="true" /> Sénégal · Afrique de l’Ouest
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
          Casamance<br /><span className="text-lime">naturellement.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
          Entre fleuve, mangrove et océan, découvrez une autre façon de voyager au sud du Sénégal.
        </p>
        <nav aria-label="Choisir une langue" className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/fr" className="btn-primary h-14 justify-center bg-lime px-7 text-forest hover:bg-white">
            Découvrir la Casamance <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/en" className="inline-flex h-14 items-center justify-center rounded-full border border-white/55 px-7 font-semibold text-white transition hover:bg-white/10">
            English
          </Link>
        </nav>
        <p className="mt-16 text-xs font-medium uppercase tracking-[0.18em] text-white/60">Voyagez doucement · Rencontrez · Explorez</p>
      </div>
    </main>
  );
}
