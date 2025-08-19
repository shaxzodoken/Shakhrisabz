import { component$ } from '@builder.io/qwik';

const monuments = [
  {
    id: 1,
    name: 'Oqsaroy saroyi',
    description: 'Amir Temur davrida qurilgan ulkan saroy majmuasi.',
    image: '/images/monuments/oqsaroy.jpg',
  },
  {
    id: 2,
    name: 'Dorut Tilovat majmuasi',
    description: 'Diniy markaz va madrasalar majmuasi.',
    image: '/images/monuments/dorut-tilovat.jpg',
  },
  {
    id: 3,
    name: 'Dor us-Saodat majmuasi',
    description: 'Temuriylar sulolasi maqbaralari joylashgan majmua.',
    image: '/images/monuments/dor-us-saodat.jpg',
  },
];

export default component$(() => {
  return (
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
          Tarixiy obidalar
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {monuments.map((monument) => (
            <div
              key={monument.id}
              class="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <img
                src={monument.image}
                alt={monument.name}
                class="w-full h-56 object-cover"
              />
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {monument.name}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  {monument.description}
                </p>
                <a
                  href="/monuments/detail"
                  class="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Batafsil
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
