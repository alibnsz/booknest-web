import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import type { BookFilters, BookStatus } from '../../interfaces/book';

export interface BookToolbarProps {
  filters: BookFilters;
  categories: string[];
  onFilterChange: <K extends keyof BookFilters>(
    key: K,
    value: BookFilters[K],
  ) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function BookToolbar({
  filters,
  categories,
  onFilterChange,
  onReset,
  hasActiveFilters,
}: BookToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* Pill search bar matching screenshot 3 ("Search virtual library...") */}
      <div className="relative flex items-center">
        <input
          type="search"
          value={filters.query}
          onChange={(e) => onFilterChange('query', e.target.value)}
          placeholder="Search virtual library..."
          aria-label="Search virtual library"
          className="w-full rounded-full bg-white py-2 pl-4 pr-14 text-[11px] font-medium text-slate-700 shadow-[0_3px_14px_rgba(0,0,0,0.06)] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:bg-slate-800 dark:text-slate-100"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
          {filters.query && (
            <button
              type="button"
              onClick={() => onFilterChange('query', '')}
              aria-label="Clear search query"
              className="rounded-full p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            aria-label="Toggle filter options"
            aria-expanded={showFilters}
            className={`rounded-full p-0.5 transition-colors cursor-pointer ${
              showFilters || hasActiveFilters
                ? 'text-slate-900 dark:text-indigo-400'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <SlidersHorizontal className="h-3 w-3" />
          </button>
          <Search
            className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400"
            aria-hidden="true"
          />
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-slate-100 bg-white/95 p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800/90">
          <select
            aria-label="Filter by status"
            value={filters.status}
            onChange={(e) =>
              onFilterChange('status', e.target.value as BookStatus | 'all')
            }
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-700 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
          </select>

          <select
            aria-label="Filter by category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-700 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="all">All Genres</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            aria-label="Sort books"
            value={`${filters.sortBy}:${filters.sortDirection}`}
            onChange={(e) => {
              const [sortBy, sortDirection] = e.target.value.split(':') as [
                BookFilters['sortBy'],
                BookFilters['sortDirection'],
              ];
              onFilterChange('sortBy', sortBy);
              onFilterChange('sortDirection', sortDirection);
            }}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-700 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="createdAt:desc">Default Order</option>
            <option value="title:asc">Title A–Z</option>
            <option value="author:asc">Author A–Z</option>
            <option value="year:desc">Year ↓</option>
            <option value="year:asc">Year ↑</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="col-span-3 mt-0.5 text-center text-[10px] font-semibold text-indigo-600 hover:underline dark:text-indigo-400 cursor-pointer"
            >
              Reset active filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
