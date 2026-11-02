"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async ({ strapi }) => {
    console.log('🔗 Linking relations between content types...\n');
    // Helper to find entity by slug and locale
    const findBySlug = async (uid, slug, locale) => {
        const results = await strapi.entityService.findMany(uid, {
            filters: { slug, locale },
            limit: 1,
        });
        return results[0] || null;
    };
    // Helper to find entity by name and locale (for single types)
    const findSingle = async (uid, locale) => {
        const results = await strapi.entityService.findMany(uid, { locale, limit: 1 });
        return results[0] || null;
    };
    // ============================================
    // Link DESTINATIONS <-> ACTIVITES (many-to-many)
    // ============================================
    const activityDestinationLinks = [
        // Pirogue dans les bolongs -> Ziguinchor, Oussouye, Kafountine, Carabane
        { activitySlug: 'pirogue-bolongs', destinationSlugs: ['basse-casamance', 'oussouye', 'kafountine-abene', 'ile-de-carabane'] },
        // Observation oiseaux -> Basse Casamance, Niaguis (part of basse-casamance), Diembering (part of cap-skirring)
        { activitySlug: 'observation-oiseaux', destinationSlugs: ['basse-casamance', 'cap-skirring'] },
        // Villages poterie -> Oussouye
        { activitySlug: 'villages-poterie-diola', destinationSlugs: ['oussouye'] },
        // Marchés gastronomie -> Ziguinchor, Oussouye, Kafountine
        { activitySlug: 'marches-gastronomie', destinationSlugs: ['basse-casamance', 'oussouye', 'kafountine-abene'] },
    ];
    for (const locale of ['fr', 'en']) {
        for (const link of activityDestinationLinks) {
            const activity = await findBySlug('api::activite.activite', link.activitySlug, locale);
            if (!activity)
                continue;
            const destinationIds = [];
            for (const destSlug of link.destinationSlugs) {
                const dest = await findBySlug('api::destination.destination', destSlug, locale);
                if (dest)
                    destinationIds.push(dest.id);
            }
            if (destinationIds.length > 0) {
                await strapi.entityService.update('api::activite.activite', activity.id, {
                    data: { destinations: destinationIds },
                    locale,
                });
                console.log(`✅ Linked activité "${activity.titre}" to ${destinationIds.length} destination(s) [${locale}]`);
            }
        }
    }
    // ============================================
    // Link HEBERGEMENTS -> DESTINATIONS (many-to-one)
    // ============================================
    const hebergementDestinationLinks = [
        { hebergementSlug: 'campement-kadiandoumagne', destinationSlug: 'basse-casamance' },
        { hebergementSlug: 'ecolodge-le-paletuvier', destinationSlug: 'oussouye' },
        { hebergementSlug: 'hotel-de-la-plage-cap-skirring', destinationSlug: 'cap-skirring' },
        { hebergementSlug: 'campement-carabane-nature', destinationSlug: 'ile-de-carabane' },
        { hebergementSlug: 'ecolodge-oussouye-village', destinationSlug: 'oussouye' },
        { hebergementSlug: 'kafountine-beach-lodge', destinationSlug: 'kafountine-abene' },
    ];
    for (const locale of ['fr', 'en']) {
        // Adjust slugs for English
        const slugMap = {
            fr: {
                'campement-kadiandoumagne': 'campement-kadiandoumagne',
                'ecolodge-le-paletuvier': 'ecolodge-le-paletuvier',
                'hotel-de-la-plage-cap-skirring': 'hotel-de-la-plage-cap-skirring',
                'campement-carabane-nature': 'campement-carabane-nature',
                'ecolodge-oussouye-village': 'ecolodge-oussouye-village',
                'kafountine-beach-lodge': 'kafountine-beach-lodge',
            },
            en: {
                'campement-kadiandoumagne': 'kadiandoumagne-campement',
                'ecolodge-le-paletuvier': 'le-paletuvier-ecolodge',
                'hotel-de-la-plage-cap-skirring': 'hotel-de-la-plage-cap-skirring',
                'campement-carabane-nature': 'carabane-nature-campement',
                'ecolodge-oussouye-village': 'oussouye-village-ecolodge',
                'kafountine-beach-lodge': 'kafountine-beach-lodge',
            },
        };
        for (const link of hebergementDestinationLinks) {
            const hebSlug = slugMap[locale][link.hebergementSlug];
            const hebergement = await findBySlug('api::hebergement.hebergement', hebSlug, locale);
            if (!hebergement)
                continue;
            const destination = await findBySlug('api::destination.destination', link.destinationSlug, locale);
            if (destination) {
                await strapi.entityService.update('api::hebergement.hebergement', hebergement.id, {
                    data: { destination: destination.id },
                    locale,
                });
                console.log(`✅ Linked hébergement "${hebergement.nom}" to destination "${destination.nom}" [${locale}]`);
            }
        }
    }
    // ============================================
    // Link ITINERAIRE ETAPES -> DESTINATIONS
    // ============================================
    const itineraryDestinationLinks = {
        // Map each itinerary step (jour) to destination slugs
        'le-grand-classique': ['basse-casamance', 'oussouye', 'cap-skirring'],
        'nature-et-culture': ['basse-casamance', 'basse-casamance', 'oussouye', 'kafountine-abene', 'basse-casamance'],
        'la-casamance-complete': ['basse-casamance', 'ile-de-carabane', 'oussouye', 'basse-casamance', 'kafountine-abene', 'cap-skirring', 'cap-skirring'],
    };
    for (const locale of ['fr', 'en']) {
        for (const [itinSlug, destSlugs] of Object.entries(itineraryDestinationLinks)) {
            const itineraires = await strapi.entityService.findMany('api::itineraire.itineraire', {
                filters: { slug: itinSlug, locale },
                populate: { etapes: true },
                limit: 1,
            });
            if (itineraires.length === 0)
                continue;
            const itinerary = itineraires[0];
            // Update each etape with destination
            const updatedEtapes = [];
            for (let i = 0; i < itinerary.etapes.length && i < destSlugs.length; i++) {
                const etape = itinerary.etapes[i];
                const destSlug = destSlugs[i];
                const destination = await findBySlug('api::destination.destination', destSlug, locale);
                updatedEtapes.push({
                    id: etape.id,
                    jour: etape.jour,
                    titre: etape.titre,
                    texte: etape.texte,
                    destination: destination?.id || null,
                });
            }
            if (updatedEtapes.length > 0) {
                await strapi.entityService.update('api::itineraire.itineraire', itinerary.id, {
                    data: { etapes: updatedEtapes },
                    locale,
                });
                console.log(`✅ Linked itinéraire "${itinSlug}" étapes to destinations [${locale}]`);
            }
        }
    }
    // ============================================
    // Link DESTINATIONS <-> ACTIVITES (inverse - already done via activite.destinations)
    // The relation is bidirectional, so updating one side updates the other
    // ============================================
    console.log('\n🎉 All relations linked successfully!');
    console.log('\n📝 Note: Images still need to be uploaded manually in the admin panel.');
    console.log('   Homepage hero images, destination galleries, activity galleries,');
    console.log('   accommodation galleries, and itinerary images should be added.');
};
