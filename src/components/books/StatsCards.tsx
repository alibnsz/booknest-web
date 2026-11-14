import type { Book } from '../../interfaces/book';
import { computeLibraryStats } from '../../utils/filterAndSort';

interface StatsCardsProps {
  books: Book[];
}

export function StatsCards({ books }: StatsCardsProps) {
  const stats = computeLibraryStats(books);
  const borrowedBooks = books.filter((b) => b.status === 'borrowed');

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4 border-b border-neutral-200 pb-6">
        <div className="flex flex-col">
          <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-400">
            Toplam Eser
          </span>
          <span className="font-editorial mt-1 text-5xl font-normal text-[#111111]">
            {stats.total}
          </span>
        </div>

        <div className="flex flex-col border-l border-neutral-200 pl-4">
          <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-400">
            Rafta Mevcut
          </span>
          <span className="font-editorial mt-1 text-5xl font-normal text-[#111111]">
            {stats.available}
          </span>
        </div>

        <div className="flex flex-col border-l border-neutral-200 pl-4">
          <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-400">
            Ödünç Verilen
          </span>
          <span className="font-editorial mt-1 text-5xl font-normal text-[#111111]">
            {stats.borrowed}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#F5F5F3] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
            Katalog Sayfa Toplamı
          </p>
          <p className="font-editorial mt-1 text-3xl text-[#111111]">
            {stats.totalPages.toLocaleString('tr-TR')} sayfa
          </p>
        </div>

        <div className="rounded-2xl bg-[#F5F5F3] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
            Toplam Okuma Süresi
          </p>
          <p className="font-editorial mt-1 text-3xl text-[#111111]">
            {stats.totalReadHours} saat
          </p>
        </div>
      </div>

      {borrowedBooks.length > 0 && (
        <div className="border-t border-neutral-200 pt-5">
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
            Ödünçteki Kitaplar ({borrowedBooks.length})
          </h4>
          <ul className="divide-y divide-neutral-100">
            {borrowedBooks.map((book) => (
              <li
                key={book.id}
                className="flex items-center justify-between py-2.5 text-xs text-[#111111]"
              >
                <span className="font-medium">{book.title}</span>
                <span className="rounded-full border border-neutral-900 px-3 py-0.5 text-[10px] font-semibold">
                  {book.borrowedBy}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
