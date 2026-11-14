import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import { LibraryPage } from './pages/LibraryPage';
import { NotFoundPage } from './pages/NotFoundPage';

const BookDetailPage = lazy(() => import('./pages/BookDetailPage'));
const GenresPage = lazy(() => import('./pages/GenresPage'));
const AuthorsPage = lazy(() => import('./pages/AuthorsPage'));
const PopularPage = lazy(() => import('./pages/PopularPage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

export function App() {
  return (
    <AppLayout>
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center bg-white">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#111111] border-t-transparent" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LibraryPage />} />
          <Route path="/turler" element={<GenresPage />} />
          <Route path="/yazarlar" element={<AuthorsPage />} />
          <Route path="/populer" element={<PopularPage />} />
          <Route path="/koleksiyonlar" element={<CollectionsPage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export default App;
