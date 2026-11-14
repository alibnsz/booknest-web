import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router';
import { EditorialBookCover } from '../components/books/EditorialBookCover';
import { AppLayout } from '../components/layout/AppLayout';
import { useBooks } from '../hooks/useBooks';
import type { Book } from '../interfaces/book';

export function AuthorsPage() {
  const { books } = useBooks();

  const authorsList = useMemo(() => {
    const map = new Map<string, Book[]>();
    for (const book of books) {
      const existing = map.get(book.author) ?? [];
      existing.push(book);
      map.set(book.author, existing);
    }
    return Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0], 'tr'),
    );
  }, [books]);

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
            YAZARLAR ENDEKSİ
          </p>
          <h1 className="font-editorial mt-3 text-5xl font-normal tracking-tight text-[#111111] sm:text-6xl">
            Yazarlar ve Eserleri
          </h1>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-neutral-500">
            Kütüphanemizde yer alan {authorsList.length} yazarın alfabetik
            dizini ve kayıtlı eserleri.
          </p>
        </motion.div>

        <div className="divide-y divide-neutral-200">
          {authorsList.map(([authorName, authorBooks], idx) => (
            <motion.div
              key={authorName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: (idx % 6) * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-between gap-6 py-9 lg:flex-row lg:items-center"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-editorial text-2xl text-neutral-400">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-editorial text-3xl font-normal text-[#111111] sm:text-4xl">
                    {authorName}
                  </h2>
                  <p className="mt-1 text-xs text-neutral-500">
                    {authorBooks.length} kayıtlı eser ·{' '}
                    {Array.from(new Set(authorBooks.map((b) => b.category))).join(
                      ', ',
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {authorBooks.map((book) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.id}`}
                    className="group flex items-center gap-4 rounded-xl border border-transparent p-2 pr-4 transition-all hover:border-neutral-200"
                  >
                    <div className="h-16 w-11 shrink-0 overflow-hidden shadow-[4px_6px_14px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:-translate-y-1">
                      <EditorialBookCover book={book} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#111111] group-hover:underline">
                        {book.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-neutral-500">
                        {book.year} · {book.pages ?? 320} sayfa
                      </p>
                    </div>
                    <ArrowUpRight className="ml-1 h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#111111]" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
export default AuthorsPage;
