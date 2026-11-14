import { motion } from 'framer-motion';
import { useState } from 'react';
import { BookCard } from '../components/books/BookCard';
import { BookForm } from '../components/books/BookForm';
import { BorrowForm } from '../components/books/BorrowForm';
import { AppLayout } from '../components/layout/AppLayout';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Modal } from '../components/ui/Modal';
import { useBookFilters } from '../hooks/useBookFilters';
import { useBooks } from '../hooks/useBooks';
import type { Book, BookInput } from '../interfaces/book';

export function GenresPage() {
  const { books, updateBook, deleteBook, lendBook, returnBook } = useBooks();
  const { categories } = useBookFilters(books);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [lendingBook, setLendingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  const displayedBooks =
    selectedGenre === 'all'
      ? books
      : books.filter(
          (b) => b.category.toLowerCase() === selectedGenre.toLowerCase(),
        );

  const handleUpdate = async (input: BookInput) => {
    if (!editingBook) return;
    await updateBook(editingBook.id, input);
    setEditingBook(null);
  };

  const handleLend = async (borrowerName: string) => {
    if (!lendingBook) return;
    await lendBook(lendingBook.id, borrowerName);
    setLendingBook(null);
  };

  const handleDelete = async () => {
    if (!deletingBook) return;
    await deleteBook(deletingBook.id);
    setDeletingBook(null);
  };

  return (
    <AppLayout>
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-neutral-200 pb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
            KATEGORİ & TÜR KATALOĞU
          </p>
          <h1 className="font-editorial mt-3 text-5xl font-normal tracking-tight text-[#111111] sm:text-6xl">
            Edebiyat ve Düşünce Türleri
          </h1>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-neutral-500">
            Kütüphanedeki tüm eserleri edebi türlerine, felsefi akımlara ve bilim
            alanlarına göre filtreleyerek inceleyin.
          </p>

          {/* Genre Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedGenre('all')}
              className={`rounded-full border px-5 py-2 text-xs font-medium transition-all cursor-pointer ${
                selectedGenre === 'all'
                  ? 'border-[#111111] bg-[#111111] text-white'
                  : 'border-neutral-300 bg-white text-[#111111] hover:border-[#111111]'
              }`}
            >
              Tümü ({books.length})
            </button>
            {categories.map((cat) => {
              const count = books.filter(
                (b) => b.category.toLowerCase() === cat.toLowerCase(),
              ).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedGenre(cat)}
                  className={`rounded-full border px-5 py-2 text-xs font-medium capitalize transition-all cursor-pointer ${
                    selectedGenre === cat
                      ? 'border-[#111111] bg-[#111111] text-white'
                      : 'border-neutral-300 bg-white text-[#111111] hover:border-[#111111]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {displayedBooks.map((book, idx) => (
            <BookCard
              key={book.id}
              book={book}
              index={idx}
              onEdit={(b) => setEditingBook(b)}
              onDelete={(b) => setDeletingBook(b)}
              onLend={(b) => setLendingBook(b)}
              onReturn={(b) => void returnBook(b.id)}
            />
          ))}
        </div>
      </section>

      <Modal
        isOpen={Boolean(editingBook)}
        onClose={() => setEditingBook(null)}
        title="Kitap Bilgilerini Düzenle"
      >
        {editingBook && (
          <BookForm
            initialValues={editingBook}
            onSubmit={handleUpdate}
            onCancel={() => setEditingBook(null)}
          />
        )}
      </Modal>

      <Modal
        isOpen={Boolean(lendingBook)}
        onClose={() => setLendingBook(null)}
        title="Kitabı Ödünç Ver"
        maxWidthClass="max-w-md"
      >
        {lendingBook && (
          <BorrowForm
            bookTitle={lendingBook.title}
            onSubmit={handleLend}
            onCancel={() => setLendingBook(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingBook)}
        title="Kitabı Sil"
        message={
          deletingBook
            ? `"${deletingBook.title}" adlı eseri silmek istediğinize emin misiniz?`
            : ''
        }
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeletingBook(null)}
      />
    </AppLayout>
  );
}
export default GenresPage;
