import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import Card from '../ui/Card';

interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  era: 'ancient' | 'medieval' | 'timurid' | 'modern';
  image?: string;
  location: string;
  significance: 'high' | 'medium' | 'low';
}

export default component$(() => {
  const events = useSignal<TimelineEvent[]>([
    {
      id: '1',
      year: -329,
      title: 'Alexander the Great',
      description: 'Alexander the Great passed through the region during his conquest of Central Asia.',
      era: 'ancient',
      location: 'Ancient Sogdiana',
      significance: 'high'
    },
    {
      id: '2',
      year: 750,
      title: 'Arab Conquest',
      description: 'The region came under Arab rule, introducing Islam to the area.',
      era: 'medieval',
      location: 'Kesh Region',
      significance: 'high'
    },
    {
      id: '3',
      year: 1336,
      title: 'Birth of Timur',
      description: 'Amir Timur (Tamerlane) was born in the village of Khoja Ilgar near Shakhrisabz.',
      era: 'timurid',
      location: 'Khoja Ilgar',
      significance: 'high'
    },
    {
      id: '4',
      year: 1380,
      title: 'Ak-Saray Palace Construction',
      description: 'Timur began construction of the magnificent Ak-Saray Palace.',
      era: 'timurid',
      image: '/images/ancient/ark.jpg',
      location: 'Shakhrisabz',
      significance: 'high'
    },
    {
      id: '5',
      year: 1404,
      title: 'Timur\'s Death',
      description: 'Amir Timur died while planning a campaign against China.',
      era: 'timurid',
      location: 'Otrar',
      significance: 'high'
    },
    {
      id: '6',
      year: 1500,
      title: 'Uzbek Conquest',
      description: 'The region came under the control of the Uzbek Shaybanid dynasty.',
      era: 'medieval',
      location: 'Shakhrisabz',
      significance: 'medium'
    },
    {
      id: '7',
      year: 1868,
      title: 'Russian Empire',
      description: 'The region became part of the Russian Empire.',
      era: 'modern',
      location: 'Shakhrisabz',
      significance: 'medium'
    },
    {
      id: '8',
      year: 1991,
      title: 'Independence',
      description: 'Uzbekistan gained independence from the Soviet Union.',
      era: 'modern',
      location: 'Uzbekistan',
      significance: 'high'
    }
  ]);

  const selectedEra = useSignal<'all' | 'ancient' | 'medieval' | 'timurid' | 'modern'>('all');
  const timelinePosition = useSignal(0);
  const isDragging = useSignal(false);
  const startX = useSignal(0);
  const scrollLeft = useSignal(0);

  const filteredEvents = events.value.filter(event => 
    selectedEra.value === 'all' || event.era === selectedEra.value
  );

  const setEra = $((era: 'all' | 'ancient' | 'medieval' | 'timurid' | 'modern') => {
    selectedEra.value = era;
  });

  const handleMouseDown = $((e: MouseEvent) => {
    isDragging.value = true;
    startX.value = e.pageX - (e.target as HTMLElement).offsetLeft;
    scrollLeft.value = (e.target as HTMLElement).scrollLeft;
  });

  const handleMouseMove = $((e: MouseEvent) => {
    if (!isDragging.value) return;
    e.preventDefault();
    const x = e.pageX - (e.target as HTMLElement).offsetLeft;
    const walk = (x - startX.value) * 2;
    (e.target as HTMLElement).scrollLeft = scrollLeft.value - walk;
  });

  const handleMouseUp = $(() => {
    isDragging.value = false;
  });

  const scrollToEvent = $((year: number) => {
    const container = document.querySelector('.timeline-container');
    if (container) {
      const eventElement = container.querySelector(`[data-year="${year}"]`);
      if (eventElement) {
        eventElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  return (
    <section class="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Timeline
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore the rich history of Shakhrisabz through different eras
          </p>
        </div>

        {/* Era Filter */}
        <div class="flex justify-center mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            {(['all', 'ancient', 'medieval', 'timurid', 'modern'] as const).map((era) => (
              <button
                key={era}
                onClick$={() => setEra(era)}
                class={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedEra.value === era
                    ? 'bg-yellow-500 text-black shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {era === 'all' && 'All Eras'}
                {era === 'ancient' && 'Ancient'}
                {era === 'medieval' && 'Medieval'}
                {era === 'timurid' && 'Timurid'}
                {era === 'modern' && 'Modern'}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div class="relative">
          {/* Timeline Line */}
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-yellow-400 h-full"></div>
          
          {/* Timeline Container */}
          <div 
            class="timeline-container relative overflow-x-auto pb-8 cursor-grab active:cursor-grabbing"
            onMouseDown$={handleMouseDown}
            onMouseMove$={handleMouseMove}
            onMouseUp$={handleMouseUp}
            onMouseLeave$={handleMouseUp}
          >
            <div class="flex space-x-8 min-w-max px-8">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  data-year={event.year}
                  class={`relative flex-shrink-0 w-80 ${
                    index % 2 === 0 ? 'self-start' : 'self-end mt-16'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div class={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                    event.significance === 'high' ? 'bg-yellow-500' :
                    event.significance === 'medium' ? 'bg-orange-500' : 'bg-gray-500'
                  }`}></div>
                  
                  {/* Event Card */}
                  <Card 
                    variant="elevated" 
                    class={`mt-8 group hover:scale-105 transition-all duration-300 ${
                      index % 2 === 0 ? 'ml-8' : 'mr-8'
                    }`}
                  >
                    <div class="p-6">
                      <div class="flex items-center justify-between mb-3">
                        <span class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {event.year > 0 ? event.year : `${Math.abs(event.year)} BCE`}
                        </span>
                        <span class={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.era === 'ancient' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          event.era === 'medieval' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          event.era === 'timurid' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {event.era}
                        </span>
                      </div>
                      
                      {event.image && (
                        <img 
                          src={event.image} 
                          alt={event.title}
                          class="w-full h-32 object-cover rounded-lg mb-4"
                        />
                      )}
                      
                      <h3 class="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {event.description}
                      </p>
                      
                      <p class="text-xs text-gray-500 dark:text-gray-500">
                        📍 {event.location}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div class="mt-8 text-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Navigation</h3>
          <div class="flex flex-wrap justify-center gap-2">
            {filteredEvents.map((event) => (
              <button
                key={event.id}
                onClick$={() => scrollToEvent(event.year)}
                class="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium transition-colors"
              >
                {event.year > 0 ? event.year : `${Math.abs(event.year)} BCE`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
