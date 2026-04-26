'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { ActionIcon } from 'rizzui';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ActionIcon variant="outline" size="md" className="rounded-md opacity-0">
        <FiSun size={18} />
      </ActionIcon>
    );
  }

  return (
    <ActionIcon
      variant="outline"
      size="md"
      className="rounded-md border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </ActionIcon>
  );
}
