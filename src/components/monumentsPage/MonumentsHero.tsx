import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section class="relative bg-gray-900 text-white">
      <div class="absolute inset-0">
        <img
          src="/images/gallery-1.jpg"
          alt="Shahrisabz Monuments"
          class="w-full h-full object-cover opacity-70"
        />
      </div>
      <div class="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Shahrisabz Tarixiy Obidalari
        </h1>
        <p class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          Buyuk ajdodlarimiz qoldirgan betakror me’moriy yodgorliklar bilan tanishing.
          Har bir obida — o‘z davrining tarixiy guvohi.
        </p>
      </div>
    </section>
  );
});
