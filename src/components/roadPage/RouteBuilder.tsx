import { component$, useSignal, useStore, useComputed$, $ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
import { Button } from '~/components/ui/Button';

type Stop = { id:number; t:string; cat:'kafe'|'do‘kon'|'muzey'|'bozor'; min:number; sponsored?:boolean };

const STOPS: Stop[] = [
  { id:1, t:'Oqsaroy yaqinidagi kafe', cat:'kafe', min:20, sponsored:true },
  { id:2, t:'Dorut‑Tillovat suvenir', cat:'do‘kon', min:15 },
  { id:3, t:'Shahar muzeyi', cat:'muzey', min:40, sponsored:true },
  { id:4, t:'Hunarmandlar bozori', cat:'bozor', min:30 },
];

export const RouteBuilder = component$(() => {
  const form = useStore({ start:'Oqsaroy', end:'Dorut‑Tillovat', interests: new Set(['muzey','kafe']) as Set<string> });
  const pick = useSignal<number[]>([]);

  const toggleInterest$ = $((k:string) => {
    if (form.interests.has(k)) form.interests.delete(k); else form.interests.add(k);
  });
  const addStop$ = $((id:number) => {
    const i = pick.value.indexOf(id);
    if (i>=0) pick.value = pick.value.filter(x=>x!==id);
    else pick.value = [...pick.value, id];
  });

  const suggested = useComputed$(() => {
    const liked = STOPS.filter(s => form.interests.has(s.cat));
    const sponsoredFirst = liked.sort((a,b) => Number(!!b.sponsored) - Number(!!a.sponsored));
    return sponsoredFirst.slice(0,3);
  });

  const totalMinutes = useComputed$(() =>
    pick.value.map(id => STOPS.find(s=>s.id===id)?.min ?? 0).reduce((a,b)=>a+b,0)
  );

  return (
    <section id="builder" class="py-12 bg-white dark:bg-zinc-950">
      <Container>
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100">Marshrut tuzish</h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Boshlanish va boradigan punktlar, qiziqishlar bo‘yicha takliflar.</p>
          </div>
          <div class="text-sm text-zinc-600 dark:text-zinc-400">
            Umumiy vaqt: <span class="font-medium text-emerald-700 dark:text-emerald-400">{totalMinutes.value} daqiqa</span>
          </div>
        </div>

        <div class="mt-6 grid gap-5 lg:grid-cols-3">
          {/* A) Basic form */}
          <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
            <label class="block text-xs text-zinc-500 dark:text-zinc-400">Boshlanish</label>
            <input value={form.start} onInput$={(_,el)=>form.start=el.value}
                   class="mt-1 w-full h-10 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100"/>
            <label class="mt-4 block text-xs text-zinc-500 dark:text-zinc-400">Boradigan joy</label>
            <input value={form.end} onInput$={(_,el)=>form.end=el.value}
                   class="mt-1 w-full h-10 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100"/>

            <div class="mt-4">
              <div class="text-xs text-zinc-500 dark:text-zinc-400">Qiziqishlar</div>
              <div class="mt-2 flex flex-wrap gap-2">
                {(['kafe','do‘kon','muzey','bozor'] as const).map(k => (
                  <button key={k} onClick$={() => toggleInterest$(k)}
                    class={`h-9 px-3 rounded-xl text-sm border transition ${
                      form.interests.has(k)
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60'
                    }`}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* B) Suggested route (sponsored-first) */}
          <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">Tavsiya etilgan to‘xtashlar</div>
              <div class="text-xs text-zinc-500 dark:text-zinc-400">sponsorlash asosida</div>
            </div>
            <div class="mt-3 space-y-3">
              {suggested.value.map(s => (
                <div key={s.id} class="flex items-center justify-between rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 p-3">
                  <div class="min-w-0">
                    <div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">{s.t}</div>
                    <div class="text-xs text-zinc-500 dark:text-zinc-400 capitalize">{s.cat} • ~{s.min}’</div>
                  </div>
                  <div class="flex items-center gap-2">
                    {s.sponsored && <span class="text-[10px] rounded-full px-2 py-0.5 bg-amber-500/20 text-amber-700 dark:text-amber-300">homiylik</span>}
                    <button onClick$={() => addStop$(s.id)}
                      class={`h-8 px-3 rounded-lg text-sm border transition ${
                        pick.value.includes(s.id)
                          ? 'border-emerald-600 text-emerald-700 dark:text-emerald-300'
                          : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60'
                      }`}>
                      {pick.value.includes(s.id) ? 'Qo‘shildi' : 'Qo‘shish'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C) Selected route preview */}
          <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
            <div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">Tanlanganlar</div>
            <ol class="mt-3 space-y-2">
              {pick.value.map((id,i)=> {
                const s = STOPS.find(x=>x.id===id)!;
                return (
                  <li key={id} class="flex items-center justify-between rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 p-3">
                    <div class="min-w-0">
                      <div class="text-sm text-zinc-900 dark:text-zinc-100">{i+1}. {s.t}</div>
                      <div class="text-xs text-zinc-500 dark:text-zinc-400">~{s.min}’ • {s.cat}</div>
                    </div>
                    <button onClick$={() => addStop$(id)}
                      class="h-8 px-3 rounded-lg text-sm border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-50/60 dark:hover:bg-red-900/20 transition">
                      O‘chirish
                    </button>
                  </li>
                );
              })}
              {!pick.value.length && <li class="text-sm text-zinc-500 dark:text-zinc-400">Hali tanlanmagan.</li>}
            </ol>

            <div class="mt-4 flex gap-2">
              <Button as="a" href="#map">Xaritada ko‘rish</Button>
              <Button variant="outline" as="a" href="#checkout">PDF/Print</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});
