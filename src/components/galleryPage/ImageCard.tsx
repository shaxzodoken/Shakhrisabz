import { component$, Slot } from '@builder.io/qwik';

interface ImageCardProps {
  src: string;
  alt: string;
  tag: string;
  onClick$?: () => void;
}

export default component$<ImageCardProps>(({ src, alt, tag, onClick$ }) => {
  return (
    <figure
      class="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
      onClick$={onClick$}
    >
      <img
        src={src}
        alt={alt}
        class="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
        loading="lazy"
      />
      <figcaption class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-black/0 text-white text-sm flex items-center justify-between">
        <span class="font-medium">{alt}</span>
        <span class="px-2 py-0.5 rounded-full bg-white/20 text-xs backdrop-blur">
          #{tag}
        </span>
      </figcaption>
      {/* Slot — agar kerak bo‘lsa overlay ikon qo‘shish uchun */}
      <Slot />
    </figure>
  );
});
