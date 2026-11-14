import type { BookInput, BookValidationErrors } from '../interfaces/book';

export function validateTitle(title: string): string | undefined {
  const trimmed = title.trim();
  if (!trimmed || trimmed.length > 200) {
    return 'Title is required (max 200 characters).';
  }
  return undefined;
}

export function validateAuthor(author: string): string | undefined {
  const trimmed = author.trim();
  if (!trimmed || trimmed.length > 120) {
    return 'Author is required (max 120 characters).';
  }
  return undefined;
}

export function validateCategory(category: string): string | undefined {
  const trimmed = category.trim();
  if (!trimmed || trimmed.length > 60) {
    return 'Category is required (max 60 characters).';
  }
  return undefined;
}

export function validateYear(year: number): string | undefined {
  const currentYear = new Date().getFullYear();
  if (!Number.isInteger(year) || year < 0 || year > currentYear) {
    return 'Enter a valid year.';
  }
  return undefined;
}

export function validateBorrowedBy(borrowedBy: string | null): string | undefined {
  const trimmed = (borrowedBy ?? '').trim();
  if (!trimmed || trimmed.length > 120) {
    return 'Borrower name is required.';
  }
  return undefined;
}

export function validateBookInput(input: BookInput): {
  isValid: boolean;
  errors: BookValidationErrors;
} {
  const errors: BookValidationErrors = {};

  const titleErr = validateTitle(input.title);
  if (titleErr) errors.title = titleErr;

  const authorErr = validateAuthor(input.author);
  if (authorErr) errors.author = authorErr;

  const categoryErr = validateCategory(input.category);
  if (categoryErr) errors.category = categoryErr;

  const yearErr = validateYear(input.year);
  if (yearErr) errors.year = yearErr;

  // If status is borrowed, borrowedBy must be a non-empty string.
  if (input.status === 'borrowed') {
    const borrowerErr = validateBorrowedBy(input.borrowedBy);
    if (borrowerErr) errors.borrowedBy = borrowerErr;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
