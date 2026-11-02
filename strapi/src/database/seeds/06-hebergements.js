"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hebergementsFR = [
    {
        nom: '[À REMPLACER] Campement Kadiandoumagne',
        slug: 'campement-kadiandoumagne',
        type: 'campement',
        prixIndicatif: '[À REMPLACER] 15 000 CFA/nuit',
        contactWhatsApp: '[À REMPLACER] +221770000001',
        // galerie: à ajouter dans l'admin
        // destination: sera lié après
    },
    {
        nom: '[À REMPLACER] Écolodge Le Palétuvier',
        slug: 'ecolodge-le-paletuvier',
        type: 'ecolodge',
        prixIndicatif: '[À REMPLACER] 45 000 CFA/nuit',
        contactWhatsApp: '[À REMPLACER] +221770000002',
    },
    {
        nom: '[À REMPLACER] Hôtel de la Plage Cap Skirring',
        slug: 'hotel-de-la-plage-cap-skirring',
        type: 'hotel',
        prixIndicatif: '[À REMPLACER] 80 000 CFA/nuit',
        contactWhatsApp: '[À REMPLACER] +221770000003',
    },
    {
        nom: '[À REMPLACER] Campement Carabane Nature',
        slug: 'campement-carabane-nature',
        type: 'campement',
        prixIndicatif: '[À REMPLACER] 20 000 CFA/nuit',
        contactWhatsApp: '[À REMPLACER] +221770000004',
    },
    {
        nom: '[À REMPLACER] Écolodge Oussouye Village',
        slug: 'ecolodge-oussouye-village',
        type: 'ecolodge',
        prixIndicatif: '[À REMPLACER] 35 000 CFA/nuit',
        contactWhatsApp: '[À REMPLACER] +221770000005',
    },
    {
        nom: '[À REMPLACER] Kafountine Beach Lodge',
        slug: 'kafountine-beach-lodge',
        type: 'ecolodge',
        prixIndicatif: '[À REMPLACER] 40 000 CFA/nuit',
        contactWhatsApp: '[À REMPLACER] +221770000006',
    },
];
const hebergementsEN = [
    {
        nom: '[TO REPLACE] Kadiandoumagne Campement',
        slug: 'kadiandoumagne-campement',
        type: 'campement',
        prixIndicatif: '[TO REPLACE] 15,000 CFA/night',
        contactWhatsApp: '[TO REPLACE] +221770000001',
    },
    {
        nom: '[TO REPLACE] Le Palétuvier Ecolodge',
        slug: 'le-paletuvier-ecolodge',
        type: 'ecolodge',
        prixIndicatif: '[TO REPLACE] 45,000 CFA/night',
        contactWhatsApp: '[TO REPLACE] +221770000002',
    },
    {
        nom: '[TO REPLACE] Hotel de la Plage Cap Skirring',
        slug: 'hotel-de-la-plage-cap-skirring',
        type: 'hotel',
        prixIndicatif: '[TO REPLACE] 80,000 CFA/night',
        contactWhatsApp: '[TO REPLACE] +221770000003',
    },
    {
        nom: '[TO REPLACE] Carabane Nature Campement',
        slug: 'carabane-nature-campement',
        type: 'campement',
        prixIndicatif: '[TO REPLACE] 20,000 CFA/night',
        contactWhatsApp: '[TO REPLACE] +221770000004',
    },
    {
        nom: '[TO REPLACE] Oussouye Village Ecolodge',
        slug: 'oussouye-village-ecolodge',
        type: 'ecolodge',
        prixIndicatif: '[TO REPLACE] 35,000 CFA/night',
        contactWhatsApp: '[TO REPLACE] +221770000005',
    },
    {
        nom: '[TO REPLACE] Kafountine Beach Lodge',
        slug: 'kafountine-beach-lodge',
        type: 'ecolodge',
        prixIndicatif: '[TO REPLACE] 40,000 CFA/night',
        contactWhatsApp: '[TO REPLACE] +221770000006',
    },
];
exports.default = async ({ strapi }) => {
    // Seed French versions
    for (const heb of hebergementsFR) {
        const existing = await strapi.entityService.findMany('api::hebergement.hebergement', {
            filters: { slug: heb.slug, locale: 'fr' },
        });
        if (existing.length === 0) {
            await strapi.entityService.create('api::hebergement.hebergement', {
                data: { ...heb, publishedAt: new Date(), locale: 'fr' },
            });
            console.log(`✅ Created hébergement (FR): ${heb.nom}`);
        }
    }
    // Seed English versions
    for (const heb of hebergementsEN) {
        const existing = await strapi.entityService.findMany('api::hebergement.hebergement', {
            filters: { slug: heb.slug, locale: 'en' },
        });
        if (existing.length === 0) {
            await strapi.entityService.create('api::hebergement.hebergement', {
                data: { ...heb, publishedAt: new Date(), locale: 'en' },
            });
            console.log(`✅ Created hébergement (EN): ${heb.nom}`);
        }
    }
    console.log('✅ All hébergements seeded (FR & EN)');
};
