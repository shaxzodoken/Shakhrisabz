// routes/events/index.tsx
import { component$, useSignal, $ } from '@builder.io/qwik';
import Navbar from '~/components/layout/Navbar';
import Footer from '~/components/layout/Footer';
import Button from '~/components/ui/Button';

export default component$(() => {
  const selectedCategory = useSignal('all');
  const selectedMonth = useSignal('all');

  const events = [
    {
      id: 1,
      img: '/images/gallery-1.jpg',
      date: '2025-09-10',
      title: 'Shahrisabz Hunarmandlar Festivali',
      location: 'Amir Temur maydoni',
      desc: 'Anʼanaviy hunarmandlar yarmarkasi, jonli musiqa va mahalliy taomlar.',
      category: 'festival',
      month: 'september'
    },
    {
      id: 2,
      img: '/images/gallery-2.jpg',
      date: '2025-10-02',
      title: 'Oʻzbek Milliy Raqs Kechasi',
      location: 'Shahrisabz Madaniyat Saroyi',
      desc: 'Eng yaxshi raqqoslar ijrosi va milliy kuy-qo'shiqlar oqshomi.',
      category: 'culture',
      month: 'october'
    },
    {
      id: 3,
      img: '/images/gallery-3.jpg',
      date: '2025-11-15',
      title: 'Tarixiy Shahar Turu',
      location: 'Oqsaroy va atrof hududlar',
      desc: 'Shahrisabzning boy tarixiga sayohat va ekskursiya.',
      category: 'tour',
      month: 'november'
    },
    {
      id: 4,
      img: '/images/gallery-4.jpg',
      date: '2025-12-20',
      title: 'Qishki Musiqa Festivali',
      location: 'Kok Gumbaz maydoni',
      desc: 'Qishki tunlarda klassik va zamonaviy musiqa.',
      category: 'music',
      month: 'december'
    },
    {
      id: 5,
      img: '/images/gallery-5.jpg',
      date: '2025-08-15',
      title: 'Yozgi Sanʼat Koʻrgazmasi',
      location: 'Shahrisabz Sanʼat Galereyasi',
      desc: 'Mahalliy rassomlar va haykaltaroshlar asarlari.',
      category: 'art',
      month: 'august'
    },
    {
      id: 6,
      img: '/images/gallery-6.jpg',
      date: '2025-07-30',
      title: 'Anʼanaviy Taomlar Festivali',
      location: 'Shahrisabz Oshxonasi',
      desc: 'Mahalliy taomlar va anʼanaviy retseptlar.',
      category: 'food',
      month: 'july'
    }
  ];

  const categories = [
    { id: 'all', name: 'Barchasi', icon: '🎉' },
    { id: 'festival', name: 'Festival', icon: '🎪' },
    { id: 'culture', name: 'Madaniyat', icon: '🎭' },
    { id: 'music', name: 'Musiqa', icon: '🎵' },
    { id: 'art', name: 'Sanʼat', icon: '🎨' },
    { id: 'food', name: 'Taomlar', icon: '🍽️' },
    { id: 'tour', name: 'Turlar', icon: '🗺️' }
  ];

  const months = [
    { id: 'all', name: 'Barcha oylar' },
    { id: 'july', name: 'Iyul' },
    { id: 'august', name: 'Avgust' },
    { id: 'september', name: 'Sentabr' },
    { id: 'october', name: 'Oktabr' },
    { id: 'november', name: 'Noyabr' },
    { id: 'december', name: 'Dekabr' }
  ];

  const filteredEvents = () => {
    return events.filter(event => {
      const categoryMatch = selectedCategory.value === 'all' || event.category === selectedCategory.value;
      const monthMatch = selectedMonth.value === 'all' || event.month === selectedMonth.value;
      return categoryMatch && monthMatch;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <main class="pt-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* HERO */}
        <section class="relative h-[500px] flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-primary-600 to-accent-600">
          <div class="absolute inset-0 bg-black/30"></div>
          <div class="relative z-10 text-center text-white">
            <h1 class="text-5xl md:text-7xl font-bold mb-4">Shahrisabz Tadbirlari</h1>
            <p class="text-xl md:text-2xl opacity-90 mb-8">Madaniyat, sanʼat va anʼanalar</p>
            <Button size="xl" variant="outline" class="border-white text-white hover:bg-white hover:text-primary-600">
              Tadbirlar jadvali
            </Button>
          </div>
        </section>

        {/* FILTERS */}
        <section class="bg-white dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
          <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-6">
              {/* Category Filter */}
              <div class="flex-1">
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Kategoriya</h3>
                <div class="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick$={() => selectedCategory.value = category.id}
                      class={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory.value === category.id
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span class="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Month Filter */}
              <div class="flex-1">
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Oy</h3>
                <div class="flex flex-wrap gap-2">
                  {months.map(month => (
                    <button
                      key={month.id}
                      onClick$={() => selectedMonth.value = month.id}
                      class={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedMonth.value === month.id
                          ? 'bg-accent-500 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {month.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTS GRID */}
        <section class="max-w-7xl mx-auto px-6 py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents().map((event) => (
              <div key={event.id} class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="relative overflow-hidden">
                  <img 
                    src={event.img} 
                    alt={event.title} 
                    class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div class="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {categories.find(c => c.id === event.category)?.icon}
                  </div>
                </div>
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                      {formatDate(event.date)}
                    </span>
                    <span class="text-accent-600 dark:text-accent-400 text-sm">
                      {months.find(m => m.id === event.month)?.name}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {event.title}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    📍 {event.location}
                  </p>
                  <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {event.desc}
                  </p>
                  <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button size="sm" class="w-full gradient-primary hover:scale-105 transition-transform duration-200">
                      Batafsil maʼlumot
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents().length === 0 && (
            <div class="text-center py-16">
              <div class="text-6xl mb-4">🎭</div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tadbirlar topilmadi</h3>
              <p class="text-gray-600 dark:text-gray-400">Tanlangan filtrlarda tadbirlar mavjud emas</p>
            </div>
          )}
        </section>

        {/* FEATURED FESTIVAL */}
        <section class="max-w-7xl mx-auto px-6 py-16">
          <div class="relative bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl overflow-hidden shadow-2xl">
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="relative p-10 md:p-16 text-white">
              <div class="max-w-2xl">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">Shahrisabz Musiqa va Sanʼat Festivali</h2>
                <p class="text-xl mb-8 opacity-90 leading-relaxed">
                  Har yili oʻtkaziladigan bu festival Shahrisabzning madaniy hayotidagi eng yirik voqea boʻlib, 
                  mahalliy va xalqaro sanʼatkorlarni birlashtiradi.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="outline" class="border-white text-white hover:bg-white hover:text-primary-600">
                    Batafsil maʼlumot
                  </Button>
                  <Button size="lg" class="bg-white text-primary-600 hover:bg-gray-100">
                    Ro'yxatdan o'tish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PHOTO GALLERY */}
        <section class="max-w-7xl mx-auto px-6 py-16">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            O'tgan Tadbirlar
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['/images/gallery-1.jpg','/images/gallery-2.jpg','/images/gallery-3.jpg','/images/gallery-4.jpg','/images/gallery-5.jpg','/images/gallery-6.jpg','/images/gallery-1.jpg','/images/gallery-2.jpg'].map((img, idx) => (
              <div key={idx} class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src={img} 
                  alt={`Gallery ${idx+1}`} 
                  class="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span class="text-white text-lg font-medium">Ko'rish</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
          <div class="max-w-4xl mx-auto text-center px-6">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">Shahrisabz Madaniyatini Birgalikda Bayram Qiling!</h2>
            <p class="text-xl mb-8 opacity-90">Tadbirlar jadvalini kuzatib boring va o'zingizni qiziqtirgan voqealarda ishtirok eting.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="outline" class="border-white text-white hover:bg-white hover:text-primary-600">
                Tadbirlar jadvali
              </Button>
              <Button size="xl" class="bg-white text-primary-600 hover:bg-gray-100">
                Ro'yxatdan o'tish
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});
