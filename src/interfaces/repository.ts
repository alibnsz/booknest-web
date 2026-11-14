import type { Book, BookInput } from './book';

/** Contract implemented by every data source (LocalStorage now, HTTP later). */
export interface BookRepository {
  findAll(): Promise<Book[]>;
  findById(id: string): Promise<Book | null>;
  create(input: BookInput): Promise<Book>;
  update(id: string, input: BookInput): Promise<Book>;
  remove(id: string): Promise<void>;
}
