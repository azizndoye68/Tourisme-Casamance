interface LogoCasamanceProps {
  className?: string;
}

export function LogoCasamance({ className = 'h-10 w-10' }: LogoCasamanceProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="24" cy="24" r="23" fill="#0E2A20" />
      <circle cx="24" cy="24" r="20.5" stroke="#FFFFFF" strokeOpacity=".16" />
      <circle cx="32" cy="15" r="6" fill="#F4C95D" />
      <path d="M24 38V24" stroke="#F5F1E6" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 27c-2-5-7-7-11-6 1 5 5 8 11 8m0-4c2-5 7-7 11-6-1 5-5 8-11 8m0-8c-1-5 1-9 4-11 3 4 3 8 0 12" fill="#79C88F" stroke="#B5E5A1" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M18 40h12" stroke="#C9E85B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
