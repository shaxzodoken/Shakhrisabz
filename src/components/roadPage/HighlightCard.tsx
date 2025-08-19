import { component$ } from '@builder.io/qwik';

interface HighlightCardProps {
  title: string;
  description: string;
  icon?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  link?: string;
  class?: string;
}

export default component$<HighlightCardProps>(({
  title,
  description,
  icon,
  color = 'blue',
  link,
  class: className = ''
}) => {
  const colorClasses = {
    blue: 'bg-blue-500 dark:bg-blue-600',
    green: 'bg-green-500 dark:bg-green-600',
    yellow: 'bg-yellow-500 dark:bg-yellow-600',
    red: 'bg-red-500 dark:bg-red-600',
    purple: 'bg-purple-500 dark:bg-purple-600'
  };

  const iconColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    red: 'text-red-600 dark:text-red-400',
    purple: 'text-purple-600 dark:text-purple-400'
  };

  const CardContent = () => (
    <div class={`bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl p-6 hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 ${className}`}>
      <div class="flex items-start space-x-4">
        {icon && (
          <div class={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <span class="text-white text-xl">{icon}</span>
          </div>
        )}
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
          {/* Only show "Learn more" link if the card itself is not a link */}
          {link && (
            <div class="mt-4">
              <span class={`inline-flex items-center text-sm font-medium ${iconColorClasses[color]} hover:underline cursor-pointer`}>
                Learn more
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} class="block hover:transform hover:scale-105 transition-transform duration-300">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
}); 