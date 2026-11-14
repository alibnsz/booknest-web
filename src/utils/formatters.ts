import { SPINE_PALETTES, type SpinePalette } from '../constants/book.constants';

export function formatIsoDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return isoString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  } catch {
    return isoString;
  }
}

export function pickSpineStyleFromTitle(title: string): SpinePalette & {
  spineHeight: number;
  spineWidth: number;
} {
  let hash = 0;
  for (let i = 0; i < title.length; i += 1) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const palette = SPINE_PALETTES[absHash % SPINE_PALETTES.length];
  const spineHeight = 126 + (absHash % 18); // 126px - 143px
  const spineWidth = 18 + ((absHash >> 3) % 15); // 18px - 32px

  return {
    ...palette,
    spineHeight,
    spineWidth,
  };
}
