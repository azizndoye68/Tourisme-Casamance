/**
 * Seed script for Itinéraires (collection type)
 * Run with: npm run seed:run -- --name=05-itineraires
 */
import { factories } from '@strapi/strapi';

const itinerairesFR = [
  {
    titre: '[À REMPLACER] Le grand classique',
    slug: 'le-grand-classique',
    nombreJours: 3,
    resume: '[À REMPLACER] L\'essentiel de la Casamance en 3 jours : Ziguinchor, Oussouye, Cap Skirring. Idéal pour une première découverte.',
    etapes: [
      {
        jour: 1,
        titre: '[À REMPLACER] Ziguinchor - Porte de la Casamance',
        texte: '[À REMPLACER] Arrivée à Ziguinchor. Visite du marché Saint-Maur (artisanat, épices, tissus), de la cathédrale et de la préfecture (architecture coloniale). Déjeuner au bord du fleuve. Après-midi : balade en pirogue sur le fleuve Casamance, découverte des bolongs et de la mangrove. Coucher de soleil au port. Nuit à Ziguinchor.',
        destination: null, // Sera lié après création des destinations
      },
      {
        jour: 2,
        titre: '[À REMPLACER] Oussouye - Cœur Diola',
        texte: '[À REMPLACER] Route vers Oussouye (45 min). Visite du musée, du palais royal, des cases à impluvium. Rencontre avec un artisan potier. Déjeuner chez l\'habitant (thieboudienne). Après-midi : forêt sacrée de Boukitingho avec guide initié. Nuit en campement à Oussouye ou Cap Skirring.',
        destination: null,
      },
      {
        jour: 3,
        titre: '[À REMPLACER] Cap Skirring - Plage et détente',
        texte: '[À REMPLACER] Matinée libre : plage, baignade, balade à vélo dans la filaos. Déjeuner poisson grillé les pieds dans le sable. Après-midi : marché artisanal de Cap Skirring, dernier bain. Transfert aéroport ou route retour.',
        destination: null,
      },
    ],
  },
  {
    titre: '[À REMPLACER] Nature et culture',
    slug: 'nature-et-culture',
    nombreJours: 5,
    resume: '[À REMPLACER] 5 jours entre mangroves, rizières, villages Diola et plages sauvages. Équilibre parfait nature/culture.',
    etapes: [
      {
        jour: 1,
        titre: '[À REMPLACER] Ziguinchor - Immersion urbaine',
        texte: '[À REMPLACER] Arrivée, installation. Visite guidée du marché Normandie, quartier Escale, musée régional. Déjeuner gastronomique (yassa poulet). Après-midi : pirogue sur le fleuve vers Tendouck, observation oiseaux. Nuit à Ziguinchor.',
        destination: null,
      },
      {
        jour: 2,
        titre: '[À REMPLACER] Niaguis - Rizières en escalier',
        texte: '[À REMPLACER] Route vers Niaguis (1h). Randonnée dans les rizières en terrasses, rencontre avec les cultivateurs. Déjeuner mil/maïs local. Après-midi : visite village, cases à impluvium, explications système agraire Diola. Nuit en campement villageois.',
        destination: null,
      },
      {
        jour: 3,
        titre: '[À REMPLACER] Oussouye - Culture royale',
        texte: '[À REMPLACER] Route vers Oussouye. Musée, palais royal, atelier poterie à Édikar. Déjeuner chez l\'habitant. Après-midi : forêt sacrée Boukitingho, cérémonie de bienvenue (si autorisée). Nuit à Oussouye.',
        destination: null,
      },
      {
        jour: 4,
        titre: '[À REMPLACER] Kafountine/Abéné - Pêche et musique',
        texte: '[À REMPLACER] Route côtière vers Kafountine (1h30). Matin : port de pêche au lever du jour, fumoirs. Déjeuner fruits de mer. Après-midi : détente plage Abéné, balade bolongs en pirogue. Soirée concert musique live. Nuit en campement bord de mer.',
        destination: null,
      },
      {
        jour: 5,
        titre: '[À REMPLACER] Île aux oiseaux - Retour',
        texte: '[À REMPLACER] Matin : pirogue vers l\'île aux oiseaux (réserve ornithologique), observation pélicans, sternes, cormorans. Déjeuner pique-nique. Retour vers Ziguinchor/Cap Skirring pour départ.',
        destination: null,
      },
    ],
  },
  {
    titre: '[À REMPLACER] La Casamance complète',
    slug: 'la-casamance-complete',
    nombreJours: 7,
    resume: '[À REMPLACER] 7 jours pour tout voir : du fleuve à l\'océan, des îles aux forêts, des villes aux villages. Le grand tour.',
    etapes: [
      {
        jour: 1,
        titre: '[À REMPLACER] Ziguinchor - Capitale fluviale',
        texte: '[À REMPLACER] Arrivée, marché Saint-Maur, cathédrale, préfecture, musée régional. Pirogue coucher de soleil sur le fleuve. Nuit Ziguinchor.',
        destination: null,
      },
      {
        jour: 2,
        titre: '[À REMPLACER] Carabane - Île hors du temps',
        texte: '[À REMPLACER] Transfert Elinkine, pirogue 30 min vers Carabane. Installation campement. Visite église 1885, ruelles sablonneuses, fromagers. Déjeuner homard/poisson. Après-midi : pirogue bolongs, observation oiseaux, plage déserte. Nuit Carabane.',
        destination: null,
      },
      {
        jour: 3,
        titre: '[À REMPLACER] Oussouye - Terre Diola',
        texte: '[À REMPLACER] Pirogue retour, route Oussouye. Musée, palais, cases impluvium, poterie Édikar. Forêt sacrée. Nuit Oussouye.',
        destination: null,
      },
      {
        jour: 4,
        titre: '[À REMPLACER] Niaguis - Rizières et traditions',
        texte: '[À REMPLACER] Randonnée rizières terrasses, système irrigation traditionnel, déjeuner mil. Initiation danse Diola (optionnel). Nuit campement villageois.',
        destination: null,
      },
      {
        jour: 5,
        titre: '[À REMPLACER] Kafountine/Abéné - Océan et pêche',
        texte: '[À REMPLACER] Route côtière. Port pêche Kafountine à l\'aube, fumoirs. Plage Abéné, baignade. Festival musique si période. Nuit campement plage.',
        destination: null,
      },
      {
        jour: 6,
        titre: '[À REMPLACER] Cap Skirring - Grande plage',
        texte: '[À REMPLACER] Route Cap Skirring (30 min). Journée libre : plage 20km, vélo filaos, surf, quad, pêche. Marché artisanal. Nuit hôtel/lodge.',
        destination: null,
      },
      {
        jour: 7,
        titre: '[À REMPLACER] Diembering - Forêt et départ',
        texte: '[À REMPLACER] Matin : forêt de Diembering, balade guidée, baignade crique. Déjeuner. Transfert aéroport Cap Skirring ou route Ziguinchor.',
        destination: null,
      },
    ],
  },
];

