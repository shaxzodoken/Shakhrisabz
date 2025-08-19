// src/components/landing/Events.tsx
import {
  component$,
  useSignal,
  useComputed$,
  useVisibleTask$,
  $,
} from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
import { Card, CardContent } from '~/components/ui/Card';

// ---- Demo data (keyinchalik CMS/API dan to'ldirasiz) -----------------
type Category = 'festival' | 'konsert' | 'ko\'rgazma' | 'ekskursiya';
type EventItem = {
  id: number;
  title: string;
  date: string;         // ISO (YYYY-MM-DD)
  place: string;
  category: Category;
  img: string;          // /images/events/...
  excerpt: string;
  slug: string;         // /events/:slug (kelajakda)
};

const EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'Shahrisabz Folklor Kechasi',
    date: '2025-09-05',
    place: 'Oqsaroy maydoni',
    category: 'festival',
    img: '/images/events/folklor.jpg',
    excerpt: 'Milliy kuy-qo‘shiqlar, raqs va hunarmandlar yarmarkasi.',
    slug: 'folklor-kechasi',
  },
  {
    id: 2,
    title: 'Meʼmoriy Ekskursiya',
    date: '2025-08-28',
    place: 'Dorut-Tillovat',
    category: 'ekskursiya',
    img: '/images/events/architecture.jpg',
    excerpt: 'Temuriylar davri meʼmorchiligi bo‘ylab gid bilan sayr.',
    slug: 'memorchilik-eks',
  },
  {
    id: 3,
    title: 'Koshin Sanʼati Ko‘rgazmasi',
    date: '2025-09-18',
    place: 'Madaniyat markazi',
    category: 'ko\'rgazma',
    img: '/images/events/koshin.jpg',
    excerpt: 'An’anaviy koshin naqshlari va ustalar bilan uchrashuv.',
    slug: 'koshin-korgazma',
  },
  {
    id: 4,
    title: 'Ochiq Havoda Konsert',
    date: '2025-10-03',
    place: 'Shahar amfiteatri',
    category: 'konsert',
    img: '/images/events/concert.jpg',
    excerpt: 'Zamonaviy ansambllar ishtirokida jonli konsert.',
    slug: 'open-air-konsert',
  },
  {
    id: 5,
    title: 'Shahr Ishtirokida Festival',
    date: '2025-08-22',
    place: 'Chorbog‘',
    category: 'festival',
    img: '/images/events/parkfest.jpg',
    excerpt: 'Oila va bolalar uchun interaktiv dasturlar.',
    slug: 'park-fest',
  },
];

// ---- Utilities -------------------------------------------------------
const monthKey = (iso: string) =>
  new Date(iso + 'T00:00:00').toISOString().slice(0, 7); // YYYY-MM

