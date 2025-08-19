// src/components/events/EventsCalendar.tsx
import {
  component$,
  useSignal,
  useComputed$,
  useVisibleTask$,
  $,
} from '@builder.io/qwik';

type Category = 'festival' | 'konsert' | 'ko\'rgazma' | 'teatr' | 'sayil';
type CalEvent = {
  id: number;
  title: string;
  start: string;      // ISO "2025-09-05T19:00:00"
  end?: string;       // ISO (optional)
  place: string;
  category: Category;
  price: number;      // 0 => Bepul
  slug: string;       // /events/:slug
};

const DATA: CalEvent[] = [
  { id:1, title:'Folklor Kechasi', start:'2025-09-05T19:00:00', place:'Oqsaroy maydoni', category:'festival', price:80000, slug:'folklor-kechasi' },
  { id:2, title:'Koshin Ko‘rgazmasi', start:'2025-09-18T11:00:00', place:'Madaniyat markazi', category:'ko\'rgazma', price:30000, slug:'koshin-korgazma' },
  { id:3, title:'Ochiq Havoda Konsert', start:'2025-10-03T20:00:00', place:'Amfiteatr', category:'konsert', price:120000, slug:'open-air-konsert' },
  { id:4, title:'Meʼmoriy Teatr Sahnalari', start:'2025-08-28T17:00:00', place:'Dorut‑Tillovat', category:'teatr', price:0, slug:'memoriy-teatr' },
  { id:5, title:'Xalq Sayili — Hunarmandlar', start:'2025-09-21T10:00:00', place:'Chorbog‘', category:'sayil', price:0, slug:'xalq-sayili' },
];

const fmtDateTime = (iso:string) => new Date(iso).toLocaleString('uz-UZ', {
  day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit'
});
const fmtPrice = (v:number) => v === 0 ? 'Bepul' : `${v.toLocaleString('uz-UZ')} so'm`;

