import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { useTheme } from '~/uitls/useTheme';

export default component$(() => {
  const { theme, toggleTheme$ } = useTheme(); // QRL ni hookdan olyapmiz

  const isMenuOpen = useSignal(false);
  const isScrolled = useSignal(false);

  useVisibleTask$(() => {
    const onScroll = () => (isScrolled.value = window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  // QRL bo'lishi shart:
  const toggleMenu$ = $(() => (isMenuOpen.value = !isMenuOpen.value));
  const closeMenu$ = $(() => (isMenuOpen.value = false));

  const navigation = [
    { name: 'Bosh sahifa', href: '/' },
    { name: 'Tarix', href: '/history' },
    { name: 'Yo‘nalishlar', href: '/road' },
    { name: 'Tadbirlar', href: '/event' },
    { name: 'Aloqa', href: '/contact' },
  ];

  return (
    <nav
      class={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled.value
          ? 'backdrop-blur bg-white/75 dark:bg-zinc-900/70 border-b border-zinc-200/60 dark:border-zinc-800/60'
          : 'bg-transparent'
      }`}
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" class="flex items-center gap-3">
            <div class="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-sm">
              <svg viewBox="0 0 24 24" class="w-5 h-5 opacity-95" aria-hidden="true">
                <path d="M12 2l4 4-4 4-4-4 4-4zm0 8l4 4-4 4-4-4 4-4z" fill="currentColor" />
              </svg>
            </div>
            <div class="flex flex-col leading-tight">
              <span class="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Shahrisabz</span>
              <span class="text-[11px] text-zinc-500 dark:text-zinc-400">Tarix va Nafosat shahri</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div class="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                class="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div class="flex items-center gap-2">
            {/* Theme toggle (QRL) */}
            <button
              type="button"
              aria-label="Toggle theme"
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm transition active:translate-y-px"
              onClick$={toggleTheme$}
            >
              {theme.value === 'dark' ? (
                <svg viewBox="0 0 24 24" class="h-5 w-5 text-zinc-200" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" class="h-5 w-5 text-zinc-800" aria-hidden="true">
                  <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.84 17.24l-1.79 1.8 1.79 1.79 1.79-1.79-1.79-1.8zM20 11V9h-3v2h3zm-2.76-6.16l1.8-1.79-1.8-1.79-1.79 1.79 1.79 1.79zM12 7a5 5 0 100 10 5 5 0 000-10zm7.16 10.24l1.79 1.79 1.79-1.79-1.79-1.8-1.79 1.8z" fill="currentColor" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="Open menu"
              class="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm"
              onClick$={toggleMenu$}
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5 text-zinc-800 dark:text-zinc-200" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {isMenuOpen.value && (
          <div class="md:hidden pb-4">
            <div class="mt-2 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-sm">
              <div class="px-3 py-2 flex items-center justify-between">
                <span class="text-sm text-zinc-500 dark:text-zinc-400">Menyu</span>
                <button
                  class="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60"
                  aria-label="Close menu"
                  onClick$={closeMenu$}
                >
                  <svg viewBox="0 0 24 24" class="h-5 w-5 text-zinc-700 dark:text-zinc-300" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
              <div class="px-2 pb-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    class="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60"
                    onClick$={closeMenu$}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});
