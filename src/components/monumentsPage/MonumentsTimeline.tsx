const events = [
  { year: "XIV asr", text: "Oqsaroy qurilishi boshlandi." },
  { year: "XV asr", text: "Dorut Tilovat majmuasi bunyod etildi." },
  { year: "XVI asr", text: "Shahrisabz siyosiy va madaniy markaz sifatida gulladi." },
  { year: "XX asr", text: "Ko‘plab yodgorliklar restavratsiya qilindi." }
];

export default function MonumentsTimeline() {
  return (
    <section class="py-16 px-4 max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">Tarixiy voqealar</h2>
      <div class="relative border-l-4 border-amber-500 dark:border-amber-400">
        {events.map((e, i) => (
          <div key={i} class="mb-8 ml-6">
            <div class="absolute w-4 h-4 bg-amber-500 dark:bg-amber-400 rounded-full -left-2.5 mt-1" />
            <h3 class="text-xl font-semibold">{e.year}</h3>
            <p class="text-gray-600 dark:text-gray-300">{e.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
