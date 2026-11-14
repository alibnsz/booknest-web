import type { Book } from '../../interfaces/book';

interface EditorialBookCoverProps {
  book: Book;
  variant?:
    | 'float-tl'
    | 'float-ml'
    | 'float-bl'
    | 'float-tr'
    | 'float-mr'
    | 'float-br'
    | 'card-1'
    | 'card-2'
    | 'card-3'
    | 'card-4'
    | 'card-5'
    | 'auto';
  className?: string;
}

export function EditorialBookCover({
  book,
  variant = 'auto',
  className = '',
}: EditorialBookCoverProps) {
  // Determine visual artwork style either from explicit variant or book ID/title
  const resolvedVariant =
    variant !== 'auto'
      ? variant
      : book.id.includes('b201') || book.id.includes('b212')
        ? 'card-1'
        : book.id.includes('b202') || book.id.includes('b213')
          ? 'card-2'
          : book.id.includes('b203') || book.id.includes('b216')
            ? 'card-3'
            : book.id.includes('b204') || book.id.includes('b214')
              ? 'card-4'
              : book.id.includes('b205') || book.id.includes('b218')
                ? 'card-5'
                : book.id.includes('b206') || book.id.includes('b215')
                  ? 'float-tl'
                  : book.id.includes('b207')
                    ? 'float-ml'
                    : book.id.includes('b208') || book.id.includes('b219')
                      ? 'float-bl'
                      : book.id.includes('b209')
                        ? 'float-tr'
                        : book.id.includes('b210')
                          ? 'float-mr'
                          : book.id.includes('b211') || book.id.includes('b217') || book.id.includes('b220')
                            ? 'float-br'
                            : 'card-1';

  // 1. Float Top-Left: Cream cover with colorful botanical/abstract illustration
  if (resolvedVariant === 'float-tl') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2px] bg-[#EFE3B8] p-2.5 text-[#1E293B] select-none ${className}`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-black/20 to-transparent" />
        <span className="text-center text-[6px] font-semibold tracking-wider text-neutral-700">
          {book.author}
        </span>
        {/* Abstract floral illustration */}
        <div className="relative mx-auto my-1 flex h-16 w-14 items-center justify-center">
          <div className="absolute h-10 w-10 rounded-full bg-amber-300/60 blur-[1px]" />
          <div className="absolute -left-1 top-1 h-6 w-6 rotate-12 rounded-full bg-[#1D4ED8]" />
          <div className="absolute right-0 top-2 h-5 w-5 -rotate-12 rounded-tl-full bg-[#E11D48]" />
          <div className="absolute bottom-1 left-2 h-6 w-4 rotate-45 rounded-full bg-[#F59E0B]" />
          <div className="relative z-10 h-8 w-8 rounded-full border border-neutral-800/40" />
        </div>
        <span className="text-center text-[6.5px] font-bold tracking-tight text-neutral-900 line-clamp-1">
          {book.title}
        </span>
      </div>
    );
  }

  // 2. Float Mid-Left: Royal Blue "Beden Kayıt Tutar" cover with framed illustration
  if (resolvedVariant === 'float-ml') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2px] bg-[#165BAA] p-2.5 text-white select-none ${className}`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-[#EAB308]" />
        <div className="pl-1 text-center">
          <p className="text-[5px] tracking-widest uppercase text-sky-200">
            {book.author}
          </p>
          <p className="mt-0.5 text-[7px] font-bold tracking-wider uppercase leading-tight text-amber-200">
            {book.title}
          </p>
        </div>
        <div className="mx-auto my-1 flex h-12 w-9 items-center justify-center border border-amber-300/80 bg-[#0B2E59] p-1">
          <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-amber-300 to-sky-300 opacity-90" />
        </div>
        <span className="text-center text-[5px] text-sky-200/80">PSİKOLOJİ</span>
      </div>
    );
  }

  // 3. Float Bottom-Left: Misty Grey Bridge "Atlas Vazgeçti" cover
  if (resolvedVariant === 'float-bl') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2px] bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#64748B] p-2.5 text-neutral-900 select-none ${className}`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-neutral-800" />
        <div className="pl-1 text-center">
          <p className="text-[5px] font-bold uppercase tracking-widest text-rose-700">
            {book.author}
          </p>
          <p className="font-editorial text-[10px] font-bold tracking-wider uppercase leading-none text-neutral-900">
            ATLAS
          </p>
          <p className="text-[5.5px] font-semibold tracking-widest uppercase text-neutral-700">
            VAZGEÇTİ
          </p>
        </div>
        {/* Bridge arch silhouette */}
        <div className="relative mt-auto h-10 w-full overflow-hidden border-t border-neutral-600/40 pt-1">
          <div className="mx-auto h-8 w-12 rounded-t-full border-2 border-neutral-700/50" />
        </div>
      </div>
    );
  }

  // 4. Float Top-Right: White/Blue folk art "Hygge" cover
  if (resolvedVariant === 'float-tr') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2px] border border-slate-200 bg-[#FAF9F5] p-2 text-[#1E3A8A] select-none ${className}`}
      >
        <div className="flex justify-between text-[6px] text-sky-700">
          <span>✦</span>
          <span>☕</span>
          <span>✦</span>
        </div>
        <div className="my-auto rounded border border-sky-200 bg-white/90 py-1.5 px-1 text-center">
          <p className="text-[5px] uppercase tracking-wider text-slate-500">
            MUTLULUK SANATI
          </p>
          <p className="font-editorial text-[10px] font-bold tracking-widest uppercase text-[#1E3A8A]">
            HYGGE
          </p>
        </div>
        <div className="flex justify-center gap-1.5 text-[6px] text-amber-600">
          <span>🕯️</span>
          <span className="text-[5px] font-bold uppercase text-sky-900">
            {book.author.split(' ')[0]}
          </span>
          <span>🕯️</span>
        </div>
      </div>
    );
  }

  // 5. Float Mid-Right: Blue Ornamental Border "Avrupa'nın Kapıları"
  if (resolvedVariant === 'float-mr') {
    return (
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[2px] bg-[#1E40AF] p-2 text-[#1E3A8A] select-none ${className}`}
      >
        <div className="pointer-events-none absolute inset-1 border-2 border-dashed border-sky-200/60" />
        <div className="relative z-10 flex h-4/5 w-4/5 flex-col items-center justify-center rounded-xs bg-white p-1.5 text-center shadow-xs">
          <span className="text-[5px] font-semibold uppercase tracking-widest text-slate-500">
            {book.author}
          </span>
          <span className="my-1 font-editorial text-[8px] font-bold uppercase leading-tight text-[#1E3A8A]">
            {book.title}
          </span>
          <span className="text-[5px] text-sky-700">❖ ❖ ❖</span>
        </div>
      </div>
    );
  }

  // 6. Float Bottom-Right: Yellow & Black Diagonal "Dil Kılıçtan Keskindir"
  if (resolvedVariant === 'float-br') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2px] bg-[#FACC15] p-2.5 text-neutral-950 select-none ${className}`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-neutral-900" />
        <div className="pl-1 text-right">
          <p className="text-[7.5px] font-black uppercase tracking-tight text-red-700 leading-none">
            DİL-KILIÇ
          </p>
          <p className="mt-0.5 text-[5px] font-bold uppercase text-neutral-900 leading-tight">
            {book.title}
          </p>
        </div>
        {/* Black sharp geometric wedge at bottom */}
        <div className="pointer-events-none absolute -bottom-3 -left-2 h-14 w-16 rotate-12 bg-neutral-950" />
        <span className="relative z-10 text-right text-[5px] font-bold uppercase text-neutral-900">
          {book.author.split(' ')[0]}
        </span>
      </div>
    );
  }

  // --- BOTTOM SHOWCASE CARDS 1..5 ---

  // Card 1: Red/Coral Stephen Hawking ("СТІВЕН ГОКІНГ" style)
  if (resolvedVariant === 'card-1') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2px] bg-gradient-to-br from-[#F43F5E] via-[#E11D48] to-[#BE123C] p-3.5 text-white select-none ${className}`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-neutral-950" />
        {/* Wireframe funnel graphic */}
        <div className="pointer-events-none absolute -right-6 bottom-3 h-24 w-24 rounded-full border border-white/25" />
        <div className="pointer-events-none absolute -right-3 bottom-6 h-16 w-16 rounded-full border border-white/30" />

        <div className="pl-2 pt-1">
          <p className="text-[13px] font-extrabold tracking-wider uppercase leading-none text-white">
            STEPHEN
          </p>
          <p className="text-[13px] font-extrabold tracking-wider uppercase leading-tight text-white">
            HAWKING
          </p>
        </div>

        <div className="pl-2 pb-1">
          <p className="text-[8px] font-extrabold uppercase leading-tight tracking-wide text-neutral-950">
            {book.title}
          </p>
        </div>
      </div>
    );
  }

  // Card 2: Deep Purple bold typography ("СЛОВО" style)
  if (resolvedVariant === 'card-2') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2px] bg-[#4C1D6E] p-3.5 text-white select-none ${className}`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-[#3B1259]" />
        <p className="pl-1 text-center text-[6px] tracking-[0.22em] uppercase text-purple-200/80">
          {book.author}
        </p>

        <div className="my-auto pl-1">
          <p className="text-[24px] font-black tracking-tighter uppercase leading-[0.88] text-purple-200/90">
            SÖZ
          </p>
          <p className="text-[22px] font-black tracking-tighter uppercase leading-[0.88] text-orange-400/90">
            ANLAM
          </p>
        </div>

        <div className="h-2 w-full bg-gradient-to-r from-orange-500/40 to-transparent" />
      </div>
    );
  }

  // Card 3: Cream Tree Illustration Erich Fromm ("Мистецтво любові" style)
  if (resolvedVariant === 'card-3') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2px] bg-[#EFECE1] p-3.5 text-neutral-800 select-none ${className}`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-[#DCD6C4]" />
        <div className="pl-1 text-center">
          <p className="text-[6.5px] font-semibold tracking-widest uppercase text-neutral-500">
            {book.author}
          </p>
          <p className="mt-0.5 font-editorial text-[12px] font-semibold leading-tight text-neutral-800">
            {book.title}
          </p>
        </div>

        {/* Botanical tree sketch */}
        <div className="relative mx-auto mt-2 flex h-20 w-24 flex-col items-center justify-end">
          <div className="h-12 w-16 rounded-full bg-gradient-to-b from-slate-700 to-slate-800 opacity-85 shadow-inner" />
          <div className="h-6 w-2 bg-slate-800" />
          <div className="h-1.5 w-14 rounded-full bg-slate-700/50" />
        </div>
      </div>
    );
  }

  // Card 4: Black/Crimson Stephen King ("СТІВЕН КІНГ" style)
  if (resolvedVariant === 'card-4') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2px] bg-[#0B0F17] p-3.5 text-white select-none ${className}`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-neutral-900" />
        <div className="pl-1 text-center">
          <p className="text-[7px] font-bold tracking-[0.28em] uppercase text-neutral-300">
            STEPHEN
          </p>
          <p className="text-[22px] font-black tracking-widest uppercase leading-none text-white">
            KING
          </p>
        </div>

        {/* Glowing red house silhouette */}
        <div className="relative mx-auto mt-auto flex h-16 w-full items-end justify-center overflow-hidden rounded-xs bg-gradient-to-t from-red-900/80 via-teal-950/70 to-transparent p-1.5">
          <div className="h-9 w-12 bg-neutral-950 clip-path-polygon shadow-[0_0_12px_rgba(239,68,68,0.8)] flex items-center justify-center">
            <div className="h-2 w-2 bg-amber-400" />
          </div>
        </div>
        <p className="mt-1 text-center text-[6.5px] font-bold tracking-widest uppercase text-red-400">
          {book.title}
        </p>
      </div>
    );
  }

  // Card 5: Deep Blue Night City ("ЩЕДРИК" style)
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2px] bg-gradient-to-b from-[#1E3A8A] via-[#1D4ED8] to-[#0F172A] p-3.5 text-white select-none ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-[#172554]" />
      <div className="pl-1 text-center">
        <p className="font-editorial text-[18px] font-normal tracking-widest uppercase leading-none text-amber-100">
          {book.title.split(':')[0]}
        </p>
        <p className="mt-1 font-editorial italic text-[8px] text-sky-200">
          {book.author}
        </p>
      </div>

      {/* Starry winter rooftops */}
      <div className="mt-auto flex items-end justify-center gap-1 pt-4 opacity-90">
        <div className="h-10 w-4 bg-slate-900/90" />
        <div className="h-14 w-6 bg-indigo-950/90 border-t border-amber-300/50" />
        <div className="h-11 w-5 bg-slate-900/90" />
        <div className="h-8 w-4 bg-indigo-950/90" />
      </div>
    </div>
  );
}
