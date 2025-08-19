// src/components/landing/FAQ.tsx — Accordion
// -------------------------------------------------------------
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
export const FAQ = component$(() => {
const open = useSignal<number|null>(0);
const toggle$ = $((i:number) => open.value = open.value===i ? null : i);
const faq = [
{q:'Qachon tashrif buyurgan maqul?', a:'Bahor va kuz moʻtadil ob-havo bilan qulayroq.'},
{q:'Gid xizmatlari bormi?', a:'Ha, sertifikatli gidlar bilan individual yoki guruh sayohatlari.'},
{q:'Oilaviy marshrutlar?', a:'Bolalarga mos qisqa yoʻnalishlar va interaktiv dasturlar mavjud.'}
];
return (
<section class="py-12">
<Container>
<h2 class="text-2xl font-semibold font-serif text-zinc-900 dark:text-zinc-100">Ko‘p so‘raladigan savollar</h2>
<div class="mt-6 space-y-3">
{faq.map((f,i)=> (
<div key={i} class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70">
<button onClick$={() => toggle$(i)} class="w-full text-left px-5 py-4 flex items-center justify-between">
<span class="font-medium text-zinc-900 dark:text-zinc-100">{f.q}</span>
<span class="text-zinc-400">{open.value===i?'-':'+'}</span>
</button>
{open.value===i && <div class="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-300">{f.a}</div>}
</div>
))}
</div>
</Container>
</section>
);
});