// src/components/events/UpcomingEvents.tsx
import {
  component$,
  useSignal,
  useComputed$,
  useVisibleTask$,
  $,
} from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

type Category = 'festival' | 'konsert' | 'ko\'rgazma' | 'teatr' | 'sayil';
type EventItem = {
  id: number;
  title: string;
  date: string;        // ISO: "2025-09-05T18:00:00"
  place: string;       // "Oqsaroy maydoni"
  locationUrl?: string;// xarita havola (ixtiyoriy)
  category: Category;
  price: number;       // so'mda (0 => bepul)
  img: string;         // preview rasm
  slug: string;        // /events/:slug
};

const EVENTS: EventItem[] = [
  {
    id: 101,
    title: 'Shahrisabz Folklor Kechasi',
    date: '2025-09-05T19:00:00',
    place: 'Oqsaroy maydoni',
    category: 'festival',
    price: 80000,
    img: '/images/events/folklor.jpg',
    slug: 'folklor-kechasi',
  },
  {
    id: 102,
    title: 'Koshin Sanʼati Ko‘rgazmasi',
    date: '2025-09-18T11:00:00',
    place: 'Madaniyat markazi',
    category: 'ko\'rgazma',
    price: 30000,
    img: '/images/events/koshin.jpg',
    slug: 'koshin-korgazma',
  },
  {
    id: 103,
    title: 'Ochiq Havoda Konsert',
    date: '2025-10-03T20:00:00',
    place: 'Shahar amfiteatri',
    category: 'konsert',
    price: 120000,
    img: '/images/events/concert.jpg',
    slug: 'open-air-konsert',
  },
  {
    id: 104,
    title: 'Meʼmoriy Teatr Sahnalari',
    date: '2025-08-28T17:00:00',
    place: 'Dorut‑Tillovat',
    category: 'teatr',
    price: 0,
    img: '/images/events/theatre.jpg',
    slug: 'memoriy-teatr',
  },
  {
    id: 105,
    title: 'Xalq Sayili — Hunarmandlar',
    date: '2025-09-21T10:00:00',
    place: 'Chorbog‘',
    category: 'sayil',
    price: 0,
    img: '/images/events/parkfest.jpg',
    slug: 'xalq-sayili',
  },
];

const fmtPrice = (v: number) => (v === 0 ? 'Bepul' : `${v.toLocaleString('uz-UZ')} so'm`);
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const monthKey = (d: string) => new Date(d).toISOString().slice(0, 7); // YYYY-MM

