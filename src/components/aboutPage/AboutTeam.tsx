import { component$ } from '@builder.io/qwik';

export const AboutTeam = component$(() => {
  // ⚠️ Keyin CMS/API: /api/team
  const team = [
    { name: 'Zilola Karimova', role: 'Madaniyat bo‘limi', img: '/images/team/1.jpg' },
    { name: 'Jahongir R.', role: 'Tarixshunos', img: '/images/team/2.jpg' },
    { name: 'Shahnoza N.', role: 'Turizm koordinatori', img: '/images/team/3.jpg' },
    { name: 'Abdulloh T.', role: 'Hunarmandlar bilan ishlar', img: '/images/team/4.jpg' },
  ];

  return (
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Jamoa</h2>
          <p class="mt-3 text-gray-600 dark:text-gray-300">Shahrisabz merosini targ‘ib qilayotgan fidoyilar</p>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((m) => (
            <div key={m.name} class="group bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow hover:shadow-2xl transition">
              <div class="relative">
                <img src={m.img} alt={m.name} class="w-full h-56 object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              </div>
              <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{m.name}</h3>
                <p class="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{m.role}</p>

                {/* ijtimoiy linklar (stub) */}
                <div class="mt-3 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <a href="#" class="hover:text-emerald-500">LinkedIn</a>
                  <span>•</span>
                  <a href="#" class="hover:text-emerald-500">Telegram</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
