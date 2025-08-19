import { component$ } from '@builder.io/qwik';

interface MapPoint {
  id: string;
  name: string;
  description: string;
  coordinates: { x: number; y: number };
  type: 'city' | 'oasis' | 'mountain' | 'desert';
}

const mapPoints: MapPoint[] = [
  {
    id: 'xi-an',
    name: 'Xi\'an',
    description: 'Starting point of the Silk Road, capital of ancient China',
    coordinates: { x: 85, y: 75 },
    type: 'city'
  },
  {
    id: 'dunhuang',
    name: 'Dunhuang',
    description: 'Famous for the Mogao Caves and the Jade Gate',
    coordinates: { x: 70, y: 70 },
    type: 'oasis'
  },
  {
    id: 'samarkand',
    name: 'Samarkand',
    description: 'Crossroads of cultures, known for its stunning architecture',
    coordinates: { x: 45, y: 60 },
    type: 'city'
  },
  {
    id: 'baghdad',
    name: 'Baghdad',
    description: 'Center of Islamic learning and trade',
    coordinates: { x: 25, y: 55 },
    type: 'city'
  },
  {
    id: 'constantinople',
    name: 'Constantinople',
    description: 'Gateway to Europe, modern-day Istanbul',
    coordinates: { x: 15, y: 50 },
    type: 'city'
  }
];

export default component$(() => {
  return (
    <section id="map" class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Interactive Silk Road Map
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the key cities, oases, and landmarks along the ancient trade routes 
            that connected the East and West for centuries.
          </p>
        </div>
        
        <div class="relative">
          {/* Map Container */}
          <div class="relative bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-900 dark:via-orange-900 dark:to-red-900 rounded-2xl p-8 shadow-lg dark:shadow-2xl">
            {/* Map Background */}
            <div class="relative w-full h-96 bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 dark:from-yellow-800 dark:via-orange-800 dark:to-red-800 rounded-xl overflow-hidden">
              {/* Decorative elements */}
              <div class="absolute inset-0 opacity-20 dark:opacity-30">
                <div class="absolute top-10 left-20 w-32 h-32 border border-yellow-600 dark:border-yellow-400 rounded-full"></div>
                <div class="absolute top-40 right-32 w-24 h-24 border border-orange-600 dark:border-orange-400 rounded-full"></div>
                <div class="absolute bottom-20 left-1/3 w-16 h-16 border border-red-600 dark:border-red-400 rounded-full"></div>
              </div>
              
              {/* Route Lines */}
              <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d="M85 75 Q75 70 70 70 Q60 65 45 60 Q35 55 25 55 Q20 52 15 50" 
                  stroke="#8B4513" 
                  stroke-width="0.5" 
                  fill="none" 
                  stroke-dasharray="2,2"
                  class="dark:stroke-yellow-300"
                />
              </svg>
              
              {/* Map Points */}
              {mapPoints.map((point) => (
                <div
                  key={point.id}
                  class={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${
                    point.type === 'city' ? 'w-4 h-4' :
                    point.type === 'oasis' ? 'w-3 h-3' :
                    point.type === 'mountain' ? 'w-5 h-5' :
                    'w-3 h-3'
                  }`}
                  style={{
                    left: `${point.coordinates.x}%`,
                    top: `${point.coordinates.y}%`
                  }}
                >
                  <div class={`rounded-full ${
                    point.type === 'city' ? 'bg-blue-600 dark:bg-blue-400' :
                    point.type === 'oasis' ? 'bg-green-600 dark:bg-green-400' :
                    point.type === 'mountain' ? 'bg-gray-600 dark:bg-gray-400' :
                    'bg-yellow-600 dark:bg-yellow-400'
                  } shadow-lg hover:scale-125 transition-transform duration-300`}></div>
                  
                  {/* Tooltip */}
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div class="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                      <div class="font-semibold">{point.name}</div>
                      <div class="text-xs text-gray-300 dark:text-gray-400">{point.description}</div>
                    </div>
                    <div class="w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45 absolute top-full left-1/2 -translate-x-1/2 -translate-y-1"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Map Legend */}
            <div class="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-700 dark:text-gray-300">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></div>
                <span>Cities</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-600 dark:bg-green-400 rounded-full mr-2"></div>
                <span>Oases</span>
              </div>
              <div class="flex items-center">
                <div class="w-5 h-5 bg-gray-600 dark:bg-gray-400 rounded-full mr-2"></div>
                <span>Mountains</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-yellow-600 dark:bg-yellow-400 rounded-full mr-2"></div>
                <span>Deserts</span>
              </div>
            </div>
          </div>
          
          {/* Map Controls */}
          <div class="mt-8 flex justify-center gap-4">
            <button class="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300">
              Zoom In
            </button>
            <button class="bg-gray-600 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors duration-300">
              Zoom Out
            </button>
            <button class="bg-green-600 dark:bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors duration-300">
              Reset View
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}); 