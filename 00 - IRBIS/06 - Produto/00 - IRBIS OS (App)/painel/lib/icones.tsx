/* Ícones stroke desenhados à mão (vocabulário Lucide), 16px, herdam currentColor. */

type P = { className?: string };

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconeVisao({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

export function IconeAprovacoes({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.5 5h13l3.5 7v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7l3.5-7z" />
    </svg>
  );
}

export function IconePipeline({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
    </svg>
  );
}

export function IconeProjetos({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="5" height="18" rx="1.5" />
      <rect x="10" y="3" width="5" height="12" rx="1.5" />
      <rect x="17" y="3" width="4" height="8" rx="1.5" />
    </svg>
  );
}

export function IconeSemana({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 9h18" />
    </svg>
  );
}

export function IconeTravas({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l9.5 16.5H2.5L12 3z" />
      <path d="M12 10v4M12 17.5v.01" />
    </svg>
  );
}

export function IconeFinanceiro({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="9" r="6" />
      <path d="M14.5 5.6A6 6 0 1 1 18.4 9.5" />
      <path d="M9 6.5v5M7 8h3.5" />
    </svg>
  );
}

export function IconeCarteira({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  );
}

export function IconeAgentes({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 9.5V4M12 20v-5.5M9.8 10.7 5.5 6M18.5 18l-4.3-4.3M9.8 13.3 5.5 18M18.5 6l-4.3 4.3" />
    </svg>
  );
}
