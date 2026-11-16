import { useState } from 'react';
import { getBookCoverDesign } from '../../data/coverDesigns';
import type { Book } from '../../interfaces/book';
import { CoverArtwork } from './CoverArtwork';

interface EditorialBookCoverProps {
  book: Book;
  variant?: string;
  className?: string;
}

function CoverPhotoLayer({ coverUrl, title }: { coverUrl: string; title: string }) {
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) return null;

  return (
    <img
      src={coverUrl}
      alt={`${title} kapağı`}
      loading="lazy"
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth > 20 && e.currentTarget.naturalHeight > 20) {
          setImageReady(true);
        } else {
          setImageFailed(true);
        }
      }}
      onError={() => setImageFailed(true)}
      className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-300 ${
        imageReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    />
  );
}

export function EditorialBookCover({
  book,
  className = '',
}: EditorialBookCoverProps) {
  const design = getBookCoverDesign(book);

  const backgroundStyle = {
    background: `linear-gradient(155deg, ${design.bg} 0%, ${design.bgEnd} 100%)`,
    color: design.text,
    containerType: 'inline-size' as const,
  };

  return (
    <div
      style={backgroundStyle}
      className={`relative h-full w-full overflow-hidden rounded-[2px] select-none ${className}`}
    >
      {/* Left Spine Crease Shading */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[6%]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.28) 0%, rgba(255,255,255,0.08) 55%, transparent 100%)',
        }}
      />

      {/* Custom Photo Cover Layer (when added via Open Library API or verified custom URL) */}
      {book.coverUrl && (
        <CoverPhotoLayer
          key={book.coverUrl}
          coverUrl={book.coverUrl}
          title={book.title}
        />
      )}

      {/* Bespoke Unique Editorial Vector Cover Architecture */}
      <CoverLayoutBody book={book} design={design} />
    </div>
  );
}

function isLightHex(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return false;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 165;
}

