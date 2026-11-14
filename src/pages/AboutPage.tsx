import { motion } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { StatsCards } from '../components/books/StatsCards';
import { useBooks } from '../hooks/useBooks';

export function AboutPage() {
  const { books } = useBooks();

  return (
    <AppLayout>
      <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-neutral-200 pb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
            BOOKNEST HAKKINDA & MİMARİ
          </p>
          <h1 className="font-editorial mt-3 text-5xl font-normal leading-[1.08] tracking-tight text-[#111111] sm:text-6xl">
            Minimalist tasarım,
            <br />
            güçlü kütüphane mimarisi.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-600">
            BookNest Web, kişisel kitap koleksiyonlarını ve küçük kütüphaneleri
            yönetmek için geliştirilmiş modern bir Single Page Application (SPA)
            projesidir. Eser ekleme, düzenleme, ödünç verme (lending) takibi ve
            Open Library API entegrasyonunu editoryal bir vitrin deneyimiyle sunar.
          </p>
        </motion.div>

        <div className="mt-14">
          <h2 className="font-editorial mb-6 text-3xl font-normal text-[#111111]">
            Canlı Kütüphane İstatistikleri
          </h2>
          <StatsCards books={books} />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-neutral-200 pt-14 sm:grid-cols-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
              01 · VERİ KATMANI
            </span>
            <h3 className="font-editorial mt-2 text-2xl text-[#111111]">
              Repository Pattern
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              Tüm veri erişimi <code>BookRepository</code> arayüzü arkasında
              soyutlanmıştır. Şu an <code>LocalStorage</code> üzerinde çalışır ve
              tek satırla <code>booknest-api</code> HTTP servisine bağlanabilir.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
              02 · İŞ KURALLARI
            </span>
            <h3 className="font-editorial mt-2 text-2xl text-[#111111]">
              Ödünç & İade Akışı
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              Bir kitap ödünç verildiğinde okuyucu bilgisi zorunludur ve kitap
              iade edilene kadar tekrar ödünç verilemez. İade alındığında durum
              otomatik olarak sıfırlanır.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
              03 · ENTEGRASYON
            </span>
            <h3 className="font-editorial mt-2 text-2xl text-[#111111]">
              Open Library API
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              Yeni kitap eklerken dünya genelindeki milyonlarca eseri ücretsiz
              sorgulayabilir, kapak görseli ve yayın bilgilerini otomatik
              doldurabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
export default AboutPage;
