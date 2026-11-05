import type { Metadata } from 'next';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: 'Casamance — Tourisme au Sénégal',
  description: 'Découvrez les destinations, activités et itinéraires de Casamance.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
