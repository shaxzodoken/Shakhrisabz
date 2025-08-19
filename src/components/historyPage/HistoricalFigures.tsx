import { component$ } from '@builder.io/qwik';

const historicalFigures = [
  {
    name: 'Amir Temur',
    years: '1336-1405',
    title: 'Buyuk sarkarda',
    description: 'Buyuk sarkarda va davlat arbobi. Shahrisabzni o\'z davlatining poytaxti qilgan va ajoyib me\'moriy obidalar qurdirgan.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    achievements: ['Shahrisabz poytaxti', 'Ak-Saroy qurdirgan', 'Buyuk davlat asoschisi'],
    icon: '⚔️',
    color: 'blue'
  },
  {
    name: 'Mirzo Ulugbek',
    years: '1394-1449',
    title: 'Astronom va olim',
    description: 'Buyuk astronom va olim. Samarqandda rasadxona qurdirgan va astronomiya sohasida muhim kashfiyotlar qilgan.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    achievements: ['Rasadxona qurdirgan', 'Astronomiya kashfiyotlari', 'Olim va hukmdor'],
    icon: '🔭',
    color: 'purple'
  },
  {
    name: 'Zahiriddin Bobur',
    years: '1483-1530',
    title: 'Shoir va sarkarda',
    description: 'Buyuk shoir va sarkarda. Hindistonda Boburiylar sulolasini asos solgan va "Boburnoma" asarini yozgan.',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db71102?w=800&h=600&fit=crop',
    achievements: ['Boburnoma yozgan', 'Boburiylar sulolasi', 'Shoir va sarkarda'],
    icon: '📝',
    color: 'green'
  }
];

export default component$(() => {
  return (
    <section id="figures" class="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Tarixiy shaxslar
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Shahrisabz tarixida muhim rol o'ynagan buyuk shaxslar
          </p>
        </div>

        {/* Historical Figures Grid */}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {historicalFigures.map((figure) => (
            <div key={figure.name} class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div class={`relative h-64 bg-gradient-to-br from-${figure.color}-500 to-${figure.color}-600 overflow-hidden`}>
                <img 
                  src={figure.image} 
                  alt={figure.name}
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-black/30"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-700">
                    {figure.years}
                  </span>
                </div>
                <div class="absolute top-4 right-4">
                  <div class={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center`}>
                    <span class="text-2xl">{figure.icon}</span>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{figure.name}</h3>
                <p class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">{figure.title}</p>
                <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {figure.description}
                </p>
                
                {/* Achievements */}
                <div class="space-y-2">
                  <h4 class="font-semibold text-gray-900 dark:text-white">Asosiy yutuqlar:</h4>
                  <ul class="space-y-1">
                    {figure.achievements.map((achievement) => (
                      <li key={achievement} class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
