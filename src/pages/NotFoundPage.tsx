import { BookX, Home } from 'lucide-react';
import { Link } from 'react-router';
import { AppLayout } from '../components/layout/AppLayout';

interface NotFoundPageProps {
  message?: string;
}

export function NotFoundPage({
  message = 'Aradığınız sayfa veya kitap kütüphanede bulunamadı.',
}: NotFoundPageProps) {
  return (
    <AppLayout>
      <section className="mx-auto my-auto flex max-w-md flex-col items-center justify-center p-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-800">
          <BookX className="h-7 w-7" />
        </div>
        <h1 className="font-editorial text-3xl font-semibold text-neutral-900">
          Sayfa Bulunamadı
        </h1>
        <p className="mt-2 text-sm text-neutral-500">{message}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white transition-transform hover:scale-105"
        >
          <Home className="h-4 w-4" />
          <span>Ana Vitrine Dön</span>
        </Link>
      </section>
    </AppLayout>
  );
}
export default NotFoundPage;
