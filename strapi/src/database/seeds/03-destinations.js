"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const destinationsFR = [
    {
        nom: '[À REMPLACER] Île de Carabane',
        slug: 'ile-de-carabane',
        type: 'ile',
        resume: '[À REMPLACER] Ancienne capitale coloniale, Carabane est une île paisible sans voitures, accessible seulement en pirogue. Ses ruelles sablonneuses, son église centenaire et ses mangroves en font un havre de paix.',
        description: '[À REMPLACER] Carabane, l\'ancienne capitale de la Casamance, est une île hors du temps. Accessible uniquement par pirogue depuis Elinkine (30 min), elle n\'a ni voitures ni routes goudronnées. On y circule à pied ou à vélo sur des chemins de sable bordés de fromagers centenaires. L\'église Saint-Antoine (1885) témoigne du passé colonial. Les mangroves environnantes abritent une faune exceptionnelle : pélicans, hérons, crabes violonistes. Le soir, les couchers de soleil sur le fleuve sont spectaculaires. Hébergements chez l\'habitant et petits campements écologiques.',
        latitude: 12.5583,
        longitude: -16.7333,
        tags: ['patrimoine', 'mangrove', 'pirogue', 'calme', 'histoire'],
        miseEnAvant: true,
    },
    {
        nom: '[À REMPLACER] Cap Skirring',
        slug: 'cap-skirring',
        type: 'plage',
        resume: '[À REMPLACER] La station balnéaire la plus connue de Casamance, avec sa grande plage de sable fin bordée de filaos, ses hôtels et son aéroport international. Idéal pour la baignade et les sports nautiques.',
        description: '[À REMPLACER] Cap Skirring est la porte d\'entrée touristique de la Casamance. Sa plage de 20 km de sable blond, bordée de filaos, est l\'une des plus belles d\'Afrique de l\'Ouest. L\'aéroport international permet un accès direct depuis l\'Europe (vols charters saisonniers). La station propose hôtels, restaurants, location de vélos, quad, pêche au gros, surf. Le marché artisanal offre sculptures, tissus, bijoux. À proximité : la plage de Kabrousse, le village de Boucotte, la forêt de Diembering. Ambiance animée en saison sèche, plus calme en hivernage.',
        latitude: 12.3956,
        longitude: -16.7508,
        tags: ['plage', 'baignade', 'hotels', 'aeroport', 'artisanat'],
        miseEnAvant: true,
    },
    {
        nom: '[À REMPLACER] Oussouye',
        slug: 'oussouye',
        type: 'ville',
        resume: '[À REMPLACER] Cœur de la culture Diola, Oussouye est célèbre pour son roi traditionnel, ses cases à impluvium, son musée et le festival annuel du roi. Point de départ pour les rizières et la forêt sacrée.',
        description: '[À REMPLACER] Oussouye est le centre culturel du peuple Diola. Le roi (prééminent chef coutumier) y réside dans le palais royal. Les cases à impluvium (cours centrale découverte drainant l\'eau de pluie) sont typiques de l\'architecture locale. Le musée d\'Oussouye expose masques, instruments, outils traditionnels. La forêt sacrée de Boukitingho, gérée par les initiés, est un espace de biodiversité protégée par la tradition. Chaque année en janvier, le festival du roi (Houmabeul) rassemble des milliers de participants pour danses, luttes, cérémonies. Base idéale pour explorer la Basse Casamance : rizières en escalier, palmeraies, villages alentour.',
        latitude: 12.4833,
        longitude: -16.5500,
        tags: ['culture', 'diola', 'roi', 'museum', 'foret-sacree', 'festival'],
        miseEnAvant: true,
    },
    {
        nom: '[À REMPLACER] Kafountine et Abéné',
        slug: 'kafountine-abene',
        type: 'ville',
        resume: '[À REMPLACER] Deux villages voisins au bord de l\'océan, réputés pour leur port de pêche animé, leurs plages sauvages, la musique (festival Kafountine) et l\'accueil chaleureux. Ambiance authentique garantie.',
        description: '[À REMPLACER] Kafountine et Abéné forment un duo complémentaire. Kafountine, plus grand, a un port de pêche très actif : retour des pirogues colorées le matin, fumoirs de poisson, marché aux poissons. Abéné, plus petit, est réputé pour sa plage magnifique et son ambiance "roots". Le festival de Kafountine (décembre) attire musiciens d\'Afrique de l\'Ouest. Hébergements : campements en bord de mer, chambres chez l\'habitant. Excursions : bolongs de la Casamance, île aux oiseaux, forêt de Kafountine, randonnée à vélo. Vie nocturne animée avec bars musicaux.',
        latitude: 12.5833,
        longitude: -16.7333,
        tags: ['peche', 'plage', 'musique', 'festival', 'ambiance', 'bolongs'],
        miseEnAvant: true,
    },
    {
        nom: '[À REMPLACER] Basse Casamance (Ziguinchor et environs)',
        slug: 'basse-casamance',
        type: 'ville',
        resume: '[À REMPLACER] Ziguinchor, capitale régionale, porte d\'entrée de la Casamance. Marchés colorés, architecture coloniale, port fluvial, musée régional. Point de départ pour explorer le fleuve et ses bolongs.',
        description: '[À REMPLACER] Ziguinchor (200 000 hab.) est la capitale économique et administrative. Le marché Saint-Maur (couvert) et le marché de Normandie (plein air) débordent de fruits, tissus, épices, artisanat. L\'architecture coloniale (prefecture, cathédrale, maisons à galeried) se mêle aux cases traditionnelles. Le port sur le fleuve Casamance voit passer pirogues et pinasses. Le musée régional expose arts et traditions Diola, Mandingue, Peul. Depuis Ziguinchor : excursions en pirogue sur le fleuve (bolongs de Bignona, Tendouck, mangroves), visite des rizières de Niaguis, découverte des villages de l\'arrière-pays. Hébergements : hôtels, auberges, campements.',
        latitude: 12.5833,
        longitude: -16.2667,
        tags: ['capitale', 'marche', 'fleuve', 'musee', 'colonial', 'port'],
        miseEnAvant: false,
    },
];
const destinationsEN = [
    {
        nom: '[TO REPLACE] Carabane Island',
        slug: 'carabane-island',
        type: 'ile',
        resume: '[TO REPLACE] Former colonial capital, Carabane is a peaceful car-free island accessible only by pirogue. Its sandy lanes, century-old church and mangroves make it a haven of peace.',
        description: '[TO REPLACE] Carabane, the former capital of Casamance, is an island frozen in time. Accessible only by pirogue from Elinkine (30 min), it has no cars or paved roads. You travel on foot or by bike on sandy paths lined with century-old kapok trees. St. Anthony\'s Church (1885) bears witness to the colonial past. The surrounding mangroves shelter exceptional wildlife: pelicans, herons, fiddler crabs. Evenings bring spectacular sunsets over the river. Accommodation in family homes and small eco-campements.',
        latitude: 12.5583,
        longitude: -16.7333,
        tags: ['heritage', 'mangrove', 'pirogue', 'peaceful', 'history'],
        miseEnAvant: true,
    },
    {
        nom: '[TO REPLACE] Cap Skirring',
        slug: 'cap-skirring',
        type: 'plage',
        resume: '[TO REPLACE] The best-known seaside resort in Casamance, with its long fine-sand beach lined with filaos, hotels and international airport. Ideal for swimming and water sports.',
        description: '[TO REPLACE] Cap Skirring is the tourist gateway to Casamance. Its 20 km blond-sand beach, lined with filaos, is one of the most beautiful in West Africa. The international airport allows direct access from Europe (seasonal charter flights). The resort offers hotels, restaurants, bike/quad hire, big-game fishing, surfing. The craft market sells sculptures, fabrics, jewellery. Nearby: Kabrousse beach, Boucotte village, Diembering forest. Lively atmosphere in dry season, quieter in rainy season.',
        latitude: 12.3956,
        longitude: -16.7508,
        tags: ['beach', 'swimming', 'hotels', 'airport', 'crafts'],
        miseEnAvant: true,
    },
    {
        nom: '[TO REPLACE] Oussouye',
        slug: 'oussouye',
        type: 'ville',
        resume: '[TO REPLACE] Heart of Diola culture, Oussouye is famous for its traditional king, impluvium houses, museum and annual king festival. Starting point for rice paddies and sacred forest.',
        description: '[TO REPLACE] Oussouye is the cultural centre of the Diola people. The king (paramount traditional chief) resides in the royal palace. Impluvium houses (central open courtyard draining rainwater) are typical of local architecture. The Oussouye museum displays masks, instruments, traditional tools. The sacred forest of Boukitingho, managed by initiates, is a biodiversity area protected by tradition. Each January, the king\'s festival (Houmabeul) gathers thousands for dances, wrestling, ceremonies. Ideal base to explore Lower Casamance: terraced rice paddies, palm groves, surrounding villages.',
        latitude: 12.4833,
        longitude: -16.5500,
        tags: ['culture', 'diola', 'king', 'museum', 'sacred-forest', 'festival'],
        miseEnAvant: true,
    },
    {
        nom: '[TO REPLACE] Kafountine and Abéné',
        slug: 'kafountine-abene',
        type: 'ville',
        resume: '[TO REPLACE] Two neighbouring villages on the ocean, known for their lively fishing port, wild beaches, music (Kafountine festival) and warm welcome. Authentic atmosphere guaranteed.',
        description: '[TO REPLACE] Kafountine and Abéné form a complementary duo. Kafountine, larger, has a very active fishing port: colourful pirogues returning at dawn, fish smokers, fish market. Abéné, smaller, is renowned for its beautiful beach and "roots" vibe. The Kafountine festival (December) attracts musicians from West Africa. Accommodation: beachfront campements, family rooms. Excursions: Casamance bolongs, bird island, Kafountine forest, bike rides. Lively nightlife with music bars.',
        latitude: 12.5833,
        longitude: -16.7333,
        tags: ['fishing', 'beach', 'music', 'festival', 'atmosphere', 'bolongs'],
        miseEnAvant: true,
    },
    {
        nom: '[TO REPLACE] Lower Casamance (Ziguinchor and surroundings)',
        slug: 'lower-casamance',
        type: 'ville',
        resume: '[TO REPLACE] Ziguinchor, regional capital, gateway to Casamance. Colourful markets, colonial architecture, river port, regional museum. Starting point to explore the river and its bolongs.',
        description: '[TO REPLACE] Ziguinchor (200,000 pop.) is the economic and administrative capital. Saint-Maur market (covered) and Normandie market (open-air) overflow with fruit, fabrics, spices, crafts. Colonial architecture (prefecture, cathedral, gallery houses) blends with traditional houses. The port on the Casamance river sees pirogues and pinasses. The regional museum exhibits Diola, Mandinka, Fula arts and traditions. From Ziguinchor: pirogue excursions on the river (Bignona, Tendouck bolongs, mangroves), visit Niaguis rice paddies, discover hinterland villages. Accommodation: hotels, guesthouses, campements.',
        latitude: 12.5833,
        longitude: -16.2667,
        tags: ['capital', 'market', 'river', 'museum', 'colonial', 'port'],
        miseEnAvant: false,
    },
];
exports.default = async ({ strapi }) => {
    // Seed French versions
    for (const dest of destinationsFR) {
        const existing = await strapi.entityService.findMany('api::destination.destination', {
            filters: { slug: dest.slug, locale: 'fr' },
        });
        if (existing.length === 0) {
            await strapi.entityService.create('api::destination.destination', {
                data: { ...dest, publishedAt: new Date(), locale: 'fr' },
            });
            console.log(`✅ Created destination (FR): ${dest.nom}`);
        }
    }
    // Seed English versions
    for (const dest of destinationsEN) {
        const existing = await strapi.entityService.findMany('api::destination.destination', {
            filters: { slug: dest.slug, locale: 'en' },
        });
        if (existing.length === 0) {
            await strapi.entityService.create('api::destination.destination', {
                data: { ...dest, publishedAt: new Date(), locale: 'en' },
            });
            console.log(`✅ Created destination (EN): ${dest.nom}`);
        }
    }
    console.log('✅ All destinations seeded (FR & EN)');
};
