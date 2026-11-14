import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_FILTERS } from '../constants/book.constants';
import type { Book, BookFilters } from '../interfaces/book';
import {
  computeLibraryStats,
  extractCategories,
  filterAndSortBooks,
} from '../utils/filterAndSort';

export function useBookFilters(books: Book[]) {
  const [filters, setFilters] = useState<BookFilters>(DEFAULT_FILTERS);

  const updateFilter = useCallback(
    <K extends keyof BookFilters>(key: K, value: BookFilters[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const filteredBooks = useMemo(
    () => filterAndSortBooks(books, filters),
    [books, filters],
  );

  const categories = useMemo(() => extractCategories(books), [books]);

  const stats = useMemo(() => computeLibraryStats(books), [books]);

  const hasActiveFilters =
    filters.query.trim() !== '' ||
    filters.status !== 'all' ||
    filters.category !== 'all';

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    filteredBooks,
    categories,
    stats,
    hasActiveFilters,
  };
}
