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
      <circle cx="24" cy="16" r="6.2" fill="#C9E85B" />
      <path d="M9 25.5C14 23.8 19 23 24 23s10 1 15 2.5" stroke="#F5F1E6" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17 27h15l-2.5 3.2h-10L17 27Z" fill="#E4B65B" />
      <path d="M24 30.5c-1.5 2.3-7 3.3-7 6.1 0 2.5 4.1 2.7 5 4.9" stroke="#79C8A7" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M10 33.5c2.1-1.2 4.3-1.2 6.4 0m15.2 0c2.1-1.2 4.3-1.2 6.4 0" stroke="#F5F1E6" strokeOpacity=".82" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
