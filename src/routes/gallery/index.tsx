import { $, component$, useSignal } from '@builder.io/qwik';
import Navbar from '~/components/layout/Navbar';
import Footer from '~/components/layout/Footer';
import { GalleryHero, FilterBar, ImageCard, Lightbox } from '~/components/galleryPage';

// ⚠️ Hozircha statik data; backend chiqqach headless CMS yoki API bilan almashtiriladi
const IMAGES: { src: string; alt: string; tag: string }[] = [
  { src: '/images/gallery-1.jpg',    alt: 'Oqsaroy peshtoqlari', tag: 'Oqsaroy' },
  { src: '/images/gallery-2.jpg', alt: 'Kok Gumbaz masjidi', tag: 'Masjid' },
  { src: '/images/gallery-3.jpg',  alt: 'Shahrisabz suv inshooti', tag: 'Inshoot' },
  { src: '/images/gallery-4.jpg',      alt: 'Registon ansambli', tag: 'Atrof' },
  { src: '/images/gallery-5.jpg',alt: 'Pamir tog‘lari', tag: 'Tabiat' },
  { src: '/images/gallery-6.jpg', alt: 'Konstantinopol manzarasi', tag: 'Tarix' },
  { src: '/images/gallery-1.jpg',    alt: 'Mog‘o g‘orlari', tag: 'IpakYo‘li' },
  { src: '/images/gallery-2.jpg',     alt: 'Taklamakon cho‘li', tag: 'Tabiat' },
  { src: '/images/gallery-3.jpg', alt: 'Dorut Tilovat bezaklari', tag: 'Bezak' },
];

const TAGS = Array.from(new Set(IMAGES.map(i => i.tag))).sort();

export default component$(() => {
  const activeTag = useSignal<string>('Barchasi');
  const showBox = useSignal(false);
  const boxImages = IMAGES.map(i => i.src);
  const startIndex = useSignal(0);

  const handleFilter$ = $((tag: string) => (activeTag.value = tag));
  const openBox$ = $((idx: number) => {
    startIndex.value = idx;
    showBox.value = true;
  });

  const filtered = () =>
    activeTag.value === 'Barchasi'
      ? IMAGES
      : IMAGES.filter(i => i.tag === activeTag.value);

  return (
    <>
      <Navbar />
      <GalleryHero />

      {/* Filter panel */}
      <section class="py-8 bg-white dark:bg-gray-900 border-b border-gray-200/60 dark:border-gray-800/60">
        <div class="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Tasvirlar</h2>
          <FilterBar tags={TAGS} onChange$={handleFilter$} />
        </div>
      </section>

      {/* Masonry grid (CSS grid bilan) */}
      <section class="py-10 bg-gray-50 dark:bg-gray-950">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <div
            class="
              columns-1 sm:columns-2 lg:columns-3
              gap-4 [column-fill:_balance]
            "
          >
            {filtered().map((img, i) => (
              <div key={img.src} class="mb-4 break-inside-avoid">
                <ImageCard
                  src={img.src}
                  alt={img.alt}
                  tag={img.tag}
                  onClick$={() => openBox$(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {showBox.value && (
        <Lightbox
          images={boxImages}
          startIndex={startIndex.value}
          onClose$={() => (showBox.value = false)}
        />
      )}

      <Footer />
    </>
  );
});
