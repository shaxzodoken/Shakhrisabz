import { component$ } from "@builder.io/qwik";

export const HighlightsSection = component$(() => {
  const highlights = [
    { title: "Qadimiy Obidalar", desc: "Asrlar davomida saqlanib qolgan me’moriy yodgorliklarni kashf eting.", icon: "🏛" },
    { title: "Madaniyat va An’analar", desc: "Shahar ruhini his qilish uchun qadimiy urf-odatlar bilan tanishing.", icon: "🎭" },
    { title: "Savdo Yo‘llari Tarixi", desc: "Buyuk Ipak Yo‘li davridan qolgan tarixiy savdo markazlarini ko‘ring.", icon: "🗺" },
  ];

  return (
    <section class="bg-gradient-to-b from-black via-gray-900 to-black text-gray-200 py-16 px-6 font-serif">
      <h2 class="text-4xl font-extrabold text-center mb-10 text-yellow-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]">
        Shaharning Yoritilgan Nuqtalari
      </h2>

      {/* Highlights Grid */}
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {highlights.map((h, i) => (
          <div key={i} class="bg-black/40 border border-yellow-400 p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition">
            <div class="text-5xl mb-4 text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">{h.icon}</div>
            <h3 class="text-2xl font-bold mb-2 text-yellow-300">{h.title}</h3>
            <p class="text-gray-300">{h.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div class="text-center mt-12">
        <h3 class="text-3xl font-bold mb-4 text-yellow-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
          Siz ham ushbu tarixning bir qismi bo‘ling!
        </h3>
        <a href="/tarix" class="inline-block bg-yellow-400 text-black px-10 py-4 rounded-full font-extrabold tracking-widest shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(255,215,0,0.7)] transition">
          Sirlarni Kashf Et →
        </a>
      </div>
    </section>
  );
});
