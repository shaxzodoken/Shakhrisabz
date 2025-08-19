import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Madaniy meros
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Shahrisabzning boy madaniy merosi va an'analari
          </p>
        </div>

        {/* Cultural Heritage Grid */}
        <div class="grid lg:grid-cols-2 gap-12">
          <div class="space-y-8">
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">🏛️ Me'moriy meros</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Shahrisabz XIV-XV asrlarda qurilgan ajoyib me'moriy obidalar bilan mashhur. 
                Ak-Saroy, Dorut Saodat, Dorut Tilovat kabi tarixiy binolar hozirgacha saqlanib qolgan.
              </p>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Ak-Saroy - Amir Temur saroyi</li>
                <li>• Dorut Saodat - Maqbara majmuasi</li>
                <li>• Dorut Tilovat - Qur'on o'qish majmuasi</li>
                <li>• Kok Gumbaz - XVI asr masjidi</li>
              </ul>
            </div>
            
            <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-xl">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">🎨 San'at va hunarmandchilik</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Shahrisabzda qadimiy hunarmandchilik an'analari saqlanib qolgan. 
                Ganchkorlik, naqqoshlik, zargarlik kabi hunarlar rivojlangan.
              </p>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Ganchkorlik san'ati</li>
                <li>• Naqqoshlik va bezak</li>
                <li>• Zargarlik hunari</li>
                <li>• Gilam to'qish</li>
              </ul>
            </div>
          </div>
          
          <div class="space-y-8">
            <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-xl">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">📚 Ilm-fan va ta'lim</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Shahrisabz O'rta asrlarda ilm-fan va ta'lim markazi bo'lgan. 
                Bu yerda ko'plab olimlar, shoirlar va san'atkorlar yashab ijod qilgan.
              </p>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Madrasalar va kutubxonalar</li>
                <li>• Astronomiya va matematika</li>
                <li>• Tibbiyot va farmakologiya</li>
                <li>• Adabiyot va she'riyat</li>
              </ul>
            </div>
            
            <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-8 rounded-xl">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">🌿 Tabiiy meros</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Shahrisabz nomi "yashil shahar" degan ma'noni beradi. 
                Qashqadaryo vodiysida joylashgan bu shahar o'zining yashil bog'lari bilan ajralib turadi.
              </p>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Yashil bog'lar va daraxtlar</li>
                <li>• Qashqadaryo vodiysi</li>
                <li>• Tabiiy manzaralar</li>
                <li>• Iqlim va tuproq</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
