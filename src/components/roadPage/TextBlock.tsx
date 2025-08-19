import { component$ } from '@builder.io/qwik';

interface TextBlockProps {
  title?: string;
  subtitle?: string;
  content: string;
  alignment?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  class?: string;
}

export default component$<TextBlockProps>(({
  title,
  subtitle,
  content,
  alignment = 'left',
  size = 'medium',
  class: className = ''
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const containerClasses = [
    alignmentClasses[alignment],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div class={containerClasses}>
      {title && (
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
      )}
      {subtitle && (
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {subtitle}
        </p>
      )}
      <div class="prose prose-lg max-w-none dark:prose-invert">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}); 