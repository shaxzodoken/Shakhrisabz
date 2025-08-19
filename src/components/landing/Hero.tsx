// src/components/landing/Hero.tsx
import { component$ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
import { Button } from '~/components/ui/Button';

export const Hero = component$(() => {
  return (
    <section class="relative h-[92vh] min-h-[560px] flex items-center overflow-hidden bg-black dark:bg-zinc-950">
      {/* Background image */}
      <img
        src="https://i.pinimg.com/originals/a5/de/1a/a5de1a5bc298b758dc91137e7da2b693.jpg"
        alt="Shahrisabz manzarasi"
        class="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-80"
      />

      {/* Color wash + gradient (dark/light mos) */}
      <div
        class="
          absolute inset-0
          bg-gradient-to-b
          from-black/70 via-black/50 to-zinc-900/10
          dark:from-zinc-950/80 dark:via-zinc-950/60 dark:to-zinc-900/20
        "
      />

      {/* Vignette (matnni ajratish) */}
      <div
        aria-hidden
        class="absolute inset-0
               [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_65%)]
               bg-black/30 dark:bg-zinc-950/40"
      />

      {/* Subtle tile pattern for historical vibe */}
      <div
        aria-hidden
        class="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '22px 22px'
        }}
      />

      <Container>
        {/* Glass panel to separate text from image */}
        <div class="relative z-10 max-w-3xl rounded-2xl
                    bg-white/8 dark:bg-zinc-900/20
                    backdrop-blur-md
                    ring-1 ring-white/20 dark:ring-black/30
                    px-6 py-8 sm:px-8 sm:py-10
                    mx-auto text-center">
          {/* Eyebrow */}
          <div class="inline-flex items-center gap-2 rounded-full px-3 py-1
                      text-[11px] uppercase tracking-wider
                      bg-emerald-600/20 text-emerald-200
                      dark:bg-emerald-500/15 dark:text-emerald-300">
            Rasmiy turizm portali
            <span class="h-1 w-1 rounded-full bg-emerald-300/70" />
          </div>

          {/* Title with drop-shadow for readability on photo */}
          <h1 class="mt-3 text-4xl sm:text-5xl md:text-6xl font-serif font-bold
                     text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
            Shahrisabz — Amir Temur vatani
          </h1>

          <p class="mt-4 text-base sm:text-lg
                    text-zinc-100/90 dark:text-zinc-100/90
                    drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
            UNESCO merosi bo‘lgan qadimiy shahar. Tarix, madaniyat va zamonaviy hayot uyg‘unlashgan maskan.
          </p>

          {/* Accent underline motif */}
          <div class="mx-auto mt-5 h-[3px] w-24
                      bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400
                      rounded-full" />

          {/* CTAs */}
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Asosiy – to‘liq kontrast */}
            <Button as="a" href="#attractions" size="lg">
              Joylarni ko‘rish
            </Button>
            {/* Outline – oq/qo‘ng‘ir fonlarda ham ko‘rinadigan qilib kuchaytirildi */}
            <a
              href="#events"
              class="inline-flex h-12 items-center justify-center rounded-xl px-5 text-base
                     border border-white/60 hover:border-white/80
                     text-white hover:text-white
                     bg-white/5 hover:bg-white/10
                     dark:border-white/40 dark:hover:border-white/70
                     transition active:translate-y-px"
            >
              Tadbirlar
            </a>
          </div>

          {/* Small helper text */}
          <p class="mt-4 text-xs text-zinc-200/80">
            Yo‘nalishlar, gidlar va festival ma’lumotlari muntazam yangilanadi
          </p>
        </div>
      </Container>

      {/* Bottom gradient to blend into next section */}
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24
                  bg-gradient-to-t from-white to-transparent
                  dark:from-zinc-950" />
    </section>
  );
});
