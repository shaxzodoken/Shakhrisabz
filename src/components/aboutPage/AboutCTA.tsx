import { component$ } from '@builder.io/qwik';

export const AboutCTA = component$(() => {
  return (
    <section class="relative min-h-[60vh] flex items-center justify-center bg-center bg-cover"
      style="background-image: url('/images/about/cta-bg.jpg');">
      <div class="absolute inset-0 bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-black/80"></div>

      <div class="relative z-10 text-center text-white px-6 max-w-3xl">
        <h2 class="text-4xl md:text-5xl font-extrabold drop-shadow-lg">Shahrisabzni Yangi Ko‘z Bilan Kashing</h2>
        <p class="mt-4 text-lg text-emerald-100">
          Tarixiy obidalar, mahalliy sanʼat va zamonaviy hayot uyg‘unligi. Bugunoq sayohatingizni rejalashtiring.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" class="px-6 py-3 rounded-lg bg-white text-emerald-700 font-semibold hover:bg-gray-100 transition">
            Biz bilan bog‘lanish
          </a>
          <a href="/monuments" class="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition">
            Yodgorliklarni ko‘rish
          </a>
        </div>
      </div>
    </section>
  );
});
