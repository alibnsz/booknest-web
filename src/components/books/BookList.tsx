import { AnimatePresence } from 'framer-motion';
import type { Book } from '../../interfaces/book';
import { EmptyState } from '../ui/EmptyState';
import { BookCard } from './BookCard';

export interface BookListProps {
  books: Book[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onAddFirstBook: () => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onLend: (book: Book) => void;
  onReturn: (book: Book) => void;
}

export function BookList({
  books,
  hasActiveFilters,
  onClearFilters,
  onAddFirstBook,
  onEdit,
  onDelete,
  onLend,
  onReturn,
}: BookListProps) {
  if (books.length === 0) {
    if (hasActiveFilters) {
      return (
        <EmptyState
          title="No books match your filters"
          description="Try searching for a different title, author, or clear the active filters."
          actionLabel="Clear filters"
          onAction={onClearFilters}
        />
      );
    }

    return (
      <EmptyState
        title="Your virtual library is empty"
        description="Start building your collection by adding your first book."
        actionLabel="Add your first book"
        onAction={onAddFirstBook}
      />
    );
  }

  return (
    <div className="archive-scroll-mask max-h-[340px] overflow-y-auto pr-1 no-scrollbar">
      <div className="flex flex-col gap-1.5 pb-10">
        <AnimatePresence mode="popLayout">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={onEdit}
              onDelete={onDelete}
              onLend={onLend}
              onReturn={onReturn}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
