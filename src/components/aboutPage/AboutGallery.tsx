import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const AboutGallery = component$(() => {
  // ⚠️ Backendga ulaganda buni fetch/routeLoader$ ga ko‘chiring
  const images = [
    { src: '/images/about/gallery-1.jpg', alt: 'Oqsaroy peshtoqlari' },
    { src: '/images/about/gallery-2.jpg', alt: 'Dorut Tilovat majmuasi' },
    { src: '/images/about/gallery-3.jpg', alt: 'Dorussaodat maqbarasi' },
    { src: '/images/about/gallery-4.jpg', alt: 'Tarixiy ko‘cha manzarasi' },
    { src: '/images/about/gallery-5.jpg', alt: 'Hunarmandchilik bozori' },
    { src: '/images/about/gallery-6.jpg', alt: 'G‘isht naqshlari' },
    { src: '/images/about/gallery-7.jpg', alt: 'Peshayvon bezaklari' },
    { src: '/images/about/gallery-8.jpg', alt: 'Shahrisabz umumiy panorama' },
  ];

  const showBox = useSignal(false);
  const idx = useSignal(0);

  const open$ = $((i: number) => { idx.value = i; showBox.value = true; });
  const close$ = $(() => { showBox.value = false; });

  const prev$ = $(() => { idx.value = (idx.value - 1 + images.length) % images.length; });
  const next$ = $(() => { idx.value = (idx.value + 1) % images.length; });

  // Klaviatura: ESC yopish, ←/→ navigatsiya
  useVisibleTask$(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!showBox.value) return;
      if (e.key === 'Escape') showBox.value = false;
      if (e.key === 'ArrowLeft') idx.value = (idx.value - 1 + images.length) % images.length;
      if (e.key === 'ArrowRight') idx.value = (idx.value + 1) % images.length;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Fotogalereya</h2>
          <p class="mt-3 text-gray-600 dark:text-gray-300">Shahrisabz ruhini tasvirlarda his eting</p>
        </div>

        {/* Masonry uslubidagi ustunlar */}
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {images.map((img, i) => (
            <figure key={img.src} class="mb-4 break-inside-avoid cursor-pointer group" onClick$={() => open$(i)}>
              <img src={img.src} alt={img.alt} class="w-full h-auto rounded-xl shadow hover:scale-[1.02] transition-transform duration-300" loading="lazy" />
              <figcaption class="mt-2 text-sm text-gray-600 dark:text-gray-400">{img.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {showBox.value && (
        <div class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
          <button aria-label="Yopish" class="absolute top-5 right-5 text-white/80 hover:text-white text-3xl" onClick$={close$}>✕</button>
          <button class="absolute left-4 md:left-8 text-white/80 hover:text-white text-3xl select-none" onClick$={prev$}>‹</button>
          <img src={images[idx.value].src} alt={images[idx.value].alt} class="max-h-[80vh] max-w-[92vw] rounded-xl shadow-2xl" />
          <button class="absolute right-4 md:right-8 text-white/80 hover:text-white text-3xl select-none" onClick$={next$}>›</button>
        </div>
      )}
    </section>
  );
});