export const UpcomingEvents = component$(() => {
  // UI states
  const tab = useSignal<'Bu oy' | 'Keyingi oy' | 'Hammasi'>('Bu oy');
  const cat = useSignal<'hammasi' | Category>('hammasi');
  const q = useSignal('');
  const nowMonth = useSignal<string>('');
  const quick = useSignal<EventItem | null>(null);

  useVisibleTask$(() => {
    const now = new Date();
    nowMonth.value =
      now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  });

  const setTab$ = $((t: typeof tab.value) => (tab.value = t));
  const setCat$ = $((c: typeof cat.value) => (cat.value = c));
  const setQuery$ = $((v: string) => (q.value = v));

  const filtered = useComputed$<EventItem[]>(() => {
    const query = q.value.trim().toLowerCase();
    const base = EVENTS
      .filter((e) => (cat.value === 'hammasi' ? true : e.category === cat.value))
      .filter(
        (e) =>
          !query ||
          e.title.toLowerCase().includes(query) ||
          e.place.toLowerCase().includes(query)
      )
      .sort((a, b) => +new Date(a.date) - +new Date(b.date));

    if (tab.value === 'Hammasi') return base;

    if (tab.value === 'Bu oy') {
      return base.filter((e) => monthKey(e.date) === nowMonth.value);
    }

    // Keyingi oy
    const d = new Date();
    const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    const nextKey =
      next.getFullYear() + '-' + String(next.getMonth() + 1).padStart(2, '0');
    return base.filter((e) => monthKey(e.date) === nextKey);
  });

  // ICS (Add to Calendar) — client-side generatsiya
  const addToCalendar$ = $((e: EventItem) => {
    const dt = new Date(e.date);
    // 2 soat davom deb taxmin (customize qilsa bo‘ladi)
    const dtEnd = new Date(dt.getTime() + 2 * 60 * 60 * 1000);
    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

    const ics =
      `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Shahrisabz Events//Qwik//UZ
BEGIN:VEVENT
UID:${e.id}@shahrisabz.events
DTSTAMP:${fmt(new Date())}
DTSTART:${fmt(dt)}
DTEND:${fmt(dtEnd)}
SUMMARY:${e.title}
LOCATION:${e.place}
DESCRIPTION:${e.title} — ${fmtPrice(e.price)} (${e.category})
END:VEVENT
END:VCALENDAR`.replace(/\n/g, '\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${e.slug}.ics`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);
  });

  const openQuick$ = $((e: EventItem) => (quick.value = e));
  const closeQuick$ = $(() => (quick.value = null));

  return (
    <section id="upcoming" class="py-16 bg-white dark:bg-zinc-950">
      <div class="max-w-6xl mx-auto px-6">
        {/* Header + filters */}
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 class="text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              Yaqin tadbirlar
            </h2>
            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Sana, joylashuv va narxlar bilan. Chipta siyosati tashkilotchiga bog‘liq.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            {(['Bu oy', 'Keyingi oy', 'Hammasi'] as const).map((t) => (
              <button
                key={t}
                onClick$={() => setTab$(t)}
                class={
                  'h-9 px-4 rounded-full border transition ' +
                  (tab.value === t
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
              {['hammasi', 'festival', 'konsert', 'ko\'rgazma', 'teatr', 'sayil'].map(
                (c) => (
                  <option value={c} selected={cat.value === (c as any)} key={c}>
                    {c}
                  </option>
                )
              )}
            </select>

            <input
              type="search"
              placeholder="Qidirish (sarlavha/joy)…"
              onInput$={(e, el) => setQuery$(el.value)}
              class="h-9 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 text-sm
                     text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Grid */}
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.value.map((e) => (
            <div
              key={e.id}
              class="group relative overflow-hidden rounded-2xl border
                     border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-900"
            >
              <div class="relative h-44">
                <img
                  src={e.img}
                  alt={e.title}
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent" />
                <div class="absolute top-3 left-3 rounded-full px-3 py-1 text-xs bg-black/60 text-white backdrop-blur">
                  {fmtDate(e.date)}
                </div>
                {e.price === 0 ? (
                  <div class="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] bg-emerald-500/90 text-white">
                    Bepul
                  </div>
                ) : (
                  <div class="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] bg-white/85 text-zinc-900">
                    {fmtPrice(e.price)}
                  </div>
                )}
              </div>

              <div class="p-4">
                <div class="text-sm text-emerald-700 dark:text-emerald-400 capitalize">
                  {e.category}
                </div>
                <h3 class="mt-0.5 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {e.title}
                </h3>
                <div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">📍 {e.place}</div>

                <div class="mt-4 flex items-center justify-between">
                  {/* Actions */}
                  <div class="flex gap-2">
                    <button
                      onClick$={() => addToCalendar$(e)}
                      class="h-9 px-3 rounded-xl text-sm border
                             border-zinc-300 dark:border-zinc-700
                             hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition"
                    >
                      Kalenderga qo‘shish
                    </button>
                    <button
                      onClick$={() => openQuick$(e)}
                      class="h-9 px-3 rounded-xl text-sm border
                             border-zinc-300 dark:border-zinc-700
                             hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition"
                    >
                      Tez ko‘rish
                    </button>
                  </div>

                  <div class="flex gap-2">
                    {e.locationUrl && (
                      <a
                        href={e.locationUrl}
                        target="_blank"
                        class="h-9 px-3 rounded-xl text-sm border border-emerald-400/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/15 transition"
                      >
                        Xaritada
                      </a>
                    )}
                    <Link
                      href={`/events/${e.slug}`}
                      class="h-9 px-3 rounded-xl text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition"
                    >
                      Batafsil
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!filtered.value.length && (
            <div class="text-sm text-zinc-600 dark:text-zinc-400">
              Hech qanday tadbir topilmadi — filtrlarni o‘zgartiring.
            </div>
          )}
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      {quick.value && (
        <div class="fixed inset-0 z-[60] grid place-items-center p-4" role="dialog" aria-modal="true">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick$={closeQuick$} />
          <div class="relative w-full max-w-2xl rounded-2xl overflow-hidden
                      bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70 shadow-2xl">
            <img src={quick.value.img} alt={quick.value.title} class="h-56 w-full object-cover" />
            <div class="p-6">
              <div class="text-sm text-zinc-600 dark:text-zinc-400">
                {fmtDate(quick.value.date)} • 📍 {quick.value.place}
              </div>
              <h3 class="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {quick.value.title}
              </h3>
              <div class="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                Kategoriya: <span class="capitalize">{quick.value.category}</span> • Narx: {fmtPrice(quick.value.price)}
              </div>

              <div class="mt-5 flex justify-end gap-2">
                <button
                  onClick$={closeQuick$}
                  class="h-10 px-4 rounded-xl text-sm border
                         border-zinc-300 dark:border-zinc-700
                         hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition"
                >
                  Yopish
                </button>
                <button
                  onClick$={() => addToCalendar$(quick.value!)}
                  class="h-10 px-4 rounded-xl text-sm border border-emerald-400/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/15 transition"
                >
                  Kalenderga qo‘shish
                </button>
                <Link
                  href={`/events/${quick.value.slug}`}
                  class="h-10 px-4 rounded-xl text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Batafsil sahifa
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});
