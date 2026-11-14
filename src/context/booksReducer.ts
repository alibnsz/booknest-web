import type { Book } from '../interfaces/book';

export type BooksLoadingStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface BooksState {
  books: Book[];
  status: BooksLoadingStatus;
  error: string | null;
}

export const initialBooksState: BooksState = {
  books: [],
  status: 'loading',
  error: null,
};

export type BooksAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: Book[] }
  | { type: 'LOAD_FAILURE'; payload: string }
  | { type: 'CREATE_SUCCESS'; payload: Book }
  | { type: 'UPDATE_SUCCESS'; payload: Book }
  | { type: 'DELETE_SUCCESS'; payload: string };

export function booksReducer(state: BooksState, action: BooksAction): BooksState {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    case 'LOAD_SUCCESS':
      return {
        books: action.payload,
        status: 'ready',
        error: null,
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        books: [action.payload, ...state.books],
        error: null,
      };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book,
        ),
        error: null,
      };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
        error: null,
      };
    default:
      return state;
  }
}