const formatDate = (iso: string) => {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const withinMonth = (iso: string, yearMonth: string) =>
  monthKey(iso) === yearMonth;

// ---- Component -------------------------------------------------------
export const Events = component$(() => {
  // UI state
  const tabs = ['Bu oy', 'Kelgusi', 'Tugagan'] as const;
  type Tab = (typeof tabs)[number];

  const activeTab = useSignal<Tab>('Bu oy');
  const q = useSignal('');
  const cat = useSignal<'hammasi' | Category>('hammasi');
  const railRef = useSignal<HTMLElement>();
  const quick = useSignal<EventItem | null>(null); // Quick View modal

  // hozirgi YYYY-MM (foydalanamiz)
  const nowMonth = useSignal<string>('');
  useVisibleTask$(() => {
    const now = new Date();
    nowMonth.value =
      now.getFullYear() +
      '-' +
      String(now.getMonth() + 1).padStart(2, '0'); // '2025-08' kabi
  });

  // QRL handlers
  const setTab$ = $((t: Tab) => (activeTab.value = t));
  const setCat$ = $((c: typeof cat.value) => (cat.value = c));
  const setQuery$ = $((val: string) => (q.value = val));
  const scrollRail$ = $((dir: 'left' | 'right') => {
    railRef.value?.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  });
  const openQuick$ = $((e: EventItem) => (quick.value = e));
  const closeQuick$ = $(() => (quick.value = null));

  // Filtrlash
  const filtered = useComputed$(() => {
    const query = q.value.trim().toLowerCase();
    const byCat = (ev: EventItem) =>
      cat.value === 'hammasi' ? true : ev.category === cat.value;

    const list = EVENTS.filter(byCat).filter(
      (e) =>
        !query ||
        e.title.toLowerCase().includes(query) ||
        e.place.toLowerCase().includes(query)
    );

    const today = new Date();
    const thisMonth = nowMonth.value;

    if (activeTab.value === 'Bu oy') {
      return list.filter((e) => withinMonth(e.date, thisMonth));
    }
    if (activeTab.value === 'Kelgusi') {
      return list.filter((e) => new Date(e.date) > today);
    }
    // Tugagan
    return list.filter((e) => new Date(e.date) < today && !withinMonth(e.date, thisMonth));
  });

  // “Featured” — bir nechta yaqin kelayotgan voqealar (carousel)
  const featured = useComputed$(() =>
    EVENTS
      .filter((e) => new Date(e.date) >= new Date())
      .sort((a, b) => +new Date(a.date) - +new Date(b.date))
      .slice(0, 6)
  );

  return (
    <section class="py-16 bg-white dark:bg-zinc-950" id="events">
      <Container>
        {/* Header */}
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 class="text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              Tadbirlar
            </h2>
            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Shahrisabzda bo‘lib o‘tadigan festival, ko‘rgazma va konsertlar.
              Rasmiy jadval muntazam yangilanadi.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick$={() => setTab$(t)}
                class={
                  'h-9 px-4 rounded-full border transition ' +
                  (activeTab.value === t
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60')
                }
              >
                {t}
              </button>
            ))}
            <select
              class="h-9 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 text-sm
                     text-zinc-900 dark:text-zinc-100"
              onChange$={(e, el) => setCat$(el.value as any)}
            >
              {['hammasi', 'festival', 'konsert', 'ko\'rgazma', 'ekskursiya'].map((c) => (
                <option value={c} selected={cat.value === c} key={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="search"
              placeholder="Qidirish..."
              onInput$={(e, el) => setQuery$(el.value)}
              class="h-9 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 text-sm
                     text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Featured carousel (gorizontal) */}
        <div class="relative mt-6">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <button
              aria-label="Oldingi"
              onClick$={() => scrollRail$('left')}
              class="pointer-events-auto ml-[-8px] h-10 w-10 grid place-items-center rounded-full
                     bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/70 dark:border-zinc-800/70
                     shadow-sm hover:bg-white dark:hover:bg-zinc-900 transition"
            >
              ‹
            </button>
          </div>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
            <button
              aria-label="Keyingi"
              onClick$={() => scrollRail$('right')}
              class="pointer-events-auto mr-[-8px] h-10 w-10 grid place-items-center rounded-full
                     bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/70 dark:border-zinc-800/70
                     shadow-sm hover:bg-white dark:hover:bg-zinc-900 transition"
            >
              ›
            </button>
          </div>

          <div
            ref={railRef}
            class="scrollbar-none flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 py-1
                   [scrollbar-width:none] [-ms-overflow-style:none]"
            style={{ scrollBehavior: 'smooth' }}
          >
            <style>{`.scrollbar-none::-webkit-scrollbar{display:none}`}</style>
            {featured.value.map((e) => (
              <button
                key={e.id}
                onClick$={() => openQuick$(e)}
                class="group relative w-[280px] sm:w-[320px] shrink-0 snap-center text-left outline-none"
              >
                <div class="relative h-[200px] rounded-2xl overflow-hidden shadow-lg border
                            border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-900">
                  <img
                    src={e.img}
                    alt={e.title}
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent
                              dark:from-black/75 dark:via-black/40 dark:to-transparent" />
                  <div class="absolute inset-x-0 bottom-0 p-4 text-white">
                    <div class="text-emerald-300/90 text-xs font-medium">
                      {formatDate(e.date)} • {e.place}
                    </div>
                    <div class="mt-1 text-base font-semibold">{e.title}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grid – filtered results */}
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.value.map((e) => (
            <Card key={e.id} hover>
              <CardContent>
                <div class="relative rounded-xl overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.title}
                    class="h-44 w-full object-cover"
                  />
                  <div class="absolute top-3 left-3 rounded-full px-3 py-1 text-xs
                              bg-black/60 text-white backdrop-blur">
                    {formatDate(e.date)}
                  </div>
                </div>

                <div class="mt-4">
                  <h3 class="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    {e.title}
                  </h3>
                  <div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {e.place}
                  </div>
                  <div class="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                    {e.excerpt}
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-between">
                  <span
                    class={
                      'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs capitalize ' +
                      (e.category === 'festival'
                        ? 'bg-emerald-600/15 text-emerald-700 dark:text-emerald-300'
                        : e.category === 'konsert'
                        ? 'bg-sky-600/15 text-sky-700 dark:text-sky-300'
                        : e.category === 'ko\'rgazma'
                        ? 'bg-amber-600/15 text-amber-700 dark:text-amber-300'
                        : 'bg-violet-600/15 text-violet-700 dark:text-violet-300')
                    }
                  >
                    {e.category}
                  </span>

                  <div class="flex gap-2">
                    {/* Quick view (modal) */}
                    <button
                      onClick$={() => openQuick$(e)}
                      class="h-9 px-3 rounded-xl text-sm border
                             border-zinc-300 dark:border-zinc-700
                             hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition"
                    >
                      Tez ko‘rish
                    </button>

                    {/* To‘liq sahifa (slug keyin qo‘shasiz) */}
                    <a
                      href={`/events/${e.slug}`}
                      class="h-9 px-3 rounded-xl text-sm
                             bg-emerald-600 text-white hover:bg-emerald-700 transition"
                    >
                      Batafsil
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {!filtered.value.length && (
          <div class="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Hech qanday tadbir topilmadi. Filtr/qidiruvni o‘zgartiring.
          </div>
        )}
      </Container>

      {/* QUICK VIEW MODAL */}
      {quick.value && (
        <div
          class="fixed inset-0 z-[60] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick$={closeQuick$}
          />
          <div class="relative w-full max-w-2xl rounded-2xl overflow-hidden
                      bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70 shadow-2xl">
            <img
              src={quick.value.img}
              alt={quick.value.title}
              class="h-56 w-full object-cover"
            />
            <div class="p-6">
              <div class="text-sm text-zinc-600 dark:text-zinc-400">
                {formatDate(quick.value.date)} • {quick.value.place}
              </div>
              <h3 class="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {quick.value.title}
              </h3>
              <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {quick.value.excerpt}
              </p>

              <div class="mt-5 flex justify-end gap-2">
                <button
                  onClick$={closeQuick$}
                  class="h-10 px-4 rounded-xl text-sm border
                         border-zinc-300 dark:border-zinc-700
                         hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition"
                >
                  Yopish
                </button>
                <a
                  href={`/events/${quick.value.slug}`}
                  class="h-10 px-4 rounded-xl text-sm
                         bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Batafsil sahifa
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});
