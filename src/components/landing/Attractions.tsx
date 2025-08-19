// src/components/landing/Attractions.tsx
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';

export const Attractions = component$(() => {
  const cat = useSignal<'hammasi'|'meʼmoriy'|'madaniy'|'tabiat'>('hammasi');
  const setCat$ = $((x:any)=>cat.value=x);

  const data = [
    {t:'Oqsaroy', c:'meʼmoriy', img:'/images/aqsaroy.jpg'},
    {t:'Dorut-Tillovat', c:'meʼmoriy', img:'/images/dorut.jpg'},
    {t:'Chorbog‘', c:'tabiat', img:'/images/chorbog.jpg'},
    {t:'Folklor kechalari', c:'madaniy', img:'/images/folklor.jpg'},
  ];
  const items = data.filter(x => cat.value==='hammasi' || x.c===cat.value);

  return (
    <section id="attractions" class="py-16 bg-white dark:bg-zinc-950">
      <Container>
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-serif font-bold">Diqqatga sazovor joylar</h2>
          <div class="flex gap-2">
            {['hammasi','meʼmoriy','madaniy','tabiat'].map(x=>(
              <button key={x} onClick$={() => setCat$(x)}
                class={`px-4 py-1 rounded-full border transition ${
                  cat.value===x ? 'bg-emerald-600 text-white border-emerald-600'
                                 : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'}`}>
                {x}
              </button>
            ))}
          </div>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(x=>(
            <div key={x.t} class="relative group rounded-2xl overflow-hidden shadow-lg">
              <img src={x.img} alt={x.t} class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition" />
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-lg font-semibold">{x.t}</h3>
                <p class="text-sm opacity-80 capitalize">{x.c}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});
