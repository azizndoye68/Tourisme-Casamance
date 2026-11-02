"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async ({ strapi }) => {
    // Check if homepage already exists
    const existing = await strapi.entityService.findMany('api::homepage.homepage', {
        locale: 'fr',
    });
    if (existing.length > 0) {
        console.log('Homepage already seeded, skipping...');
        return;
    }
    await strapi.entityService.create('api::homepage.homepage', {
        data: {
            publishedAt: new Date(),
            locale: 'fr',
            hero: {
                badge: '[À REMPLACER] Sud du Sénégal',
                titre: '[À REMPLACER] Là où la mangrove rencontre l\'océan',
                titreAccent: 'mangrove',
                sousTitre: '[À REMPLACER] Découvrez la Casamance, terre de palmeraies, de bolongs mystérieux et de villages Diola aux traditions vivantes. Un voyage hors du temps entre terre et mer.',
                ctaPrincipalTexte: '[À REMPLACER] Voir les itinéraires',
                ctaPrincipalLien: '/fr/itineraires',
                ctaSecondaireTexte: '[À REMPLACER] Explorer les lieux',
                ctaSecondaireLien: '/fr/destinations',
                // imagePrincipale and imageSecondaire will be added manually in admin
                badgeSaison: '[À REMPLACER] Saison sèche nov. à mai',
            },
            chiffresCles: [
                { valeur: '28 350 km²', label: '[À REMPLACER] de territoire', icone: 'map' },
                { valeur: '300 km', label: '[À REMPLACER] de fleuve', icone: 'wave' },
                { valeur: '0', label: '[À REMPLACER] voiture à Carabane', icone: 'users' },
            ],
            bandeauCanopee: {
                texte: '[À REMPLACER] Plages ✦ Mangroves ✦ Culture diola ✦ Écotourisme ✦ Pirogue',
            },
            sectionVerte: {
                titre: '[À REMPLACER] Mangroves, palmeraies et forêts à perte de vue',
                plantes: ['Palétuviers', 'Palmeraies', 'Caïlcédrats', 'Fromagers', 'Rôniers', 'Flamboyants'],
            },
            temoignage: {
                citation: '[À REMPLACER] "La Casamance m\'a offert le plus beau voyage de ma vie. La gentillesse des gens, la beauté des paysages, le silence des bolongs... C\'est une autre Afrique, authentique et préservée."',
                auteur: '[À REMPLACER] Marie',
                pays: '[À REMPLACER] France',
            },
            appelAction: {
                titre: '[À REMPLACER] Prêt à partir ?',
                sousTitre: '[À REMPLACER] Recevez nos conseils de voyage, les meilleures adresses et nos offres spéciales par email. Ou discutez directement avec un expert local sur WhatsApp.',
                texteNewsletter: '[À REMPLACER] S\'inscrire',
                texteWhatsApp: '[À REMPLACER] Discuter sur WhatsApp',
                lienWhatsApp: '[À REMPLACER] https://wa.me/221770000000',
            },
        },
    });
    // Create English version
    await strapi.entityService.create('api::homepage.homepage', {
        data: {
            publishedAt: new Date(),
            locale: 'en',
            hero: {
                badge: '[TO REPLACE] Southern Senegal',
                titre: '[TO REPLACE] Where the mangrove meets the ocean',
                titreAccent: 'mangrove',
                sousTitre: '[TO REPLACE] Discover Casamance, land of palm groves, mysterious bolongs and Diola villages with living traditions. A timeless journey between land and sea.',
                ctaPrincipalTexte: '[TO REPLACE] View itineraries',
                ctaPrincipalLien: '/en/itineraires',
                ctaSecondaireTexte: '[TO REPLACE] Explore places',
                ctaSecondaireLien: '/en/destinations',
                badgeSaison: '[TO REPLACE] Dry season Nov. to May',
            },
            chiffresCles: [
                { valeur: '28,350 km²', label: '[TO REPLACE] of territory', icone: 'map' },
                { valeur: '300 km', label: '[TO REPLACE] of river', icone: 'wave' },
                { valeur: '0', label: '[TO REPLACE] cars in Carabane', icone: 'users' },
            ],
            bandeauCanopee: {
                texte: '[TO REPLACE] Beaches ✦ Mangroves ✦ Diola culture ✦ Ecotourism ✦ Pirogue',
            },
            sectionVerte: {
                titre: '[TO REPLACE] Mangroves, palm groves and forests as far as the eye can see',
                plantes: ['Mangroves', 'Palm groves', 'African mahogany', 'Kapok trees', 'Ronier palms', 'Flamboyant trees'],
            },
            temoignage: {
                citation: '[TO REPLACE] "Casamance gave me the most beautiful journey of my life. The kindness of people, the beauty of landscapes, the silence of bolongs... This is another Africa, authentic and preserved."',
                auteur: '[TO REPLACE] Marie',
                pays: '[TO REPLACE] France',
            },
            appelAction: {
                titre: '[TO REPLACE] Ready to go?',
                sousTitre: '[TO REPLACE] Get our travel tips, best addresses and special offers by email. Or chat directly with a local expert on WhatsApp.',
                texteNewsletter: '[TO REPLACE] Subscribe',
                texteWhatsApp: '[TO REPLACE] Chat on WhatsApp',
                lienWhatsApp: '[TO REPLACE] https://wa.me/221770000000',
            },
        },
    });
    console.log('✅ Homepage seeded (FR & EN)');
};
