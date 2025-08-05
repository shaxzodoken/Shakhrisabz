import { component$ } from "@builder.io/qwik";

export const AboutSection = component$(() => {
  return (
    <section class="relative bg-gradient-to-b from-black via-gray-900 to-black text-gray-200 py-16 px-6 font-serif">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Rasm */}
        <div class="flex-1">
          <img 
            src="/images/gallery-6.jpg" 
            alt="Tarixiy shahar" 
            class="rounded-lg shadow-lg border-4 border-yellow-400"
          />
        </div>

        {/* Matn */}
        <div class="flex-1">
          <h2 class="text-4xl font-extrabold mb-4 text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
            Shaharning Boy Tarixi
          </h2>
          <p class="bg-black/40 p-4 rounded-lg shadow mb-4">
            Ushbu shahar qadimiy savdo yo‘llarida joylashgan bo‘lib, asrlar davomida madaniyat va
            ilm markazi sifatida tanilgan. Uning tarixida turli xalqlar, buyuk hukmdorlar va
            madaniy meros iz qoldirgan.
          </p>
          <a href="/tarix" class="inline-block mt-2 bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold tracking-wide hover:scale-105 hover:shadow-[0_0_12px_rgba(255,215,0,0.7)] transition">
            Tarixni Batafsil O‘qing
          </a>
        </div>
      </div>
    </section>
  );
});
