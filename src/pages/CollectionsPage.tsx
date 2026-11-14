import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { EditorialBookCover } from '../components/books/EditorialBookCover';
import { AppLayout } from '../components/layout/AppLayout';
import { useBooks } from '../hooks/useBooks';

export function CollectionsPage() {
  const { books } = useBooks();

  const collections = [
    {
      id: 'dusunce-ve-felsefe',
      tag: 'SEÇKİ 01',
      title: 'Modern İnsanın Anlam Arayışı',
      description:
        'Psikoloji, felsefe ve varoluş üzerine zihin açıcı temel eserlerden oluşan küratöryel seçki.',
      items: books.slice(0, 4),
    },
    {
      id: 'cagdas-edebiyat',
      tag: 'SEÇKİ 02',
      title: 'Çağdaş Dünya Edebiyatı & Roman',
      description:
        'Farklı coğrafyalardan güçlü anlatılar, unutulmaz karakterler ve modern klasikler.',
      items: books.slice(4, 8),
    },
    {
      id: 'tarih-ve-kultur',
      tag: 'SEÇKİ 03',
      title: 'Kültür, Dil ve Tarih Okumaları',
      description:
        'Toplumların hafızasını, dilin evrimini ve tarihin kırılma noktalarını inceleyen başucu kitapları.',
      items: books.slice(7, 11),
    },
  ];

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
            KÜRATÖRYEL SEÇKİLER
          </p>
          <h1 className="font-editorial mt-3 text-5xl font-normal tracking-tight text-[#111111] sm:text-6xl">
            Özel Koleksiyonlar
          </h1>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-neutral-500">
            Tematik okuma listeleri ve BookNest editörlerinin bir araya getirdiği
            özel kitap koleksiyonları.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col gap-16">
          {collections.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid grid-cols-1 gap-10 border-b border-neutral-200 pb-14 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-5">
                <span className="inline-block rounded-full border border-[#111111] px-3 py-0.5 text-[10px] font-medium">
                  {col.tag}
                </span>
                <h2 className="font-editorial mt-4 text-4xl font-normal leading-tight text-[#111111]">
                  {col.title}
                </h2>
                <p className="mt-3 text-xs leading-relaxed text-neutral-500">
                  {col.description}
                </p>
                <Link
                  to="/turler"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#111111] hover:opacity-70"
                >
                  <span>Koleksiyondaki Tüm Eserler</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-7">
                {col.items.map((book, bIdx) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.id}`}
                    className="group flex flex-col items-center p-2 transition-transform duration-300 hover:-translate-y-2"
                  >
                    <motion.div
                      initial={{ opacity: 0, rotateY: -90 }}
                      whileInView={{ opacity: 1, rotateY: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.75,
                        delay: bIdx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="book-3d-wrapper my-2"
                    >
                      <div className="book-3d-card h-36 w-25">
                        <EditorialBookCover book={book} />
                      </div>
                    </motion.div>
                    <p className="mt-3 w-full truncate text-center text-[11px] font-semibold text-[#111111]">
                      {book.title}
                    </p>
                    <p className="w-full truncate text-center text-[10px] text-neutral-500">
                      {book.author}
                    </p>
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
export default CollectionsPage;
