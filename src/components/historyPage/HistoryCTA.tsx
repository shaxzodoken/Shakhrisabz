import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section class="py-20 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 text-white">
      <div class="max-w-4xl mx-auto text-center px-6">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Shahrisabz tarixini o'rganing
        </h2>
        <p class="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
          Amir Temur davlatining poytaxti haqida ko'proq ma'lumot olish uchun biz bilan bog'laning
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="/monuments" 
            class="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-full text-lg transition-colors duration-300"
          >
            Obidalarni ko'rish
          </a>
          <a 
            href="/contact" 
            class="border-2 border-white hover:bg-white hover:text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-colors duration-300"
          >
            Biz bilan bog'laning
          </a>
        </div>
      </div>
    </section>
  );
});
