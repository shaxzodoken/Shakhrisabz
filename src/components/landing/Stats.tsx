// src/components/landing/Stats.tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';

export const Stats = component$(() => {
  const years = useSignal(0), visitors = useSignal(0), sites = useSignal(0);

  useVisibleTask$(() => {
    const animate = (sig:any,target:number)=>{let v=0;const step=()=>{v+=Math.ceil((target-v)/12);sig.value=v;if(v<target)requestAnimationFrame(step)};step();};
    animate(years, 2700); animate(visitors, 500000); animate(sites, 12);
  });

  return (
    <section class="relative py-16 bg-[url('/images/pattern.jpg')] bg-cover bg-center">
      <div class="absolute inset-0 bg-black/60" />
      <Container>
        <div class="relative z-10 grid sm:grid-cols-3 gap-8 text-center text-white">
          <div>
            <div class="text-4xl font-bold">{years.value}+</div>
            <div class="mt-1 text-sm">Yillik tarix</div>
          </div>
          <div>
            <div class="text-4xl font-bold">{visitors.value.toLocaleString()}</div>
            <div class="mt-1 text-sm">Yillik sayyohlar</div>
          </div>
          <div>
            <div class="text-4xl font-bold">{sites.value}</div>
            <div class="mt-1 text-sm">UNESCO obidalari</div>
          </div>
        </div>
      </Container>
    </section>
  );
});
