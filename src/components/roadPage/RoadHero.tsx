import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-20">
      <div class="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover the Ancient
            <span class="text-yellow-400 dark:text-yellow-300 block">Silk Road</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-gray-200 dark:text-gray-300 leading-relaxed">
            Embark on a journey through time along the legendary trade routes that connected 
            East and West, shaping civilizations and cultures across continents.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#routes" 
              class="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-gray-900 dark:text-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
            >
              Explore Routes
            </Link>
            <Link 
              href="#map" 
              class="border-2 border-white hover:bg-white hover:text-gray-900 dark:border-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900 font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
            >
              View Map
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 dark:from-black to-transparent"></div>
      <div class="absolute top-10 left-10 w-20 h-20 border-2 border-yellow-400/30 dark:border-yellow-300/30 rounded-full"></div>
      <div class="absolute top-20 right-20 w-16 h-16 border-2 border-white/20 dark:border-gray-300/20 rounded-full"></div>
      <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400/20 dark:bg-yellow-300/20 rounded-full"></div>
    </section>
  );
}); 