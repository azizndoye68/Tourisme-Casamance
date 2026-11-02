"use strict";
/**
 * Main seed runner - runs all seeds in order
 * Run with: npm run seed:run
 * Or run individual seeds with: npm run seed:run -- --name=01-homepage
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkRelationsSeed = exports.temoignagesSeed = exports.hebergementsSeed = exports.itinerairesSeed = exports.activitesSeed = exports.destinationsSeed = exports.settingsSeed = exports.homepageSeed = void 0;
// Import all seed modules
const _01_homepage_1 = __importDefault(require("./01-homepage"));
exports.homepageSeed = _01_homepage_1.default;
const _02_settings_1 = __importDefault(require("./02-settings"));
exports.settingsSeed = _02_settings_1.default;
const _03_destinations_1 = __importDefault(require("./03-destinations"));
exports.destinationsSeed = _03_destinations_1.default;
const _04_activites_1 = __importDefault(require("./04-activites"));
exports.activitesSeed = _04_activites_1.default;
const _05_itineraires_1 = __importDefault(require("./05-itineraires"));
exports.itinerairesSeed = _05_itineraires_1.default;
const _06_hebergements_1 = __importDefault(require("./06-hebergements"));
exports.hebergementsSeed = _06_hebergements_1.default;
const _07_temoignages_1 = __importDefault(require("./07-temoignages"));
exports.temoignagesSeed = _07_temoignages_1.default;
const _08_link_relations_1 = __importDefault(require("./08-link-relations"));
exports.linkRelationsSeed = _08_link_relations_1.default;
const seeds = [
    { name: '01-homepage', fn: _01_homepage_1.default },
    { name: '02-settings', fn: _02_settings_1.default },
    { name: '03-destinations', fn: _03_destinations_1.default },
    { name: '04-activites', fn: _04_activites_1.default },
    { name: '05-itineraires', fn: _05_itineraires_1.default },
    { name: '06-hebergements', fn: _06_hebergements_1.default },
    { name: '07-temoignages', fn: _07_temoignages_1.default },
    { name: '08-link-relations', fn: _08_link_relations_1.default },
];
exports.default = async ({ strapi }) => {
    console.log('🌱 Starting database seeding for Tourisme Casamance...\n');
    for (const seed of seeds) {
        try {
            console.log(`▶️  Running seed: ${seed.name}`);
            await seed.fn({ strapi });
            console.log(`✅ Completed: ${seed.name}\n`);
        }
        catch (error) {
            console.error(`❌ Error in seed ${seed.name}:`, error);
            throw error;
        }
    }
    console.log('🎉 All seeds completed successfully!');
    console.log('\n📝 Note: All content is marked with [À REMPLACER] / [TO REPLACE]');
    console.log('   Please replace placeholder content with real data in the admin panel.');
    console.log('   Images need to be uploaded manually in the admin panel.');
};
