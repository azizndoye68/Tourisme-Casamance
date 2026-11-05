import content from '@/data/contenu.json';
import type { Locale } from './langues';

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
type DonneesEtapeItineraire = Omit<ItineraireEtape, 'id' | 'destination'> & { destination: null };
type DonneesItineraire = Omit<Itineraire, 'id' | 'documentId' | 'locale' | 'etapes'> & {
  etapes: DonneesEtapeItineraire[];
};
type StaticContent = {
  destinations: LocaleData<Omit<Destination, 'id' | 'documentId' | 'galerie' | 'locale'>>;
  activites: LocaleData<Omit<Activite, 'id' | 'documentId' | 'galerie' | 'destinations' | 'locale'>>;
  itineraires: LocaleData<DonneesItineraire>;
  hebergements: LocaleData<Omit<Hebergement, 'id' | 'documentId' | 'galerie' | 'destination' | 'locale'>>;
};

const data = content as StaticContent;
const validLocale = (locale: string): Locale => (locale === 'en' ? 'en' : 'fr');

const photos = {
  plage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Cap-Skirring-Beach-2007.jpg/1280px-Cap-Skirring-Beach-2007.jpg',
  carabane: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Carabane-Bolong.jpg/1280px-Carabane-Bolong.jpg',
  pirogue: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Fleuve_casamance.jpg',
  mangrove: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Mangroves_in_Casamance.jpg/1280px-Mangroves_in_Casamance.jpg',
  oiseaux: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Avifaune_dans_la_mangrove_de_Casamance%2C_S%C3%A9n%C3%A9gal.webp',
  impluvium: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Alyssa_K._Barry_Enampore%2C_Casamance%2C_Senegal.jpg/960px-Alyssa_K._Barry_Enampore%2C_Casamance%2C_Senegal.jpg',
  rizieres: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Rice_paddy%2C_Casamance%2C_Senegal.jpg/1280px-Rice_paddy%2C_Casamance%2C_Senegal.jpg',
  hebergement: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=72',
  ecolodge: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=72',
} as const;

const photoParSlug: Record<string, keyof typeof photos> = {
  'ile-de-carabane': 'carabane', 'carabane-island': 'carabane',
  'cap-skirring': 'plage',
  oussouye: 'impluvium',
  'kafountine-abene': 'mangrove',
  'basse-casamance': 'pirogue', 'lower-casamance': 'pirogue',
  'pirogue-bolongs': 'pirogue',
  'observation-oiseaux': 'oiseaux',
  'villages-poterie-diola': 'impluvium',
  'marches-gastronomie': 'rizieres',
  'balade-velo-rizieres': 'rizieres',
  'surf-cap-skirring': 'plage',
  'foret-diembering': 'mangrove',
  'campement-kadiandoumagne': 'ecolodge', 'kadiandoumagne-campement': 'ecolodge',
  'ecolodge-le-paletuvier': 'mangrove', 'le-paletuvier-ecolodge': 'mangrove',
  'hotel-de-la-plage-cap-skirring': 'plage',
  'hotel-balafon-cap-skirring': 'plage',
  'hotel-maya-cap-skirring': 'hebergement',
  'campement-carabane-nature': 'carabane', 'carabane-nature-campement': 'carabane',
  'ecolodge-oussouye-village': 'impluvium', 'oussouye-village-ecolodge': 'impluvium',
  'kafountine-beach-lodge': 'mangrove',
  'casa-motel-ziguinchor': 'hebergement',
  'atlantic-campement-abene': 'ecolodge',
};

function editorialGallery(slug: string, alt: string): ContentImage[] {
  const photo = photos[photoParSlug[slug] || 'mangrove'];
  const thumbnail = photo
    .replace('/1280px-', '/640px-')
    .replace('w=1000', 'w=640');
  return [{
    url: photo,
    alternativeText: alt,
    width: 900,
    height: 675,
    formats: { thumbnail: { url: thumbnail, alternativeText: alt, width: 640, height: 480 } },
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

export function getContentThumbnailUrl(image: ContentImage | null | undefined): string | null {
  return image?.formats?.thumbnail?.url || image?.url || null;
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
    galerie: editorialGallery(item.slug, locale === 'en' ? 'Illustrative image of a stay in Casamance' : 'Image illustrative d’un hébergement en Casamance'),
    destination: destinations.find((destination) => destination.slug === item.destinationSlug) ?? null,
  }));
}

export async function getHebergementBySlug(slug: string, locale = 'fr'): Promise<Hebergement | null> {
  return (await getHebergements(locale)).find((item) => item.slug === slug) ?? null;
}

export async function getHebergementsByDestination(_destinationSlug: string, locale = 'fr'): Promise<Hebergement[]> {
  return (await getHebergements(locale)).filter((item) => item.destination?.slug === _destinationSlug);
}
