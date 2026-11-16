import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { EditorialBookCover } from '../components/books/EditorialBookCover';
import { AppLayout } from '../components/layout/AppLayout';
import { SEED_BOOKS } from '../data/seedBooks';
import { useBooks } from '../hooks/useBooks';

export function CollectionsPage() {
  const { books } = useBooks();
  const catalog = books.length > 0 ? books : SEED_BOOKS;

  const pickByCategories = (cats: string[], count = 5) =>
    catalog
      .filter((b) => cats.includes(b.category.toLowerCase()))
      .slice(0, count);

  const collections = [
    {
      id: 'turk-dunya-roman',
      tag: 'SEÇKİ 01',
      title: 'Türk ve Dünya Edebiyatından Romanlar',
      description:
        'Anadolu’dan İstanbul’a, Kabil’den Petersburg’a uzanan ölümsüz karakterler ve güçlü anlatılar.',
      items: pickByCategories(['roman'], 5),
    },
    {
      id: 'klasikler-kanon',
      tag: 'SEÇKİ 02',
      title: 'Zamansız Klasikler ve Başyapıtlar',
      description:
        'Her dönemde yeniden okunan evrensel edebiyat klasikleri ve derin insan portreleri.',
      items: pickByCategories(['klasik'], 5),
    },
    {
      id: 'felsefe-psikoloji',
      tag: 'SEÇKİ 03',
      title: 'Modern İnsanın Anlam ve Bilinç Arayışı',
      description:
        'Felsefe, varoluş, bilişsel psikoloji ve içsel denge üzerine zihin açıcı temel eserler.',
      items: pickByCategories(['felsefe', 'psikoloji'], 5),
    },
    {
      id: 'bilim-evren',
      tag: 'SEÇKİ 04',
      title: 'Bilim, Kozmos ve Gelecek Tasarımı',
      description:
        'Kara deliklerden evrenin doğasına ve bilimkurgunun öngörülerine uzanan keşif yolculuğu.',
      items: pickByCategories(['bilim'], 5),
    },
    {
      id: 'tarih-yazilim-yasam',
      tag: 'SEÇKİ 05',
      title: 'Tarih, Dilbilim ve Yazılım Zanaatkârlığı',
      description:
        'İnsanlık tarihinden mühendislik ilkelerine kadar disiplinler arası entelektüel bir seçki.',
      items: pickByCategories(['tarih', 'yazılım', 'dilbilim', 'yaşam'], 5),
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
            Tematik okuma listeleri ve BookNest editörlerinin {catalog.length}{' '}
            eser arasından derlediği özel kitap koleksiyonları.
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
                delay: (idx % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid grid-cols-1 gap-10 border-b border-neutral-200 pb-14 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-4">
                <span className="inline-block rounded-full border border-[#111111] px-3 py-0.5 text-[10px] font-medium">
                  {col.tag}
                </span>
                <h2 className="font-editorial mt-4 text-3xl font-normal leading-tight text-[#111111] sm:text-4xl">
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

              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 lg:col-span-8">
                {col.items.map((book, bIdx) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.id}`}
                    className="group flex flex-col items-center p-1 transition-transform duration-300 hover:-translate-y-2"
                  >
                    <motion.div
                      initial={{ opacity: 0, rotateY: -90 }}
                      whileInView={{ opacity: 1, rotateY: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.75,
                        delay: bIdx * 0.07,
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
