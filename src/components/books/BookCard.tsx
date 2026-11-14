import { motion } from 'framer-motion';
import { Edit2, Handshake, RotateCcw, Trash2 } from 'lucide-react';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import type { Book } from '../../interfaces/book';
import { EditorialBookCover } from './EditorialBookCover';

export interface BookCardProps {
  book: Book;
  index?: number;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
  onLend?: (book: Book) => void;
  onReturn?: (book: Book) => void;
}

export const BookCard = memo(function BookCard({
  book,
  index = 0,
  onEdit,
  onDelete,
  onLend,
  onReturn,
}: BookCardProps) {
  const navigate = useNavigate();

  // Determine editorial badge text ("TOP 10" or "BookNest Seçimi")
  const badgeText =
    book.status === 'borrowed'
      ? `Ödünç: ${book.borrowedBy}`
      : index % 5 === 0 || index % 5 === 3
        ? 'TOP 10'
        : index % 5 === 2
          ? 'BookNest Seçimi'
          : null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 34, rotateY: -38 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.75,
        delay: (index % 5) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col items-center justify-between pt-8 pb-3"
    >
      {/* Top-Left Pill Badge ("TOP 10" or "BookNest Seçimi") */}
      {badgeText && (
        <span
          className={`absolute left-1 top-0 z-20 inline-flex items-center rounded-full border border-[#111111] px-2.5 py-0.5 text-[9.5px] font-medium tracking-tight ${
            book.status === 'borrowed'
              ? 'bg-[#111111] text-white'
              : 'bg-white text-[#111111]'
          }`}
        >
          {badgeText}
        </span>
      )}

      {/* Hover Quick Actions (Lend/Return, Edit, Delete) */}
      <div className="absolute right-1 top-0 z-20 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
        {book.status === 'available' && onLend && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLend(book);
            }}
            title="Ödünç Ver"
            aria-label={`${book.title} kitabını ödünç ver`}
            className="rounded-full border border-neutral-300 bg-white p-1.5 text-[#111111] transition-colors hover:border-[#111111] hover:bg-[#111111] hover:text-white cursor-pointer"
          >
            <Handshake className="h-3 w-3" />
          </button>
        )}
        {book.status === 'borrowed' && onReturn && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReturn(book);
            }}
            title="İade Al"
            aria-label={`${book.title} kitabını iade al`}
            className="rounded-full bg-[#111111] p-1.5 text-white transition-colors hover:bg-neutral-700 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        )}
        {onEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(book);
            }}
            title="Düzenle"
            aria-label={`${book.title} kitabını düzenle`}
            className="rounded-full border border-neutral-300 bg-white p-1.5 text-[#111111] transition-colors hover:border-[#111111] hover:bg-[#111111] hover:text-white cursor-pointer"
          >
            <Edit2 className="h-3 w-3" />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book);
            }}
            title="Sil"
            aria-label={`${book.title} kitabını sil`}
            className="rounded-full border border-neutral-300 bg-white p-1.5 text-[#111111] transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Pure 3D Angled Book Cover without any grey box background */}
      <button
        type="button"
        onClick={() => navigate(`/books/${book.id}`)}
        aria-label={`${book.title} detaylarını görüntüle`}
        className="book-3d-wrapper my-3 flex items-center justify-center focus:outline-none cursor-pointer"
      >
        <div className="book-3d-card h-[188px] w-[132px] transition-transform duration-500 ease-out group-hover:scale-105">
          <EditorialBookCover book={book} />
        </div>
      </button>

      {/* Clean Editorial Caption Underneath */}
      <div
        onClick={() => navigate(`/books/${book.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') navigate(`/books/${book.id}`);
        }}
        className="mt-3 w-full text-center cursor-pointer"
      >
        <h3 className="truncate text-xs font-semibold text-[#111111]">
          {book.title}
        </h3>
        <p className="mt-0.5 truncate text-[11px] text-neutral-500">
          {book.author}
        </p>
      </div>
    </motion.article>
  );
});
