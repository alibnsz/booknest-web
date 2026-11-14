export type BookStatus = 'available' | 'borrowed';

export type SpinePattern = 'solid' | 'banded' | 'ornate' | 'minimal' | 'vintage' | 'diagonal';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  status: BookStatus;
  borrowedBy: string | null;
  createdAt: string;
  updatedAt: string;
  // Extended visual & metadata properties for Virtual Shelf & Detail View
  coverUrl?: string;
  blurb?: string;
  notes?: string;
  pages?: number;
  readCount?: number;
  readHours?: number;
  lastReadDate?: string;
  featuredOnTopShelf?: boolean;
  spineColor?: string;
  spineTextColor?: string;
  spineAccentColor?: string;
  spinePattern?: SpinePattern;
  spineHeight?: number; // relative px height on shelf (e.g. 122 to 146)
  spineWidth?: number; // relative px width on shelf (e.g. 16 to 34)
}

/** Data the user provides; server-managed fields are excluded. */
export type BookInput = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;

export interface BookFilters {
  query: string;
  status: BookStatus | 'all';
  category: string | 'all';
  sortBy: 'title' | 'author' | 'year' | 'createdAt';
  sortDirection: 'asc' | 'desc';
}

export interface BookValidationErrors {
  title?: string;
  author?: string;
  category?: string;
  year?: string;
  borrowedBy?: string;
}
