/**
 * Seed script for Activités (collection type)
 * Run with: npm run seed:run -- --name=04-activites
 */
import { factories } from '@strapi/strapi';

const activitesFR = [
  {
    titre: '[À REMPLACER] Pirogue dans les bolongs',
    slug: 'pirogue-bolongs',
    resume: '[À REMPLACER] Glissez au fil de l\'eau entre les palétuviers, observez les oiseaux, découvrez les villages isolés accessibles seulement par l\'eau. Une immersion totale dans la mangrove.',
    description: '[À REMPLACER] Embarquez sur une pirogue traditionnelle à balancier pour explorer les bolongs (bras de mer) de la Casamance. Au départ de Ziguinchor, Oussouye ou Kafountine, votre guide-pêcheur vous mène dans un dédale de canaux bordés de palétuviers. Silence total, seulement le clapotis de l\'eau et le chant des oiseaux : hérons, aigrettes, pélicans, martins-pêcheurs. Vous croisez des villages sur pilotis, des femmes ramassant des huîtres sur les racines, des crabes violonistes agitant leur pince géante. Durée : 2h à la journée complète selon le circuit. Possibilité de déjeuner chez l\'habitant sur une île.',
    theme: 'Nature',
    duree: '[À REMPLACER] 2h à 1 journée',
    // galerie: images à ajouter dans l'admin
  },
  {
    titre: '[À REMPLACER] Observation des oiseaux',
    slug: 'observation-oiseaux',
    resume: '[À REMPLACER] La Casamance est un paradis ornithologique : plus de 300 espèces dont le pélican gris, l\'ibis sacré, le martin-pêcheur pie, le touraco vert. Sorties guidées à l\'aube.',
    description: '[À REMPLACER] Avec plus de 300 espèces recensées, la Casamance est une destination de rêve pour les ornithologues. Les zones humides (bolongs, rizières, mangroves) attirent une avifaune exceptionnelle. Espèces emblématiques : pélican gris, ibis sacré, tantale ibis, cormoran africain, héron goliath, aigrette garzette, martin-pêcheur pie, touraco vert, rollier d\'Abyssin, guêpier à front blanc. Les meilleures périodes : novembre à avril (migrateurs paléarctiques présents) et juin-août (reproduction). Sorties guidées à l\'aube (6h-9h) et en fin d\'après-midi (17h-19h) avec guides locaux experts. Matériel : jumelles fournies, guide d\'identification. Sites : parc national du Delta du Saloum (partie sud), bolongs de Bignona, rizières de Niaguis, forêt de Diembering.',
    theme: 'Nature',
    duree: '[À REMPLACER] 3h (matin) ou 2h (soir)',
  },
  {
    titre: '[À REMPLACER] Villages et poterie Diola',
    slug: 'villages-poterie-diola',
    resume: '[À REMPLACER] Rencontrez les potières d\'Eloubaline ou d\'Édikar, façonnent l\'argile selon des techniques millénaires. Visite de cases à impluvium, découverte de l\'organisation sociale Diola.',
    description: '[À REMPLACER] Les Diolas sont réputés pour leur poterie traditionnelle, façonnée exclusivement par les femmes sans tour, par modelage direct. À Eloubaline (île au cœur des bolongs) ou à Édikar (près d\'Oussouye), vous assistez à tout le processus : extraction de l\'argile, préparation, modelage, séchage, cuisson au feu de bois. Chaque pièce a une fonction : canari (conservation eau), marmite (cuisson), plat (service), jarre (stockage mil). Les motifs géométriques gravés racontent l\'histoire du clan. Visite guidée des cases à impluvium (architecture unique : pièce centrale à ciel ouvert drainant l\'eau), explication de l\'organisation sociale (âge-clans, initiations, roi), rencontre avec des aînés. Achat direct possible (prix équitables).',
    theme: 'Culture',
    duree: '[À REMPLACER] demi-journée',
  },
  {
    titre: '[À REMPLACER] Marchés et gastronomie',
    slug: 'marches-gastronomie',
    resume: '[À REMPLACER] Plongez dans l\'effervescence des marchés de Ziguinchor, Oussouye ou Kafountine. Dégustez le thieboudienne, le yassa, les fruits de mer grillés, le jus de bouye, le bissap.',
    description: '[À REMPLACER] La cuisine casamançaise est un métissage savoureux : riz (base), poisson (fleuve/mer), légumes (niébé, gombo, aubergine africaine), épices (piment, ail, oignon, netetou - graines de néré fermentées). Plats emblématiques : thieboudienne (riz au poisson, légumes, sauce rouge), yassa (poulet/poisson mariné citron-oignon), mafé (sauce arachide), soupe kandja (gombo). Spécialités locales : huîtres de palétuvier crues au citron, crabes farcis, poissons braisés (capitaine, bar, dorade). Boissons : bissap (hibiscus), bouye (baobab), gingembre, vin de palme (bander). Marchés : Saint-Maur (Ziguinchor, couvert, tous les jours), Normandie (Ziguinchor, plein air, mar/sam), Oussouye (ven), Kafountine (mar/sam). Atelier cuisine possible chez l\'habitant.',
    theme: 'Gastronomie',
    duree: '[À REMPLACER] 3h (marché + dégustation) ou atelier 4h',
  },
];

