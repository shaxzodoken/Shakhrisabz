// src/components/landing/Timeline.tsx
import { component$ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
export const Timeline = component$(() => (
  <section class="py-12">
    <Container>
      <h2 class="text-2xl font-semibold font-serif text-zinc-900 dark:text-zinc-100">Shahar tarixi — qisqa chiziq</h2>
      <ol class="mt-6 relative border-s border-zinc-200 dark:border-zinc-800">
        {[{y:'XIV asr',d:'Amir Temur davri, peshtoqlar va me’moriy uyg‘onish'},{y:'XV–XVI asr',d:'Temuriylar merosi, koshin maktabi'},{y:'Hozir',d:'Madaniy meros, turizm va ta’lim markazi'}].map((e,i)=> (
          <li key={i} class="ms-6 py-3">
            <span class="absolute -start-2.5 mt-1 h-2.5 w-2.5 rounded-full bg-emerald-600"/>
            <div class="text-sm text-emerald-700 dark:text-emerald-400">{e.y}</div>
            <div class="text-zinc-700 dark:text-zinc-300">{e.d}</div>
          </li>
        ))}
      </ol>
    </Container>
  </section>
));