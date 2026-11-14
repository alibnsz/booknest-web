import type { Book, BookFilters } from '../interfaces/book';

export function filterAndSortBooks(books: Book[], filters: BookFilters): Book[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  const filtered = books.filter((book) => {
    const matchesQuery =
      !normalizedQuery ||
      book.title.toLowerCase().includes(normalizedQuery) ||
      book.author.toLowerCase().includes(normalizedQuery) ||
      book.category.toLowerCase().includes(normalizedQuery);

    const matchesStatus = filters.status === 'all' || book.status === filters.status;
    const matchesCategory =
      filters.category === 'all' ||
      book.category.toLowerCase() === filters.category.toLowerCase();

    return matchesQuery && matchesStatus && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    let comparison = 0;

    switch (filters.sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'author':
        comparison = a.author.localeCompare(b.author);
        break;
      case 'year':
        comparison = a.year - b.year;
        break;
      case 'createdAt':
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }

    return filters.sortDirection === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

export function extractCategories(books: Book[]): string[] {
  const set = new Set<string>();
  for (const book of books) {
    if (book.category.trim()) {
      set.add(book.category.trim().toLowerCase());
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export interface LibraryStats {
  total: number;
  available: number;
  borrowed: number;
  totalPages: number;
  totalReadHours: number;
}

export function computeLibraryStats(books: Book[]): LibraryStats {
  let available = 0;
  let borrowed = 0;
  let totalPages = 0;
  let totalReadHours = 0;

  for (const book of books) {
    if (book.status === 'borrowed') {
      borrowed += 1;
    } else {
      available += 1;
    }
    totalPages += book.pages ?? 280;
    totalReadHours += book.readHours ?? 18;
  }

  return {
    total: books.length,
    available,
    borrowed,
    totalPages,
    totalReadHours,
  };
}
