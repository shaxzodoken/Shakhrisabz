import { component$ } from '@builder.io/qwik';

interface RouteCard {
  id: string;
  title: string;
  description: string;
  distance: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  highlights: string[];
  image: string;
}

const routes: RouteCard[] = [
  {
    id: 'northern-route',
    title: 'Northern Silk Road',
    description: 'The northern route through Central Asia, connecting China to the Mediterranean via the steppes.',
    distance: '6,500 km',
    duration: '8-12 months',
    difficulty: 'Hard',
    highlights: ['Taklamakan Desert', 'Pamir Mountains', 'Samarkand', 'Bukhara'],
    image: '/images/northern-route.jpg'
  },
  {
    id: 'southern-route',
    title: 'Southern Silk Road',
    description: 'The southern route through the Indian subcontinent and the Middle East.',
    distance: '5,800 km',
    duration: '6-10 months',
    difficulty: 'Medium',
    highlights: ['Kashmir Valley', 'Indus Valley', 'Persian Gulf', 'Baghdad'],
    image: '/images/southern-route.jpg'
  },
  {
    id: 'maritime-route',
    title: 'Maritime Silk Road',
    description: 'The sea route connecting China to the Mediterranean through the Indian Ocean.',
    distance: '8,000 km',
    duration: '12-18 months',
    difficulty: 'Medium',
    highlights: ['Malacca Strait', 'Indian Ocean', 'Red Sea', 'Alexandria'],
    image: '/images/maritime-route.jpg'
  }
];

export default component$(() => {
  return (
    <section id="routes" class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ancient Trade Routes
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the three main branches of the Silk Road that connected the ancient world, 
            each with its own unique challenges and treasures.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route) => (
            <div key={route.id} class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300">
              <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 relative">
                <div class="absolute inset-0 bg-black/20 dark:bg-black/30"></div>
                <div class="absolute bottom-4 left-4">
                  <span class={`px-3 py-1 rounded-full text-sm font-semibold ${
                    route.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    route.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {route.difficulty}
                  </span>
                </div>
              </div>
              
              <div class="p-6">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">{route.title}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">{route.description}</p>
                
                <div class="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>Distance: {route.distance}</span>
                  <span>Duration: {route.duration}</span>
                </div>
                
                <div class="mb-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Key Highlights:</h4>
                  <ul class="space-y-1">
                    {route.highlights.map((highlight, index) => (
                      <li key={index} class="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <span class="w-2 h-2 bg-yellow-400 dark:bg-yellow-300 rounded-full mr-2"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}); 