import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-800/70 to-purple-800/80">
        <div class="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div class="absolute inset-0">
        <div class="absolute top-20 left-20 w-32 h-32 border-2 border-blue-400/30 rounded-full animate-pulse"></div>
        <div class="absolute top-40 right-32 w-24 h-24 border-2 border-purple-400/20 rounded-full animate-ping"></div>
        <div class="absolute bottom-40 left-1/3 w-16 h-16 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div class="absolute bottom-20 right-20 w-20 h-20 border-2 border-white/10 rounded-full animate-spin"></div>
      </div>

      {/* Main Content */}
      <div class="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div class="mb-8">
          <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <Link href="/" class="text-gray-300 hover:text-white transition-colors">Bosh sahifa</Link>
            <span class="text-gray-400">/</span>
            <span class="text-white font-semibold">Tarix</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span class="block text-blue-300">Shahrisabz</span>
          <span class="block text-white">Tarixi</span>
          <span class="block text-purple-200">600 yillik meros</span>
        </h1>

        {/* Subtitle */}
        <p class="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
          Amir Temur davlatining poytaxti bo'lgan Shahrisabz - O'rta Osiyoning eng qadimiy va muhim shaharlaridan biri. 
          XIV-XV asrlarda qurilgan ajoyib me'moriy obidalar hozirgacha saqlanib qolgan.
        </p>

        {/* Quick Stats */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div class="text-2xl md:text-3xl font-bold text-blue-300">1336</div>
            <div class="text-sm text-gray-200">Asos solingan</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div class="text-2xl md:text-3xl font-bold text-purple-300">1400</div>
            <div class="text-sm text-gray-200">Oltin davr</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div class="text-2xl md:text-3xl font-bold text-green-300">5+</div>
            <div class="text-sm text-gray-200">Tarixiy obida</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div class="text-2xl md:text-3xl font-bold text-yellow-300">UNESCO</div>
            <div class="text-sm text-gray-200">Jahon merosi</div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="#timeline" 
            class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Tarix xronologiyasi
          </Link>
          <Link 
            href="#figures" 
            class="border-2 border-white hover:bg-white hover:text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 backdrop-blur-md"
          >
            Tarixiy shaxslar
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div class="absolute top-1/4 left-10 text-white/20 text-6xl animate-float">🏛️</div>
      <div class="absolute top-1/3 right-20 text-white/20 text-5xl animate-float-delayed">⚔️</div>
      <div class="absolute bottom-1/3 left-20 text-white/20 text-4xl animate-float">🕌</div>
      <div class="absolute bottom-1/4 right-10 text-white/20 text-5xl animate-float-delayed">📜</div>
    </section>
  );
});
