import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, Plus, Search, X } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { BookCard } from '../components/books/BookCard';
import { BookForm } from '../components/books/BookForm';
import { BorrowForm } from '../components/books/BorrowForm';
import { EditorialBookCover } from '../components/books/EditorialBookCover';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { SEED_BOOKS } from '../data/seedBooks';
import { useBookFilters } from '../hooks/useBookFilters';
import { useBooks } from '../hooks/useBooks';
import type { Book, BookInput } from '../interfaces/book';

const HEADLINE_LINES = [
  'Türkçe en büyük',
  'dijital kitap ve arşiv',
  'kütüphanesi',
];

export function LibraryPage() {
  const navigate = useNavigate();
  const {
    books,
    status,
    error,
    reloadBooks,
    createBook,
    updateBook,
    deleteBook,
    lendBook,
    returnBook,
  } = useBooks();

  const {
    filters,
    updateFilter,
    resetFilters,
    filteredBooks,
    categories,
    stats,
    hasActiveFilters,
  } = useBookFilters(books);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [lendingBook, setLendingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  // Interactive Mouse Parallax for the 10 Floating Hero Books
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 26 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 26 });

  const parallaxFastX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const parallaxFastY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);
  const parallaxSlowX = useTransform(smoothX, [-0.5, 0.5], [16, -16]);
  const parallaxSlowY = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  const handleHeroMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Always fall back to SEED_BOOKS before storage hydrates so the hero never remounts or jumps twice!
  const safeBooks = books.length > 0 ? books : SEED_BOOKS;

  // 10 Perimeter Floating 3D Hero Books (5 left, 5 right) positioned cleanly outside the center headline
  const floatingBooks = [
    {
      book: safeBooks.find((b) => b.id === 'b206-kafandaki-tuhaflik') ?? safeBooks[0],
      positionStyle: { top: '4%', left: '13.5%' },
      tiltClass: 'book-3d-right',
      sizeClass: 'h-[134px] w-[94px]',
      parallaxX: parallaxFastX,
      parallaxY: parallaxFastY,
      delay: 0.04,
      spinFrom: -180,
    },
    {
      book: safeBooks.find((b) => b.id === 'b207-beden-kayit-tutar') ?? safeBooks[1 % safeBooks.length],
      positionStyle: { top: '16%', left: '1.5%' },
      tiltClass: 'book-3d-right',
      sizeClass: 'h-[126px] w-[88px]',
      parallaxX: parallaxSlowX,
      parallaxY: parallaxSlowY,
      delay: 0.09,
      spinFrom: 180,
    },
    {
      book: safeBooks.find((b) => b.id === 'b212-kurk-mantolu-madonna') ?? safeBooks[2 % safeBooks.length],
      positionStyle: { top: '43%', left: '2.5%' },
      tiltClass: 'book-3d-right',
      sizeClass: 'h-[136px] w-[96px]',
      parallaxX: parallaxFastX,
      parallaxY: parallaxSlowY,
      delay: 0.14,
      spinFrom: -180,
    },
    {
      book: safeBooks.find((b) => b.id === 'b208-atlas-vazgecti') ?? safeBooks[3 % safeBooks.length],
      positionStyle: { bottom: '5%', left: '3%' },
      tiltClass: 'book-3d-right',
      sizeClass: 'h-[124px] w-[86px]',
      parallaxX: parallaxSlowX,
      parallaxY: parallaxFastY,
      delay: 0.19,
      spinFrom: 180,
    },
    {
      book: safeBooks.find((b) => b.id === 'b229-kucuk-prens') ?? safeBooks[4 % safeBooks.length],
      positionStyle: { bottom: '5%', left: '14%' },
      tiltClass: 'book-3d-right',
      sizeClass: 'h-[138px] w-[98px]',
      parallaxX: parallaxFastX,
      parallaxY: parallaxFastY,
      delay: 0.24,
      spinFrom: -180,
    },
    {
      book: safeBooks.find((b) => b.id === 'b209-hygge') ?? safeBooks[5 % safeBooks.length],
      positionStyle: { top: '4%', right: '13.5%' },
      tiltClass: 'book-3d-left',
      sizeClass: 'h-[130px] w-[92px]',
      parallaxX: parallaxSlowX,
      parallaxY: parallaxFastY,
      delay: 0.06,
      spinFrom: 180,
    },
    {
      book: safeBooks.find((b) => b.id === 'b210-avrupa-kapisi') ?? safeBooks[6 % safeBooks.length],
      positionStyle: { top: '16%', right: '1.5%' },
      tiltClass: 'book-3d-left',
      sizeClass: 'h-[138px] w-[98px]',
      parallaxX: parallaxFastX,
      parallaxY: parallaxFastY,
      delay: 0.11,
      spinFrom: -180,
    },
    {
      book: safeBooks.find((b) => b.id === 'b217-dune-col-gezegeni') ?? safeBooks[7 % safeBooks.length],
      positionStyle: { top: '44%', right: '2.5%' },
      tiltClass: 'book-3d-left',
      sizeClass: 'h-[132px] w-[92px]',
      parallaxX: parallaxSlowX,
      parallaxY: parallaxSlowY,
      delay: 0.16,
      spinFrom: 180,
    },
    {
      book: safeBooks.find((b) => b.id === 'b211-dil-ve-kilic') ?? safeBooks[8 % safeBooks.length],
      positionStyle: { bottom: '5%', right: '3%' },
      tiltClass: 'book-3d-left',
      sizeClass: 'h-[124px] w-[86px]',
      parallaxX: parallaxFastX,
      parallaxY: parallaxSlowY,
      delay: 0.21,
      spinFrom: -180,
    },
    {
      book: safeBooks.find((b) => b.id === 'b237-kozmos') ?? safeBooks[9 % safeBooks.length],
      positionStyle: { bottom: '5%', right: '14%' },
      tiltClass: 'book-3d-left',
      sizeClass: 'h-[136px] w-[96px]',
      parallaxX: parallaxSlowX,
      parallaxY: parallaxFastY,
      delay: 0.26,
      spinFrom: 180,
    },
  ];

  const handleCreateBook = async (input: BookInput) => {
    await createBook(input);
    setIsAddModalOpen(false);
  };

  const handleUpdateBook = async (input: BookInput) => {
    if (!editingBook) return;
    await updateBook(editingBook.id, input);
    setEditingBook(null);
  };

  const handleLendBook = async (borrowerName: string) => {
    if (!lendingBook) return;
    await lendBook(lendingBook.id, borrowerName);
    setLendingBook(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingBook) return;
    await deleteBook(deletingBook.id);
    setDeletingBook(null);
  };

  const sourceList = status === 'ready' ? filteredBooks : SEED_BOOKS;

  const topShowcaseBooks = hasActiveFilters
    ? sourceList
    : sourceList.slice(0, 15);

  const secondaryShowcaseBooks = hasActiveFilters
    ? []
    : sourceList.slice(15, 30);

  const tertiaryShowcaseBooks = hasActiveFilters
    ? []
    : sourceList.slice(30);

  return (
    <AppLayout onQuickAdd={() => setIsAddModalOpen(true)}>
      {/* 1. FULL-BLEED EDITORIAL HERO SECTION WITH 10 3D SPINNING & FLOATING BOOKS */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        aria-label="Kütüphane Vitrin ve Arama"
        className="relative mx-auto flex min-h-[600px] w-full max-w-[1440px] flex-col items-center justify-center overflow-hidden px-6 py-16 sm:min-h-[650px]"
      >
        {/* 10 Perimeter Floating 3D Books entering with a 3D spinning animation */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {floatingBooks.map((item, idx) => (
            <motion.div
              key={item.book.id}
              style={{
                ...item.positionStyle,
                x: item.parallaxX,
                y: item.parallaxY,
              }}
              className="pointer-events-auto absolute z-10"
            >
              <motion.div
                style={{ transformPerspective: 1000 }}
                initial={{
                  opacity: 0,
                  scale: 0.45,
                  rotateY: item.spinFrom,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  y: 0,
                }}
                transition={{
                  duration: 1.15,
                  delay: item.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.button
                  type="button"
                  onClick={() => navigate(`/books/${item.book.id}`)}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4.8 + (idx % 4) * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.12, y: -6 }}
                  aria-label={`${item.book.title} — ${item.book.author}`}
                  title={`${item.book.title} — ${item.book.author}`}
                  className="book-3d-wrapper cursor-pointer focus:outline-none"
                >
                  <div className={`${item.sizeClass} ${item.tiltClass}`}>
                    <EditorialBookCover book={item.book} />
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Center Staggered Line-Mask Editorial Headline + Single Smooth Search Input */}
        <div className="relative z-20 mx-auto max-w-3xl text-center">
          <h1 className="font-editorial text-4xl font-normal leading-[1.04] tracking-tight text-[#111111] sm:text-5xl lg:text-[56px] xl:text-[68px]">
            {HEADLINE_LINES.map((line, idx) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.1 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Center Pill Search Input ("Ne arıyorsun? 🔍") - Fixed height & single entrance so it never jumps twice */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.42,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-10 flex h-11 w-[260px] items-center justify-between rounded-full border border-[#111111] bg-white px-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] focus-within:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            <input
              type="search"
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
              placeholder="Ne arıyorsun?"
              aria-label="Kütüphanede kitap veya yazar ara"
              className="w-full bg-transparent text-xs font-medium text-[#111111] placeholder:text-neutral-500 focus:outline-none"
            />
            {filters.query ? (
              <button
                type="button"
                onClick={() => updateFilter('query', '')}
                aria-label="Aramayı temizle"
                className="ml-1.5 text-neutral-500 hover:text-[#111111] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <Search
                className="ml-2 h-4 w-4 shrink-0 text-[#111111]"
                aria-hidden="true"
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. SECTION DIVIDER & 15 SHOWCASE BOOKS ("Yeni Çıkanlar") */}
      <section
        id="vitrin-baslangic"
        aria-label="Yeni Çıkanlar Vitrini"
        className="mx-auto w-full max-w-7xl px-6 pt-4 pb-20 sm:px-12"
      >
        {/* Animated Diamond Line Divider */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex items-center justify-center gap-7"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 1 }}
            className="relative h-[1px] w-full max-w-[260px] bg-[#111111]"
          >
            <span className="absolute -left-1 -top-[3px] h-1.5 w-1.5 rotate-45 bg-[#111111]" />
          </motion.div>

          <h2 className="font-editorial shrink-0 text-3xl font-normal tracking-tight text-[#111111] sm:text-[38px]">
            {hasActiveFilters
              ? filters.category !== 'all' && !filters.query
                ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} (${topShowcaseBooks.length})`
                : `Arama Sonuçları (${topShowcaseBooks.length})`
              : 'Yeni Çıkanlar'}
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="relative h-[1px] w-full max-w-[260px] bg-[#111111]"
          >
            <span className="absolute -right-1 -top-[3px] h-1.5 w-1.5 rotate-45 bg-[#111111]" />
          </motion.div>
        </motion.div>

        {hasActiveFilters && (
          <div className="mb-8 flex justify-center">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-full border border-[#111111] bg-white px-4 py-1.5 text-xs font-medium text-[#111111] transition-colors hover:bg-[#111111] hover:text-white cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Tüm Kataloğu Göster ({safeBooks.length})</span>
            </button>
          </div>
        )}

        { status === 'error' ? (
          <div className="my-8 mx-auto max-w-md rounded-2xl border border-neutral-200 p-8 text-center">
            <p className="text-sm font-medium text-[#111111]">
              {error || 'Kütüphane yüklenirken bir hata oluştu.'}
            </p>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="mt-4"
              onClick={() => void reloadBooks()}
            >
              Tekrar Dene
            </Button>
          </div>
        ) : topShowcaseBooks.length === 0 ? (
          <EmptyState
            title="Aradığınız kriterlere uygun kitap bulunamadı"
            description="Farklı bir kitap adı, yazar veya kategori aramayı deneyebilir ya da filtreleri sıfırlayabilirsiniz."
            actionLabel="Filtreleri Temizle"
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {topShowcaseBooks.map((book, idx) => (
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
        )}
      </section>

      {/* 3. EDITORIAL GENRE EXPLORER STRIP (Scroll-triggered reveal) */}
      {!hasActiveFilters && (
        <section
          aria-label="Kategoriler ve Türler"
          className="mx-auto w-full max-w-7xl border-t border-neutral-200 px-6 py-20 sm:px-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                KATEGORİ DİZİNİ
              </p>
              <h2 className="font-editorial mt-2 text-4xl font-normal tracking-tight text-[#111111] sm:text-5xl">
                Türlere göre keşfedin
              </h2>
            </div>

            <Link
              to="/turler"
              className="group inline-flex items-center gap-2 text-xs font-medium text-[#111111] hover:opacity-70"
            >
              <span>Tüm Türleri Gör</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((cat, idx) => {
              const count = safeBooks.filter(
                (b) => b.category.toLowerCase() === cat.toLowerCase(),
              ).length;
              return (
                <motion.button
                  key={cat}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => {
                    updateFilter('category', cat);
                    document
                      .getElementById('vitrin-baslangic')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group flex items-center gap-3 rounded-full border border-neutral-300 bg-white px-6 py-3 text-xs font-medium capitalize text-[#111111] transition-all duration-300 hover:border-[#111111] hover:bg-[#111111] hover:text-white cursor-pointer"
                >
                  <span>{cat}</span>
                  <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-[10px] text-neutral-600 transition-colors group-hover:border-white/30 group-hover:text-white">
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. SECONDARY SHOWCASE ROW ("Kültür, Felsefe ve Klasikler" - 15 more books) */}
      {secondaryShowcaseBooks.length > 0 && (
        <section
          aria-label="Editörün Seçkisi"
          className="mx-auto w-full max-w-7xl border-t border-neutral-200 px-6 py-20 sm:px-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                ÖZEL KOLEKSİYON
              </p>
              <h2 className="font-editorial mt-2 text-4xl font-normal tracking-tight text-[#111111] sm:text-5xl">
                Kültür, Felsefe ve Klasikler
              </h2>
            </div>

            <Link
              to="/koleksiyonlar"
              className="group inline-flex items-center gap-2 text-xs font-medium text-[#111111] hover:opacity-70"
            >
              <span>Koleksiyonları İncele</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {secondaryShowcaseBooks.map((book, idx) => (
              <BookCard
                key={book.id}
                book={book}
                index={idx + 1}
                onEdit={(b) => setEditingBook(b)}
                onDelete={(b) => setDeletingBook(b)}
                onLend={(b) => setLendingBook(b)}
                onReturn={(b) => void returnBook(b.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. TERTIARY SHOWCASE ROW ("Bilim, Psikoloji ve Çağdaş Seçki" - 20+ more books) */}
      {tertiaryShowcaseBooks.length > 0 && (
        <section
          aria-label="Bilim ve Çağdaş Kütüphane"
          className="mx-auto w-full max-w-7xl border-t border-neutral-200 px-6 py-20 sm:px-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                GENİŞ ARŞİV SEÇKİSİ
              </p>
              <h2 className="font-editorial mt-2 text-4xl font-normal tracking-tight text-[#111111] sm:text-5xl">
                Bilim, Psikoloji ve Modern Dünya
              </h2>
            </div>

            <Link
              to="/populer"
              className="group inline-flex items-center gap-2 text-xs font-medium text-[#111111] hover:opacity-70"
            >
              <span>Popüler Sıralamayı Gör</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {tertiaryShowcaseBooks.map((book, idx) => (
              <BookCard
                key={book.id}
                book={book}
                index={idx + 2}
                onEdit={(b) => setEditingBook(b)}
                onDelete={(b) => setDeletingBook(b)}
                onLend={(b) => setLendingBook(b)}
                onReturn={(b) => void returnBook(b.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 6. MINIMALIST LIVE STATS & LENDING OVERVIEW BANNER */}
      <section
        aria-label="Kütüphane Özeti"
        className="mx-auto w-full max-w-7xl border-t border-neutral-200 px-6 pt-20 pb-8 sm:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-8 border border-neutral-200 rounded-[28px] bg-white p-8 sm:grid-cols-4 sm:p-12"
        >
          <div className="flex flex-col justify-between border-b border-neutral-200 pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              TOPLAM KATALOG
            </span>
            <p className="font-editorial mt-4 text-6xl font-normal text-[#111111]">
              {books.length > 0 ? stats.total : SEED_BOOKS.length}
            </p>
            <span className="mt-2 text-xs text-neutral-500">
              Kayıtlı dijital ve basılı eser
            </span>
          </div>

          <div className="flex flex-col justify-between border-b border-neutral-200 pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              RAFTA MEVCUT
            </span>
            <p className="font-editorial mt-4 text-6xl font-normal text-[#111111]">
              {books.length > 0
                ? stats.available
                : SEED_BOOKS.filter((b) => b.status === 'available').length}
            </p>
            <span className="mt-2 text-xs text-neutral-500">
              Hemen okunabilir ve ödünç verilebilir
            </span>
          </div>

          <div className="flex flex-col justify-between border-b border-neutral-200 pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              ÖDÜNÇ VERİLEN
            </span>
            <p className="font-editorial mt-4 text-6xl font-normal text-[#111111]">
              {books.length > 0
                ? stats.borrowed
                : SEED_BOOKS.filter((b) => b.status === 'borrowed').length}
            </p>
            <span className="mt-2 text-xs text-neutral-500">
              Okuyucularda bulunan eserler
            </span>
          </div>

          <div className="flex flex-col justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              HIZLI İŞLEM
            </span>
            <p className="font-editorial mt-3 text-2xl font-normal leading-snug text-[#111111]">
              Kütüphanenize yeni bir kitap ekleyin.
            </p>
            <div className="mt-4">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Yeni Kitap Ekle</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Add Book Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Yeni Kitap Ekle"
        subtitle="Open Library API ile otomatik doldurun veya eser bilgilerini girin."
      >
        <BookForm
          onSubmit={handleCreateBook}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Book Modal */}
      <Modal
        isOpen={Boolean(editingBook)}
        onClose={() => setEditingBook(null)}
        title="Kitap Bilgilerini Düzenle"
        subtitle={editingBook ? `"${editingBook.title}" güncelleniyor` : undefined}
      >
        {editingBook && (
          <BookForm
            initialValues={editingBook}
            onSubmit={handleUpdateBook}
            onCancel={() => setEditingBook(null)}
          />
        )}
      </Modal>

      {/* Lend Book Modal */}
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

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingBook)}
        title="Kitabı Kütüphaneden Sil"
        confirmLabel="Kitabı Sil"
        cancelLabel="Vazgeç"
        message={
          deletingBook
            ? `"${deletingBook.title}" (${deletingBook.author}) adlı eseri kütüphanenizden kalıcı olarak silmek istediğinize emin misiniz?`
            : ''
        }
        onConfirm={() => void handleConfirmDelete()}
        onCancel={() => setDeletingBook(null)}
      />
    </AppLayout>
  );
}
export default LibraryPage;
