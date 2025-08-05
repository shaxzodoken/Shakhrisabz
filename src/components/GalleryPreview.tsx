import { component$ } from "@builder.io/qwik";

export const GalleryPreview = component$(() => {
  const images = [
    { src: "/images/gallery-1.jpg", title: "Eski Bozor" },
    { src: "/images/gallery-2.jpg", title: "Qadimiy Darvoza" },
    { src: "/images/gallery-3.jpg", title: "Shahar Ko‘rinishi" },
    { src: "/images/gallery-4.jpg", title: "Me’moriy Obida" },
    { src: "/images/gallery-5.jpg", title: "Eski Ko‘prik" },
    { src: "/images/gallery-6.jpg", title: "Madaniyat Markazi" },
  ];

  return (
    <section class="bg-gradient-to-b from-black via-gray-900 to-black py-16 px-6 font-serif">
      <h2 class="text-4xl font-extrabold text-center mb-10 text-yellow-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]">
        Tarixiy Galereya
      </h2>

      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {images.map((img, i) => (
    <div 
      key={i} 
      class="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
    >
      <img 
        src={img.src} 
        alt={img.title} 
        class="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
      />
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
        <span class="text-lg font-bold text-yellow-300 drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]">
          {img.title}
        </span>
      </div>
    </div>
  ))}
</div>


      {/* CTA */}
      <div class="text-center mt-10">
        <a href="/galereya" class="inline-block bg-yellow-400 text-black px-8 py-3 rounded-full font-bold tracking-wider shadow-lg hover:scale-105 hover:shadow-[0_0_12px_rgba(255,215,0,0.7)] transition">
          Barcha Suratlarni Ko‘rish →
        </a>
      </div>
    </section>
  );
});
