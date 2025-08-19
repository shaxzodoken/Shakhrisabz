const images = [
  "/images/monuments/gallery1.jpg",
  "/images/monuments/gallery2.jpg",
  "/images/monuments/gallery3.jpg",
  "/images/monuments/gallery4.jpg",
  "/images/monuments/gallery5.jpg",
  "/images/monuments/gallery6.jpg"
];

export default function MonumentsGallery() {
  return (
    <section class="py-16 bg-gray-100 dark:bg-gray-800">
      <h2 class="text-3xl font-bold text-center mb-8">Fotogalereya</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Gallery ${i}`} class="rounded-lg shadow-lg hover:scale-105 transition object-cover h-64 w-full" />
        ))}
      </div>
    </section>
  );
}
