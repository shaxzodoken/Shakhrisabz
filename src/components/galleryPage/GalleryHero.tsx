import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section class="relative h-[320px] md:h-[420px] flex items-center justify-center overflow-hidden">
      {/* 📸 Background */}
      <img
        src="/images/gallery-1.jpg"
        alt="Shahrisabz Gallery"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* 🏷 Title */}
      <div class="relative z-10 text-center px-6">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-xl">
          Shahrisabz Galereyasi
        </h1>
        <p class="mt-4 text-gray-200 max-w-2xl mx-auto">
          Qadimiy yodgorliklar, ko‘hna ko‘chalar va zamonaviy ruh — barchasi bitta sahifada.
        </p>
      </div>
    </section>
  );
});
