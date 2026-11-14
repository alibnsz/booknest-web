import { STORAGE_KEYS } from '../constants/book.constants';
import { SEED_BOOKS } from '../data/seedBooks';
import type { Book, BookInput } from '../interfaces/book';
import type { BookRepository } from '../interfaces/repository';
import { formatIsoDate, pickSpineStyleFromTitle } from '../utils/formatters';
import { validateBookInput } from '../utils/validators';

function isValidBookShape(item: unknown): item is Book {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.author === 'string' &&
    typeof candidate.category === 'string' &&
    typeof candidate.year === 'number' &&
    (candidate.status === 'available' || candidate.status === 'borrowed') &&
    (candidate.borrowedBy === null || typeof candidate.borrowedBy === 'string') &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.updatedAt === 'string'
  );
}

function normalizeBookInput(input: BookInput): BookInput {
  const status = input.status;
  // Lending status normalization
  const borrowedBy =
    status === 'borrowed' && input.borrowedBy ? input.borrowedBy.trim() : null;

  const spineDefaults = pickSpineStyleFromTitle(input.title);

  return {
    ...input,
    title: input.title.trim(),
    author: input.author.trim(),
    category: input.category.trim().toLowerCase(),
    year: Number(input.year),
    status,
    borrowedBy,
    pages: input.pages && input.pages > 0 ? Number(input.pages) : 312,
    readCount: input.readCount !== undefined ? Number(input.readCount) : 1,
    readHours: input.readHours !== undefined ? Number(input.readHours) : 24,
    lastReadDate: input.lastReadDate || formatIsoDate(new Date().toISOString()),
    blurb:
      input.blurb?.trim() ||
      `An essential edition of ${input.title.trim()} by ${input.author.trim()}, cataloged in your virtual BookNest collection under ${input.category.trim()}.`,
    notes: input.notes?.trim() || '',
    spineColor: input.spineColor || spineDefaults.spineColor,
    spineTextColor: input.spineTextColor || spineDefaults.spineTextColor,
    spineAccentColor: input.spineAccentColor || spineDefaults.spineAccentColor,
    spinePattern: input.spinePattern || spineDefaults.spinePattern,
    spineHeight: input.spineHeight || spineDefaults.spineHeight,
    spineWidth: input.spineWidth || spineDefaults.spineWidth,
  };
}

export class LocalStorageBookRepository implements BookRepository {
  private readonly storageKey: string;
  private readonly seedOnFirstLaunch: boolean;

  constructor(storageKey: string = STORAGE_KEYS.BOOKS, seedOnFirstLaunch = true) {
    this.storageKey = storageKey;
    this.seedOnFirstLaunch = seedOnFirstLaunch;
  }

  private readFromStorage(): Book[] {
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (raw === null) {
        if (this.seedOnFirstLaunch) {
          this.writeToStorage(SEED_BOOKS);
          return [...SEED_BOOKS];
        }
        return [];
      }

      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        console.warn('[BookNest] Corrupted storage format (not an array). Falling back to empty library.');
        return [];
      }

      const validBooks = parsed.filter(isValidBookShape);
      if (validBooks.length !== parsed.length) {
        console.warn('[BookNest] Some corrupted book entries were ignored during load.');
      }
      return validBooks;
    } catch (error) {
      console.warn('[BookNest] Failed to parse books from LocalStorage. Falling back to empty library.', error);
      return [];
    }
  }

  private writeToStorage(books: Book[]): void {
    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify(books));
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? `Storage write failed: ${error.message}`
          : 'Storage quota exceeded or unavailable.',
      );
    }
  }

  async findAll(): Promise<Book[]> {
    return this.readFromStorage();
  }

  async findById(id: string): Promise<Book | null> {
    const books = this.readFromStorage();
    return books.find((b) => b.id === id) ?? null;
  }

  async create(input: BookInput): Promise<Book> {
    const normalized = normalizeBookInput(input);
    const validation = validateBookInput(normalized);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0] ?? 'Invalid book data.';
      throw new Error(firstError);
    }

    const now = new Date().toISOString();
    const id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `book-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const newBook: Book = {
      ...normalized,
      id,
      createdAt: now,
      updatedAt: now,
    };

    const books = this.readFromStorage();
    const nextBooks = [newBook, ...books];
    this.writeToStorage(nextBooks);
    return newBook;
  }

  async update(id: string, input: BookInput): Promise<Book> {
    const books = this.readFromStorage();
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error('Book not found.');
    }

    const existing = books[index];
    const normalized = normalizeBookInput({
      ...existing,
      ...input,
    });

    const validation = validateBookInput(normalized);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0] ?? 'Invalid book data.';
      throw new Error(firstError);
    }

    // id and createdAt are immutable; updatedAt is refreshed
    const updatedBook: Book = {
      ...existing,
      ...normalized,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const nextBooks = [...books];
    nextBooks[index] = updatedBook;
    this.writeToStorage(nextBooks);
    return updatedBook;
  }

  async remove(id: string): Promise<void> {
    const books = this.readFromStorage();
    const nextBooks = books.filter((b) => b.id !== id);
    this.writeToStorage(nextBooks);
  }
}
