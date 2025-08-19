// src/components/landing/RoutesBuilder.tsx — Interaktiv marshrut (client-only)
// -------------------------------------------------------------
import { component$, useStore, $, useComputed$ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
import { Card, CardContent } from '~/components/ui/Card';
import { Button } from '~/components/ui/Button';


export const RoutesBuilder = component$(() => {
const store = useStore({
all: [
{id:1, t:'Oqsaroy', min:60},
{id:2, t:'Dorut-Tillovat', min:45},
{id:3, t:'Chorbogʻ', min:40},
{id:4, t:'Madaniyat markazi', min:30},
],
pick: [] as number[]
});


const toggle$ = $((id:number) => {
const i = store.pick.indexOf(id);
if (i>=0) store.pick.splice(i,1); else store.pick.push(id);
});


const total = useComputed$(() => store.pick
.map(id => store.all.find(x => x.id===id)?.min || 0)
.reduce((a,b)=>a+b,0));


return (
<section class="py-12">
<Container>
<div class="flex items-end justify-between">
<h2 class="text-2xl font-semibold font-serif text-zinc-900 dark:text-zinc-100">Marshrut tuzing</h2>
<div class="text-sm text-zinc-600 dark:text-zinc-400">Taxminiy vaqt: <span class="font-medium text-emerald-700 dark:text-emerald-400">{total.value} daqiqa</span></div>
</div>
<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
{store.all.map(x=>{
const active = store.pick.includes(x.id);
return (
<Card hover key={x.id}>
<CardContent>
<div class="flex items-start justify-between gap-3">
<div>
<div class="text-base font-medium text-zinc-900 dark:text-zinc-100">{x.t}</div>
<div class="text-sm text-zinc-500 dark:text-zinc-400">~{x.min} daqiqa</div>
</div>
<button onClick$={() => toggle$(x.id)}
class={`h-8 px-3 rounded-xl text-sm border transition ${active ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400' : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'}`}>
{active ? 'Tanlandi' : 'Tanlash'}
</button>
</div>
</CardContent>
</Card>
);
})}
</div>
<div class="mt-6 flex gap-3">
<Button as="a" href="#" variant="default">PDF/Print uchun ko‘rish</Button>
<Button as="a" href="#" variant="outline">Bo‘lishish</Button>
</div>
</Container>
</section>
);
});