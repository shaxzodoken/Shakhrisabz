// src/components/landing/TimelinePro.tsx
import {
  component$,
  useSignal,
  useComputed$,
  useVisibleTask$,
  $,
} from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
import { Link } from '@builder.io/qwik-city';

// --- Demo data (slug/rasmni keyin realga almashtirasiz) ---
type Era = 'Temuriylar' | 'Shayboniylar' | 'Zamonaviy';
type TEvent = {
  id: number;
  year: number;
  month?: number;  // 1..12
  era: Era;
  title: string;
  excerpt: string;
  slug: string;    // /history/:slug
  img?: string;
};

const DATA: TEvent[] = [
  { id:1, year:1379, month:6, era:'Temuriylar', slug:'oqsaroy-qurilishi',
    title:'Oqsaroy qurilishi', excerpt:'Amir Temur saroyining bunyod etilishi.',
    img:'/images/history/aqsaroy.jpg' },
  { id:2, year:1392, month:9, era:'Temuriylar', slug:'dorut-tillovat',
    title:'Dorut‑Tillovat majmuasi', excerpt:'Meʼmoriy‑maʼrifiy markaz shakllanishi.',
    img:'/images/history/dorut.jpg' },
  { id:3, year:1500, month:3, era:'Shayboniylar', slug:'islohotlar',
    title:'Meʼmorchilik islohotlari', excerpt:'Taʼmirlash va rivoj davri.',
    img:'/images/history/renaissance.jpg' },
  { id:4, year:1993, month:12, era:'Zamonaviy', slug:'unesco-merosi',
    title:'UNESCO merosi maqomi', excerpt:'Tarixiy markaz xalqaro himoyada.',
    img:'/images/history/unesco.jpg' },
  { id:5, year:2024, month:5, era:'Zamonaviy', slug:'festival-yangi',
    title:'Yangi festival anʼanasi', excerpt:'Madaniy tadbirlar va turizm.',
    img:'/images/history/festival.jpg' },
];

// --- Util ---
const byMonth = (a: TEvent, b: TEvent) => (a.month ?? 1) - (b.month ?? 1);

