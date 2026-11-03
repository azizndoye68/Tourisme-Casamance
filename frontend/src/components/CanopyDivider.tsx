interface CanopyData {
  text: string;
}

interface CanopyDividerProps {
  data: CanopyData;
}

export function CanopyDivider({ data }: CanopyDividerProps) {
  return (
    <div className="canopy-divider" aria-hidden="true" role="img" aria-label="Bordure feuillage" />
  );
}
