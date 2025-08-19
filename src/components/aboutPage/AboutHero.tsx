import { component$ } from '@builder.io/qwik';

export const AboutHero = component$(() => {
  return (
    <section class="relative min-h-[80vh] flex items-center justify-center bg-fixed bg-center bg-cover"
      style="background-image: url('/images/shahrisabz-hero.jpg');">
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
      <div class="relative z-10 text-center text-white max-w-4xl px-6">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">Shahrisabz — Tarix va Zamonaviyat Chorrahasi</h1>
        <p class="text-lg md:text-xl text-gray-200">
          Buyuk Amir Temur yuragi, Sharq me’morchiligi durdonasi va O‘zbekistonning madaniy markazlaridan biri.
        </p>
      </div>
    </section>
  );
});
