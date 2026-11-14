import { Search, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { BOOK_CATEGORIES } from '../../constants/book.constants';
import type {
  Book,
  BookInput,
  BookStatus,
  BookValidationErrors,
} from '../../interfaces/book';
import {
  searchOpenLibraryBooks,
  type OpenLibraryCandidate,
} from '../../services/openLibrary.service';
import { validateBookInput } from '../../utils/validators';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export interface BookFormProps {
  initialValues?: Book;
  onSubmit: (input: BookInput) => Promise<void> | void;
  onCancel: () => void;
}

export function BookForm({ initialValues, onSubmit, onCancel }: BookFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [author, setAuthor] = useState(initialValues?.author ?? '');
  const [category, setCategory] = useState(initialValues?.category ?? 'roman');
  const [year, setYear] = useState<string>(
    initialValues?.year !== undefined
      ? String(initialValues.year)
      : String(new Date().getFullYear()),
  );
  const [status, setStatus] = useState<BookStatus>(
    initialValues?.status ?? 'available',
  );
  const [borrowedBy, setBorrowedBy] = useState(initialValues?.borrowedBy ?? '');
  const [coverUrl, setCoverUrl] = useState(initialValues?.coverUrl ?? '');
  const [pages, setPages] = useState<string>(
    initialValues?.pages ? String(initialValues.pages) : '320',
  );
  const [blurb, setBlurb] = useState(initialValues?.blurb ?? '');
  const [notes, setNotes] = useState(initialValues?.notes ?? '');

  const [errors, setErrors] = useState<BookValidationErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [apiQuery, setApiQuery] = useState('');
  const [apiResults, setApiResults] = useState<OpenLibraryCandidate[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);

  useEffect(() => {
    const trimmed = apiQuery.trim();
    if (trimmed.length < 2) {
      setApiResults([]);
      setIsSearchingApi(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsSearchingApi(true);
      try {
        const results = await searchOpenLibraryBooks(trimmed, controller.signal);
        setApiResults(results);
      } catch {
        // Ignore network/abort errors quietly
      } finally {
        setIsSearchingApi(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [apiQuery]);

  const applyCandidate = (candidate: OpenLibraryCandidate) => {
    setTitle(candidate.title);
    setAuthor(candidate.author);
    setYear(String(candidate.year));
    setCategory(candidate.category);
    if (candidate.coverUrl) setCoverUrl(candidate.coverUrl);
    if (candidate.pages) setPages(String(candidate.pages));
    if (candidate.blurb) setBlurb(candidate.blurb);
    setApiQuery('');
    setApiResults([]);
    if (hasSubmitted) {
      const nextInput = buildBookInput({
        title: candidate.title,
        author: candidate.author,
        category: candidate.category,
        year: String(candidate.year),
      });
      setErrors(validateBookInput(nextInput).errors);
    }
  };

  function buildBookInput(overrides?: Partial<Record<string, string>>): BookInput {
    const rawYear = Number(overrides?.year ?? year);
    const parsedPages = Number(pages);
    const currentStatus = (overrides?.status as BookStatus) ?? status;

    return {
      title: overrides?.title ?? title,
      author: overrides?.author ?? author,
      category: overrides?.category ?? category,
      year: Number.isNaN(rawYear) ? -1 : rawYear,
      status: currentStatus,
      borrowedBy: currentStatus === 'borrowed' ? borrowedBy : null,
      coverUrl: coverUrl.trim() || undefined,
      pages: Number.isInteger(parsedPages) && parsedPages > 0 ? parsedPages : 320,
      blurb: blurb.trim() || undefined,
      notes: notes.trim() || undefined,
      readCount: initialValues?.readCount ?? 1,
      readHours: initialValues?.readHours ?? 20,
      lastReadDate: initialValues?.lastReadDate,
      spineColor: initialValues?.spineColor,
      spineTextColor: initialValues?.spineTextColor,
      spineAccentColor: initialValues?.spineAccentColor,
    };
  }

  const revalidateIfNeeded = (overrides?: Partial<Record<string, string>>) => {
    if (!hasSubmitted) return;
    const validation = validateBookInput(buildBookInput(overrides));
    setErrors(validation.errors);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setHasSubmitted(true);

    const payload = buildBookInput();
    const validation = validateBookInput(payload);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {!initialValues && (
        <div className="relative flex flex-col gap-1.5 pb-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="open-library-search"
              className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600"
            >
              Hızlı Katalog Araması (Open Library)
            </label>
            <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">
              Otomatik Doldur
            </span>
          </div>
          <div className="relative flex items-center">
            <input
              id="open-library-search"
              type="search"
              value={apiQuery}
              onChange={(e) => setApiQuery(e.target.value)}
              placeholder="Eser veya yazar adı ile arayın (örn: Dune, Sabahattin Ali)..."
              aria-label="Open Library katalog araması"
              className="w-full border-b border-neutral-300 bg-transparent px-1 py-2.5 pr-8 text-xs text-[#111111] placeholder:text-neutral-400 transition-colors focus:border-[#111111] focus:outline-none"
            />
            {apiQuery ? (
              <button
                type="button"
                onClick={() => {
                  setApiQuery('');
                  setApiResults([]);
                }}
                aria-label="Aramayı temizle"
                className="absolute right-1 text-neutral-400 hover:text-[#111111] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <Search className="pointer-events-none absolute right-1 h-3.5 w-3.5 text-neutral-400" />
            )}
          </div>
          {isSearchingApi && (
            <p className="mt-1 text-[11px] text-neutral-400">
              Open Library kataloğu taranıyor...
            </p>
          )}
          {apiResults.length > 0 && (
            <ul className="mt-1 max-h-44 overflow-y-auto divide-y divide-neutral-100 border border-neutral-200 bg-white shadow-[0_14px_34px_rgba(0,0,0,0.08)]">
              {apiResults.map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => applyCandidate(item)}
                    className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-neutral-50 cursor-pointer"
                  >
                    {item.coverUrl ? (
                      <img
                        src={item.coverUrl}
                        alt=""
                        className="h-9 w-6 shrink-0 object-cover shadow-xs"
                      />
                    ) : (
                      <div className="h-9 w-6 shrink-0 border border-neutral-200 bg-neutral-50" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-[#111111]">
                        {item.title}
                      </p>
                      <p className="truncate text-[11px] text-neutral-500">
                        {item.author} · {item.year}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#111111] underline underline-offset-4">
                      Doldur
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Kitap Adı"
          placeholder="Örn: Sevme Sanatı"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            revalidateIfNeeded({ title: e.target.value });
          }}
          error={errors.title}
        />

        <Input
          label="Yazar"
          placeholder="Örn: Erich Fromm"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
            revalidateIfNeeded({ author: e.target.value });
          }}
          error={errors.author}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Input
          label="Tür"
          list="book-category-suggestions"
          placeholder="Örn: roman"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            revalidateIfNeeded({ category: e.target.value });
          }}
          error={errors.category}
        />
        <datalist id="book-category-suggestions">
          {BOOK_CATEGORIES.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>

        <Input
          label="Basım Yılı"
          type="number"
          placeholder="1956"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            revalidateIfNeeded({ year: e.target.value });
          }}
          error={errors.year}
        />

        <Input
          label="Sayfa Sayısı"
          type="number"
          placeholder="320"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select
          label="Durum"
          value={status}
          onChange={(e) => {
            const nextStatus = e.target.value as BookStatus;
            setStatus(nextStatus);
            revalidateIfNeeded({ status: nextStatus });
          }}
          options={[
            { value: 'available', label: 'Rafta Mevcut' },
            { value: 'borrowed', label: 'Ödünç Verildi' },
          ]}
        />

        {status === 'borrowed' ? (
          <Input
            label="Ödünç Alan Kişi"
            placeholder="Kime ödünç verildi?"
            value={borrowedBy}
            onChange={(e) => {
              setBorrowedBy(e.target.value);
              revalidateIfNeeded();
            }}
            error={errors.borrowedBy}
          />
        ) : (
          <Input
            label="Kapak Görseli URL (Opsiyonel)"
            placeholder="https://covers.openlibrary.org/..."
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="book-blurb"
          className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600"
        >
          Kitap Özeti
        </label>
        <textarea
          id="book-blurb"
          rows={2}
          value={blurb}
          onChange={(e) => setBlurb(e.target.value)}
          placeholder="Kitap detay sayfasında yer alacak özet metin..."
          className="w-full border-b border-neutral-300 bg-transparent px-1 py-2 text-xs text-[#111111] placeholder:text-neutral-400 focus:border-[#111111] focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="book-notes"
          className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600"
        >
          Kişisel Notlar
        </label>
        <textarea
          id="book-notes"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Okuma notlarınız veya baskı bilgileri..."
          className="w-full border-b border-neutral-300 bg-transparent px-1 py-2 text-xs text-[#111111] placeholder:text-neutral-400 focus:border-[#111111] focus:outline-none"
        />
      </div>

      <div className="mt-2 flex items-center justify-end gap-2.5 border-t border-neutral-100 pt-5">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Vazgeç
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialValues ? 'Değişiklikleri Kaydet' : 'Kütüphaneye Ekle'}
        </Button>
      </div>
    </form>
  );
}
