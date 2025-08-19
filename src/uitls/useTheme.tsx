import { useSignal, useVisibleTask$, $, component$, Slot } from '@builder.io/qwik';

export type ThemeMode = 'light' | 'dark';

/**
 * Qoidalar:
 * - SSR/Resume paytida funksiya qaytarish => QRL bo'lishi shart.
 * - Shuning uchun setTheme$ va toggleTheme$ ni $() bilan o'radik.
 */
export const useTheme = () => {
  const theme = useSignal<ThemeMode>('light');

  // Dastlabki yuklanishda localStorage / system pref ni o‘qib, <html>.class ni sinxronlaymiz
  useVisibleTask$(() => {
    try {
      const saved = localStorage.getItem('theme') as ThemeMode | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial: ThemeMode = saved ?? (prefersDark ? 'dark' : 'light');
      theme.value = initial;
      const cl = document.documentElement.classList;
      initial === 'dark' ? cl.add('dark') : cl.remove('dark');
    } catch {}
  });

  // QRL: onClick$ yoki boshqa joylarga bevosita berish mumkin
  const setTheme$ = $((mode: ThemeMode) => {
    theme.value = mode;
    try { localStorage.setItem('theme', mode); } catch {}
    const cl = document.documentElement.classList;
    mode === 'dark' ? cl.add('dark') : cl.remove('dark');
  });

  // QRL: toggle — ichida boshqa QRL chaqirmadik, bevosita ishlaymiz
  const toggleTheme$ = $(() => {
    const mode: ThemeMode = theme.value === 'dark' ? 'light' : 'dark';
    theme.value = mode;
    try { localStorage.setItem('theme', mode); } catch {}
    const cl = document.documentElement.classList;
    mode === 'dark' ? cl.add('dark') : cl.remove('dark');
  });

  return { theme, setTheme$, toggleTheme$ };
};

// Ixtiyoriy: keyinchalik context kerak bo'lsa ishlatasiz. Hozir shart emas.
export const ThemeProvider = component$(() => <Slot />);
