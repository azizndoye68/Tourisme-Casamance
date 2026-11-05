interface CanopyData {
  text: string;
}

interface SeparateurCanopeeProps {
  data: CanopyData;
}

export function SeparateurCanopee({ data }: SeparateurCanopeeProps) {
  return (
    <div className="canopy-divider" aria-hidden="true" role="img" aria-label="Bordure feuillage" />
  );
}
