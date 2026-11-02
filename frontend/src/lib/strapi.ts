/**
 * Strapi API Client
 * Fetches data from Strapi CMS for dynamic pages
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }
  return headers;
}

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${STRAPI_URL}/api${path}`;
  const response = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: 3600 }, // ISR: revalidate every hour
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText} for ${url}`);
  }

  return response.json();
}

// ============================================
// DESTINATIONS
// ============================================

export interface DestinationImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
  formats?: Record<string, DestinationImage>;
}

export interface Destination {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  type: 'ville' | 'ile' | 'plage' | 'nature' | 'culture';
  resume: string;
  description: string;
  galerie: DestinationImage[];
  latitude: number | null;
  longitude: number | null;
  tags: string[] | null;
  miseEnAvant: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface DestinationResponse {
  data: Destination[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getDestinations(locale: string = 'fr'): Promise<Destination[]> {
  const response = await fetchAPI<DestinationResponse>(
    `/destinations?locale=${locale}&populate[galerie]=true&populate[activites]=true&populate[hebergements]=true&sort=miseEnAvant:desc,nom:asc&pagination[pageSize]=100`
  );
  return response.data;
}

export async function getDestinationBySlug(slug: string, locale: string = 'fr'): Promise<Destination | null> {
  const response = await fetchAPI<DestinationResponse>(
    `/destinations?filters[slug][$eq]=${slug}&locale=${locale}&populate[galerie]=true&populate[activites][populate][galerie]=true&populate[hebergements][populate][galerie]=true&pagination[pageSize]=1`
  );
  return response.data[0] || null;
}

export async function getFeaturedDestinations(locale: string = 'fr'): Promise<Destination[]> {
  const response = await fetchAPI<DestinationResponse>(
    `/destinations?filters[miseEnAvant][$eq]=true&locale=${locale}&populate[galerie]=true&sort=nom:asc&pagination[pageSize]=10`
  );
  return response.data;
}

// ============================================
// ACTIVITES
// ============================================

export interface ActiviteImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
  formats?: Record<string, ActiviteImage>;
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
  galerie: ActiviteImage[];
  destinations: Destination[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface ActiviteResponse {
  data: Activite[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getActivites(locale: string = 'fr'): Promise<Activite[]> {
  const response = await fetchAPI<ActiviteResponse>(
    `/activites?locale=${locale}&populate[galerie]=true&populate[destinations][populate][galerie]=true&sort=titre:asc&pagination[pageSize]=100`
  );
  return response.data;
}

export async function getActiviteBySlug(slug: string, locale: string = 'fr'): Promise<Activite | null> {
  const response = await fetchAPI<ActiviteResponse>(
    `/activites?filters[slug][$eq]=${slug}&locale=${locale}&populate[galerie]=true&populate[destinations][populate][galerie]=true&pagination[pageSize]=1`
  );
  return response.data[0] || null;
}

export async function getActivitesByDestination(destinationSlug: string, locale: string = 'fr'): Promise<Activite[]> {
  const response = await fetchAPI<ActiviteResponse>(
    `/activites?filters[destinations][slug][$eq]=${destinationSlug}&locale=${locale}&populate[galerie]=true&populate[destinations][populate][galerie]=true&pagination[pageSize]=100`
  );
  return response.data;
}

// ============================================
// ITINERAIRES
// ============================================

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
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface ItineraireResponse {
  data: Itineraire[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getItineraires(locale: string = 'fr'): Promise<Itineraire[]> {
  const response = await fetchAPI<ItineraireResponse>(
    `/itineraires?locale=${locale}&populate[etapes][populate][destination][populate][galerie]=true&sort=nombreJours:asc&pagination[pageSize]=100`
  );
  return response.data;
}

export async function getItineraireBySlug(slug: string, locale: string = 'fr'): Promise<Itineraire | null> {
  const response = await fetchAPI<ItineraireResponse>(
    `/itineraires?filters[slug][$eq]=${slug}&locale=${locale}&populate[etapes][populate][destination][populate][galerie]=true&pagination[pageSize]=1`
  );
  return response.data[0] || null;
}

// ============================================
// HEBERGEMENTS
// ============================================

export interface HebergementImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
  formats?: Record<string, HebergementImage>;
}

export interface Hebergement {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  type: 'campement' | 'ecolodge' | 'hotel';
  prixIndicatif: string | null;
  contactWhatsApp: string | null;
  galerie: HebergementImage[];
  destination: Destination | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface HebergementResponse {
  data: Hebergement[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getHebergements(locale: string = 'fr'): Promise<Hebergement[]> {
  const response = await fetchAPI<HebergementResponse>(
    `/hebergements?locale=${locale}&populate[galerie]=true&populate[destination][populate][galerie]=true&sort=nom:asc&pagination[pageSize]=100`
  );
  return response.data;
}

export async function getHebergementBySlug(slug: string, locale: string = 'fr'): Promise<Hebergement | null> {
  const response = await fetchAPI<HebergementResponse>(
    `/hebergements?filters[slug][$eq]=${slug}&locale=${locale}&populate[galerie]=true&populate[destination][populate][galerie]=true&pagination[pageSize]=1`
  );
  return response.data[0] || null;
}

export async function getHebergementsByDestination(destinationSlug: string, locale: string = 'fr'): Promise<Hebergement[]> {
  const response = await fetchAPI<HebergementResponse>(
    `/hebergements?filters[destination][slug][$eq]=${destinationSlug}&locale=${locale}&populate[galerie]=true&populate[destination][populate][galerie]=true&pagination[pageSize]=100`
  );
  return response.data;
}

// ============================================
// TEMOIGNAGES
// ============================================

export interface Temoignage {
  id: number;
  documentId: string;
  texte: string;
  prenom: string;
  pays: string;
  publie: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface TemoignageResponse {
  data: Temoignage[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getPublishedTemoignages(locale: string = 'fr'): Promise<Temoignage[]> {
  const response = await fetchAPI<TemoignageResponse>(
    `/temoignages?filters[publie][$eq]=true&locale=${locale}&sort=createdAt:desc&pagination[pageSize]=10`
  );
  return response.data;
}

// ============================================
// HOMEPAGE (Single Type)
// ============================================

export interface HomepageHero {
  badge: string;
  titre: string;
  titreAccent: string;
  sousTitre: string;
  ctaPrincipalTexte: string;
  ctaPrincipalLien: string;
  ctaSecondaireTexte: string;
  ctaSecondaireLien: string;
  imagePrincipale: DestinationImage | null;
  imageSecondaire: DestinationImage | null;
  badgeSaison: string | null;
}

export interface ChiffreCle {
  valeur: string;
  label: string;
  icone: string;
}

export interface BandeauCanopee {
  texte: string;
}

export interface SectionVerte {
  titre: string;
  plantes: string[];
}

export interface HomepageTemoignage {
  citation: string;
  auteur: string;
  pays: string;
}

export interface AppelAction {
  titre: string;
  sousTitre: string;
  texteNewsletter: string;
  texteWhatsApp: string;
  lienWhatsApp: string;
}

export interface HomepageData {
  hero: HomepageHero;
  chiffresCles: ChiffreCle[];
  bandeauCanopee: BandeauCanopee;
  sectionVerte: SectionVerte;
  temoignage: HomepageTemoignage;
  appelAction: AppelAction;
}

export interface HomepageResponse {
  data: HomepageData | null;
  meta: Record<string, unknown>;
}

export async function getHomepage(locale: string = 'fr'): Promise<HomepageData | null> {
  const response = await fetchAPI<HomepageResponse>(
    `/homepage?locale=${locale}&populate[hero][populate][imagePrincipale]=true&populate[hero][populate][imageSecondaire]=true&populate[chiffresCles]=true&populate[bandeauCanopee]=true&populate[sectionVerte]=true&populate[temoignage]=true&populate[appelAction]=true`
  );
  return response.data;
}

// ============================================
// SETTINGS (Single Type)
// ============================================

export interface SettingsData {
  nomSite: string;
  telephone: string | null;
  email: string | null;
  whatsapp: string | null;
  reseauxSociaux: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  } | null;
}

export interface SettingsResponse {
  data: SettingsData | null;
  meta: Record<string, unknown>;
}

export async function getSettings(): Promise<SettingsData | null> {
  const response = await fetchAPI<SettingsResponse>(`/settings?populate=*`);
  return response.data;
}

// ============================================
// UTILITY: Get Image URL
// ============================================

export function getStrapiImageUrl(image: DestinationImage | ActiviteImage | HebergementImage | null | undefined): string | null {
  if (!image?.url) return null;
  // If URL is already absolute, return as is
  if (image.url.startsWith('http')) return image.url;
  // Otherwise prepend Strapi URL
  return `${STRAPI_URL}${image.url}`;
}

export function getStrapiImageSrcSet(image: DestinationImage | ActiviteImage | HebergementImage | null | undefined): string {
  if (!image?.formats) return '';
  const formats = ['thumbnail', 'small', 'medium', 'large'];
  return formats
    .map((format) => {
      const f = image.formats?.[format];
      if (f?.url) {
        const url = f.url.startsWith('http') ? f.url : `${STRAPI_URL}${f.url}`;
        return `${url} ${f.width}w`;
      }
      return null;
    })
    .filter(Boolean)
    .join(', ');
}