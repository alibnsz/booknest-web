import { AnimatePresence, motion } from 'framer-motion';
import {
  Archive,
  BookOpen,
  Download,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Upload,
  X,
} from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { SEED_BOOKS } from '../../data/seedBooks';
import { useBookFilters } from '../../hooks/useBookFilters';
import { useBooks } from '../../hooks/useBooks';
import { useToast } from '../../context/ToastContext';
import type { Book, BookFilters, BookInput, BookStatus } from '../../interfaces/book';
import { BookForm } from '../books/BookForm';
import { BorrowForm } from '../books/BorrowForm';
import { EditorialBookCover } from '../books/EditorialBookCover';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface ArchiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddModal: () => void;
}

export function ArchiveDrawer({
  isOpen,
  onClose,
  onOpenAddModal,
}: ArchiveDrawerProps) {
  const navigate = useNavigate();
  const { books, createBook, lendBook, returnBook } = useBooks();
  const {
    filters,
    updateFilter,
    resetFilters,
    filteredBooks,
    categories,
    hasActiveFilters,
  } = useBookFilters(books);
  const { showToast } = useToast();

  const [lendingBook, setLendingBook] = useState<Book | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLendBook = async (borrowerName: string) => {
    if (!lendingBook) return;
    await lendBook(lendingBook.id, borrowerName);
    setLendingBook(null);
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(books, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `booknest-kutuphane-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Kütüphane JSON olarak dışa aktarıldı.', 'info');
  };

  const handleImportJson = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as Book[];
      if (!Array.isArray(parsed)) {
        throw new Error('Geçersiz JSON formatı.');
      }
      for (const item of parsed) {
        if (item.title && item.author && item.category && item.year) {
          await createBook({
            title: item.title,
            author: item.author,
            category: item.category,
            year: Number(item.year),
            status: item.status === 'borrowed' ? 'borrowed' : 'available',
            borrowedBy: item.borrowedBy ?? null,
            coverUrl: item.coverUrl,
            blurb: item.blurb,
            notes: item.notes,
            pages: item.pages,
          });
        }
      }
    } catch {
      showToast('JSON dosyası içe aktarılamadı.', 'error');
    } finally {
      event.target.value = '';
    }
  };

  const handleRestoreDemoBooks = async () => {
    const existingTitles = new Set(books.map((b) => b.title.toLowerCase()));
    let added = 0;
    for (const demo of SEED_BOOKS) {
      if (!existingTitles.has(demo.title.toLowerCase())) {
        await createBook({
          title: demo.title,
          author: demo.author,
          category: demo.category,
          year: demo.year,
          status: demo.status,
          borrowedBy: demo.borrowedBy,
          coverUrl: demo.coverUrl,
          blurb: demo.blurb,
          notes: demo.notes,
          pages: demo.pages,
          featuredOnTopShelf: demo.featuredOnTopShelf,
          spineColor: demo.spineColor,
          spineTextColor: demo.spineTextColor,
          spineAccentColor: demo.spineAccentColor,
        });
        added += 1;
      }
    }
    showToast(
      added > 0
        ? `${added} örnek kitap kütüphaneye eklendi.`
        : 'Tüm örnek kitaplar zaten kütüphanede mevcut.',
      'info',
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Kütüphane Arşivi ve Arama"
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col justify-between border-l border-neutral-200 bg-white p-7 shadow-2xl"
            >
              <div className="flex flex-1 flex-col gap-5 overflow-hidden">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <div>
                    <h3 className="font-editorial text-3xl font-normal text-[#111111]">
                      Arşiv & Arama
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Toplam {books.length} eser · {filteredBooks.length} sonuç
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        onClose();
                        onOpenAddModal();
                      }}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Yeni Ekle</span>
                    </Button>
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Arşiv panelini kapat"
                      className="rounded-full border border-neutral-200 p-2 text-neutral-500 hover:border-neutral-900 hover:text-[#111111] cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Drawer Search & Filters */}
                <div className="flex flex-col gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="search"
                      value={filters.query}
                      onChange={(e) => updateFilter('query', e.target.value)}
                      placeholder="Ne arıyorsun? (Kitap, yazar, tür)..."
                      aria-label="Arşivde kitap ara"
                      className="w-full rounded-full border border-neutral-900 bg-white py-2.5 pl-4 pr-10 text-xs font-medium text-[#111111] placeholder:text-neutral-400 focus:outline-none"
                    />
                    {filters.query ? (
                      <button
                        type="button"
                        onClick={() => updateFilter('query', '')}
                        className="absolute right-3.5 text-neutral-400 hover:text-neutral-900 cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <Search className="pointer-events-none absolute right-3.5 h-3.5 w-3.5 text-neutral-800" />
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <select
                      aria-label="Duruma göre filtrele"
                      value={filters.status}
                      onChange={(e) =>
                        updateFilter('status', e.target.value as BookStatus | 'all')
                      }
                      className="rounded-full border border-neutral-200 bg-[#F5F5F3] px-3 py-1.5 text-[11px] font-medium text-[#111111] focus:border-neutral-900 focus:outline-none"
                    >
                      <option value="all">Tüm Durumlar</option>
                      <option value="available">Mevcut</option>
                      <option value="borrowed">Ödünçte</option>
                    </select>

                    <select
                      aria-label="Türe göre filtrele"
                      value={filters.category}
                      onChange={(e) => updateFilter('category', e.target.value)}
                      className="rounded-full border border-neutral-200 bg-[#F5F5F3] px-3 py-1.5 text-[11px] font-medium text-[#111111] focus:border-neutral-900 focus:outline-none"
                    >
                      <option value="all">Tüm Türler</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <select
                      aria-label="Sıralama"
                      value={`${filters.sortBy}:${filters.sortDirection}`}
                      onChange={(e) => {
                        const [sortBy, sortDirection] = e.target.value.split(':') as [
                          BookFilters['sortBy'],
                          BookFilters['sortDirection'],
                        ];
                        updateFilter('sortBy', sortBy);
                        updateFilter('sortDirection', sortDirection);
                      }}
                      className="rounded-full border border-neutral-200 bg-[#F5F5F3] px-3 py-1.5 text-[11px] font-medium text-[#111111] focus:border-neutral-900 focus:outline-none"
                    >
                      <option value="createdAt:desc">En Yeni</option>
                      <option value="title:asc">A–Z</option>
                      <option value="author:asc">Yazar</option>
                      <option value="year:desc">Yıl ↓</option>
                    </select>
                  </div>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center justify-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-[#111111] cursor-pointer"
                    >
                      <SlidersHorizontal className="h-3 w-3" />
                      <span>Filtreleri Temizle</span>
                    </button>
                  )}
                </div>

                {/* Scrollable Book List */}
                <div className="flex-1 overflow-y-auto pr-1 divide-y divide-neutral-100 no-scrollbar">
                  {filteredBooks.map((book) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex items-center gap-4 py-3.5 transition-colors hover:bg-[#F7F7F5] px-2 rounded-xl"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          navigate(`/books/${book.id}`);
                        }}
                        className="h-16 w-11 shrink-0 overflow-hidden shadow-sm transition-transform group-hover:scale-105 cursor-pointer"
                      >
                        <EditorialBookCover book={book} />
                      </button>

                      <div
                        onClick={() => {
                          onClose();
                          navigate(`/books/${book.id}`);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onClose();
                            navigate(`/books/${book.id}`);
                          }
                        }}
                        className="min-w-0 flex-1 cursor-pointer"
                      >
                        <h4 className="truncate text-xs font-semibold text-[#111111]">
                          {book.title}
                        </h4>
                        <p className="truncate text-[11px] text-neutral-500">
                          {book.author} · {book.year}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                            {book.category}
                          </span>
                          {book.status === 'borrowed' && (
                            <span className="rounded-full border border-neutral-900 px-2 py-0.2 text-[9px] font-semibold text-[#111111]">
                              Ödünç: {book.borrowedBy}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {book.status === 'available' ? (
                          <button
                            type="button"
                            onClick={() => setLendingBook(book)}
                            title="Ödünç Ver"
                            className="rounded-full border border-neutral-200 p-2 text-neutral-500 hover:border-neutral-900 hover:text-[#111111] cursor-pointer"
                          >
                            <BookOpen className="h-3.5 w-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => void returnBook(book.id)}
                            title="İade Al"
                            className="rounded-full bg-[#111111] p-2 text-white hover:bg-neutral-800 cursor-pointer"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Drawer Footer: JSON Backup & Restore */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-4">
                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleExportJson}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>JSON İndir</span>
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Yükle</span>
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json"
                    onChange={(e) => void handleImportJson(e)}
                    className="hidden"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => void handleRestoreDemoBooks()}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Vitrin Sıfırla</span>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Lend Book Modal inside Drawer */}
      <Modal
        isOpen={Boolean(lendingBook)}
        onClose={() => setLendingBook(null)}
        title="Kitabı Ödünç Ver"
        maxWidthClass="max-w-md"
      >
        {lendingBook && (
          <BorrowForm
            bookTitle={lendingBook.title}
            onSubmit={handleLendBook}
            onCancel={() => setLendingBook(null)}
          />
        )}
      </Modal>
    </>
  );
}

export function FloatingArchiveButton({
  bookCount,
  isOpen,
  onToggle,
}: {
  bookCount: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="fixed bottom-7 right-7 z-30">
      <motion.button
        type="button"
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={onToggle}
        aria-label="Sağ arşiv ve arama çekmecesini aç"
        aria-expanded={isOpen}
        className={`flex h-12 items-center gap-2.5 rounded-full border px-5 text-xs font-medium tracking-wide shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all cursor-pointer ${
          isOpen
            ? 'border-[#111111] bg-[#111111] text-white'
            : 'border-neutral-900 bg-white text-[#111111] hover:bg-[#111111] hover:text-white'
        }`}
      >
        <Archive className="h-4 w-4" />
        <span>Arşiv & Arama ({bookCount})</span>
      </motion.button>
    </div>
  );
}

export function GlobalAddBookModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { createBook } = useBooks();

  const handleCreate = async (input: BookInput) => {
    await createBook(input);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Yeni Kitap Ekle"
      subtitle="Open Library API ile otomatik doldurun veya eser bilgilerini girin."
    >
      <BookForm onSubmit={handleCreate} onCancel={onClose} />
    </Modal>
  );
}