const startOfMonth = (d:Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth   = (d:Date) => new Date(d.getFullYear(), d.getMonth()+1, 0);
const addDays = (d:Date, n:number) => new Date(d.getFullYear(), d.getMonth(), d.getDate()+n);
const sameDay = (a:Date,b:Date) => a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();

export const EventsCalendar = component$(() => {
  // state
  const view = useSignal<'month'|'week'>('month');
  const cursor = useSignal<Date>(new Date()); // ko'rilayotgan oy/hafta boshi
  const cat = useSignal<'hammasi'|Category>('hammasi');
  const q = useSignal('');
  const today = useSignal<Date>(new Date());
  const quick = useSignal<CalEvent | null>(null);

  // init today (SSR/CSR farqi uchun)
  useVisibleTask$(() => { today.value = new Date(); });

  const setView$ = $((v:typeof view.value)=> view.value=v);
  const setCat$ = $((c:typeof cat.value)=> cat.value=c);
  const setQ$ = $((val:string)=> q.value=val);
  const gotoMonth$ = $((offset:number)=> cursor.value = new Date(cursor.value.getFullYear(), cursor.value.getMonth()+offset, 1));
  const gotoWeek$ = $((offset:number)=> cursor.value = addDays(cursor.value, 7*offset));
  const gotoToday$ = $(()=> cursor.value = new Date());
  const openQuick$ = $((e:CalEvent)=> quick.value = e);
  const closeQuick$ = $(()=> quick.value = null);

  const events = useComputed$(()=> {
    const query = q.value.trim().toLowerCase();
    return DATA
      .filter(e => cat.value==='hammasi' ? true : e.category===cat.value)
      .filter(e => !query || e.title.toLowerCase().includes(query) || e.place.toLowerCase().includes(query))
      .sort((a,b)=> +new Date(a.start) - +new Date(b.start));
  });

  // Month grid (6 haftagacha)
  const monthMatrix = useComputed$(()=>{
    if (view.value!=='month') return [];
    const base = new Date(cursor.value.getFullYear(), cursor.value.getMonth(), 1);
    const firstDay = new Date(base);
    const weekday = firstDay.getDay(); // 0-yakshanba ... 6-shanba
    const start = addDays(firstDay, -((weekday + 6) % 7)); // haftani dushanbadan boshlaymiz
    const weeks: Date[][] = [];
    for (let w=0; w<6; w++){
      const row: Date[] = [];
      for (let d=0; d<7; d++) row.push(addDays(start, w*7+d));
      weeks.push(row);
    }
    return weeks;
  });

  // Week list (dushanba->yakshanba)
  const weekDays = useComputed$(()=>{
    if (view.value!=='week') return [];
    const d = cursor.value;
    // d ni haftaning dushanbasiga yo'naltiramiz
    const weekday = d.getDay();
    const start = addDays(d, -((weekday + 6) % 7));
    return Array.from({length:7}, (_,i)=> addDays(start,i));
  });

  // ICS export
  const addToCalendar$ = $((e: CalEvent) => {
    const start = new Date(e.start);
    const end = e.end ? new Date(e.end) : new Date(start.getTime()+2*60*60*1000);
    const fmt = (d:Date) => d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/, 'Z');
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Shahrisabz Events//Qwik//UZ
BEGIN:VEVENT
UID:${e.id}@shahrisabz.events
DTSTAMP:${fmt(new Date())}
DTSTART:${fmt(start)}
DTEND:${fmt(end)}
SUMMARY:${e.title}
LOCATION:${e.place}
DESCRIPTION:${e.title} — ${fmtPrice(e.price)} (${e.category})
END:VEVENT
END:VCALENDAR`.replace(/\n/g, '\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=`${e.slug}.ics`; document.body.appendChild(a); a.click();
    setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); },0);
  });

  const monthName = (d:Date) => d.toLocaleString('uz-UZ', { month:'long', year:'numeric' });
  const dow = ['Du','Se','Ch','Pa','Ju','Sh','Ya'];

  return (
    <section id="calendar" class="py-16 bg-white dark:bg-zinc-950">
      <div class="max-w-6xl mx-auto px-6">
        {/* header & controls */}
        <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 class="text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">Tadbirlar taqvimi</h2>
            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Oy/hafta, kategoriya va qidiruv bo‘yicha ko‘rish.</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <div class="inline-flex rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden">
              <button onClick$={()=>setView$('month')} class={`h-9 px-4 text-sm ${view.value==='month'?'bg-emerald-600 text-white':'hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60'}`}>Oy</button>
              <button onClick$={()=>setView$('week')}  class={`h-9 px-4 text-sm ${view.value==='week' ?'bg-emerald-600 text-white':'hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60'}`}>Hafta</button>
            </div>
            <div class="inline-flex rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden">
              {view.value==='month' ? (
                <>
                  <button onClick$={()=>gotoMonth$(-1)} class="h-9 px-3">‹</button>
                  <div class="h-9 px-4 grid place-items-center text-sm">{monthName(cursor.value)}</div>
                  <button onClick$={()=>gotoMonth$(+1)} class="h-9 px-3">›</button>
                </>
              ) : (
                <>
                  <button onClick$={()=>gotoWeek$(-1)} class="h-9 px-3">‹</button>
                  <div class="h-9 px-4 grid place-items-center text-sm">
                    {fmtDateTime(addDays(cursor.value, -((cursor.value.getDay()+6)%7)).toISOString()).split(',')[0]} — {fmtDateTime(addDays(cursor.value, 6-((cursor.value.getDay()+6)%7)).toISOString()).split(',')[0]}
                  </div>
                  <button onClick$={()=>gotoWeek$(+1)} class="h-9 px-3">›</button>
                </>
              )}
            </div>
            <button onClick$={gotoToday$} class="h-9 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60">Bugun</button>

            <select class="h-9 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 text-sm text-zinc-900 dark:text-zinc-100" onChange$={(e, el)=>setCat$(el.value as any)}>
              {['hammasi','festival','konsert','ko\'rgazma','teatr','sayil'].map(c=>(
                <option key={c} value={c} selected={cat.value===c as any}>{c}</option>
              ))}
            </select>
            <input type="search" placeholder="Qidirish…" onInput$={(e, el)=>setQ$(el.value)}
              class="h-9 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"/>
          </div>
        </div>

        {/* MONTH VIEW */}
        {view.value==='month' && (
          <div class="mt-6 rounded-2xl overflow-hidden border border-zinc-200/70 dark:border-zinc-800/70">
            <div class="grid grid-cols-7 bg-zinc-100/70 dark:bg-zinc-900/70 text-xs text-zinc-600 dark:text-zinc-400">
              {dow.map((d)=>(<div key={d} class="px-2 py-2 text-center">{d}</div>))}
            </div>
            <div class="grid grid-cols-7">
              {monthMatrix.value.map((week, wi)=>(
                <div key={wi} class="contents">
                  {week.map((d, di)=>{
                    const isCurMonth = d.getMonth()===cursor.value.getMonth();
                    const dayEvents = events.value.filter(e => {
                      const ds = new Date(e.start);
                      return sameDay(ds, d);
                    });
                    const isToday = sameDay(d, today.value);
                    return (
                      <div key={di} class={`h-28 border-t border-r border-zinc-200/60 dark:border-zinc-800/60 p-2 ${isCurMonth?'bg-white dark:bg-zinc-950':'bg-zinc-50 dark:bg-zinc-900/60'}`}>
                        <div class={`text-xs ${isToday?'text-emerald-700 dark:text-emerald-400 font-semibold':''}`}>{d.getDate()}</div>
                        <div class="mt-1 space-y-1">
                          {dayEvents.slice(0,3).map(ev=>(
                            <button key={ev.id} onClick$={()=>openQuick$(ev)}
                              class="w-full truncate rounded-md px-2 py-1 text-[11px] text-left
                                     bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600/25">
                              {ev.title}
                            </button>
                          ))}
                          {dayEvents.length>3 && (
                            <div class="text-[11px] text-zinc-500 dark:text-zinc-400">+{dayEvents.length-3} ta</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEEK VIEW */}
        {view.value==='week' && (
          <div class="mt-6 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 overflow-hidden">
            <div class="grid grid-cols-7 bg-zinc-100/70 dark:bg-zinc-900/70 text-xs text-zinc-600 dark:text-zinc-400">
              {weekDays.value.map((d,i)=>(
                <div key={i} class="px-2 py-2 text-center">
                  {dow[i]} {d.getDate()}
                </div>
              ))}
            </div>
            <div class="grid grid-cols-7">
              {weekDays.value.map((d, i)=>{
                const evs = events.value.filter(e => sameDay(new Date(e.start), d));
                const isToday = sameDay(d, today.value);
                return (
                  <div key={i} class={`min-h-[9rem] border-t border-r border-zinc-200/60 dark:border-zinc-800/60 p-2 ${isToday?'bg-emerald-50/60 dark:bg-emerald-900/10':''}`}>
                    <div class="space-y-2">
                      {evs.map(ev=>(
                        <div key={ev.id} class="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 p-2 bg-white/60 dark:bg-zinc-900/60">
                          <div class="text-xs text-zinc-600 dark:text-zinc-400">{fmtDateTime(ev.start)}</div>
                          <div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">{ev.title}</div>
                          <div class="text-xs text-zinc-600 dark:text-zinc-400">📍 {ev.place}</div>
                          <div class="mt-2 flex items-center justify-between">
                            <a href={`/events/${ev.slug}`} class="text-[12px] text-emerald-700 dark:text-emerald-400 hover:underline">Batafsil →</a>
                            <button onClick$={()=>openQuick$(ev)} class="text-[12px] border rounded-md px-2 py-1 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60">
                              Tez ko‘rish
                            </button>
                          </div>
                        </div>
                      ))}
                      {!evs.length && <div class="text-[12px] text-zinc-500 dark:text-zinc-400">Tadbir yo‘q</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* QUICK VIEW MODAL */}
        {quick.value && (
          <div class="fixed inset-0 z-[60] grid place-items-center p-4" role="dialog" aria-modal="true">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick$={closeQuick$}/>
            <div class="relative w-full max-w-xl rounded-2xl overflow-hidden
                        bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70 shadow-2xl">
              <div class="p-6">
                <div class="text-sm text-zinc-600 dark:text-zinc-400">
                  {fmtDateTime(quick.value.start)} • 📍 {quick.value.place}
                </div>
                <h3 class="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{quick.value.title}</h3>
                <div class="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                  Kategoriya: <span class="capitalize">{quick.value.category}</span> • Narx: {fmtPrice(quick.value.price)}
                </div>

                <div class="mt-5 flex justify-end gap-2">
                  <button onClick$={closeQuick$}
                          class="h-10 px-4 rounded-xl text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition">
                    Yopish
                  </button>
                  <button onClick$={()=>addToCalendar$(quick.value!)}
                          class="h-10 px-4 rounded-xl text-sm border border-emerald-400/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/15 transition">
                    Kalenderga qo‘shish
                  </button>
                  <a href={`/events/${quick.value.slug}`}
                     class="h-10 px-4 rounded-xl text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition">
                    Batafsil sahifa
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
});
