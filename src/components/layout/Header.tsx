import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

interface HeaderProps {
  onQuickAdd?: () => void;
  onOpenArchive?: () => void;
}

const LEFT_LINKS = [
  { to: '/turler', label: 'Türler' },
  { to: '/yazarlar', label: 'Yazarlar' },
  { to: '/', label: 'Yeni Çıkanlar' },
];

const RIGHT_LINKS = [
  { to: '/populer', label: 'Popüler' },
  { to: '/koleksiyonlar', label: 'Koleksiyonlar' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
];

export function Header({ onQuickAdd }: HeaderProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md">
      <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-7 sm:px-12">
        {/* Desktop Navigation: True 50% Mathematical Centering for BookNest Logo */}
        <nav
          aria-label="Ana menü"
          className="hidden lg:grid w-full grid-cols-[1fr_auto_1fr] items-center"
        >
          {/* Left 3 Nav Items (Right-aligned toward center logo) */}
          <div className="flex items-center justify-end gap-11 pr-14">
            {LEFT_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative py-1 text-[13.5px] font-normal tracking-wide text-[#111111] transition-opacity hover:opacity-70"
              >
                <span>{item.label}</span>
                {isActive(item.to) && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-x-0 -bottom-0.5 h-[1px] bg-[#111111]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Center Brand Logo (Locked at exact 50% horizontal center of the page) */}
          <Link
            to="/"
            className="flex shrink-0 items-center justify-center gap-1.5 focus:outline-none group"
          >
            <span className="font-editorial text-[32px] font-medium tracking-tight text-[#111111]">
              BookNest
            </span>
            <span
              className="inline-flex items-end gap-[2.5px] pl-0.5 pt-1 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              <span className="h-[18px] w-[3.5px] rounded-[0.5px] bg-[#1D4ED8]" />
              <span className="h-[18px] w-[3.5px] rounded-[0.5px] bg-[#FACC15]" />
              <span className="h-[18px] w-[3.5px] -rotate-12 rounded-[0.5px] bg-[#111111] origin-bottom-left" />
            </span>
          </Link>

          {/* Right 3 Nav Items (Left-aligned from center logo) */}
          <div className="flex items-center justify-start gap-11 pl-14">
            {RIGHT_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative py-1 text-[13.5px] font-normal tracking-wide text-[#111111] transition-opacity hover:opacity-70"
              >
                <span>{item.label}</span>
                {isActive(item.to) && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-x-0 -bottom-0.5 h-[1px] bg-[#111111]"
                  />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Pinned Far-Right Quick Action (Out of flow so it never shifts BookNest logo) */}
        {onQuickAdd && (
          <div className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 items-center">
            <button
              type="button"
              onClick={onQuickAdd}
              className="rounded-full border border-neutral-300 bg-white px-3.5 py-1 text-[11.5px] font-medium text-[#111111] transition-all hover:border-[#111111] hover:bg-[#111111] hover:text-white cursor-pointer"
            >
              + Kitap Ekle
            </button>
          </div>
        )}

        {/* Mobile Brand + Hamburger */}
        <Link to="/" className="flex items-center gap-1 lg:hidden">
          <span className="font-editorial text-2xl font-medium tracking-tight text-[#111111]">
            BookNest
          </span>
          <span
            className="inline-flex items-end gap-[2px] pl-0.5 pt-0.5"
            aria-hidden="true"
          >
            <span className="h-4 w-[3px] bg-[#1D4ED8]" />
            <span className="h-4 w-[3px] bg-[#FACC15]" />
            <span className="h-4 w-[3px] -rotate-12 bg-[#111111] origin-bottom-left" />
          </span>
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          {onQuickAdd && (
            <button
              type="button"
              onClick={onQuickAdd}
              className="rounded-full border border-neutral-900 px-3 py-1 text-xs font-medium text-[#111111]"
            >
              + Ekle
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Menüyü aç/kapat"
            className="p-2 text-[#111111]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-neutral-200 bg-white px-6 py-5 lg:hidden"
        >
          <div className="flex flex-col gap-3">
            {[...LEFT_LINKS, ...RIGHT_LINKS].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm ${
                  isActive(item.to)
                    ? 'font-semibold text-[#111111]'
                    : 'text-neutral-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
