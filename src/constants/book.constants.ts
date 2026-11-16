import type { BookFilters, SpinePattern } from '../interfaces/book';

export const STORAGE_KEYS = {
  BOOKS: 'booknest:v4:books',
  THEME: 'booknest:v4:theme',
} as const;

export const DEFAULT_FILTERS: BookFilters = {
  query: '',
  status: 'all',
  category: 'all',
  sortBy: 'createdAt',
  sortDirection: 'desc',
};

export const BOOK_CATEGORIES = [
  'roman',
  'bilim',
  'felsefe',
  'edebiyat',
  'psikoloji',
  'tarih',
  'yaşam',
  'dilbilim',
  'yazılım',
  'klasik',
] as const;

export interface SpinePalette {
  spineColor: string;
  spineTextColor: string;
  spineAccentColor: string;
  spinePattern: SpinePattern;
}

export const SPINE_PALETTES: SpinePalette[] = [
  {
    spineColor: '#1DB954',
    spineTextColor: '#073B1A',
    spineAccentColor: '#A7F3D0',
    spinePattern: 'banded',
  },
  {
    spineColor: '#D92B2B',
    spineTextColor: '#FFF5F5',
    spineAccentColor: '#FBBF24',
    spinePattern: 'minimal',
  },
  {
    spineColor: '#1E293B',
    spineTextColor: '#F8FAFC',
    spineAccentColor: '#E11D48',
    spinePattern: 'vintage',
  },
  {
    spineColor: '#F1F5F9',
    spineTextColor: '#0F172A',
    spineAccentColor: '#38BDF8',
    spinePattern: 'ornate',
  },
  {
    spineColor: '#F472B6',
    spineTextColor: '#FFFFFF',
    spineAccentColor: '#FDE047',
    spinePattern: 'solid',
  },
  {
    spineColor: '#FACC15',
    spineTextColor: '#1E293B',
    spineAccentColor: '#EF4444',
    spinePattern: 'banded',
  },
  {
    spineColor: '#1D4ED8',
    spineTextColor: '#FFFFFF',
    spineAccentColor: '#93C5FD',
    spinePattern: 'minimal',
  },
  {
    spineColor: '#BE123C',
    spineTextColor: '#FFE4E6',
    spineAccentColor: '#FDA4AF',
    spinePattern: 'ornate',
  },
  {
    spineColor: '#38BDF8',
    spineTextColor: '#0C4A6E',
    spineAccentColor: '#BAE6FD',
    spinePattern: 'vintage',
  },
  {
    spineColor: '#FB923C',
    spineTextColor: '#431407',
    spineAccentColor: '#FED7AA',
    spinePattern: 'solid',
  },
  {
    spineColor: '#EC4899',
    spineTextColor: '#FFFFFF',
    spineAccentColor: '#FBCFE8',
    spinePattern: 'diagonal',
  },
  {
    spineColor: '#0F172A',
    spineTextColor: '#FACC15',
    spineAccentColor: '#F59E0B',
    spinePattern: 'ornate',
  },
  {
    spineColor: '#15803D',
    spineTextColor: '#DCFCE7',
    spineAccentColor: '#86EFAC',
    spinePattern: 'banded',
  },
  {
    spineColor: '#CA8A04',
    spineTextColor: '#FEF9C3',
    spineAccentColor: '#1E293B',
    spinePattern: 'vintage',
  },
];
