import { describe, expect, it, beforeEach } from 'vitest';
import { getBookCoverDesign } from '../src/data/coverDesigns';
import { SEED_BOOKS } from '../src/data/seedBooks';
import { LocalStorageBookRepository } from '../src/services/localStorageBook.repository';
import { filterAndSortBooks } from '../src/utils/filterAndSort';
import { validateBookInput } from '../src/utils/validators';
import { booksReducer, initialBooksState } from '../src/context/booksReducer';

describe('validators', () => {
  it('validates required fields and year constraints', () => {
    const result = validateBookInput({
      title: '   ',
      author: '',
      category: '',
      year: 3000,
      status: 'borrowed',
      borrowedBy: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBe('Title is required (max 200 characters).');
    expect(result.errors.author).toBe('Author is required (max 120 characters).');
    expect(result.errors.category).toBe('Category is required (max 60 characters).');
    expect(result.errors.year).toBe('Enter a valid year.');
    expect(result.errors.borrowedBy).toBe('Borrower name is required.');
  });

  it('accepts valid book input', () => {
    const result = validateBookInput({
      title: 'Brave New World',
      author: 'Aldous Huxley',
      category: 'dystopian',
      year: 1932,
      status: 'available',
      borrowedBy: null,
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});

describe('LocalStorageBookRepository', () => {
  const testKey = 'booknest:test:books';

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('creates, updates, lends, returns, and removes books safely', async () => {
    const repo = new LocalStorageBookRepository(testKey, false);

    const empty = await repo.findAll();
    expect(empty).toHaveLength(0);

    const created = await repo.create({
      title: 'Dune',
      author: 'Frank Herbert',
      category: 'sci-fi',
      year: 1965,
      status: 'available',
      borrowedBy: null,
    });

    expect(created.id).toBeTruthy();
    expect(created.title).toBe('Dune');
    expect(created.borrowedBy).toBeNull();

    // Update / Lend book
    const lent = await repo.update(created.id, {
      title: 'Dune',
      author: 'Frank Herbert',
      category: 'sci-fi',
      year: 1965,
      status: 'borrowed',
      borrowedBy: 'Caner Demir',
    });

    expect(lent.id).toBe(created.id);
    expect(lent.createdAt).toBe(created.createdAt);
    expect(lent.status).toBe('borrowed');
    expect(lent.borrowedBy).toBe('Caner Demir');

    // Return book
    const returned = await repo.update(created.id, {
      title: 'Dune',
      author: 'Frank Herbert',
      category: 'sci-fi',
      year: 1965,
      status: 'available',
      borrowedBy: 'ShouldBeCleared',
    });

    expect(returned.status).toBe('available');
    expect(returned.borrowedBy).toBeNull();

    await repo.remove(created.id);
    expect(await repo.findAll()).toHaveLength(0);
  });

  it('falls back to empty array when LocalStorage is corrupted', async () => {
    window.localStorage.setItem(testKey, '{corrupted-json');
    const repo = new LocalStorageBookRepository(testKey, false);
    const items = await repo.findAll();
    expect(items).toEqual([]);
  });
});

describe('filterAndSortBooks & booksReducer', () => {
  it('filters by query, status, and sorts by title', () => {
    const sample = [
      {
        id: '1',
        title: 'Zebra',
        author: 'Alice',
        category: 'novel',
        year: 2001,
        status: 'available' as const,
        borrowedBy: null,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: '2',
        title: 'Alpha',
        author: 'Bob',
        category: 'sci-fi',
        year: 1999,
        status: 'borrowed' as const,
        borrowedBy: 'Zeynep',
        createdAt: '2026-01-02T00:00:00.000Z',
        updatedAt: '2026-01-02T00:00:00.000Z',
      },
    ];

    const state = booksReducer(initialBooksState, {
      type: 'LOAD_SUCCESS',
      payload: sample,
    });
    expect(state.books).toHaveLength(2);

    const sorted = filterAndSortBooks(state.books, {
      query: '',
      status: 'all',
      category: 'all',
      sortBy: 'title',
      sortDirection: 'asc',
    });
    expect(sorted[0].title).toBe('Alpha');

    const filteredBorrowed = filterAndSortBooks(state.books, {
      query: 'bob',
      status: 'borrowed',
      category: 'sci-fi',
      sortBy: 'year',
      sortDirection: 'desc',
    });
    expect(filteredBorrowed).toHaveLength(1);
    expect(filteredBorrowed[0].id).toBe('2');
  });
});

describe('SEED_BOOKS catalog & cover uniqueness', () => {
  it('provides at least 50 valid books with completely unique cover designs', () => {
    expect(SEED_BOOKS.length).toBeGreaterThanOrEqual(50);

    const uniqueIds = new Set<string>();
    const uniqueCoverSignatures = new Set<string>();

    for (const book of SEED_BOOKS) {
      expect(uniqueIds.has(book.id)).toBe(false);
      uniqueIds.add(book.id);

      const validation = validateBookInput(book);
      expect(validation.isValid).toBe(true);

      const cover = getBookCoverDesign(book);
      const signature = `${cover.layout}|${cover.motif}|${cover.bg}`;
      expect(uniqueCoverSignatures.has(signature)).toBe(false);
      uniqueCoverSignatures.add(signature);
    }
  });
});
