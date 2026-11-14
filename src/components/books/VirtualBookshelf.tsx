import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SEED_BOOKS } from '../../data/seedBooks';
import type { Book } from '../../interfaces/book';

interface VirtualBookshelfProps {
  books: Book[];
  isCompact?: boolean;
}

function TopShelfCoverItem({ book, index }: { book: Book; index: number }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const isMurakamiStyle =
    book.title.toLowerCase().includes('kafka') || index === 0;
  const isMarquezStyle =
    book.title.toLowerCase().includes('solitude') || index === 1;

  return (
    <motion.button
      type="button"
      layoutId={`book-cover-${book.id}`}
      onClick={() => navigate(`/books/${book.id}`)}
      whileHover={{ y: -7, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 360, damping: 26 }}
      className="group relative h-[112px] w-[76px] shrink-0 overflow-hidden rounded-[1px] shadow-[0_6px_14px_rgba(0,0,0,0.16)] focus:outline-none cursor-pointer"
      style={{
        backgroundColor: isMurakamiStyle
          ? '#1A569E'
          : isMarquezStyle
            ? '#D2DF28'
            : (book.spineColor ?? '#1D4ED8'),
      }}
      aria-label={`Open ${book.title} by ${book.author}`}
    >
      {book.coverUrl && !imgError ? (
        <img
          src={book.coverUrl}
          alt={book.title}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : isMurakamiStyle ? (
        /* Exact Kafka on the Shore Blue Geometric Cover */
        <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#2B6CB0] via-[#1E4E8C] to-[#0D2B52] p-2 text-white">
          <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full border-[6px] border-white/20" />
          <div className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 rotate-45 bg-sky-300/20" />
          <div className="relative z-10 border-y border-white/40 py-1 text-center">
            <span className="block text-[7.5px] font-black tracking-widest uppercase">
              HARUKI
            </span>
            <span className="block text-[7.5px] font-black tracking-widest uppercase">
              MURAKAMI
            </span>
          </div>
          <div className="relative z-10 text-right">
            <span className="block text-[6.5px] font-bold tracking-wider uppercase opacity-95">
              KAFKA ON
            </span>
            <span className="block text-[6.5px] font-bold tracking-wider uppercase opacity-95">
              THE SHORE
            </span>
          </div>
        </div>
      ) : isMarquezStyle ? (
        /* Exact One Hundred Years of Solitude Lime/Botanical Cover */
        <div className="relative flex h-full w-full flex-col justify-between bg-[#D4E137] p-1.5 text-[#1A2E05]">
          <span className="text-center text-[5px] font-extrabold tracking-widest uppercase">
            ONE HUNDRED YEARS OF SOLITUDE
          </span>
          <div className="mx-auto my-0.5 flex h-[70px] w-[58px] items-center justify-center overflow-hidden rounded-[2px] bg-[#234F1E] p-1 shadow-inner">
            <div className="h-full w-full rounded-full bg-gradient-to-tr from-[#143611] via-[#3F7A34] to-[#86EFAC] opacity-85" />
          </div>
          <span className="text-center text-[5px] font-extrabold tracking-wider uppercase">
            GABRIEL GARCÍA MÁRQUEZ
          </span>
        </div>
      ) : (
        <div
          className="flex h-full w-full flex-col justify-between p-2 text-left"
          style={{ color: book.spineTextColor ?? '#FFFFFF' }}
        >
          <span className="text-[8px] font-extrabold uppercase tracking-wider leading-tight">
            {book.author}
          </span>
          <span className="text-[9px] font-bold leading-tight">{book.title}</span>
        </div>
      )}

      {/* Subtle left book spine light */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-white/35 via-black/10 to-transparent" />
    </motion.button>
  );
}

interface VisualSpinePreset {
  width: number;
  height: number;
  bg: string;
  text: string;
  accent: string;
  variant:
    | 'green-band'
    | 'red-gold'
    | 'dark-red-crest'
    | 'white-illustrated'
    | 'pink-script'
    | 'yellow-dots'
    | 'blue-minimal'
    | 'crimson-floral'
    | 'sky-vintage'
    | 'orange-solid'
    | 'magenta-chevrons'
    | 'navy-stars'
    | 'red-classic'
    | 'orange-stripes'
    | 'black-hobbit'
    | 'navy-lean'
    | 'tan-lean';
}

const MIDDLE_SHELF_PRESETS: VisualSpinePreset[] = [
  { width: 12, height: 112, bg: '#18A957', text: '#052E16', accent: '#BBF7D0', variant: 'green-band' },
  { width: 17, height: 110, bg: '#D62424', text: '#FEF2F2', accent: '#FACC15', variant: 'red-gold' },
  { width: 11, height: 108, bg: '#1F2421', text: '#F8FAFC', accent: '#E11D48', variant: 'dark-red-crest' },
  { width: 23, height: 118, bg: '#E6ECEF', text: '#0F172A', accent: '#0284C7', variant: 'white-illustrated' },
  { width: 13, height: 110, bg: '#F497B6', text: '#831843', accent: '#FFFFFF', variant: 'pink-script' },
  { width: 12, height: 112, bg: '#FB923C', text: '#431407', accent: '#FEF3C7', variant: 'orange-solid' },
  { width: 15, height: 124, bg: '#FACC15', text: '#1E293B', accent: '#DC2626', variant: 'yellow-dots' },
  { width: 12, height: 110, bg: '#F3D5B5', text: '#451A03', accent: '#D97706', variant: 'pink-script' },
  { width: 12, height: 112, bg: '#1D4ED8', text: '#FFFFFF', accent: '#93C5FD', variant: 'blue-minimal' },
  { width: 15, height: 116, bg: '#BE123C', text: '#FFE4E6', accent: '#FDA4AF', variant: 'crimson-floral' },
  { width: 20, height: 112, bg: '#38BDF8', text: '#0C4A6E', accent: '#E0F2FE', variant: 'sky-vintage' },
  { width: 11, height: 109, bg: '#FB923C', text: '#FFFFFF', accent: '#FED7AA', variant: 'orange-solid' },
  { width: 13, height: 118, bg: '#EC4899', text: '#FFFFFF', accent: '#FBCFE8', variant: 'magenta-chevrons' },
  { width: 16, height: 116, bg: '#BE185D', text: '#FCE7F3', accent: '#38BDF8', variant: 'magenta-chevrons' },
  { width: 12, height: 110, bg: '#1E40AF', text: '#DBEAFE', accent: '#FDE047', variant: 'navy-stars' },
  { width: 16, height: 116, bg: '#EF4444', text: '#FFFFFF', accent: '#FDE047', variant: 'red-classic' },
  { width: 14, height: 110, bg: '#EA580C', text: '#FFF7ED', accent: '#1E293B', variant: 'orange-stripes' },
  { width: 15, height: 110, bg: '#B91C1C', text: '#FEE2E2', accent: '#FBBF24', variant: 'red-gold' },
  { width: 22, height: 116, bg: '#111827', text: '#FACC15', accent: '#F59E0B', variant: 'black-hobbit' },
  { width: 14, height: 108, bg: '#0F172A', text: '#38BDF8', accent: '#22C55E', variant: 'navy-lean' },
];

const BOTTOM_SHELF_PRESETS: VisualSpinePreset[] = [
  { width: 11, height: 108, bg: '#FF5722', text: '#FFFFFF', accent: '#FDE047', variant: 'orange-solid' },
  { width: 21, height: 116, bg: '#29B6F6', text: '#082F49', accent: '#F43F5E', variant: 'sky-vintage' },
  { width: 13, height: 112, bg: '#E91E63', text: '#FFFFFF', accent: '#FBCFE8', variant: 'crimson-floral' },
  { width: 22, height: 112, bg: '#C69214', text: '#FEF9C3', accent: '#1E293B', variant: 'green-band' },
  { width: 13, height: 116, bg: '#B71C1C', text: '#FFE4E6', accent: '#FDA4AF', variant: 'crimson-floral' },
  { width: 12, height: 112, bg: '#FBC02D', text: '#1E293B', accent: '#DC2626', variant: 'yellow-dots' },
  { width: 13, height: 108, bg: '#8D3B12', text: '#FEF3C7', accent: '#F59E0B', variant: 'orange-stripes' },
  { width: 13, height: 108, bg: '#0F172A', text: '#38BDF8', accent: '#22C55E', variant: 'navy-lean' },
  { width: 16, height: 116, bg: '#9C4221', text: '#FFEDD5', accent: '#FACC15', variant: 'magenta-chevrons' },
  { width: 11, height: 110, bg: '#1E293B', text: '#E2E8F0', accent: '#38BDF8', variant: 'dark-red-crest' },
  { width: 16, height: 112, bg: '#374151', text: '#FDE047', accent: '#F59E0B', variant: 'magenta-chevrons' },
  { width: 12, height: 110, bg: '#F48FB1', text: '#831843', accent: '#FFFFFF', variant: 'pink-script' },
  { width: 12, height: 112, bg: '#16A34A', text: '#DCFCE7', accent: '#86EFAC', variant: 'green-band' },
  { width: 15, height: 116, bg: '#22C55E', text: '#052E16', accent: '#BBF7D0', variant: 'crimson-floral' },
  { width: 23, height: 116, bg: '#E6ECEF', text: '#0F172A', accent: '#0284C7', variant: 'white-illustrated' },
  { width: 12, height: 110, bg: '#1E3A8A', text: '#DBEAFE', accent: '#93C5FD', variant: 'navy-stars' },
  { width: 22, height: 118, bg: '#111827', text: '#FACC15', accent: '#F59E0B', variant: 'black-hobbit' },
  { width: 14, height: 112, bg: '#3B82F6', text: '#FFFFFF', accent: '#DBEAFE', variant: 'sky-vintage' },
  { width: 11, height: 106, bg: '#B91C1C', text: '#FEE2E2', accent: '#FDE047', variant: 'red-gold' },
  { width: 16, height: 110, bg: '#1D4ED8', text: '#FFFFFF', accent: '#93C5FD', variant: 'blue-minimal' },
  { width: 15, height: 112, bg: '#D4A373', text: '#1E293B', accent: '#2563EB', variant: 'tan-lean' },
];

function SpineShelfItem({
  book,
  preset,
  isLeaning,
  leanAngle = -10,
}: {
  book: Book;
  preset: VisualSpinePreset;
  isLeaning: boolean;
  leanAngle?: number;
}) {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => navigate(`/books/${book.id}`)}
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: isLeaning ? leanAngle : 0,
      }}
      whileHover={{
        y: -10,
        scale: 1.04,
        rotate: isLeaning ? leanAngle / 2 : 0,
        zIndex: 30,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      style={{
        height: `${preset.height}px`,
        width: `${preset.width}px`,
        backgroundColor: preset.bg,
        color: preset.text,
        transformOrigin: 'bottom left',
      }}
      className={`group relative flex shrink-0 flex-col items-center justify-between overflow-hidden rounded-t-[1.5px] shadow-[inset_-1.5px_0_3px_rgba(0,0,0,0.22),inset_1.5px_0_2px_rgba(255,255,255,0.25)] focus:outline-none cursor-pointer ${
        isLeaning ? 'ml-1.5 mr-4' : 'mx-[0.4px]'
      }`}
      aria-label={`${book.title} by ${book.author}`}
    >
      {/* Top Spine Ornamentation matching Theo Nordahl's exact book vectors */}
      {preset.variant === 'green-band' && (
        <div className="mt-2 flex w-full flex-col gap-0.5">
          <div className="h-[2px] w-full" style={{ backgroundColor: preset.accent }} />
          <div className="h-[4px] w-full bg-black/25" />
        </div>
      )}

      {preset.variant === 'white-illustrated' && (
        <div className="mt-1.5 flex w-full flex-col items-center gap-1 px-0.5">
          <div className="h-1.5 w-full bg-slate-800/80" />
          <div className="h-3 w-3 rounded-full bg-sky-600/30 ring-1 ring-slate-700/40" />
        </div>
      )}

      {preset.variant === 'yellow-dots' && (
        <div className="mt-1.5 flex flex-col items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
          <span className="h-1 w-1 rounded-full bg-slate-900" />
        </div>
      )}

      {preset.variant === 'magenta-chevrons' && (
        <div className="mt-1.5 flex w-full flex-col gap-0.5">
          <div
            className="h-1.5 w-full -skew-y-12"
            style={{ backgroundColor: preset.accent }}
          />
          <div
            className="h-1.5 w-full skew-y-12 opacity-80"
            style={{ backgroundColor: preset.accent }}
          />
        </div>
      )}

      {preset.variant === 'black-hobbit' && (
        <div className="mt-1.5 flex w-full flex-col items-center gap-0.5 px-1">
          <div className="h-[1.5px] w-full bg-amber-400" />
          <div className="mt-0.5 h-2.5 w-2.5 rounded-full border border-amber-400 bg-red-600/80" />
        </div>
      )}

      {preset.variant === 'tan-lean' && (
        <div className="mt-2 flex w-full flex-col items-center px-1">
          <div className="h-3 w-full border border-blue-700/60 bg-blue-500/20" />
        </div>
      )}

      {/* Center Vertical Spine Typography */}
      <div className="flex flex-1 items-center justify-center overflow-hidden py-1">
        <span
          style={{ writingMode: 'vertical-rl' }}
          className="max-h-[82px] truncate text-[7px] font-bold tracking-wider uppercase select-none leading-none opacity-92"
        >
          {book.title}
        </span>
      </div>

      {/* Bottom Ornamentation */}
      <div className="mb-1.5 flex w-full flex-col items-center gap-0.5">
        {preset.variant === 'white-illustrated' && (
          <div className="h-4 w-3/4 rounded-t-full bg-emerald-800/70" />
        )}
        {preset.variant === 'black-hobbit' && (
          <div className="mb-0.5 flex flex-col items-center gap-0.5">
            <div className="h-2 w-3 rounded-xs bg-amber-400/90" />
            <div className="h-[1.5px] w-full bg-amber-400" />
          </div>
        )}
        {preset.variant === 'magenta-chevrons' && (
          <div
            className="h-2 w-full -skew-y-12"
            style={{ backgroundColor: preset.accent }}
          />
        )}
        {book.status === 'borrowed' && (
          <span
            className="h-1.5 w-1.5 rounded-full bg-amber-300 ring-1 ring-black/40"
            title={`Borrowed by ${book.borrowedBy}`}
          />
        )}
      </div>
    </motion.button>
  );
}

