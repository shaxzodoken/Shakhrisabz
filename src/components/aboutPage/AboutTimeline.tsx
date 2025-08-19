import { component$ } from '@builder.io/qwik';

export const AboutTimeline = component$(() => {
  const events = [
    { year: '1336', title: 'Amir Temur Tug‘ilishi', desc: 'Shahrisabz yaqinidagi Xo‘ja Ilg‘or qishlog‘ida.' },
    { year: '1370', title: 'Temuriylar Davri Boshlanishi', desc: 'Shahrisabz markaziy siyosiy maydonga aylandi.' },
    { year: '2000', title: 'UNESCO Merosi', desc: 'Shahrisabz tarixiy markazi UNESCO ro‘yxatiga kiritildi.' }
  ];

  return (
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Tarixiy Voqealar</h2>
        <div class="relative border-l border-gray-300 dark:border-gray-600">
          {events.map((e, i) => (
            <div key={i} class="mb-10 ml-6">
              <div class="absolute w-3 h-3 bg-emerald-500 rounded-full mt-2.5 -left-1.5"></div>
              <time class="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{e.year}</time>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{e.title}</h3>
              <p class="text-base font-normal text-gray-600 dark:text-gray-300">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
