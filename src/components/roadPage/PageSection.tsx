import { component$, Slot } from '@builder.io/qwik';

interface PageSectionProps {
  class?: string;
  id?: string;
  background?: 'white' | 'gray' | 'dark' | 'gradient';
  padding?: 'small' | 'medium' | 'large';
  container?: boolean;
}

export default component$<PageSectionProps>(({ 
  class: className = '', 
  id, 
  background = 'white',
  padding = 'medium',
  container = true
}) => {
  const backgroundClasses = {
    white: 'bg-white dark:bg-gray-900',
    gray: 'bg-gray-50 dark:bg-gray-800',
    dark: 'bg-gray-900 dark:bg-black text-white',
    gradient: 'bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white'
  };

  const paddingClasses = {
    small: 'py-8',
    medium: 'py-16',
    large: 'py-20'
  };

  const sectionClasses = [
    backgroundClasses[background],
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');

  const content = container ? (
    <div class="container mx-auto px-4">
      <Slot />
    </div>
  ) : (
    <Slot />
  );

  return (
    <section id={id} class={sectionClasses}>
      {content}
    </section>
  );
}); 