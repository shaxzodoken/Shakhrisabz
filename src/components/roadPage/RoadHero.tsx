import { component$ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
import { Button } from '~/components/ui/Button';

export const RoadsHeroPro = component$(() => {
  return (
    <section class="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* stylized map backdrop */}
      <div class="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.1]">
        <svg viewBox="0 0 800 600" class="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="currentColor" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <g stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" fill="none">
            <path d="M50,500 C200,420 420,520 620,420" />
            <path d="M80,380 C240,320 420,360 700,300" />
          </g>
        </svg>
      </div>

      <Container>
        <div class="pt-24 pb-14 relative">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider bg-emerald-600/15 text-emerald-700 dark:text-emerald-300">
              Shahrisabz • Yo‘llar
            </div>
            <h1 class="mt-3 text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              Yo‘lingizni tanlang, to‘xtash joylarini belgilang
            </h1>
            <p class="mt-3 text-zinc-600 dark:text-zinc-300">
              Marshrutni rejalang: qahvaxona, hunarmand bozori, muzey, suvenir do‘konlari — hammasi bitta xaritada.
            </p>
            <div class="mt-6 flex gap-3">
              <Button as="a" href="#builder" size="lg">Marshrut tuzish</Button>
              <Button as="a" href="#stops" size="lg" variant="outline">To‘xtash joylari</Button>
            </div>
          </div>
          {/* hero markers */}
          <div class="hidden md:block absolute right-4 top-10">
            <div class="relative h-56 w-56">
              <span class="absolute left-6 top-10 h-3 w-3 rounded-full bg-emerald-500 shadow"></span>
              <span class="absolute right-8 top-20 h-3 w-3 rounded-full bg-amber-500 shadow"></span>
              <span class="absolute left-20 bottom-8 h-3 w-3 rounded-full bg-sky-500 shadow"></span>
              <svg class="absolute inset-0" viewBox="0 0 200 200" fill="none">
                <path d="M30 40 C60 60 120 45 165 70" stroke="currentColor" stroke-opacity=".3" stroke-width="3"/>
                <path d="M35 150 C90 120 120 140 170 120" stroke="currentColor" stroke-opacity=".25" stroke-width="3"/>
              </svg>
            </div>
          </div>
        </div>
      </Container>
      <div class="h-16 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent"></div>
    </section>
  );
});
