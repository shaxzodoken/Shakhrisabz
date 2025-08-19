import { component$ } from '@builder.io/qwik';

interface ImageCardProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  overlay?: boolean;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  class?: string;
}

export default component$<ImageCardProps>(({
  src,
  alt,
  title,
  description,
  overlay = false,
  aspectRatio = 'landscape',
  class: className = ''
}) => {
  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]'
  };

  return (
    <div class={`group relative overflow-hidden rounded-xl shadow-lg dark:shadow-xl ${className}`}>
      <div class={`${aspectRatioClasses[aspectRatio]} relative`}>
        <img 
          src={src} 
          alt={alt}
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {overlay && (
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        )}
        
        {(title || description) && (
          <div class={`absolute bottom-0 left-0 right-0 p-6 ${overlay ? 'text-white' : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm'}`}>
            {title && (
              <h3 class="text-xl font-semibold mb-2 dark:text-white">
                {title}
              </h3>
            )}
            {description && (
              <p class="text-sm leading-relaxed dark:text-gray-300">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Hover effect overlay */}
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
    </div>
  );
}); 