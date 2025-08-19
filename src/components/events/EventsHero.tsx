// src/components/events/EventsHeroPro.tsx
import { component$, useSignal, useVisibleTask$, $, PropFunction } from '@builder.io/qwik';
import { Button } from '~/components/ui/Button';

type EventsHeroProps = {
  title?: string;                 // "Shahrisabz Festival 2025"
  dateISO?: string;               // "2025-09-05T18:00:00"
  location?: string;              // "Oqsaroy maydoni"
  priceFrom?: string;             // "50 000 so'm"
  bgImage?: string;               // "/images/events/hero.jpg"
  onPrimaryClick$?: PropFunction<() => void>;
};

export const EventsHeroPro = component$((props: EventsHeroProps) => {
  const {
    title = 'Shahrisabz Festival & Events',
    dateISO = '2025-09-05T18:00:00',
    location = 'Oqsaroy maydoni',
    priceFrom = "50 000 so'm",
    bgImage = '/images/events/hero.jpg',
  } = props;

  // COUNTDOWN
  const countdown = useSignal<{d:number;h:number;m:number;s:number}>({d:0,h:0,m:0,s:0});
  useVisibleTask$(({ cleanup }) => {
    const tick = () => {
      const target = new Date(dateISO).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff/(1000*60*60*24));
      const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
      const m = Math.floor((diff%(1000*60*60))/(1000*60));
      const s = Math.floor((diff%(1000*60))/1000);
      countdown.value = { d, h, m, s };
    };
    tick();
    const id = setInterval(tick, 1000);
    cleanup(() => clearInterval(id));
  });

  // Smooth scroll helpers
  const goToUpcoming$ = $(() => document.querySelector('#upcoming')?.scrollIntoView({behavior:'smooth'}));
  const goToCalendar$ = $(() => document.querySelector('#calendar')?.scrollIntoView({behavior:'smooth'}));
  const goToTickets$  = $(() => document.querySelector('#tickets')?.scrollIntoView({behavior:'smooth'}));
  const goToMap$      = $(() => document.querySelector('#map')?.scrollIntoView({behavior:'smooth'}));

  const onBgError$ = $((_e: Event, el: HTMLImageElement) => { el.src = '/images/events/hero-fallback.jpg'; });

  return (
    <section class="relative min-h-[88vh] overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* BACKDROP: photo + gradient + ornament */}
      <div class="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Shahrisabz tadbirlar panoramasi"
          class="absolute inset-0 h-full w-full object-cover opacity-95 dark:opacity-80 animate-[kenburns_18s_ease-in-out_forwards]"
          onError$={onBgError$}
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-transparent dark:from-zinc-950/85 dark:via-zinc-900/55" />
        <div class="absolute inset-0 pointer-events-none opacity-[0.07] dark:opacity-[0.1] mix-blend-soft-light">
          <svg viewBox="0 0 600 600" class="w-full h-full">
            <defs>
              <pattern id="geo-events" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0L60 30 30 60 0 30Z" fill="currentColor" />
                <circle cx="30" cy="30" r="5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo-events)" />
          </svg>
        </div>
      </div>

      {/* CONTENT */}
      <div class="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16">
        <div class="grid grid-cols-12 gap-6 items-center">
          {/* LEFT: Glass info card */}
          <div class="col-span-12 lg:col-span-7">
            <div class="rounded-3xl ring-1 ring-white/20 dark:ring-white/10 border border-white/20 dark:border-white/10 bg-white/10 dark:bg-zinc-900/30 backdrop-blur-md p-6 sm:p-8">
              <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider bg-emerald-600/20 text-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300">
                Shahrisabz • Tadbirlar
                <span class="h-1 w-1 rounded-full bg-emerald-300/70" />
              </div>

              <h1 class="mt-3 text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.45)]">
                {title}
              </h1>

              {/* Meta line */}
              <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-100/90">
                <span class="inline-flex items-center gap-2 rounded-xl px-3 py-1 bg-black/35 backdrop-blur">
                  📍 {location}
                </span>
                <span class="inline-flex items-center gap-2 rounded-xl px-3 py-1 bg-black/35 backdrop-blur">
                  📅 {new Date(dateISO).toLocaleString('uz-UZ', {day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit'})}
                </span>
                <span class="inline-flex items-center gap-2 rounded-xl px-3 py-1 bg-black/35 backdrop-blur">
                  🎟️ {priceFrom} dan
                </span>
              </div>

              {/* Countdown */}
              <div class="mt-5 grid grid-cols-4 gap-2 sm:gap-3 max-w-md text-center">
                {(['d','h','m','s'] as const).map((k, i) => (
                  <div key={i} class="rounded-2xl border border-white/20 dark:border-white/10 bg-black/30 backdrop-blur py-3">
                    <div class="text-2xl font-semibold text-white">
                      {countdown.value[k].toString().padStart(2,'0')}
                    </div>
                    <div class="text-[11px] uppercase tracking-wider text-zinc-200/80">
                      {k==='d'?'kun':k==='h'?'soat':k==='m'?'daq':'soniya'}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div class="mt-7 flex flex-wrap gap-3">
                <Button size="lg" onClick$={props.onPrimaryClick$ ?? goToUpcoming$}>Yaqin tadbirlar</Button>
                <a onClick$={goToCalendar$}
                   class="inline-flex h-12 items-center justify-center rounded-xl px-5 text-base
                          border border-white/60 hover:border-white/80
                          text-white hover:text-white
                          bg-white/5 hover:bg-white/10
                          dark:border-white/40 dark:hover:border-white/70
                          transition active:translate-y-px cursor-pointer">
                  Taqvimni ko‘rish
                </a>
                <a onClick$={goToTickets$}
                   class="inline-flex h-12 items-center justify-center rounded-xl px-5 text-base
                          border border-emerald-400/60 text-emerald-200 hover:bg-emerald-500/15 transition cursor-pointer">
                  Chipta & narxlar
                </a>
                <a onClick$={goToMap$}
                   class="inline-flex h-12 items-center justify-center rounded-xl px-5 text-base
                          border border-white/30 text-white/90 hover:bg-white/10 transition cursor-pointer">
                  Xarita
                </a>
              </div>

              {/* helper */}
              <p class="mt-3 text-xs text-zinc-200/80">
                Jadval, chipta va joylashuv ma’lumotlari muntazam yangilanadi.
              </p>
            </div>
          </div>

          {/* RIGHT: Poster collage */}
          <div class="col-span-12 lg:col-span-5">
            <div class="relative h-[28rem]">
              {/* Big poster */}
              <div class="absolute right-0 top-0 w-[74%] h-[60%] rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10">
                <img src="/images/events/poster-1.jpg" alt="Poster"
                     class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"/>
              </div>
              {/* Small poster */}
              <div class="absolute left-0 bottom-6 w-[58%] h-[46%] rounded-3xl overflow-hidden shadow-xl border border-white/20 dark:border-white/10">
                <img src="/images/events/poster-2.jpg" alt="Poster 2"
                     class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"/>
              </div>
              {/* Stamp */}
              <div class="absolute -left-6 top-4 grid place-items-center h-28 w-28 rounded-full bg-emerald-600/85 text-white shadow-xl rotate-[-8deg]">
                <div class="text-[11px] tracking-widest uppercase">Shahrisabz</div>
                <div class="text-xl font-serif leading-none">Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom blend */}
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-950" />

      {/* keyframes */}
      <style>
        {`@keyframes kenburns{0%{transform:scale(1)}100%{transform:scale(1.08)}}`}
      </style>
    </section>
  );
});
