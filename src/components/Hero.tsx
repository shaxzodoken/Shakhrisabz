import { component$ } from '@builder.io/qwik';

export const Hero = component$(() => {
  return (
    <section class="relative h-screen flex items-center justify-center text-center overflow-hidden font-serif">
      
      {/* 🎥 Video Background */}
      <video autoplay muted loop playsInline class="absolute w-full h-full object-cover">
        <source src="/video/history.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Antique Overlay */}
      <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>

      {/* 🏛 Content */}
      <div class="relative z-10 max-w-3xl px-6">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-yellow-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]">
          <span class="border-b-4 border-yellow-400 pb-2">
            Qadimiy Shahar Hikoyalari
          </span>
        </h1>

        <p class="text-xl md:text-2xl text-gray-200 bg-black/40 px-4 py-2 inline-block rounded-lg mb-8 shadow-[0_0_10px_rgba(0,0,0,0.7)]">
          Asrlar davomida shakllangan voqealar, unutilmas manzaralar va meros — barchasi shu yerda.
        </p>

        <a href="/tarix" class="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] hover:scale-105 transition">
          Tarixni Kashf Et
        </a>
      </div>
    </section>
  );
});
