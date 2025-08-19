// src/components/landing/Hero.tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
import { Button } from '~/components/ui/Button';
export const Hero = component$(() => {
  // subtle parallax for background pattern (interactive, cheap)
  const off = useSignal(0);
  useVisibleTask$(() => {
    const onScroll = () => (off.value = window.scrollY * 0.1);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });
  return (
    <section class="pt-24 pb-16 relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.08]" style={{backgroundImage:'radial-gradient(currentColor 1px,transparent 1px)', backgroundSize:'24px 24px', transform:`translateY(${off.value}px)`}}/>
      <Container>
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-serif tracking-tight text-zinc-900 dark:text-zinc-50">Shahrisabz — Tarix va Nafosat Shahri</h1>
          <p class="mt-4 text-zinc-600 dark:text-zinc-300">Amir Temur vatani. Ipak yo‘li merosi, koshinlar jilosi, qadimiy peshtoqlar.</p>
          <div class="mt-6 flex gap-3">
            <Button>Yo‘nalishlar</Button>
            <Button variant="outline">Tadbirlar</Button>
          </div>
        </div>
      </Container>
    </section>
  );
});
