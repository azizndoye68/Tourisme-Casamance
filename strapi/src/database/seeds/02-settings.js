"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async ({ strapi }) => {
    const existing = await strapi.entityService.findMany('api::settings.settings');
    if (existing.length > 0) {
        console.log('Settings already seeded, skipping...');
        return;
    }
    await strapi.entityService.create('api::settings.settings', {
        data: {
            nomSite: '[À REMPLACER] Casamance',
            telephone: '[À REMPLACER] +221 77 000 00 00',
            email: '[À REMPLACER] contact@visitecasamance.com',
            whatsapp: '[À REMPLACER] +221770000000',
            reseauxSociaux: {
                instagram: '[À REMPLACER] https://instagram.com/visitecasamance',
                facebook: '[À REMPLACER] https://facebook.com/visitecasamance',
                youtube: '[À REMPLACER] https://youtube.com/@visitecasamance',
            },
        },
    });
    console.log('✅ Settings seeded');
};
