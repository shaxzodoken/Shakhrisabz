import { component$, useSignal, useComputed$, $ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';

type Item = { id:number; t:string; cat:'kafe'|'do‘kon'|'muzey'|'bozor'; addr:string; sponsored?:boolean; img?:string };
const ITEMS: Item[] = [
  { id:11, t:'Samovar Coffee', cat:'kafe', addr:'Oqsaroy ko‘chasi 12', sponsored:true, img:'/images/roads/cafe.jpg' },
  { id:12, t:'Usta Qolip Suvenir', cat:'do‘kon', addr:'Dorut‑Tillovat 3', img:'/images/roads/souvenir.jpg' },
  { id:13, t:'Shahr Muzeyi', cat:'muzey', addr:'Markaziy maydon', sponsored:true, img:'/images/roads/museum.jpg' },
  { id:14, t:'Hunarmand bozori', cat:'bozor', addr:'Chorbog‘', img:'/images/roads/bazaar.jpg' },
];

export const StopsMarketplace = component$(() => {
  const cat = useSignal<'hammasi'|'kafe'|'do‘kon'|'muzey'|'bozor'>('hammasi');
  const q = useSignal('');
  const setCat$ = $((c:typeof cat.value)=>cat.value=c);
  const setQ$ = $((v:string)=>q.value=v);

  const list = useComputed$(()=> {
    const query = q.value.trim().toLowerCase();
    return ITEMS
      .filter(i => cat.value==='hammasi' ? true : i.cat===cat.value)
      .filter(i => !query || i.t.toLowerCase().includes(query) || i.addr.toLowerCase().includes(query))
      .sort((a,b)=> Number(!!b.sponsored) - Number(!!a.sponsored));
  });

  return (
    <section id="stops" class="py-12 bg-white dark:bg-zinc-950">
      <Container>
        <div class="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 class="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100">To‘xtash joylari</h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Homiylar kartalari prioritetda chiqadi.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            {(['hammasi','kafe','do‘kon','muzey','bozor'] as const).map(x=>(
              <button key={x} onClick$={()=>setCat$(x)}
                class={`h-9 px-3 rounded-xl text-sm border transition ${
                  cat.value===x ? 'border-emerald-600 bg-emerald-600 text-white'
                                 : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60'
                }`}>{x}</button>
            ))}
            <input type="search" placeholder="Qidirish…" onInput$={(_,el)=>setQ$(el.value)}
              class="h-9 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"/>
          </div>
        </div>

        <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.value.map(x=>(
            <div key={x.id} class="group relative overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-900">
              <div class="relative h-44">
                <img src={x.img || 'https://gdb.rferl.org/f2dc5054-cb5c-4d02-9946-6825aa12de1c_w1200_r1.jpg'} alt={x.t}
                     class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                {x.sponsored && <div class="absolute top-3 left-3 text-[11px] px-2 py-1 rounded-md bg-amber-500/90 text-black">Sponsored</div>}
              </div>
              <div class="p-4">
                <div class="text-base font-medium text-zinc-900 dark:text-zinc-100">{x.t}</div>
                <div class="text-sm text-zinc-600 dark:text-zinc-400">{x.addr}</div>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-xs capitalize rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 px-2 py-1 text-zinc-700 dark:text-zinc-300">{x.cat}</span>
                  <a href="#builder" class="text-sm text-emerald-700 dark:text-emerald-400 hover:underline">Marshrutga qo‘shish →</a>
                </div>
              </div>
            </div>
          ))}
          {!list.value.length && (
            <div class="text-sm text-zinc-600 dark:text-zinc-400">Hech narsa topilmadi.</div>
          )}
        </div>
      </Container>
    </section>
  );
});
