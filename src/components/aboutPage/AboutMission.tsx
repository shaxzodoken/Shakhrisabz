import { component$ } from '@builder.io/qwik';

export const AboutMission = component$(() => {
  const missions = [
    {
      title: 'Tarixiy Merosni Asrash',
      desc: 'UNESCO merosidagi inshootlar, madaniy yodgorliklarni kelajak avlodlarga yetkazish.',
      icon: '🏛️'
    },
    {
      title: 'Zamonaviy Turizm',
      desc: 'Shahrisabzni jahonga tanitish va sayyohlar uchun qulay sharoit yaratish.',
      icon: '🌍'
    },
    {
      title: 'Mahalliy Iqtisodiyot',
      desc: 'Mahalliy hunarmandchilik, gastronomiya va xizmat ko‘rsatishni rivojlantirish.',
      icon: '💼'
    }
  ];

  return (
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Bizning Missiyamiz
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          {missions.map((m, i) => (
            <div key={i} class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition">
              <div class="text-4xl mb-4">{m.icon}</div>
              <h3 class="text-xl font-semibold mb-2">{m.title}</h3>
              <p class="text-gray-600 dark:text-gray-300">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