const itinerairesEN = [
  {
    titre: '[TO REPLACE] The Great Classic',
    slug: 'the-great-classic',
    nombreJours: 3,
    resume: '[TO REPLACE] The essentials of Casamance in 3 days: Ziguinchor, Oussouye, Cap Skirring. Ideal for a first discovery.',
    etapes: [
      {
        jour: 1,
        titre: '[TO REPLACE] Ziguinchor - Gateway to Casamance',
        texte: '[TO REPLACE] Arrival in Ziguinchor. Visit Saint-Maur market (crafts, spices, fabrics), cathedral and prefecture (colonial architecture). Lunch by the river. Afternoon: pirogue ride on the Casamance river, discover bolongs and mangrove. Sunset at the port. Night in Ziguinchor.',
        destination: null,
      },
      {
        jour: 2,
        titre: '[TO REPLACE] Oussouye - Diola Heartland',
        texte: '[TO REPLACE] Drive to Oussouye (45 min). Visit museum, royal palace, impluvium houses. Meet a potter artisan. Lunch with local family (thieboudienne). Afternoon: sacred forest of Boukitingho with initiated guide. Night in campement at Oussouye or Cap Skirring.',
        destination: null,
      },
      {
        jour: 3,
        titre: '[TO REPLACE] Cap Skirring - Beach and relaxation',
        texte: '[TO REPLACE] Free morning: beach, swimming, bike ride in the filaos. Lunch grilled fish on the beach. Afternoon: Cap Skirring craft market, last swim. Transfer to airport or return drive.',
        destination: null,
      },
    ],
  },
  {
    titre: '[TO REPLACE] Nature and Culture',
    slug: 'nature-and-culture',
    nombreJours: 5,
    resume: '[TO REPLACE] 5 days between mangroves, rice paddies, Diola villages and wild beaches. Perfect nature/culture balance.',
    etapes: [
      {
        jour: 1,
        titre: '[TO REPLACE] Ziguinchor - Urban immersion',
        texte: '[TO REPLACE] Arrival, check-in. Guided visit of Normandie market, Escale district, regional museum. Gastronomic lunch (yassa chicken). Afternoon: pirogue on river to Tendouck, bird watching. Night in Ziguinchor.',
        destination: null,
      },
      {
        jour: 2,
        titre: '[TO REPLACE] Niaguis - Terraced rice paddies',
        texte: '[TO REPLACE] Drive to Niaguis (1h). Hike in terraced rice paddies, meet farmers. Lunch local millet/maize. Afternoon: village visit, impluvium houses, Diola agricultural system explanation. Night in village campement.',
        destination: null,
      },
      {
        jour: 3,
        titre: '[TO REPLACE] Oussouye - Royal culture',
        texte: '[TO REPLACE] Drive to Oussouye. Museum, royal palace, pottery workshop at Edikar. Lunch with local family. Afternoon: sacred forest Boukitingho, welcome ceremony (if permitted). Night in Oussouye.',
        destination: null,
      },
      {
        jour: 4,
        titre: '[TO REPLACE] Kafountine/Abéné - Fishing and music',
        texte: '[TO REPLACE] Coastal drive to Kafountine (1h30). Morning: fishing port at dawn, smokers. Lunch seafood. Afternoon: Abéné beach relaxation, pirogue in bolongs. Evening live music concert. Night in beachfront campement.',
        destination: null,
      },
      {
        jour: 5,
        titre: '[TO REPLACE] Bird Island - Return',
        texte: '[TO REPLACE] Morning: pirogue to bird island (ornithological reserve), observe pelicans, terns, cormorants. Picnic lunch. Return to Ziguinchor/Cap Skirring for departure.',
        destination: null,
      },
    ],
  },
  {
    titre: '[TO REPLACE] Complete Casamance',
    slug: 'complete-casamance',
    nombreJours: 7,
    resume: '[TO REPLACE] 7 days to see it all: from river to ocean, islands to forests, towns to villages. The grand tour.',
    etapes: [
      {
        jour: 1,
        titre: '[TO REPLACE] Ziguinchor - River capital',
        texte: '[TO REPLACE] Arrival, Saint-Maur market, cathedral, prefecture, regional museum. Sunset pirogue on river. Night Ziguinchor.',
        destination: null,
      },
      {
        jour: 2,
        titre: '[TO REPLACE] Carabane - Timeless island',
        texte: '[TO REPLACE] Transfer Elinkine, 30 min pirogue to Carabane. Campement check-in. Visit 1885 church, sandy lanes, kapok trees. Lunch lobster/fish. Afternoon: pirogue in bolongs, bird watching, deserted beach. Night Carabane.',
        destination: null,
      },
      {
        jour: 3,
        titre: '[TO REPLACE] Oussouye - Diola land',
        texte: '[TO REPLACE] Pirogue return, drive Oussouye. Museum, palace, impluvium houses, Edikar pottery. Sacred forest. Night Oussouye.',
        destination: null,
      },
      {
        jour: 4,
        titre: '[TO REPLACE] Niaguis - Rice paddies and traditions',
        texte: '[TO REPLACE] Hike terraced rice paddies, traditional irrigation system, millet lunch. Diola dance initiation (optional). Night village campement.',
        destination: null,
      },
      {
        jour: 5,
        titre: '[TO REPLACE] Kafountine/Abéné - Ocean and fishing',
        texte: '[TO REPLACE] Coastal drive. Kafountine fishing port at dawn, smokers. Abéné beach, swimming. Music festival if in season. Night beach campement.',
        destination: null,
      },
      {
        jour: 6,
        titre: '[TO REPLACE] Cap Skirring - Great beach',
        texte: '[TO REPLACE] Drive Cap Skirring (30 min). Free day: 20km beach, filaos bike, surf, quad, fishing. Craft market. Night hotel/lodge.',
        destination: null,
      },
      {
        jour: 7,
        titre: '[TO REPLACE] Diembering - Forest and departure',
        texte: '[TO REPLACE] Morning: Diembering forest, guided walk, creek swimming. Lunch. Transfer to Cap Skirring airport or drive to Ziguinchor.',
        destination: null,
      },
    ],
  },
];

export default async ({ strapi }) => {
  // Seed French versions
  for (const itin of itinerairesFR) {
    const existing = await strapi.entityService.findMany('api::itineraire.itineraire', {
      filters: { slug: itin.slug, locale: 'fr' },
    });
    if (existing.length === 0) {
      await strapi.entityService.create('api::itineraire.itineraire', {
        data: { ...itin, publishedAt: new Date(), locale: 'fr' },
      });
      console.log(`✅ Created itinéraire (FR): ${itin.titre}`);
    }
  }

  // Seed English versions
  for (const itin of itinerairesEN) {
    const existing = await strapi.entityService.findMany('api::itineraire.itineraire', {
      filters: { slug: itin.slug, locale: 'en' },
    });
    if (existing.length === 0) {
      await strapi.entityService.create('api::itineraire.itineraire', {
        data: { ...itin, publishedAt: new Date(), locale: 'en' },
      });
      console.log(`✅ Created itinéraire (EN): ${itin.titre}`);
    }
  }

  console.log('✅ All itinéraires seeded (FR & EN)');
};