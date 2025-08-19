import { $, component$, useSignal } from '@builder.io/qwik';

interface FilterBarProps {
  tags: string[];
  onChange$: (tag: string) => void;
}

export default component$<FilterBarProps>(({ tags, onChange$ }) => {
  const active = useSignal<string>('Barchasi');

  const handleClick$ = $((tag: string) => {
    active.value = tag;
    onChange$(tag);
  });

  return (
    <div class="flex flex-wrap items-center gap-2 md:gap-3">
      {['Barchasi', ...tags].map((tag) => (
        <button
          key={tag}
          onClick$={() => handleClick$(tag)}
          class={[
            'px-4 py-2 rounded-full text-sm font-semibold border transition',
            active.value === tag
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-green-600 hover:text-white',
          ]}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
});
