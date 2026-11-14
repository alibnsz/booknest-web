import { useCallback, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants/book.constants';
import { useLocalStorage } from './useLocalStorage';

export type ThemeMode = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<ThemeMode>(
    STORAGE_KEYS.THEME,
    'light',
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
