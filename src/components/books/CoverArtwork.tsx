import type { CoverMotif } from '../../data/coverDesigns';

interface CoverArtworkProps {
  motif: CoverMotif;
  accent: string;
  secondary: string;
  ink: string;
}

export function CoverArtwork({
  motif,
  accent,
  secondary,
  ink,
}: CoverArtworkProps) {
  switch (motif) {
    case 'vortex':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="none" stroke={secondary} strokeWidth="1.4" strokeOpacity="0.45" />
          <circle cx="60" cy="60" r="35" fill="none" stroke={ink} strokeWidth="1.4" strokeOpacity="0.55" strokeDasharray="4 3" />
          <circle cx="60" cy="60" r="24" fill="none" stroke={accent} strokeWidth="2.2" />
          <circle cx="60" cy="60" r="11" fill={accent} />
          <ellipse cx="60" cy="60" rx="52" ry="18" fill="none" stroke={ink} strokeWidth="1.2" strokeOpacity="0.6" transform="rotate(-24 60 60)" />
        </svg>
      );

    case 'waves':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <path d="M8 38 Q34 18 60 38 T112 38" fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M8 56 Q34 36 60 56 T112 56" fill="none" stroke={secondary} strokeWidth="3" strokeLinecap="round" />
          <path d="M8 74 Q34 54 60 74 T112 74" fill="none" stroke={ink} strokeWidth="2.4" strokeOpacity="0.7" strokeLinecap="round" />
          <path d="M8 92 Q34 72 60 92 T112 92" fill="none" stroke={accent} strokeWidth="1.8" strokeOpacity="0.55" strokeLinecap="round" />
        </svg>
      );

    case 'tree':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="60" cy="46" r="28" fill={accent} fillOpacity="0.88" />
          <circle cx="44" cy="54" r="18" fill={secondary} fillOpacity="0.72" />
          <circle cx="76" cy="54" r="18" fill={accent} fillOpacity="0.75" />
          <rect x="56" y="64" width="8" height="36" rx="2" fill={ink} fillOpacity="0.85" />
          <line x1="28" y1="101" x2="92" y2="101" stroke={ink} strokeWidth="2.5" strokeOpacity="0.45" strokeLinecap="round" />
        </svg>
      );

    case 'manor':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <polygon points="22,62 60,32 98,62" fill={ink} fillOpacity="0.9" />
          <rect x="30" y="62" width="60" height="42" fill={ink} fillOpacity="0.92" />
          <rect x="52" y="76" width="16" height="28" fill={accent} />
          <rect x="37" y="70" width="9" height="11" fill={secondary} />
          <rect x="74" y="70" width="9" height="11" fill={secondary} />
          <circle cx="92" cy="24" r="10" fill={accent} fillOpacity="0.8" />
        </svg>
      );

    case 'rooftops':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="26" cy="26" r="2.2" fill={accent} />
          <circle cx="52" cy="18" r="1.8" fill={secondary} />
          <circle cx="88" cy="28" r="2.4" fill={accent} />
          <circle cx="102" cy="42" r="1.6" fill={ink} />
          <path d="M12 108 V64 L26 52 L40 64 V108 Z" fill={ink} fillOpacity="0.35" />
          <path d="M40 108 V50 L60 36 L80 50 V108 Z" fill={ink} fillOpacity="0.5" stroke={accent} strokeWidth="1.5" />
          <path d="M78 108 V70 L94 58 L110 70 V108 Z" fill={ink} fillOpacity="0.35" />
          <rect x="55" y="62" width="10" height="14" fill={accent} />
        </svg>
      );

    case 'bridge':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <line x1="8" y1="88" x2="112" y2="88" stroke={ink} strokeWidth="2.5" strokeOpacity="0.7" />
          <path d="M18 88 A42 42 0 0 1 102 88" fill="none" stroke={accent} strokeWidth="3.5" />
          <rect x="28" y="42" width="5" height="58" fill={ink} fillOpacity="0.8" />
          <rect x="87" y="42" width="5" height="58" fill={ink} fillOpacity="0.8" />
          <path d="M8 58 Q30 42 30 42 M33 42 Q60 72 87 42 M92 42 Q112 58 112 58" fill="none" stroke={secondary} strokeWidth="1.8" />
        </svg>
      );

    case 'candles':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <ellipse cx="60" cy="30" rx="7" ry="12" fill={accent} />
          <ellipse cx="60" cy="33" rx="3.5" ry="6" fill="#FEF08A" />
          <rect x="51" y="46" width="18" height="48" rx="3" fill={secondary} />
          <ellipse cx="60" cy="46" rx="9" ry="2.5" fill={ink} fillOpacity="0.2" />
          <line x1="34" y1="96" x2="86" y2="96" stroke={ink} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
          <circle cx="32" cy="42" r="2.5" fill={accent} />
          <circle cx="88" cy="36" r="2.5" fill={accent} />
        </svg>
      );

    case 'medallion':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="60" cy="60" r="44" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="60" cy="60" r="34" fill={secondary} fillOpacity="0.22" stroke={accent} strokeWidth="1.5" />
          <polygon points="60,30 70,50 90,60 70,70 60,90 50,70 30,60 50,50" fill={accent} />
          <circle cx="60" cy="60" r="7" fill={ink} />
        </svg>
      );

    case 'wedge':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <polygon points="10,110 95,22 110,110" fill={secondary} />
          <polygon points="10,110 66,52 10,74" fill={accent} />
          <circle cx="34" cy="32" r="14" fill={accent} />
        </svg>
      );

    case 'portrait':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <ellipse cx="60" cy="60" rx="34" ry="44" fill={secondary} fillOpacity="0.22" stroke={accent} strokeWidth="2.5" />
          <circle cx="60" cy="44" r="14" fill={ink} fillOpacity="0.88" />
          <path d="M36 92 C36 68 84 68 84 92 Z" fill={accent} fillOpacity="0.9" />
        </svg>
      );

    case 'clockwork':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="52" cy="54" r="28" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="7 4" />
          <circle cx="52" cy="54" r="18" fill="none" stroke={ink} strokeWidth="1.8" />
          <line x1="52" y1="54" x2="52" y2="39" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="52" y1="54" x2="65" y2="54" stroke={ink} strokeWidth="2" strokeLinecap="round" />
          <circle cx="84" cy="82" r="16" fill="none" stroke={secondary} strokeWidth="2.5" strokeDasharray="5 3" />
          <circle cx="84" cy="82" r="5" fill={secondary} />
        </svg>
      );

    case 'labyrinth':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <rect x="16" y="16" width="88" height="88" fill="none" stroke={ink} strokeWidth="2.2" strokeOpacity="0.65" />
          <path d="M28 28 H92 V92 H28 V42 H78 V78 H42 V56 H64 V64" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="square" />
          <circle cx="60" cy="60" r="5" fill={secondary} />
        </svg>
      );

    case 'mountains':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="84" cy="30" r="13" fill={accent} />
          <polygon points="8,104 46,40 84,104" fill={secondary} fillOpacity="0.88" />
          <polygon points="44,104 78,48 112,104" fill={ink} fillOpacity="0.82" />
          <polygon points="46,40 57,58 35,58" fill={accent} fillOpacity="0.9" />
        </svg>
      );

    case 'compass':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="60" cy="60" r="44" fill="none" stroke={ink} strokeWidth="1.6" strokeOpacity="0.55" />
          <circle cx="60" cy="60" r="36" fill="none" stroke={accent} strokeWidth="1.4" strokeDasharray="2 4" />
          <polygon points="60,16 68,54 60,60" fill={accent} />
          <polygon points="60,104 52,66 60,60" fill={secondary} />
          <polygon points="16,60 54,52 60,60" fill={ink} fillOpacity="0.7" />
          <polygon points="104,60 66,68 60,60" fill={ink} fillOpacity="0.4" />
          <circle cx="60" cy="60" r="5" fill={ink} />
        </svg>
      );

    case 'dunes':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="44" cy="30" r="14" fill={accent} />
          <circle cx="72" cy="24" r="7" fill={secondary} fillOpacity="0.9" />
          <path d="M4 76 Q38 48 74 72 T116 64 V114 H4 Z" fill={secondary} fillOpacity="0.75" />
          <path d="M4 90 Q46 66 84 88 T116 84 V114 H4 Z" fill={ink} fillOpacity="0.85" />
        </svg>
      );

    case 'brackets':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <path d="M42 28 L20 60 L42 92" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M78 28 L100 60 L78 92" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="68" y1="24" x2="52" y2="96" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'pillar':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <rect x="34" y="24" width="52" height="9" rx="2" fill={ink} fillOpacity="0.85" />
          <rect x="42" y="33" width="36" height="58" fill={accent} fillOpacity="0.9" />
          <line x1="51" y1="36" x2="51" y2="88" stroke={secondary} strokeWidth="2.5" />
          <line x1="60" y1="36" x2="60" y2="88" stroke={secondary} strokeWidth="2.5" />
          <line x1="69" y1="36" x2="69" y2="88" stroke={secondary} strokeWidth="2.5" />
          <rect x="32" y="91" width="56" height="10" rx="2" fill={ink} fillOpacity="0.85" />
        </svg>
      );

    case 'helix':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <path d="M36 20 C84 36 36 56 84 72 C36 88 84 102 36 106" fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M84 20 C36 36 84 56 36 72 C84 88 36 102 84 106" fill="none" stroke={secondary} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="46" y1="32" x2="74" y2="32" stroke={ink} strokeWidth="2" strokeOpacity="0.6" />
          <line x1="46" y1="56" x2="74" y2="56" stroke={ink} strokeWidth="2" strokeOpacity="0.6" />
          <line x1="46" y1="82" x2="74" y2="82" stroke={ink} strokeWidth="2" strokeOpacity="0.6" />
        </svg>
      );

    case 'eye':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <path d="M12 60 Q60 20 108 60 Q60 100 12 60 Z" fill={ink} fillOpacity="0.14" stroke={ink} strokeWidth="2.5" />
          <circle cx="60" cy="60" r="19" fill={accent} />
          <circle cx="60" cy="60" r="8" fill={secondary} />
          <circle cx="65" cy="55" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="60" cy="60" r="40" fill={secondary} fillOpacity="0.2" />
          <polygon
            points="60,16 69,46 100,46 75,65 84,96 60,77 36,96 45,65 20,46 51,46"
            fill={accent}
          />
          <circle cx="92" cy="24" r="4" fill={secondary} />
          <circle cx="26" cy="88" r="3" fill={ink} strokeOpacity="0.5" />
        </svg>
      );

    case 'tulip':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="48" cy="46" r="20" fill={accent} />
          <circle cx="72" cy="52" r="18" fill={secondary} />
          <circle cx="60" cy="70" r="16" fill="#F59E0B" fillOpacity="0.85" />
          <circle cx="60" cy="58" r="24" fill="none" stroke={ink} strokeWidth="1.5" strokeOpacity="0.5" />
        </svg>
      );

    case 'eclipse':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <circle cx="60" cy="60" r="36" fill={accent} />
          <circle cx="70" cy="54" r="28" fill={secondary} />
          <circle cx="60" cy="60" r="45" fill="none" stroke={ink} strokeWidth="1.4" strokeOpacity="0.45" />
        </svg>
      );

    case 'bookshelf':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <rect x="22" y="34" width="12" height="58" rx="1.5" fill={accent} />
          <rect x="37" y="24" width="14" height="68" rx="1.5" fill={secondary} />
          <rect x="54" y="40" width="11" height="52" rx="1.5" fill={ink} fillOpacity="0.8" />
          <rect x="68" y="28" width="14" height="64" rx="1.5" fill={accent} fillOpacity="0.85" />
          <rect x="85" y="38" width="12" height="54" rx="1.5" fill={secondary} transform="rotate(-8 85 92)" />
          <line x1="16" y1="95" x2="104" y2="95" stroke={ink} strokeWidth="3" strokeOpacity="0.7" strokeLinecap="round" />
        </svg>
      );

    case 'ship':
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          <polygon points="58,24 58,72 28,72" fill={accent} />
          <polygon points="62,32 62,72 90,72" fill={secondary} />
          <polygon points="22,76 98,76 86,92 34,92" fill={ink} fillOpacity="0.85" />
          <path d="M12 98 Q36 90 60 98 T108 98" fill="none" stroke={secondary} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}
