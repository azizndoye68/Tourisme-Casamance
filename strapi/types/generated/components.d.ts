import type { Schema, Struct } from '@strapi/strapi';

export interface HomepageAppelAction extends Struct.ComponentSchema {
  collectionName: 'components_homepage_appels_action';
  info: {
    description: 'Section CTA avec newsletter et WhatsApp';
    displayName: "Appel \u00E0 l'action";
  };
  attributes: {
    lienWhatsApp: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'https://wa.me/221770000000'>;
    sousTitre: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    texteNewsletter: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<"S'inscrire">;
    texteWhatsApp: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'Discuter sur WhatsApp'>;
    titre: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

export interface HomepageBandeauCanopee extends Struct.ComponentSchema {
  collectionName: 'components_homepage_bandeaux_canopee';
  info: {
    description: 'Bandeau avec texte d\u00E9coup\u00E9 en feuillage';
    displayName: 'Bandeau canop\u00E9e';
  };
  attributes: {
    texte: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface HomepageChiffreCle extends Struct.ComponentSchema {
  collectionName: 'components_homepage_chiffres_cles';
  info: {
    description: 'Un chiffre cl\u00E9 avec ic\u00F4ne et label';
    displayName: 'Chiffre cl\u00E9';
  };
  attributes: {
    icone: Schema.Attribute.Enumeration<
      ['tree', 'wave', 'users', 'map', 'sun', 'bird']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'tree'>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    valeur: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
  };
}

export interface HomepageHero extends Struct.ComponentSchema {
  collectionName: 'components_homepage_heroes';
  info: {
    description: "Section hero de la page d'accueil";
    displayName: 'Hero';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    badgeSaison: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    ctaPrincipalLien: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    ctaPrincipalTexte: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    ctaSecondaireLien: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    ctaSecondaireTexte: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    imagePrincipale: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    imageSecondaire: Schema.Attribute.Media<'images'>;
    sousTitre: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    titre: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    titreAccent: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
  };
}

export interface HomepageSectionVerte extends Struct.ComponentSchema {
  collectionName: 'components_homepage_sections_vertes';
  info: {
    description: 'Section \u00E9meraude avec pastilles feuilles';
    displayName: 'Section verte';
  };
  attributes: {
    plantes: Schema.Attribute.JSON & Schema.Attribute.Required;
    titre: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

export interface HomepageTemoignage extends Struct.ComponentSchema {
  collectionName: 'components_homepage_temoignages';
  info: {
    description: "Grand t\u00E9moignage pour la page d'accueil";
    displayName: 'T\u00E9moignage hero';
  };
  attributes: {
    auteur: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    citation: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 1000;
      }>;
    pays: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
  };
}

export interface ItineraireEtape extends Struct.ComponentSchema {
  collectionName: 'components_itineraires_etapes';
  info: {
    description: "Une \u00E9tape journali\u00E8re d'un itin\u00E9raire";
    displayName: 'Etape';
  };
  attributes: {
    destination: Schema.Attribute.Relation<
      'manyToOne',
      'api::destination.destination'
    >;
    jour: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    texte: Schema.Attribute.RichText & Schema.Attribute.Required;
    titre: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'homepage.appel-action': HomepageAppelAction;
      'homepage.bandeau-canopee': HomepageBandeauCanopee;
      'homepage.chiffre-cle': HomepageChiffreCle;
      'homepage.hero': HomepageHero;
      'homepage.section-verte': HomepageSectionVerte;
      'homepage.temoignage': HomepageTemoignage;
      'itineraire.etape': ItineraireEtape;
    }
  }
}