function ShelfPlank() {
  return (
    <div className="relative z-10 h-[14px] w-full rounded-[1px] bg-white shadow-[0_10px_18px_-2px_rgba(0,0,0,0.09),0_3px_6px_-1px_rgba(0,0,0,0.05)]" />
  );
}

export function VirtualBookshelf({
  books,
  isCompact = false,
}: VirtualBookshelfProps) {
  // Top shelf: 2 front-facing covers just like Screenshot 1 & 3 (Kafka on the Shore & One Hundred Years of Solitude)
  const safeBooks = books.length > 0 ? books : SEED_BOOKS;
  const featured = safeBooks.filter((b) => b.featuredOnTopShelf);
  const topShelfBooks =
    featured.length >= 2 ? featured.slice(0, 2) : safeBooks.slice(0, 2);
  const topIds = new Set(topShelfBooks.map((b) => b.id));

  const remainingBooks = safeBooks.filter((b) => !topIds.has(b.id));
  const fallbackPool = remainingBooks.length > 0 ? remainingBooks : safeBooks;

  // Ensure Middle Shelf has 20 spines and Bottom Shelf has 21 spines matching the exact visual density of Screenshots 1 & 3
  const middleShelfEntries = MIDDLE_SHELF_PRESETS.map((preset, idx) => {
    const book = fallbackPool[idx % fallbackPool.length];
    return { book, preset, key: `mid-${idx}-${book.id}` };
  });

  const bottomShelfEntries = BOTTOM_SHELF_PRESETS.map((preset, idx) => {
    const offsetIdx = idx + 6;
    const book = fallbackPool[offsetIdx % fallbackPool.length];
    return { book, preset, key: `bot-${idx}-${book.id}` };
  });

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className={`flex flex-col items-center justify-center select-none ${
        isCompact ? 'w-full max-w-[395px]' : 'w-full max-w-[420px]'
      }`}
    >
      {/* SHELF 1: 2 Front-Facing Book Covers aligned left-of-center */}
      <div className="w-full">
        <div className="flex min-h-[114px] items-end justify-start gap-7 pl-7 sm:pl-9">
          {topShelfBooks.map((book, idx) => (
            <TopShelfCoverItem key={book.id} book={book} index={idx} />
          ))}
        </div>
        <ShelfPlank />
      </div>

      {/* SHELF 2: Middle Row of Book Spines with leaning dark navy book at the right end */}
      <div className="mt-7 w-full">
        <div className="flex min-h-[126px] items-end justify-start pl-5 sm:pl-6 overflow-x-auto no-scrollbar">
          {middleShelfEntries.map((entry, idx) => (
            <SpineShelfItem
              key={entry.key}
              book={entry.book}
              preset={entry.preset}
              isLeaning={idx === middleShelfEntries.length - 1}
              leanAngle={-8}
            />
          ))}
        </div>
        <ShelfPlank />
      </div>

      {/* SHELF 3: Bottom Row of Book Spines with leaning tan book at the right end */}
      <div className="mt-7 w-full">
        <div className="flex min-h-[126px] items-end justify-start pl-5 sm:pl-6 overflow-x-auto no-scrollbar">
          {bottomShelfEntries.map((entry, idx) => (
            <SpineShelfItem
              key={entry.key}
              book={entry.book}
              preset={entry.preset}
              isLeaning={idx === bottomShelfEntries.length - 1}
              leanAngle={-17}
            />
          ))}
        </div>
        <ShelfPlank />
      </div>
    </motion.div>
  );
}
