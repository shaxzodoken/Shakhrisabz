// src/components/landing/PartnersStrip.tsx
import { component$ } from '@builder.io/qwik';

export const PartnersStrip = component$(() => {
  const partners = [
    { name: 'UNESCO', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/UNESCO_logo.svg/2560px-UNESCO_logo.svg.png' },
    { name: 'Uzbekistan Airways', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Uzbekistan_Airways_logo.svg' },
    { name: 'Booking.com', logo: 'https://1000logos.net/wp-content/uploads/2021/05/Booking.Com-logo.png' },
    { name: 'Tripadvisor', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Tripadvisor_logoset_solid_green.svg' },
    { name: 'Hilton', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/HiltonHotelsLogo.svg/2560px-HiltonHotelsLogo.svg.png' },
  ];

  return (
    <section class="py-16 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-900/60 pointer-events-none" />

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <h2 class="text-center text-2xl md:text-3xl font-semibold text-zinc-800 dark:text-zinc-200 mb-10">
          Bizning ishonchli hamkorlarimiz
        </h2>

        {/* LOGO STRIP */}
        <div class="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {partners.map((p) => (
            <div
              key={p.name}
              class="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
            >
              <img
                src={p.logo}
                alt={p.name}
                class="h-10 md:h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
