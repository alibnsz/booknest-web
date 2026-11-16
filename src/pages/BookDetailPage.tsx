import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit2,
  Handshake,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { BookCard } from '../components/books/BookCard';
import { BookForm } from '../components/books/BookForm';
import { BorrowForm } from '../components/books/BorrowForm';
import { EditorialBookCover } from '../components/books/EditorialBookCover';
import { AppLayout } from '../components/layout/AppLayout';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Modal } from '../components/ui/Modal';
import { SEED_BOOKS } from '../data/seedBooks';
import { useBooks } from '../hooks/useBooks';
import type { BookInput } from '../interfaces/book';
import { formatIsoDate } from '../utils/formatters';
import { NotFoundPage } from './NotFoundPage';

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    books,
    updateBook,
    deleteBook,
    lendBook,
    returnBook,
    recordReadingSession,
  } = useBooks();

  const [activeTab, setActiveTab] = useState<'blurb' | 'notes'>('blurb');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLendOpen, setIsLendOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Guarantee the detail page always opens at the very top of the viewport
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  const catalog = books.length > 0 ? books : SEED_BOOKS;
  const currentIndex = catalog.findIndex((b) => b.id === id);
  const book = currentIndex !== -1 ? catalog[currentIndex] : null;

  if (!book) {
    return <NotFoundPage message="Aradığınız kitap kütüphanede bulunamadı." />;
  }

  const prevBook =
    catalog.length > 1
      ? catalog[(currentIndex - 1 + catalog.length) % catalog.length]
      : null;
  const nextBook =
    catalog.length > 1 ? catalog[(currentIndex + 1) % catalog.length] : null;

  // 4 Vertical Thumbnail Switcher Books
  const thumbnailBooks = [0, 1, 2, 3].map(
    (offset) => catalog[(currentIndex + offset) % catalog.length],
  );

  const relatedBooks = [
    ...catalog.filter((b) => b.id !== book.id && b.category === book.category),
    ...catalog.filter((b) => b.id !== book.id && b.category !== book.category),
  ].slice(0, 5);

  const handleUpdate = async (input: BookInput) => {
    await updateBook(book.id, input);
    setIsEditOpen(false);
  };

  const handleLend = async (borrowerName: string) => {
    await lendBook(book.id, borrowerName);
    setIsLendOpen(false);
  };

  const handleDelete = async () => {
    await deleteBook(book.id);
    setIsDeleteOpen(false);
    navigate('/');
  };

  return (
    <AppLayout>
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pt-4 pb-20 sm:px-10">
        {/* Compact Top Bar: Back link + Minimalist Monochrome Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition-colors hover:text-[#111111]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Ana Vitrine Dön</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border border-[#111111] px-3 py-1 text-[11px] font-medium ${
                book.status === 'borrowed'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white text-[#111111]'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  book.status === 'borrowed' ? 'bg-amber-300' : 'bg-[#111111]'
                }`}
              />
              {book.status === 'borrowed'
                ? `Ödünçte · ${book.borrowedBy}`
                : 'Rafta Mevcut'}
            </span>

            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1 text-[11px] font-medium text-[#111111] transition-colors hover:border-[#111111] cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
              <span>Düzenle</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1 text-[11px] font-medium text-neutral-500 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
              <span>Sil</span>
            </button>
          </div>
        </div>

        {/* Main Centered Editorial Spread (Fits immediately in the first viewport) */}
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 mb-14 flex items-center justify-between gap-6 lg:gap-10"
        >
          {/* Left Prev Navigation Arrow (Safely inside max-w-6xl container) */}
          {prevBook && (
            <button
              type="button"
              onClick={() => navigate(`/books/${prevBook.id}`)}
              aria-label={`Önceki kitap: ${prevBook.title}`}
              className="hidden md:flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-[#111111] shadow-xs transition-all hover:border-[#111111] hover:bg-[#111111] hover:text-white cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Center-Balanced Two-Column Book Spread */}
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:gap-14">
            {/* Left Column: 4 Vertical Edition/Book Thumbnails + Main 3D Cover + Pill Actions */}
            <div className="flex flex-col items-center">
              {/* "Son okuma" subtle label directly above cover */}
              <p className="mb-3 text-[11px] font-medium tracking-wide text-neutral-500 sm:pl-14">
                Son okuma: {book.lastReadDate ?? formatIsoDate(book.updatedAt)}
              </p>

              <div className="flex items-start gap-4">
                {/* 4 Vertical Miniature Book Switcher Thumbnails */}
                <div className="hidden sm:flex flex-col gap-2.5 pt-1">
                  {thumbnailBooks.map((thumb, idx) => {
                    const isCurrent = thumb.id === book.id;
                    return (
                      <button
                        key={thumb.id}
                        type="button"
                        onClick={() => navigate(`/books/${thumb.id}`)}
                        title={`${thumb.title} — ${thumb.author}`}
                        className={`h-14 w-10 overflow-hidden rounded-[2px] transition-all duration-300 cursor-pointer ${
                          isCurrent
                            ? 'ring-1 ring-[#111111] ring-offset-2 opacity-100 scale-105'
                            : idx === 1
                              ? 'opacity-85 hover:opacity-100 hover:scale-105'
                              : 'grayscale opacity-55 hover:grayscale-0 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <EditorialBookCover book={thumb} />
                      </button>
                    );
                  })}
                </div>

                {/* Main 3D Book Cover with 3D Spin Entrance */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotateY: -140 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformPerspective: 1100 }}
                  className="flex items-center justify-center py-1 pr-2"
                >
                  <div className="book-3d-wrapper">
                    <div className="book-3d-card h-[290px] w-[205px]">
                      <EditorialBookCover book={book} />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Pill Buttons Below Cover */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:pl-14">
                <button
                  type="button"
                  onClick={() => void recordReadingSession(book.id)}
                  className="rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-xs font-semibold text-[#111111] shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all hover:border-[#111111] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] cursor-pointer"
                >
                  Kitabı Oku
                </button>

                {book.status === 'available' ? (
                  <button
                    type="button"
                    onClick={() => setIsLendOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#111111] px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 cursor-pointer"
                  >
                    <Handshake className="h-3.5 w-3.5" />
                    <span>Ödünç Ver</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void returnBook(book.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#111111] bg-white px-5 py-2.5 text-xs font-medium text-[#111111] transition-colors hover:bg-[#111111] hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>İade Al</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Title, Author, Connected White Folder-Tab Card & Reading Stats */}
            <div className="flex w-full max-w-lg flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                {book.category} · {book.year}
              </span>

              <h1 className="font-editorial mt-1.5 text-4xl font-normal leading-[1.08] tracking-tight text-[#111111] sm:text-5xl">
                {book.title}
              </h1>
              <p className="mt-1.5 text-lg font-normal text-neutral-600">
                {book.author}
              </p>

              {/* Connected Folder-Style Tabs + Crisp White Card */}
              <div className="mt-6">
                <div className="relative z-10 flex items-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('blurb')}
                    className={`rounded-t-xl px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'blurb'
                        ? 'border border-b-0 border-neutral-200 bg-white text-[#111111] shadow-[0_-4px_12px_rgba(0,0,0,0.02)]'
                        : 'bg-transparent text-neutral-400 hover:text-[#111111]'
                    }`}
                  >
                    Kitap Özeti
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('notes')}
                    className={`rounded-t-xl px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'notes'
                        ? 'border border-b-0 border-neutral-200 bg-white text-[#111111] shadow-[0_-4px_12px_rgba(0,0,0,0.02)]'
                        : 'bg-transparent text-neutral-400 hover:text-[#111111]'
                    }`}
                  >
                    Notlar & Ödünç
                  </button>
                </div>

                <div className="-mt-[1px] min-h-[148px] rounded-2xl rounded-tl-none border border-neutral-200 bg-white p-6 shadow-[0_14px_38px_rgba(0,0,0,0.04)]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'blurb' ? (
                      <motion.p
                        key="blurb"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs leading-[1.75] text-neutral-600 sm:text-[13px]"
                      >
                        {book.blurb ||
                          `${book.author} tarafından kaleme alınan ve ${book.year} yılında yayımlanan ${book.title}, ${book.category} edebiyatının en çarpıcı ve ufuk açıcı eserlerinden biridir.`}
                      </motion.p>
                    ) : (
                      <motion.div
                        key="notes"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-2 text-xs leading-[1.75] text-neutral-600 sm:text-[13px]"
                      >
                        <p>
                          {book.notes ||
                            'Bu eser için henüz kişisel bir okuma notu eklenmemiş. Sağ üstteki Düzenle butonuna tıklayarak notlarınızı kaydedebilirsiniz.'}
                        </p>
                        {book.borrowedBy && (
                          <p className="mt-1 font-semibold text-[#111111]">
                            Ödünç Alan Okuyucu: {book.borrowedBy}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Reading Metrics Bar */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-1 text-xs font-semibold text-[#111111]">
                <div className="flex items-center gap-6">
                  <span className="inline-flex items-center gap-1.5">
                    <Bookmark className="h-3.5 w-3.5 fill-[#111111] text-[#111111]" />
                    <span>{book.readCount ?? 1} kez okundu</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#111111]" />
                    <span>{book.readHours ?? 24} saat okuma süresi</span>
                  </span>
                </div>
                <span>{book.pages ?? 320} sayfa</span>
              </div>
            </div>
          </div>

          {/* Right Next Navigation Arrow (Safely inside max-w-6xl container) */}
          {nextBook && (
            <button
              type="button"
              onClick={() => navigate(`/books/${nextBook.id}`)}
              aria-label={`Sonraki kitap: ${nextBook.title}`}
              className="hidden md:flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-[#111111] shadow-xs transition-all hover:border-[#111111] hover:bg-[#111111] hover:text-white cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </motion.div>

        {/* Related Books Showcase */}
        {relatedBooks.length > 0 && (
          <div className="mt-6 pt-8">
            <div className="mx-auto mb-12 flex max-w-3xl items-center justify-center gap-6">
              <div className="relative h-[1px] flex-1 bg-neutral-300">
                <span className="absolute -left-1 -top-[3px] h-1.5 w-1.5 rotate-45 bg-[#111111]" />
              </div>
              <h2 className="font-editorial px-2 text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">
                Benzer Eserler
              </h2>
              <div className="relative h-[1px] flex-1 bg-neutral-300">
                <span className="absolute -right-1 -top-[3px] h-1.5 w-1.5 rotate-45 bg-[#111111]" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {relatedBooks.map((rel, idx) => (
                <BookCard key={rel.id} book={rel} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Kitap Bilgilerini Düzenle"
        subtitle={`"${book.title}" güncelleniyor`}
      >
        <BookForm
          initialValues={book}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>

      {/* Lend Modal */}
      <Modal
        isOpen={isLendOpen}
        onClose={() => setIsLendOpen(false)}
        title="Kitabı Ödünç Ver"
        maxWidthClass="max-w-md"
      >
        <BorrowForm
          bookTitle={book.title}
          onSubmit={handleLend}
          onCancel={() => setIsLendOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Kitabı Sil"
        confirmLabel="Evet, Sil"
        cancelLabel="Vazgeç"
        message={`"${book.title}" adlı eseri kütüphanenizden silmek istediğinize emin misiniz?`}
        onConfirm={() => void handleDelete()}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </AppLayout>
  );
}
export default BookDetailPage;
