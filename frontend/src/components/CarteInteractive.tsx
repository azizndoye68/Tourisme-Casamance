'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { RepereCarte } from './Carte';

interface CarteInteractiveProps {
  markers: RepereCarte[];
  height?: string;
  fitBounds?: boolean;
  center?: [number, number];
  zoom?: number;
}

const LeafletMap = dynamic<CarteInteractiveProps>(
  () => import('./Carte').then((module) => module.Carte),
  { ssr: false },
);

export function CarteInteractive({ height = '400px', ...props }: CarteInteractiveProps) {
  const mapSlot = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = mapSlot.current;
    if (!element || isNearViewport) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isNearViewport]);

  return (
    <div ref={mapSlot} style={{ minHeight: height }}>
      {isNearViewport ? (
        <LeafletMap height={height} {...props} />
      ) : (
        <div
          className="flex items-center justify-center rounded-2xl bg-forest/5 text-sm text-muted"
          style={{ height }}
          aria-label="Carte chargée à proximité de l’écran"
        >
          Carte
        </div>
      )}
    </div>
  );
}
