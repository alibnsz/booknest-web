import type { BookRepository } from '../interfaces/repository';
import { LocalStorageBookRepository } from './localStorageBook.repository';

let repositoryInstance: BookRepository | null = null;

export function getBookRepository(): BookRepository {
  if (!repositoryInstance) {
    repositoryInstance = new LocalStorageBookRepository();
  }
  return repositoryInstance;
}

export function setBookRepository(repo: BookRepository): void {
  repositoryInstance = repo;
}
