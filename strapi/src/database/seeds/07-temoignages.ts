/**
 * Seed script for Témoignages (collection type)
 * Run with: npm run seed:run -- --name=07-temoignages
 */
import { factories } from '@strapi/strapi';

const temoignagesFR = [
  {
    texte: '[À REMPLACER] "La Casamance m\'a offert le plus beau voyage de ma vie. La gentillesse des gens, la beauté des paysages, le silence des bolongs... C\'est une autre Afrique, authentique et préservée. J\'y retourne chaque année."',
    prenom: '[À REMPLACER] Marie',
    pays: '[À REMPLACER] France',
    publie: true,
  },
  {
    texte: '[À REMPLACER] "Une expérience hors du temps. Dormir sur l\'île de Carabane sans voitures, se réveiller au chant des oiseaux, manger du poisson pêché le matin même... Le luxe simple à l\'état pur."',
    prenom: '[À REMPLACER] Thomas',
    pays: '[À REMPLACER] Belgique',
    publie: true,
  },
  {
    texte: '[À REMPLACER] "Le festival du roi à Oussouye m\'a bouleversé. Des milliers de personnes qui dansent ensemble, la ferveur, les couleurs, les traditions vivantes. On ne visite pas la Casamance, on la vit."',
    prenom: '[À REMPLACER] Amina',
    pays: '[À REMPLACER] Sénégal (Dakar)',
    publie: true,
  },
  {
    texte: '[À REMPLACER] "En tant qu\'ornithologue, j\'ai été comblé : pélicans, ibis, martins-pêcheurs, touracos... Plus de 100 espèces en 5 jours. Les guides locaux connaissent chaque cri, chaque nid. Exceptionnel."',
    prenom: '[À REMPLACER] Pierre',
    pays: '[À REMPLACER] Suisse',
    publie: true,
  },
  {
    texte: '[À REMPLACER] "Voyage en famille avec 2 enfants (8 et 11 ans). Ils ont adoré : pirogue, plage, marché, atelier poterie. Les Sénégalais sont incroyables avec les enfants. Zéro stress, que du bonheur."',
    prenom: '[À REMPLACER] Sophie',
    pays: '[À REMPLACER] Canada',
    publie: true,
  },
];

const temoignagesEN = [
  {
    texte: '[TO REPLACE] "Casamance gave me the most beautiful journey of my life. The kindness of people, the beauty of landscapes, the silence of bolongs... This is another Africa, authentic and preserved. I go back every year."',
    prenom: '[TO REPLACE] Marie',
    pays: '[TO REPLACE] France',
    publie: true,
  },
  {
    texte: '[TO REPLACE] "A timeless experience. Sleeping on Carabane island with no cars, waking to birdsong, eating fish caught that morning... Simple luxury at its finest."',
    prenom: '[TO REPLACE] Thomas',
    pays: '[TO REPLACE] Belgium',
    publie: true,
  },
  {
    texte: '[TO REPLACE] "The king\'s festival in Oussouye moved me deeply. Thousands dancing together, the fervour, colours, living traditions. You don\'t visit Casamance, you live it."',
    prenom: '[TO REPLACE] Amina',
    pays: '[TO REPLACE] Senegal (Dakar)',
    publie: true,
  },
  {
    texte: '[TO REPLACE] "As a birdwatcher, I was in heaven: pelicans, ibis, kingfishers, turacos... 100+ species in 5 days. Local guides know every call, every nest. Exceptional."',
    prenom: '[TO REPLACE] Pierre',
    pays: '[TO REPLACE] Switzerland',
    publie: true,
  },
  {
    texte: '[TO REPLACE] "Family trip with 2 kids (8 and 11). They loved it: pirogue, beach, market, pottery workshop. Senegalese are amazing with children. Zero stress, pure joy."',
    prenom: '[TO REPLACE] Sophie',
    pays: '[TO REPLACE] Canada',
    publie: true,
  },
];

export default async ({ strapi }) => {
  // Seed French versions
  for (const tem of temoignagesFR) {
    const existing = await strapi.entityService.findMany('api::temoignage.temoignage', {
      filters: { prenom: tem.prenom, pays: tem.pays, locale: 'fr' },
    });
    if (existing.length === 0) {
      await strapi.entityService.create('api::temoignage.temoignage', {
        data: { ...tem, publishedAt: new Date(), locale: 'fr' },
      });
      console.log(`✅ Created témoignage (FR): ${tem.prenom} (${tem.pays})`);
    }
  }

  // Seed English versions
  for (const tem of temoignagesEN) {
    const existing = await strapi.entityService.findMany('api::temoignage.temoignage', {
      filters: { prenom: tem.prenom, pays: tem.pays, locale: 'en' },
    });
    if (existing.length === 0) {
      await strapi.entityService.create('api::temoignage.temoignage', {
        data: { ...tem, publishedAt: new Date(), locale: 'en' },
      });
      console.log(`✅ Created témoignage (EN): ${tem.prenom} (${tem.pays})`);
    }
  }

  console.log('✅ All témoignages seeded (FR & EN)');
};