/**
 * Main seed runner - runs all seeds in order
 * Run with: npm run seed:run
 * Or run individual seeds with: npm run seed:run -- --name=01-homepage
 */

// Import all seed modules
import homepageSeed from './01-homepage';
import settingsSeed from './02-settings';
import destinationsSeed from './03-destinations';
import activitesSeed from './04-activites';
import itinerairesSeed from './05-itineraires';
import hebergementsSeed from './06-hebergements';
import temoignagesSeed from './07-temoignages';
import linkRelationsSeed from './08-link-relations';

const seeds = [
  { name: '01-homepage', fn: homepageSeed },
  { name: '02-settings', fn: settingsSeed },
  { name: '03-destinations', fn: destinationsSeed },
  { name: '04-activites', fn: activitesSeed },
  { name: '05-itineraires', fn: itinerairesSeed },
  { name: '06-hebergements', fn: hebergementsSeed },
  { name: '07-temoignages', fn: temoignagesSeed },
  { name: '08-link-relations', fn: linkRelationsSeed },
];

export default async ({ strapi }) => {
  console.log('🌱 Starting database seeding for Tourisme Casamance...\n');

  for (const seed of seeds) {
    try {
      console.log(`▶️  Running seed: ${seed.name}`);
      await seed.fn({ strapi });
      console.log(`✅ Completed: ${seed.name}\n`);
    } catch (error) {
      console.error(`❌ Error in seed ${seed.name}:`, error);
      throw error;
    }
  }

  console.log('🎉 All seeds completed successfully!');
  console.log('\n📝 Note: All content is marked with [À REMPLACER] / [TO REPLACE]');
  console.log('   Please replace placeholder content with real data in the admin panel.');
  console.log('   Images need to be uploaded manually in the admin panel.');
};

// Also export individual seeds for CLI usage
export {
  homepageSeed,
  settingsSeed,
  destinationsSeed,
  activitesSeed,
  itinerairesSeed,
  hebergementsSeed,
  temoignagesSeed,
  linkRelationsSeed,
};