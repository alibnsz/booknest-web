import { useContext } from 'react';
import { BooksContext, type BooksContextValue } from '../context/BooksContext';

export function useBooks(): BooksContextValue {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider.');
  }
  return context;
}