export const TimelinePro = component$(() => {
  // state
  const era = useSignal<Era | 'Hammasi'>('Hammasi');
  const q = useSignal('');
  const zoom = useSignal(1);
  const yearsRail = useSignal<HTMLElement>();
  const eventsPanel = useSignal<HTMLElement>();
  const activeYear = useSignal<number | null>(null);
  const focusIndex = useSignal(0);

  // computed
  const filtered = useComputed$(() => {
    const ql = q.value.trim().toLowerCase();
    return DATA
      .filter(e => era.value === 'Hammasi' ? true : e.era === era.value)
      .filter(e => !ql || e.title.toLowerCase().includes(ql) || String(e.year).includes(ql))
      .sort((a,b)=> a.year === b.year ? byMonth(a,b) : a.year - b.year);
  });

  const yearMap = useComputed$(() => {
    const m = new Map<number, TEvent[]>();
    filtered.value.forEach(e => {
      const arr = m.get(e.year) ?? [];
      arr.push(e); m.set(e.year, arr);
    });
    m.forEach(arr => arr.sort(byMonth));
    return m;
  });

  const visibleYears = useComputed$(() =>
    [...yearMap.value.keys()].sort((a,b)=>a-b)
  );

  // QRL handlers (no non-QRL functions)
  const setEra$ = $((x: Era | 'Hammasi') => era.value = x);
  const setQuery$ = $((val: string) => q.value = val);
  const setZoom$ = $((val: number) => zoom.value = Math.min(1.4, Math.max(0.8, val)));

  const focusYear$ = $((y: number) => {
    activeYear.value = y;
    const el = eventsPanel.value?.querySelector<HTMLElement>(`[data-year="${y}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const onRailScroll$ = $(() => {
    const rail = yearsRail.value; if (!rail) return;
    const items = rail.querySelectorAll<HTMLElement>('[data-year-item]');
    let bestY = activeYear.value ?? 0, bestDy = Infinity;
    items.forEach(it => {
      const rect = it.getBoundingClientRect();
      const dy = Math.abs((rect.top + rect.bottom)/2 - window.innerHeight/2);
      const y = Number(it.dataset.y);
      if (dy < bestDy) { bestDy = dy; bestY = y; }
    });
    activeYear.value = bestY;
  });

  const onPanelScroll$ = $(() => {
    const panel = eventsPanel.value; if (!panel) return;
    const secs = panel.querySelectorAll<HTMLElement>('[data-year]');
    let bestY = activeYear.value ?? 0, bestDy = Infinity;
    secs.forEach(s => {
      const rect = s.getBoundingClientRect();
      const dy = Math.abs(rect.top - 120);
      const y = Number(s.dataset.year);
      if (dy < bestDy) { bestDy = dy; bestY = y; }
    });
    activeYear.value = bestY;
  });

  const keyNav$ = $((ev: KeyboardEvent) => {
    const list = filtered.value; if (!list.length) return;
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
      focusIndex.value = Math.min(focusIndex.value + 1, list.length - 1);
    } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
      focusIndex.value = Math.max(focusIndex.value - 1, 0);
    } else { return; }
    const e = list[focusIndex.value];
    const el = eventsPanel.value?.querySelector<HTMLElement>(`[data-ev="${e.id}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el?.focus();
  });

  // initial focus to first year
  useVisibleTask$(({ cleanup }) => {
    const y = visibleYears.value[0] ?? DATA.map(d=>d.year).sort((a,b)=>a-b)[0];
    activeYear.value = y;
    const id = setTimeout(() => focusYear$(y), 220);
    cleanup(() => clearTimeout(id));
  });

  const eras: (Era | 'Hammasi')[] = ['Hammasi', 'Temuriylar', 'Shayboniylar', 'Zamonaviy'];

  return (
    <section class="py-14 bg-white dark:bg-zinc-950" onKeyDown$={keyNav$}>
      <Container>
        {/* header + tools */}
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 class="text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              Tarixiy Timeline — Shahrisabz
            </h2>
            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Chapda yillar, o‘ngda voqealar. Filtr/qidiruv/zoom bilan qulay ko‘rish.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            {eras.map(x => (
              <button key={x} onClick$={() => setEra$(x)}
                class={'h-9 px-4 rounded-full border transition ' +
                  (era.value===x
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60')}>
                {x}
              </button>
            ))}
            <input
              type="search"
              placeholder="Qidirish: yil yoki sarlavha…"
              onInput$={(e, el) => setQuery$(el.value)}
              class="h-9 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 text-sm
                     text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
            <div class="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span>Zoom</span>
              <input type="range" min="0.8" max="1.4" step="0.05"
                     value={zoom.value}
                     onInput$={(e, el)=> setZoom$(Number(el.value))}
                     class="accent-emerald-600" />
            </div>
          </div>
        </div>

        {/* layout */}
        <div class="mt-6 grid grid-cols-12 gap-5">
          {/* left: years rail */}
          <div class="col-span-12 md:col-span-3">
            <div
              ref={yearsRail}
              onScroll$={onRailScroll$}
              class="h-[70vh] overflow-auto rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70
                     bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm p-3"
              style={{ scrollBehavior: 'smooth' }}
            >
              <ul class="space-y-1">
                {visibleYears.value.map(y => (
                  <li key={y} data-year-item data-y={y}>
                    <button
                      onClick$={() => focusYear$(y)}
                      class={'w-full text-left px-3 py-2 rounded-xl text-sm transition ' +
                        (activeYear.value===y
                          ? 'bg-emerald-600 text-white'
                          : 'hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300')}
                      style={{ transform: `scale(${zoom.value})` }}
                    >
                      <div class="flex items-center justify-between">
                        <span class="font-medium">{y}</span>
                        <span class="text-[11px] opacity-70">{yearMap.value.get(y)?.length ?? 0} ta</span>
                      </div>
                    </button>
                  </li>
                ))}
                {!visibleYears.value.length && (
                  <li class="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">Hech narsa topilmadi.</li>
                )}
              </ul>
            </div>
          </div>

          {/* right: events panel */}
          <div class="col-span-12 md:col-span-9">
            <div
              ref={eventsPanel}
              onScroll$={onPanelScroll$}
              class="h-[70vh] overflow-auto rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70
                     bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm p-4"
              style={{ scrollBehavior: 'smooth' }}
              tabindex={0}
            >
              {[...yearMap.value.entries()].sort((a,b)=>a[0]-b[0]).map(([y, events]) => (
                <section key={y} data-year={y} class="mb-8 scroll-mt-24">
                  <div class="sticky top-0 z-10 -mx-4 px-4 py-2
                              bg-gradient-to-b from-white/95 to-white/0
                              dark:from-zinc-900/95 dark:to-zinc-900/0 backdrop-blur">
                    <div class="inline-flex items-center gap-2 rounded-xl px-3 py-1 text-sm
                                border border-zinc-200/70 dark:border-zinc-800/70
                                bg-white/70 dark:bg-zinc-900/70">
                      <span class="font-semibold text-zinc-900 dark:text-zinc-100">{y}</span>
                      <span class="text-[11px] text-zinc-500 dark:text-zinc-400">{events.length} ta voqea</span>
                    </div>
                  </div>

                  <div class="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((e, idx) => (
                      <Link
                        key={e.id}
                        href={`/history/${e.slug}`}
                        data-ev={e.id}
                        tabindex={idx===0 ? 0 : -1}
                        class="group relative block rounded-2xl overflow-hidden border
                               border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-900
                               hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/70 transition"
                      >
                        <div class="relative h-40">
                          <img src={e.img || '/images/history/placeholder.jpg'}
                               alt={e.title}
                               class="absolute inset-0 h-full w-full object-cover
                                      transition-transform duration-500 group-hover:scale-105"/>
                          <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent"/>
                          <div class="absolute bottom-2 left-2 text-white text-xs px-2 py-1 rounded-md
                                      bg-black/50 backdrop-blur">{e.era}</div>
                        </div>
                        <div class="p-4">
                          <div class="text-sm text-emerald-700 dark:text-emerald-400">
                            {e.month ? `${String(e.month).padStart(2,'0')}.` : ''}{e.year}
                          </div>
                          <h3 class="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">{e.title}</h3>
                          <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">{e.excerpt}</p>
                          <div class="mt-3 inline-flex items-center gap-1 text-[13px]
                                      text-emerald-700 dark:text-emerald-400">Batafsil ko‘rish
                            <span class="translate-x-0 group-hover:translate-x-0.5 transition">→</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}

              {yearMap.value.size===0 && (
                <div class="grid place-items-center h-40 text-sm text-zinc-600 dark:text-zinc-400">
                  Hech narsa topilmadi — filtr yoki qidiruvni o‘zgartiring.
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});
