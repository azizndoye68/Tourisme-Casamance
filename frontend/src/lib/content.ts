import content from '@/data/content.json';
import type { Locale } from './i18n';

export interface ContentImage {
  id?: number;
  documentId?: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: Record<string, ContentImage>;
}

export interface Destination {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  type: 'ville' | 'ile' | 'plage' | 'nature' | 'culture';
  resume: string;
  description: string;
  galerie: ContentImage[];
  latitude: number | null;
  longitude: number | null;
  tags: string[] | null;
  miseEnAvant: boolean;
  locale: string;
}

export interface Activite {
  id: number;
  documentId: string;
  titre: string;
  slug: string;
  resume: string;
  description: string;
  theme: 'Nature' | 'Culture' | 'Gastronomie' | 'Aventure' | 'Detente';
  duree: string | null;
  galerie: ContentImage[];
  destinations: Destination[];
  destinationSlugs?: string[];
  locale: string;
}

export interface ItineraireEtape {
  id: number;
  jour: number;
  titre: string;
  texte: string;
  destination: Destination | null;
}

export interface Itineraire {
  id: number;
  documentId: string;
  titre: string;
  slug: string;
  nombreJours: number;
  resume: string;
  etapes: ItineraireEtape[];
  locale: string;
}

export interface Hebergement {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  type: 'campement' | 'ecolodge' | 'hotel';
  prixIndicatif: string | null;
  contactWhatsApp: string | null;
  description: string;
  destinationSlug: string;
  galerie: ContentImage[];
  destination: Destination | null;
  locale: string;
}

type LocaleData<T> = Record<Locale, T[]>;
type StaticContent = {
  destinations: LocaleData<Omit<Destination, 'id' | 'documentId' | 'galerie' | 'locale'>>;
  activites: LocaleData<Omit<Activite, 'id' | 'documentId' | 'galerie' | 'destinations' | 'locale'>>;
  itineraires: LocaleData<Omit<Itineraire, 'id' | 'documentId' | 'locale'>>;
  hebergements: LocaleData<Omit<Hebergement, 'id' | 'documentId' | 'galerie' | 'destination' | 'locale'>>;
};

const data = content as StaticContent;
const validLocale = (locale: string): Locale => (locale === 'en' ? 'en' : 'fr');

const imageIds: Record<string, string> = {
  'ile-de-carabane': 'photo-1473116763249-2faaef81ccda',
  'cap-skirring': 'photo-1500375592092-40eb2168fd21',
  oussouye: 'photo-1516026672322-bc52d61a55d5',
  'kafountine-abene': 'photo-1518837695005-2083093ee35b',
  'basse-casamance': 'photo-1448375240586-882707db888b',
  'pirogue-bolongs': 'photo-1518837695005-2083093ee35b',
  'observation-oiseaux': 'photo-1472396961693-142e6e269027',
  'villages-poterie-diola': 'photo-1516026672322-bc52d61a55d5',
  'marches-gastronomie': 'photo-1501339847302-ac426a4a7cbb',
  'balade-velo-rizieres': 'photo-1473448912268-2022ce9509d8',
  'surf-cap-skirring': 'photo-1502680390469-be75c86b636f',
  'foret-diembering': 'photo-1448375240586-882707db888b',
  'casa-motel-ziguinchor': 'photo-1566073771259-6a8506099945',
  'hotel-balafon-cap-skirring': 'photo-1571896349842-33c89424de2d',
  'hotel-maya-cap-skirring': 'photo-1571003123894-1f0594d2b5d9',
  'atlantic-campement-abene': 'photo-1510798831971-661eb04b3739',
  'campement-kadiandoumagne': 'photo-1448375240586-882707db888b',
  'ecolodge-le-paletuvier': 'photo-1448375240586-882707db888b',
  'hotel-de-la-plage-cap-skirring': 'photo-1500375592092-40eb2168fd21',
  'campement-carabane-nature': 'photo-1473116763249-2faaef81ccda',
  'ecolodge-oussouye-village': 'photo-1516026672322-bc52d61a55d5',
  'kafountine-beach-lodge': 'photo-1518837695005-2083093ee35b',
};

function editorialGallery(slug: string, alt: string): ContentImage[] {
  const photo = imageIds[slug] || imageIds['basse-casamance'];
  return [{
    url: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&q=68`,
    alternativeText: alt,
    width: 900,
    height: 675,
  }];
}

function withIdentity<T extends { slug: string }>(items: T[], locale: Locale) {
  return items.map((item, index) => ({
    ...item,
    id: index + 1,
    documentId: item.slug,
    locale,
  }));
}

export function getContentImageUrl(image: ContentImage | null | undefined): string | null {
  return image?.url || null;
}

export async function getDestinations(locale = 'fr'): Promise<Destination[]> {
  return withIdentity(data.destinations[validLocale(locale)], locale as Locale).map((item) => ({
    ...item,
    galerie: editorialGallery(item.slug, item.nom),
  }));
}

export async function getDestinationBySlug(slug: string, locale = 'fr'): Promise<Destination | null> {
  return (await getDestinations(locale)).find((item) => item.slug === slug) ?? null;
}

export async function getFeaturedDestinations(locale = 'fr'): Promise<Destination[]> {
  return (await getDestinations(locale)).filter((item) => item.miseEnAvant);
}

export async function getActivites(locale = 'fr'): Promise<Activite[]> {
  return withIdentity(data.activites[validLocale(locale)], locale as Locale).map((item) => ({
    ...item,
    galerie: editorialGallery(item.slug, item.titre),
    destinations: [],
  }));
}

export async function getActiviteBySlug(slug: string, locale = 'fr'): Promise<Activite | null> {
  return (await getActivites(locale)).find((item) => item.slug === slug) ?? null;
}

export async function getActivitesByDestination(_destinationSlug: string, locale = 'fr'): Promise<Activite[]> {
  return (await getActivites(locale)).filter((item) => item.destinationSlugs?.includes(_destinationSlug));
}

export async function getItineraires(locale = 'fr'): Promise<Itineraire[]> {
  return withIdentity(data.itineraires[validLocale(locale)], locale as Locale).map((item) => ({
    ...item,
    etapes: item.etapes.map((step, index) => ({ ...step, id: index + 1, destination: null })),
  }));
}

export async function getItineraireBySlug(slug: string, locale = 'fr'): Promise<Itineraire | null> {
  return (await getItineraires(locale)).find((item) => item.slug === slug) ?? null;
}

export async function getHebergements(locale = 'fr'): Promise<Hebergement[]> {
  const destinations = await getDestinations(locale);
  return withIdentity(data.hebergements[validLocale(locale)], locale as Locale).map((item) => ({
    ...item,
    galerie: editorialGallery(item.slug, item.nom),
    destination: destinations.find((destination) => destination.slug === item.destinationSlug) ?? null,
  }));
}

export async function getHebergementBySlug(slug: string, locale = 'fr'): Promise<Hebergement | null> {
  return (await getHebergements(locale)).find((item) => item.slug === slug) ?? null;
}

export async function getHebergementsByDestination(_destinationSlug: string, locale = 'fr'): Promise<Hebergement[]> {
  return (await getHebergements(locale)).filter((item) => item.destination?.slug === _destinationSlug);
}
