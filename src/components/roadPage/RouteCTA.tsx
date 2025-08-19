import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p class="text-xl md:text-2xl mb-8 text-gray-200 dark:text-gray-300 leading-relaxed">
            Join thousands of adventurers who have explored the ancient Silk Road. 
            Discover hidden treasures, ancient cultures, and unforgettable experiences 
            that will change your perspective forever.
          </p>
          
          <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div class="text-center">
              <div class="w-16 h-16 bg-yellow-500 dark:bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Plan Your Route</h3>
              <p class="text-gray-300 dark:text-gray-400">Choose from our carefully curated routes and customize your adventure.</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Book Your Trip</h3>
              <p class="text-gray-300 dark:text-gray-400">Secure your spot with our trusted travel partners and guides.</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Start Exploring</h3>
              <p class="text-gray-300 dark:text-gray-400">Begin your journey and create memories that will last a lifetime.</p>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              class="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-gray-900 dark:text-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors duration-300 text-lg"
            >
              Book Your Adventure
            </Link>
            <Link 
              href="/contact" 
              class="border-2 border-white hover:bg-white hover:text-gray-900 dark:border-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900 font-semibold px-8 py-4 rounded-lg transition-colors duration-300 text-lg"
            >
              Contact Our Experts
            </Link>
          </div>
          
          <div class="mt-8 text-sm text-gray-300 dark:text-gray-400">
            <p>Join our community of 10,000+ Silk Road explorers</p>
            <div class="flex justify-center items-center mt-4 space-x-4">
              <div class="flex -space-x-2">
                <div class="w-8 h-8 bg-blue-500 dark:bg-blue-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                <div class="w-8 h-8 bg-green-500 dark:bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                <div class="w-8 h-8 bg-yellow-500 dark:bg-yellow-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                <div class="w-8 h-8 bg-red-500 dark:bg-red-400 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <span>+9,996 more adventurers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}); 