const activitesEN = [
  {
    titre: '[TO REPLACE] Pirogue in the bolongs',
    slug: 'pirogue-bolongs',
    resume: '[TO REPLACE] Glide along the water between mangroves, observe birds, discover isolated villages accessible only by water. Total immersion in the mangrove.',
    description: '[TO REPLACE] Board a traditional outrigger pirogue to explore the bolongs (sea arms) of Casamance. From Ziguinchor, Oussouye or Kafountine, your fisherman-guide takes you through a maze of channels lined with mangroves. Total silence, only the lapping of water and birdsong: herons, egrets, pelicans, kingfishers. You pass villages on stilts, women gathering oysters on roots, fiddler crabs waving their giant claws. Duration: 2h to full day depending on circuit. Possibility of lunch with a local family on an island.',
    theme: 'Nature',
    duree: '[TO REPLACE] 2h to 1 day',
  },
  {
    titre: '[TO REPLACE] Bird watching',
    slug: 'observation-oiseaux',
    resume: '[TO REPLACE] Casamance is an ornithological paradise: 300+ species including grey pelican, sacred ibis, pied kingfisher, green turaco. Guided outings at dawn.',
    description: '[TO REPLACE] With 300+ recorded species, Casamance is a dream destination for birdwatchers. Wetlands (bolongs, rice paddies, mangroves) attract exceptional birdlife. Flagship species: grey pelican, sacred ibis, yellow-billed stork, African cormorant, goliath heron, little egret, pied kingfisher, green turaco, Abyssinian roller, white-fronted bee-eater. Best periods: Nov-Apr (Palearctic migrants present) and Jun-Aug (breeding). Guided outings at dawn (6am-9am) and late afternoon (5pm-7pm) with expert local guides. Equipment: binoculars provided, ID guide. Sites: Saloum Delta National Park (southern part), Bignona bolongs, Niaguis rice paddies, Diembering forest.',
    theme: 'Nature',
    duree: '[TO REPLACE] 3h (morning) or 2h (evening)',
  },
  {
    titre: '[TO REPLACE] Diola villages and pottery',
    slug: 'villages-poterie-diola',
    resume: '[TO REPLACE] Meet the potters of Eloubaline or Edikar, shaping clay using millennia-old techniques. Visit impluvium houses, discover Diola social organisation.',
    description: '[TO REPLACE] The Diola are renowned for traditional pottery, shaped exclusively by women without a wheel, by direct modeling. In Eloubaline (island in the heart of bolongs) or Edikar (near Oussouye), you witness the entire process: clay extraction, preparation, modeling, drying, wood-firing. Each piece has a function: canari (water storage), marmite (cooking), plate (serving), jar (millet storage). Geometric engraved motifs tell clan history. Guided visit of impluvium houses (unique architecture: central open-air room draining rainwater), explanation of social organisation (age-clans, initiations, king), meeting with elders. Direct purchase possible (fair prices).',
    theme: 'Culture',
    duree: '[TO REPLACE] half-day',
  },
  {
    titre: '[TO REPLACE] Markets and gastronomy',
    slug: 'marches-gastronomie',
    resume: '[TO REPLACE] Immerse yourself in the bustle of Ziguinchor, Oussouye or Kafountine markets. Taste thieboudienne, yassa, grilled seafood, bouye juice, bissap.',
    description: '[TO REPLACE] Casamance cuisine is a delicious melting pot: rice (staple), fish (river/sea), vegetables (cowpea, okra, African eggplant), spices (chilli, garlic, onion, netetou - fermented néré seeds). Signature dishes: thieboudienne (rice with fish, vegetables, red sauce), yassa (chicken/fish marinated lemon-onion), mafé (peanut sauce), kandja soup (okra). Local specialities: mangrove oysters raw with lemon, stuffed crabs, grilled fish (captain, barramundi, sea bream). Drinks: bissap (hibiscus), bouye (baobab), ginger, palm wine (bander). Markets: Saint-Maur (Ziguinchor, covered, daily), Normandie (Ziguinchor, open-air, Tue/Sat), Oussouye (Fri), Kafountine (Tue/Sat). Cooking workshop possible with local family.',
    theme: 'Gastronomie',
    duree: '[TO REPLACE] 3h (market + tasting) or 4h workshop',
  },
];

export default async ({ strapi }) => {
  // Seed French versions
  for (const act of activitesFR) {
    const existing = await strapi.entityService.findMany('api::activite.activite', {
      filters: { slug: act.slug, locale: 'fr' },
    });
    if (existing.length === 0) {
      await strapi.entityService.create('api::activite.activite', {
        data: { ...act, publishedAt: new Date(), locale: 'fr' },
      });
      console.log(`✅ Created activité (FR): ${act.titre}`);
    }
  }

  // Seed English versions
  for (const act of activitesEN) {
    const existing = await strapi.entityService.findMany('api::activite.activite', {
      filters: { slug: act.slug, locale: 'en' },
    });
    if (existing.length === 0) {
      await strapi.entityService.create('api::activite.activite', {
        data: { ...act, publishedAt: new Date(), locale: 'en' },
      });
      console.log(`✅ Created activité (EN): ${act.titre}`);
    }
  }

  console.log('✅ All activités seeded (FR & EN)');
};