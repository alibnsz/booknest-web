import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useBooks } from '../../hooks/useBooks';

interface FooterProps {
  onOpenArchive?: () => void;
  onQuickAdd?: () => void;
}

export function Footer({ onOpenArchive, onQuickAdd }: FooterProps) {
  const { books } = useBooks();
  const borrowedCount = books.filter((b) => b.status === 'borrowed').length;

  return (
    <footer className="mt-28 w-full border-t border-neutral-200 bg-[#FAFAFA] text-[#111111]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-12">
        {/* Top Editorial Callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start justify-between gap-10 border-b border-neutral-200 pb-16 lg:flex-row lg:items-end"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
              DİJİTAL KÜTÜPHANE & ARŞİV SİSTEMİ
            </p>
            <h2 className="font-editorial mt-3 text-4xl font-normal leading-[1.08] tracking-tight sm:text-6xl">
              Okuma kültürünü
              <br />
              modern arşivle buluşturun.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenArchive && (
              <button
                type="button"
                onClick={onOpenArchive}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-900 bg-white px-6 py-3 text-xs font-medium tracking-wide text-[#111111] transition-colors hover:bg-[#111111] hover:text-white cursor-pointer"
              >
                <span>Arşivde Ara ({books.length})</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            )}
            {onQuickAdd && (
              <button
                type="button"
                onClick={onQuickAdd}
                className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-xs font-medium tracking-wide text-white transition-colors hover:bg-neutral-800 cursor-pointer"
              >
                <span>+ Yeni Eser Ekle</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* 4-Column Sitemap & Live Metrics */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="font-editorial text-2xl font-medium tracking-tight text-[#111111]">
                BookNest
              </span>
              <span className="inline-flex items-end gap-[2px] pl-0.5 pt-0.5" aria-hidden="true">
                <span className="h-4 w-[3px] bg-[#1D4ED8]" />
                <span className="h-4 w-[3px] bg-[#FACC15]" />
                <span className="h-4 w-[3px] -rotate-12 bg-[#111111] origin-bottom-left" />
              </span>
            </Link>
            <p className="max-w-xs text-xs leading-relaxed text-neutral-500">
              Türkçe dijital kitap ve kişisel kütüphane yönetimi. Tüm verileriniz
              tarayıcınızda güvenli LocalStorage mimarisiyle saklanır.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Keşfet
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs text-neutral-700">
              <li>
                <Link to="/" className="hover:text-[#111111] hover:underline">
                  Yeni Çıkanlar
                </Link>
              </li>
              <li>
                <Link to="/turler" className="hover:text-[#111111] hover:underline">
                  Türler & Kategoriler
                </Link>
              </li>
              <li>
                <Link to="/yazarlar" className="hover:text-[#111111] hover:underline">
                  Yazarlar Dizini
                </Link>
              </li>
              <li>
                <Link to="/populer" className="hover:text-[#111111] hover:underline">
                  Popüler & TOP 10
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Koleksiyon & Kurumsal
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs text-neutral-700">
              <li>
                <Link to="/koleksiyonlar" className="hover:text-[#111111] hover:underline">
                  Özel Seçkiler
                </Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="hover:text-[#111111] hover:underline">
                  Hakkımızda & Mimari
                </Link>
              </li>
              <li>
                <a
                  href="https://openlibrary.org"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#111111] hover:underline"
                >
                  <span>Open Library API</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Canlı Katalog Durumu
            </h3>
            <div className="mt-4 flex flex-col gap-2 text-xs text-neutral-600">
              <div className="flex justify-between border-b border-neutral-200/70 pb-2">
                <span>Kayıtlı Eser</span>
                <span className="font-semibold text-[#111111]">{books.length} kitap</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200/70 pb-2">
                <span>Rafta Mevcut</span>
                <span className="font-semibold text-[#111111]">
                  {books.length - borrowedCount} kitap
                </span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Ödünç Verilen</span>
                <span className="font-semibold text-[#111111]">{borrowedCount} kitap</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 text-[11px] text-neutral-400 sm:flex-row">
          <span>© {new Date().getFullYear()} BookNest Web. Tüm hakları saklıdır.</span>
          <span>Mehmet Ali Bunsuz · Bootcamp Project</span>
        </div>
      </div>
    </footer>
  );
}
