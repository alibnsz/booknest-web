import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router';
import { useBooks } from '../../hooks/useBooks';
import { ToastOutlet } from '../ui/Toast';
import {
  ArchiveDrawer,
  FloatingArchiveButton,
  GlobalAddBookModal,
} from './ArchiveDrawer';
import { Footer } from './Footer';
import { Header } from './Header';

const LayoutMountedContext = createContext(false);

interface AppLayoutProps {
  children: ReactNode;
  onQuickAdd?: () => void;
}

export function AppLayout({ children, onQuickAdd }: AppLayoutProps) {
  const isAlreadyMounted = useContext(LayoutMountedContext);
  const location = useLocation();
  const { books } = useBooks();
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Always reset scroll position to the top when navigating between pages or book details
  useEffect(() => {
    if (!isAlreadyMounted) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, isAlreadyMounted]);

  // If AppLayout is already mounted at the root App level, avoid double-rendering Header/Footer
  if (isAlreadyMounted) {
    return <>{children}</>;
  }

  const handleOpenAdd = () => {
    if (onQuickAdd) {
      onQuickAdd();
    } else {
      setIsAddModalOpen(true);
    }
  };

  return (
    <LayoutMountedContext.Provider value={true}>
      <div className="min-h-screen w-full bg-white text-[#111111] flex flex-col justify-between">
        <Header
          onQuickAdd={handleOpenAdd}
          onOpenArchive={() => setIsArchiveOpen(true)}
        />

        <main className="w-full flex-1">{children}</main>

        <Footer
          onOpenArchive={() => setIsArchiveOpen(true)}
          onQuickAdd={handleOpenAdd}
        />

        <FloatingArchiveButton
          bookCount={books.length}
          isOpen={isArchiveOpen}
          onToggle={() => setIsArchiveOpen((prev) => !prev)}
        />

        <ArchiveDrawer
          isOpen={isArchiveOpen}
          onClose={() => setIsArchiveOpen(false)}
          onOpenAddModal={handleOpenAdd}
        />

        <GlobalAddBookModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        <ToastOutlet />
      </div>
    </LayoutMountedContext.Provider>
  );
}
