import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    setDarkMode(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => {
      setDarkMode(mediaQuery.matches);
    });

    return () => {
      prefersDark.removeEventListener('change', (mediaQuery) => {
        setDarkMode(mediaQuery.matches);
      });
    };
  }, []);

  return { darkMode };
}
