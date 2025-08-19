import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface RouteStop {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: number; // minutes
  distance: number; // km
  type: 'monument' | 'museum' | 'restaurant' | 'shop' | 'park';
  coordinates: { lat: number; lng: number };
}

export default component$(() => {
  const availableStops = useSignal<RouteStop[]>([
    {
      id: '1',
      name: 'Ak-Saray Palace',
      description: 'Timur\'s magnificent summer palace',
      image: '/images/ancient/ark.jpg',
      duration: 90,
      distance: 0,
      type: 'monument',
      coordinates: { lat: 39.0578, lng: 66.8347 }
    },
    {
      id: '2',
      name: 'Kok-Gumbaz Mosque',
      description: 'Beautiful mosque with blue dome',
      image: '/images/ancient/mosque.jpg',
      duration: 60,
      distance: 0.5,
      type: 'monument',
      coordinates: { lat: 39.0583, lng: 66.8352 }
    },
    {
      id: '3',
      name: 'Dorut Saodat Complex',
      description: 'Timur\'s family mausoleum',
      image: '/images/ancient/banner.jpg',
      duration: 75,
      distance: 0.3,
      type: 'monument',
      coordinates: { lat: 39.0580, lng: 66.8349 }
    },
    {
      id: '4',
      name: 'Central Bazaar',
      description: 'Traditional market with local goods',
      image: '/images/gallery-1.jpg',
      duration: 45,
      distance: 0.8,
      type: 'shop',
      coordinates: { lat: 39.0590, lng: 66.8360 }
    },
    {
      id: '5',
      name: 'City Park',
      description: 'Peaceful green space for relaxation',
      image: '/images/gallery-2.jpg',
      duration: 30,
      distance: 1.2,
      type: 'park',
      coordinates: { lat: 39.0600, lng: 66.8370 }
    }
  ]);

  const selectedStops = useSignal<RouteStop[]>([]);
  const isOptimizing = useSignal(false);
  const totalDuration = useSignal(0);
  const totalDistance = useSignal(0);
  const showMap = useSignal(false);

  const addStop = $((stop: RouteStop) => {
    if (!selectedStops.value.find(s => s.id === stop.id)) {
      selectedStops.value = [...selectedStops.value, stop];
      updateTotals();
    }
  });

  const removeStop = $((stopId: string) => {
    selectedStops.value = selectedStops.value.filter(s => s.id !== stopId);
    updateTotals();
  });

  const moveStop = $((fromIndex: number, toIndex: number) => {
    const newStops = [...selectedStops.value];
    const [movedStop] = newStops.splice(fromIndex, 1);
    newStops.splice(toIndex, 0, movedStop);
    selectedStops.value = newStops;
    updateTotals();
  });

  const optimizeRoute = $(() => {
    isOptimizing.value = true;
    
    // Simulate optimization algorithm
    setTimeout(() => {
      // Simple optimization: sort by distance from center
      const center = { lat: 39.0580, lng: 66.8350 };
      selectedStops.value = selectedStops.value.sort((a, b) => {
        const distA = Math.sqrt(
          Math.pow(a.coordinates.lat - center.lat, 2) + 
          Math.pow(a.coordinates.lng - center.lng, 2)
        );
        const distB = Math.sqrt(
          Math.pow(b.coordinates.lat - center.lat, 2) + 
          Math.pow(b.coordinates.lng - center.lng, 2)
        );
        return distA - distB;
      });
      
      updateTotals();
      isOptimizing.value = false;
    }, 1000);
  });

  const updateTotals = $(() => {
    totalDuration.value = selectedStops.value.reduce((sum, stop) => sum + stop.duration, 0);
    totalDistance.value = selectedStops.value.reduce((sum, stop) => sum + stop.distance, 0);
  });

  const exportRoute = $(() => {
    const routeData = {
      stops: selectedStops.value,
      totalDuration: totalDuration.value,
      totalDistance: totalDistance.value,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(routeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shakhrisabz-route.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  const clearRoute = $(() => {
    selectedStops.value = [];
    updateTotals();
  });

  return (
    <section class="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Route Planner
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Plan your perfect day in Shakhrisabz by dragging and dropping attractions
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Stops */}
          <div class="lg:col-span-1">
            <Card variant="outlined">
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Available Attractions
                </h3>
                
                <div class="space-y-3 max-h-96 overflow-y-auto">
                  {availableStops.value.map((stop) => (
                    <div
                      key={stop.id}
                      class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick$={() => addStop(stop)}
                    >
                      <div class="flex items-center space-x-3">
                        <img
                          src={stop.image}
                          alt={stop.name}
                          class="w-12 h-12 rounded-lg object-cover"
                        />
                        <div class="flex-1">
                          <h4 class="font-medium text-gray-900 dark:text-white">
                            {stop.name}
                          </h4>
                          <p class="text-sm text-gray-600 dark:text-gray-400">
                            {stop.duration} min • {stop.distance} km
                          </p>
                        </div>
                        <div class={`px-2 py-1 rounded-full text-xs font-medium ${
                          stop.type === 'monument' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          stop.type === 'museum' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          stop.type === 'restaurant' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          stop.type === 'shop' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {stop.type}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Selected Route */}
          <div class="lg:col-span-2">
            <Card variant="elevated">
              <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Your Route
                  </h3>
                  
                  <div class="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick$={clearRoute}
                      disabled={selectedStops.value.length === 0}
                    >
                      Clear
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick$={optimizeRoute}
                      disabled={selectedStops.value.length < 2 || isOptimizing.value}
                    >
                      {isOptimizing.value ? 'Optimizing...' : 'Optimize Route'}
                    </Button>
                    <Button
                      size="sm"
                      onClick$={exportRoute}
                      disabled={selectedStops.value.length === 0}
                    >
                      Export
                    </Button>
                  </div>
                </div>

                {/* Route Summary */}
                {selectedStops.value.length > 0 && (
                  <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
                    <div class="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {selectedStops.value.length}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Stops</div>
                      </div>
                      <div>
                        <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {totalDuration.value}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
                      </div>
                      <div>
                        <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {totalDistance.value.toFixed(1)}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Kilometers</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Route Stops */}
                <div class="space-y-3">
                  {selectedStops.value.length === 0 ? (
                    <div class="text-center py-12 text-gray-500 dark:text-gray-400">
                      <div class="text-4xl mb-4">🗺️</div>
                      <p>Drag attractions from the left to build your route</p>
                    </div>
                  ) : (
                    selectedStops.value.map((stop, index) => (
                      <div
                        key={stop.id}
                        class="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                      >
                        <div class="flex items-center space-x-3 flex-1">
                          <div class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <img
                            src={stop.image}
                            alt={stop.name}
                            class="w-16 h-16 rounded-lg object-cover"
                          />
                          <div class="flex-1">
                            <h4 class="font-medium text-gray-900 dark:text-white">
                              {stop.name}
                            </h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                              {stop.duration} min • {stop.distance} km
                            </p>
                          </div>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                          <button
                            onClick$={() => removeStop(stop.id)}
                            class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Remove from route"
                          >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Map Toggle */}
                <div class="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick$={() => showMap.value = !showMap.value}
                  >
                    {showMap.value ? 'Hide Map' : 'Show Interactive Map'}
                  </Button>
                </div>

                {/* Map Preview */}
                {showMap.value && (
                  <div class="mt-6 h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <div class="text-center">
                      <div class="text-4xl mb-4">🗺️</div>
                      <p class="text-gray-600 dark:text-gray-300">Interactive map coming soon</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Real-time navigation and route visualization</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
});
