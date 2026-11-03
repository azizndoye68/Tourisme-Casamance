import { CloudRain, Sun } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface SeasonData {
  label: string;
  period: string;
  description: string;
}

interface WhenToGoProps {
  data: { title: string; drySeason: SeasonData; wetSeason: SeasonData };
  locale: Locale;
}

const months = {
  fr: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};
const copy = {
  fr: {
    eyebrow: 'Choisir le bon moment', calendar: 'Le rythme des saisons', dry: 'Soleil et mer calme',
    wet: 'La Casamance en vert', dryTags: ['Plages', 'Pirogue', 'Oiseaux'], wetTags: ['Forêts luxuriantes', 'Moins de visiteurs', 'Paysages verts'],
    legendDry: 'Saison sèche · novembre à mai', legendWet: 'Hivernage · juin à octobre',
  },
  en: {
    eyebrow: 'Choose your season', calendar: 'A year in Casamance', dry: 'Sunshine and calm seas',
    wet: 'Casamance in green', dryTags: ['Beaches', 'Pirogue', 'Birdwatching'], wetTags: ['Lush forests', 'Fewer visitors', 'Green landscapes'],
    legendDry: 'Dry season · November to May', legendWet: 'Rainy season · June to October',
  },
};

const dryMonths = new Set([10, 11, 0, 1, 2, 3, 4]);

export function WhenToGo({ data, locale }: WhenToGoProps) {
  const text = copy[locale];

  return (
    <section className="section bg-[#fbfaf5]" aria-labelledby="when-title">
      <div className="container-main">
        <header className="mb-8 max-w-2xl sm:mb-10">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2 id="when-title" className="section-title mt-3">{data.title}</h2>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl bg-[#f4ead3] p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#946821]">{data.drySeason.period}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-forest sm:text-3xl">{data.drySeason.label}</h3>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/60 text-[#946821]">
                <Sun className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-forest/75">{data.drySeason.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {text.dryTags.map((tag) => <li key={tag} className="rounded-full bg-white/65 px-3 py-1.5 text-xs font-semibold text-forest">{tag}</li>)}
            </ul>
          </article>

          <article className="rounded-2xl bg-[#e4eddf] p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald">{data.wetSeason.period}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-forest sm:text-3xl">{data.wetSeason.label}</h3>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/65 text-emerald">
                <CloudRain className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-forest/75">{data.wetSeason.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {text.wetTags.map((tag) => <li key={tag} className="rounded-full bg-white/65 px-3 py-1.5 text-xs font-semibold text-forest">{tag}</li>)}
            </ul>
          </article>
        </div>

        <div className="mt-4 rounded-2xl bg-forest p-5 text-white sm:p-7">
          <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">{text.calendar}</h3>
          <ol className="mt-5 grid grid-cols-6 gap-2 sm:grid-cols-12" aria-label={text.calendar}>
            {months[locale].map((month, index) => {
              const isDry = dryMonths.has(index);
              return (
                <li key={month} className={`rounded-lg px-1 py-2.5 text-center text-xs font-semibold sm:py-3 ${isDry ? 'bg-lime text-forest' : 'bg-white/10 text-white/75'}`}>
                  {month}
                </li>
              );
            })}
          </ol>
          <div className="mt-4 flex flex-col gap-2 text-xs font-medium text-white/75 sm:flex-row sm:gap-6">
            <p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-lime" aria-hidden="true" />{text.legendDry}</p>
            <p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-white/30" aria-hidden="true" />{text.legendWet}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
