import { component$ } from '@builder.io/qwik';

const galleryItems = [
  {
    title: 'Ak-Saroy qadimiy rasm',
    description: 'XIX asrda chizilgan Ak-Saroy tasviri',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    year: '1800s'
  },
  {
    title: 'Shahrisabz manzarasi',
    description: 'Qashqadaryo vodiysidagi go\'zal tabiiy manzara',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    year: '1900s'
  },
  {
    title: 'Dorut Saodat majmuasi',
    description: 'Amir Temur oilasi uchun qurilgan maqbara',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    year: '1400s'
  },
  {
    title: 'Kok Gumbaz masjidi',
    description: 'XVI asrda qurilgan yashil gumbazli masjid',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=600&fit=crop',
    year: '1500s'
  },
  {
    title: 'Chorsu bozori',
    description: 'Qadimiy savdo markazi va bozor',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    year: '1600s'
  },
  {
    title: 'Shahrisabz qal\'asi',
    description: 'Qadimiy qal\'a va mudofaa inshootlari',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db71102?w=800&h=600&fit=crop',
    year: '1300s'
  }
];

export default component$(() => {
  return (
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Tarixiy galereya
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Shahrisabzning tarixiy rasmlari va hujjatlari
          </p>
        </div>

        {/* Gallery Grid */}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div key={index} class="group">
              <div class="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div class="aspect-[4/3] bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-black/20"></div>
                  
                  {/* Year Badge */}
                  <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-bold text-blue-700 dark:text-blue-300">
                      {item.year}
                    </span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-4 left-4 right-4 text-white">
                      <h3 class="text-lg font-bold mb-2">{item.title}</h3>
                      <p class="text-sm text-gray-200">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div class="text-center mt-16">
          <a 
            href="/gallery" 
            class="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            To'liq galereyani ko'rish
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
});