function CoverLayoutBody({
  book,
  design,
}: {
  book: Book;
  design: ReturnType<typeof getBookCoverDesign>;
}) {
  const firstName = book.author.split(' ')[0] || book.author;
  const words = book.title.split(' ');
  const heroWord = words[0] ?? book.title;
  const restWords = words.slice(1).join(' ');
  const cardText = isLightHex(design.cardBg) ? '#111827' : '#F9FAFB';
  const cardMuted = isLightHex(design.cardBg) ? '#4B5563' : '#CBD5E1';
  const wedgeInk = isLightHex(design.secondary) ? '#111827' : '#FEF9C3';

  if (design.layout === 'spine-bar') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between p-[11%] pl-[15%]">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[9%]"
          style={{ backgroundColor: design.spine }}
        />
        <div className="pt-[4%]">
          <p
            style={{ fontSize: 'clamp(4px, 7.5cqw, 16px)', color: design.muted }}
            className="font-bold uppercase tracking-[0.16em] line-clamp-1"
          >
            {book.author}
          </p>
          <p
            style={{ fontSize: 'clamp(5px, 11.5cqw, 24px)', color: design.text }}
            className="mt-[6%] font-extrabold uppercase leading-[1.06] tracking-tight line-clamp-3"
          >
            {book.title}
          </p>
        </div>

        <div className="mx-auto my-[4%] h-[42%] w-[78%]">
          <CoverArtwork
            motif={design.motif}
            accent={design.accent}
            secondary={design.secondary}
            ink={design.text}
          />
        </div>

        <div className="flex items-center justify-between border-t border-current/20 pt-[5%]">
          <span
            style={{ fontSize: 'clamp(4px, 6cqw, 11px)', color: design.muted }}
            className="uppercase tracking-[0.18em]"
          >
            {book.category}
          </span>
          <span
            style={{ fontSize: 'clamp(4px, 6cqw, 11px)', color: design.muted }}
            className="font-semibold"
          >
            {book.year}
          </span>
        </div>
      </div>
    );
  }

  if (design.layout === 'poster-stack') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between p-[11%] pl-[14%]">
        <p
          style={{ fontSize: 'clamp(4px, 6.5cqw, 13px)', color: design.muted }}
          className="font-semibold uppercase tracking-[0.2em] line-clamp-1"
        >
          {book.author}
        </p>

        <div className="my-auto">
          <p
            style={{ fontSize: 'clamp(7px, 19cqw, 38px)', color: design.text }}
            className="font-black uppercase leading-[0.9] tracking-tighter line-clamp-2"
          >
            {heroWord}
          </p>
          {restWords && (
            <p
              style={{ fontSize: 'clamp(5px, 11cqw, 22px)', color: design.accent }}
              className="mt-[4%] font-extrabold uppercase leading-[0.98] tracking-tight line-clamp-2"
            >
              {restWords}
            </p>
          )}
        </div>

        <div className="h-[34%] w-full">
          <CoverArtwork
            motif={design.motif}
            accent={design.accent}
            secondary={design.secondary}
            ink={design.text}
          />
        </div>
      </div>
    );
  }

  if (design.layout === 'band-edition') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between p-[9%]">
        <div
          style={{ backgroundColor: design.cardBg }}
          className="mt-[4%] rounded-[2px] px-[8%] py-[9%] text-center shadow-xs"
        >
          <p
            style={{ fontSize: 'clamp(4px, 6.2cqw, 12px)', color: cardMuted }}
            className="font-semibold uppercase tracking-[0.16em] line-clamp-1"
          >
            {book.author}
          </p>
          <p
            style={{
              fontSize: 'clamp(5px, 10.5cqw, 22px)',
              color: cardText,
            }}
            className="font-editorial mt-[4%] font-bold leading-[1.1] line-clamp-2"
          >
            {book.title}
          </p>
        </div>

        <div className="mx-auto my-auto h-[46%] w-[78%]">
          <CoverArtwork
            motif={design.motif}
            accent={design.accent}
            secondary={design.secondary}
            ink={design.text}
          />
        </div>

        <div
          className="flex items-center justify-between px-[4%] pt-[2%]"
          style={{ fontSize: 'clamp(4px, 5.5cqw, 10px)', color: design.muted }}
        >
          <span className="uppercase tracking-[0.2em]">BOOKNEST</span>
          <span>{book.year}</span>
        </div>
      </div>
    );
  }

  if (design.layout === 'horizon-sky') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden p-[11%]">
        <div className="text-center pt-[4%]">
          <p
            style={{ fontSize: 'clamp(4px, 6.5cqw, 13px)', color: design.accent }}
            className="font-bold uppercase tracking-[0.22em] line-clamp-1"
          >
            {book.author}
          </p>
          <p
            style={{ fontSize: 'clamp(5.5px, 12cqw, 24px)', color: design.text }}
            className="font-editorial mt-[5%] font-semibold leading-[1.08] line-clamp-2"
          >
            {book.title}
          </p>
        </div>

        <div className="mx-auto mt-auto h-[54%] w-[92%]">
          <CoverArtwork
            motif={design.motif}
            accent={design.accent}
            secondary={design.secondary}
            ink={design.text}
          />
        </div>
      </div>
    );
  }

  if (design.layout === 'classic-frame') {
    return (
      <div className="relative flex h-full w-full items-center justify-center p-[10%]">
        <div
          className="pointer-events-none absolute inset-[5%] border border-dashed opacity-50"
          style={{ borderColor: design.secondary }}
        />
        <div
          style={{ backgroundColor: design.cardBg }}
          className="relative flex h-[84%] w-[86%] flex-col items-center justify-between rounded-[2px] border border-black/10 p-[10%] text-center shadow-xs"
        >
          <p
            style={{ fontSize: 'clamp(4px, 6cqw, 11px)', color: cardMuted }}
            className="font-semibold uppercase tracking-[0.16em] line-clamp-1"
          >
            {book.author}
          </p>

          <div className="h-[46%] w-[70%]">
            <CoverArtwork
              motif={design.motif}
              accent={design.accent}
              secondary={design.secondary}
              ink={cardText}
            />
          </div>

          <p
            style={{ fontSize: 'clamp(5px, 9.5cqw, 19px)', color: cardText }}
            className="font-editorial font-bold leading-[1.1] line-clamp-2"
          >
            {book.title}
          </p>
        </div>
      </div>
    );
  }

  if (design.layout === 'gallery-inset') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between p-[10%] pl-[14%]">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[9%]"
          style={{ backgroundColor: design.spine }}
        />
        <div className="text-center pt-[2%]">
          <p
            style={{ fontSize: 'clamp(4px, 6.2cqw, 12px)', color: design.muted }}
            className="uppercase tracking-[0.18em] line-clamp-1"
          >
            {book.author}
          </p>
          <p
            style={{ fontSize: 'clamp(5px, 9.5cqw, 19px)', color: design.text }}
            className="mt-[4%] font-bold uppercase tracking-wide leading-[1.1] line-clamp-2"
          >
            {book.title}
          </p>
        </div>

        <div
          style={{ backgroundColor: design.cardBg, borderColor: design.accent }}
          className="mx-auto my-[4%] flex h-[50%] w-[76%] items-center justify-center border p-[8%]"
        >
          <CoverArtwork
            motif={design.motif}
            accent={design.accent}
            secondary={design.secondary}
            ink={cardText}
          />
        </div>

        <p
          style={{ fontSize: 'clamp(4px, 5.5cqw, 11px)', color: design.muted }}
          className="text-center uppercase tracking-[0.22em]"
        >
          {book.category}
        </p>
      </div>
    );
  }

  if (design.layout === 'diagonal-cut') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden p-[11%]">
        <div
          className="pointer-events-none absolute -bottom-[16%] -left-[12%] h-[56%] w-[125%] rotate-12"
          style={{ backgroundColor: design.secondary }}
        />

        <div className="relative z-10 text-right pt-[3%]">
          <p
            style={{ fontSize: 'clamp(5px, 11cqw, 22px)', color: design.accent }}
            className="font-black uppercase leading-[1.02] tracking-tight line-clamp-2"
          >
            {book.title}
          </p>
          <p
            style={{ fontSize: 'clamp(4px, 6.5cqw, 13px)', color: design.text }}
            className="mt-[5%] font-bold uppercase tracking-wider line-clamp-1"
          >
            {book.author}
          </p>
        </div>

        <div className="relative z-10 mt-auto h-[40%] w-[62%]">
          <CoverArtwork
            motif={design.motif}
            accent={wedgeInk}
            secondary={design.accent}
            ink={wedgeInk}
          />
        </div>
      </div>
    );
  }

  if (design.layout === 'swiss-grid') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between p-[10%]">
        <div className="flex items-center justify-between border-b border-current/25 pb-[6%]">
          <span
            style={{ fontSize: 'clamp(4px, 6cqw, 11px)', color: design.muted }}
            className="font-semibold uppercase tracking-[0.16em]"
          >
            {firstName}
          </span>
          <span
            style={{ fontSize: 'clamp(4px, 6cqw, 11px)', color: design.accent }}
            className="font-bold"
          >
            {book.year}
          </span>
        </div>

        <div className="mx-auto my-[4%] h-[44%] w-[78%]">
          <CoverArtwork
            motif={design.motif}
            accent={design.accent}
            secondary={design.secondary}
            ink={design.text}
          />
        </div>

        <div className="border-t border-current/25 pt-[6%]">
          <p
            style={{ fontSize: 'clamp(5px, 9.5cqw, 19px)', color: design.text }}
            className="font-extrabold leading-[1.08] tracking-tight line-clamp-2"
          >
            {book.title}
          </p>
          <p
            style={{ fontSize: 'clamp(4px, 6cqw, 12px)', color: design.muted }}
            className="mt-[3%] line-clamp-1"
          >
            {book.author}
          </p>
        </div>
      </div>
    );
  }

  if (design.layout === 'duotone-arch') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between p-[10%]">
        <div
          style={{ backgroundColor: design.cardBg }}
          className="mx-auto flex h-[56%] w-[84%] items-center justify-center rounded-t-full p-[12%] shadow-xs"
        >
          <CoverArtwork
            motif={design.motif}
            accent={design.accent}
            secondary={design.secondary}
            ink={cardText}
          />
        </div>

        <div className="pt-[6%] text-center">
          <p
            style={{ fontSize: 'clamp(5px, 10.5cqw, 21px)', color: design.text }}
            className="font-editorial font-semibold leading-[1.08] line-clamp-2"
          >
            {book.title}
          </p>
          <p
            style={{ fontSize: 'clamp(4px, 6.2cqw, 12px)', color: design.muted }}
            className="mt-[4%] uppercase tracking-[0.16em] line-clamp-1"
          >
            {book.author}
          </p>
        </div>
      </div>
    );
  }

  // abstract-aura
  return (
    <div className="relative flex h-full w-full flex-col justify-between p-[11%]">
      <p
        style={{ fontSize: 'clamp(4px, 6.5cqw, 12px)', color: design.muted }}
        className="text-center font-semibold uppercase tracking-[0.14em] line-clamp-1"
      >
        {book.author}
      </p>

      <div className="mx-auto my-auto h-[52%] w-[84%]">
        <CoverArtwork
          motif={design.motif}
          accent={design.accent}
          secondary={design.secondary}
          ink={design.text}
        />
      </div>

      <p
        style={{ fontSize: 'clamp(5px, 10cqw, 20px)', color: design.text }}
        className="text-center font-bold tracking-tight leading-[1.1] line-clamp-2"
      >
        {book.title}
      </p>
    </div>
  );
}
