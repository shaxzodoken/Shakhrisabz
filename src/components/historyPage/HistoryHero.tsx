// src/components/history/HeroPro.tsx
import { component$, $ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
import { Button } from '~/components/ui/Button';

export const HistoryHeroPro = component$(() => {
  // (ixtiyoriy) smooth scroll QRL
  const scrollToTimeline$ = $(() => {
    document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  return (
    <section class="relative min-h-[88vh] overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* BACKGROUND: Ken Burns + vignette */}
      <div class="absolute inset-0 z-0">

        <img
          src="https://s0.rbk.ru/v6_top_pics/media/img/8/97/756686902868978.jpg"
          alt="Shahrisabz tarixiy panorama"
          class="absolute inset-0 h-full w-full object-cover opacity-95 dark:opacity-80 animate-kenburns"
        />
        {/* soft vignette */}
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent dark:from-zinc-950/80 dark:via-zinc-950/50" />
        {/* calligraphy pattern (ornament) */}
        <div class="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.12] mix-blend-soft-light">
          <svg viewBox="0 0 600 600" class="w-full h-full">
            <defs>
              <pattern id="geo" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0L60 30 30 60 0 30Z" fill="currentColor" />
                <circle cx="30" cy="30" r="6" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo)" />
          </svg>
        </div>
      </div>

      {/* HALQA / RING DEKOR */}
      <div class="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full border border-white/20 dark:border-white/10" />
      <div class="pointer-events-none absolute -right-10 top-24 h-[28rem] w-[28rem] rounded-full border border-white/20 dark:border-white/10" />

      <Container>
        <div class="grid grid-cols-12 gap-6 pt-24 pb-12 items-center">
          {/* LEFT: GLASS TEXT PANEL */}
          <div class="col-span-12 md:col-span-6">
            <div class="rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-zinc-900/30 backdrop-blur-md p-6 sm:p-8 ring-1 ring-white/10">
              {/* Eyebrow / breadcrumb-like */}
              <div class="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider">
                <span class="rounded-full px-2.5 py-1 bg-emerald-600/20 text-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300">Rasmiy</span>
                <span class="text-white/80">/</span>
                <a href="/" class="text-white/90 hover:underline">Bosh sahifa</a>
                <span class="text-white/80">/</span>
                <span class="text-white/90">Tarix</span>
              </div>

              <h1 class="mt-4 text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.45)]">
                Shahrisabz Tarixi
              </h1>

              <p class="mt-4 text-base sm:text-lg text-zinc-100/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                Amir Temurdan qolgan meʼmoriy meros, koshinlar jilosi va shahar ruhini bir sahifada jamladik. 
                Davrlar kesimida voqealarni ko‘ring, yodgorliklar bilan tanishing.
              </p>

              {/* quick stats ribbon */}
              <div class="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { v: 'XIV–XV', l: 'Temuriylar' },
                  { v: '12', l: 'Asosiy yodgorlik' },
                  { v: 'UNESCO', l: 'Merosi' },
                ].map((s) => (
                  <div key={s.l} class="rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-zinc-900/20 py-3">
                    <div class="text-sm text-white/90">{s.v}</div>
                    <div class="text-[11px] text-white/70">{s.l}</div>
                  </div>
                ))}
              </div>

              <div class="mt-7 flex flex-wrap gap-3">
                <Button as="a" href="#timeline" size="lg">Timeline’ni ko‘rish</Button>
                <a
                  href="#landmarks"
                  class="inline-flex h-12 items-center justify-center rounded-xl px-5 text-base
                         border border-white/60 hover:border-white/80
                         text-white hover:text-white
                         bg-white/5 hover:bg-white/10
                         dark:border-white/40 dark:hover:border-white/70
                         transition active:translate-y-px"
                >
                  Yodgorliklar
                </a>
              </div>

              {/* scroll cue */}
              <button
                onClick$={scrollToTimeline$}
                class="mt-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
              >
                Pastga suring <span class="text-lg leading-none">↓</span>
              </button>
            </div>
          </div>

          {/* RIGHT: IMAGE COLLAGE (2 qatlam) */}
          <div class="col-span-12 md:col-span-6">
            <div class="relative h-[28rem] md:h-[32rem]">
              {/* big card */}
              <div class="absolute right-2 top-0 w-[68%] h-[62%] rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10">
                <img
                  src="https://s0.rbk.ru/v6_top_pics/media/img/8/97/756686902868978.jpg"
                  alt="Oqsaroy"
                  class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div class="absolute bottom-3 left-3 text-white text-sm px-2 py-1 rounded-md bg-black/40 backdrop-blur">
                  Oqsaroy
                </div>
              </div>

              {/* small card */}
              <div class="absolute left-0 bottom-6 w-[55%] h-[48%] rounded-3xl overflow-hidden shadow-xl border border-white/20 dark:border-white/10">
                <img
                  src="https://s0.rbk.ru/v6_top_pics/media/img/8/97/756686902868978.jpg"
                  alt="Dorut‑Tillovat"
                  class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div class="absolute bottom-3 left-3 text-white text-sm px-2 py-1 rounded-md bg-black/40 backdrop-blur">
                  Dorut‑Tillovat
                </div>
              </div>

              {/* circular stamp / seal */}
              <div class="absolute -left-6 top-4 grid place-items-center h-28 w-28 rounded-full bg-emerald-600/80 text-white shadow-xl rotate-[-8deg]">
                <div class="text-[11px] tracking-widest uppercase">Shahrisabz</div>
                <div class="text-xl font-serif leading-none">1365</div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* bottom blend into page */}
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-950" />

      {/* Local styles for keyframes */}
      <style>
        {`
          @keyframes kenburns {
            0% { transform: scale(1) translateY(0); }
            100% { transform: scale(1.08) translateY(-2%); }
          }
          .animate-kenburns { animation: kenburns 18s ease-in-out forwards; }
        `}
      </style>
    </section>
  );
});
