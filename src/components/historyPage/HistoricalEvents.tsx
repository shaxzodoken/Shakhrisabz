import { component$ } from '@builder.io/qwik';

const historicalEvents = [
  {
    title: 'Amir Temur davlatining poytaxti',
    description: 'Shahrisabz Amir Temur davlatining poytaxti bo\'lgan va O\'rta Osiyoning eng muhim shaharlaridan biri bo\'lgan.',
    icon: '🏛️',
    color: 'blue'
  },
  {
    title: 'Buyuk Ipak yo\'li',
    description: 'Shahrisabz Buyuk Ipak yo\'li ustida joylashgan va xalqaro savdo markazi bo\'lgan.',
    icon: '🛤️',
    color: 'purple'
  },
  {
    title: 'UNESCO Jahon merosi',
    description: '2000 yilda Shahrisabz tarixiy markazi UNESCO Jahon merosi ro\'yxatiga kiritilgan.',
    icon: '🏆',
    color: 'green'
  },
  {
    title: 'Me\'moriy yodgorliklar',
    description: 'XIV-XV asrlarda qurilgan ajoyib me\'moriy obidalar hozirgacha saqlanib qolgan.',
    icon: '🏗️',
    color: 'yellow'
  },
  {
    title: 'Madaniy almashinuv',
    description: 'Shahrisabzda Sharq va G\'arb madaniyatlari almashinuvi bo\'lgan.',
    icon: '🌍',
    color: 'red'
  },
  {
    title: 'Ilm-fan markazi',
    description: 'O\'rta asrlarda Shahrisabz ilm-fan va ta\'lim markazi bo\'lgan.',
    icon: '📚',
    color: 'indigo'
  }
];

export default component$(() => {
  return (
    <section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Muhim tarixiy voqealar
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Shahrisabz tarixidagi eng muhim voqealar va ularning ta'siri
          </p>
        </div>

        {/* Events Grid */}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {historicalEvents.map((event, index) => (
            <div key={index} class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div class={`w-16 h-16 bg-gradient-to-br from-${event.color}-500 to-${event.color}-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span class="text-2xl">{event.icon}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {event.title}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
