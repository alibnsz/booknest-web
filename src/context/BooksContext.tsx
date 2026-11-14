/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { Book, BookInput } from '../interfaces/book';
import type { BookRepository } from '../interfaces/repository';
import { getBookRepository } from '../services/bookRepository.provider';
import { formatIsoDate } from '../utils/formatters';
import { validateBorrowedBy } from '../utils/validators';
import {
  booksReducer,
  initialBooksState,
  type BooksLoadingStatus,
} from './booksReducer';
import { useToast } from './ToastContext';

export interface BooksContextValue {
  books: Book[];
  status: BooksLoadingStatus;
  error: string | null;
  reloadBooks: () => Promise<void>;
  createBook: (input: BookInput) => Promise<Book>;
  updateBook: (id: string, input: BookInput) => Promise<Book>;
  deleteBook: (id: string) => Promise<void>;
  lendBook: (id: string, borrowerName: string) => Promise<Book>;
  returnBook: (id: string) => Promise<Book>;
  recordReadingSession: (id: string) => Promise<Book>;
  toggleTopShelf: (id: string) => Promise<Book>;
}

export const BooksContext = createContext<BooksContextValue | undefined>(undefined);

interface BooksProviderProps {
  children: ReactNode;
  repository?: BookRepository;
}

export function BooksProvider({ children, repository }: BooksProviderProps) {
  const repo = useMemo(() => repository ?? getBookRepository(), [repository]);
  const [state, dispatch] = useReducer(booksReducer, initialBooksState);
  const { showToast } = useToast();

  const reloadBooks = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });
    try {
      const items = await repo.findAll();
      dispatch({ type: 'LOAD_SUCCESS', payload: items });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load books.';
      dispatch({ type: 'LOAD_FAILURE', payload: message });
      showToast(message, 'error');
    }
  }, [repo, showToast]);

  useEffect(() => {
    void reloadBooks();
  }, [reloadBooks]);

  const createBook = useCallback(
    async (input: BookInput): Promise<Book> => {
      try {
        const created = await repo.create(input);
        dispatch({ type: 'CREATE_SUCCESS', payload: created });
        showToast(`"${created.title}" added to your library.`, 'success');
        return created;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Could not add book.';
        showToast(message, 'error');
        throw err;
      }
    },
    [repo, showToast],
  );

  const updateBook = useCallback(
    async (id: string, input: BookInput): Promise<Book> => {
      try {
        const updated = await repo.update(id, input);
        dispatch({ type: 'UPDATE_SUCCESS', payload: updated });
        showToast(`"${updated.title}" updated.`, 'success');
        return updated;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Could not update book.';
        showToast(message, 'error');
        throw err;
      }
    },
    [repo, showToast],
  );

  const deleteBook = useCallback(
    async (id: string): Promise<void> => {
      const target = state.books.find((b) => b.id === id);
      try {
        await repo.remove(id);
        dispatch({ type: 'DELETE_SUCCESS', payload: id });
        showToast(
          target ? `"${target.title}" removed from library.` : 'Book removed.',
          'info',
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Could not delete book.';
        showToast(message, 'error');
        throw err;
      }
    },
    [repo, showToast, state.books],
  );

  const lendBook = useCallback(
    async (id: string, borrowerName: string): Promise<Book> => {
      const existing = state.books.find((b) => b.id === id);
      if (!existing) {
        const err = new Error('Book not found.');
        showToast(err.message, 'error');
        throw err;
      }
      // A borrowed book cannot be lent again before it is returned
      if (existing.status === 'borrowed') {
        const err = new Error('This book is already borrowed. Return it first.');
        showToast(err.message, 'error');
        throw err;
      }
      // Borrower name is required
      const validationErr = validateBorrowedBy(borrowerName);
      if (validationErr) {
        const err = new Error(validationErr);
        showToast(err.message, 'error');
        throw err;
      }

      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = existing;
      void _id;
      void _createdAt;
      void _updatedAt;

      const updated = await repo.update(id, {
        ...rest,
        status: 'borrowed',
        borrowedBy: borrowerName.trim(),
      });
      dispatch({ type: 'UPDATE_SUCCESS', payload: updated });
      showToast(`Lent "${updated.title}" to ${updated.borrowedBy}.`, 'success');
      return updated;
    },
    [repo, showToast, state.books],
  );

  const returnBook = useCallback(
    async (id: string): Promise<Book> => {
      const existing = state.books.find((b) => b.id === id);
      if (!existing) {
        const err = new Error('Book not found.');
        showToast(err.message, 'error');
        throw err;
      }

      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = existing;
      void _id;
      void _createdAt;
      void _updatedAt;

      // If status is available, borrowedBy must be null
      const updated = await repo.update(id, {
        ...rest,
        status: 'available',
        borrowedBy: null,
      });
      dispatch({ type: 'UPDATE_SUCCESS', payload: updated });
      showToast(`"${updated.title}" marked as returned.`, 'success');
      return updated;
    },
    [repo, showToast, state.books],
  );

  const recordReadingSession = useCallback(
    async (id: string): Promise<Book> => {
      const existing = state.books.find((b) => b.id === id);
      if (!existing) {
        throw new Error('Book not found.');
      }

      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = existing;
      void _id;
      void _createdAt;
      void _updatedAt;

      const updated = await repo.update(id, {
        ...rest,
        readCount: (existing.readCount ?? 1) + 1,
        readHours: (existing.readHours ?? 18) + 2,
        lastReadDate: formatIsoDate(new Date().toISOString()),
      });
      dispatch({ type: 'UPDATE_SUCCESS', payload: updated });
      showToast(`Logged reading session for "${updated.title}".`, 'success');
      return updated;
    },
    [repo, showToast, state.books],
  );

  const toggleTopShelf = useCallback(
    async (id: string): Promise<Book> => {
      const existing = state.books.find((b) => b.id === id);
      if (!existing) {
        throw new Error('Book not found.');
      }

      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = existing;
      void _id;
      void _createdAt;
      void _updatedAt;

      const nextFeatured = !existing.featuredOnTopShelf;
      const updated = await repo.update(id, {
        ...rest,
        featuredOnTopShelf: nextFeatured,
      });
      dispatch({ type: 'UPDATE_SUCCESS', payload: updated });
      showToast(
        nextFeatured
          ? `"${updated.title}" pinned to top display shelf.`
          : `"${updated.title}" moved to spine shelf.`,
        'info',
      );
      return updated;
    },
    [repo, showToast, state.books],
  );

  const value = useMemo<BooksContextValue>(
    () => ({
      books: state.books,
      status: state.status,
      error: state.error,
      reloadBooks,
      createBook,
      updateBook,
      deleteBook,
      lendBook,
      returnBook,
      recordReadingSession,
      toggleTopShelf,
    }),
    [
      state.books,
      state.status,
      state.error,
      reloadBooks,
      createBook,
      updateBook,
      deleteBook,
      lendBook,
      returnBook,
      recordReadingSession,
      toggleTopShelf,
    ],
  );

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
}
