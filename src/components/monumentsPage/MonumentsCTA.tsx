import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section class="bg-emerald-700 text-white py-16 text-center">
      <div class="max-w-3xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-4">
          Shahrisabzga sayohat qilishni rejalashtiring
        </h2>
        <p class="text-lg mb-6">
          Tarixiy obidalar va me’moriy durdonalarni o‘z ko‘zingiz bilan ko‘rish uchun
          bugun sayohatingizni boshlang.
        </p>
        <a
          href="/contact"
          class="inline-block px-6 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Biz bilan bog‘lanish
        </a>
      </div>
    </section>
  );
});
