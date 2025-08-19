// src/components/events/Tickets.tsx
import { component$, useSignal, useComputed$, $ } from '@builder.io/qwik';

type TierId = 'vip' | 'standard' | 'student';
type Tier = { id: TierId; name: string; price: number; perks: string[]; best?: boolean };

const TIERS: Tier[] = [
  { id: 'vip', name: 'VIP', price: 180_000, best: true, perks: ['Old qatorlar', 'Meet & Greet', 'Souvenir set'] },
  { id: 'standard', name: 'Standard', price: 90_000, perks: ['Markaziy zona', 'Standart o‘rindiq'] },
  { id: 'student', name: 'Student', price: 45_000, perks: ['Chegirma', 'Orqa sektor'] },
];

const fmt = (v: number) => v === 0 ? 'Bepul' : `${v.toLocaleString('uz-UZ')} so'm`;

export const Tickets = component$(() => {
  // tanlangan miqdorlar
  const qty = useSignal<Record<TierId, number>>({ vip: 0, standard: 0, student: 0 });
  const promo = useSignal('');
  const promoMsg = useSignal<string | null>(null);

  // promokodlar (demo)
  const PROMOS: Record<string, number> = {
    'SHAHRI10': 0.10,    // 10% skidka
    'STUDENT5': 0.05,    // 5% skidka
  };

  const subTotal = useComputed$(() =>
    TIERS.reduce((sum, t) => sum + t.price * (qty.value[t.id] ?? 0), 0)
  );

  const discount = useComputed$(() => {
    const rate = PROMOS[promo.value.toUpperCase()] ?? 0;
    return Math.round(subTotal.value * rate);
  });

  const total = useComputed$(() => Math.max(0, subTotal.value - discount.value));

  const inc$ = $((id: TierId) => (qty.value = { ...qty.value, [id]: (qty.value[id] ?? 0) + 1 }));
  const dec$ = $((id: TierId) => (qty.value = { ...qty.value, [id]: Math.max(0, (qty.value[id] ?? 0) - 1) }));

  const applyPromo$ = $(() => {
    if (!promo.value) { promoMsg.value = null; return; }
    promoMsg.value = PROMOS[promo.value.toUpperCase()] ? 'Chegirma qo‘llandi ✅' : 'Promokod topilmadi ❌';
  });

  const checkout$ = $(() => {
    // Bu yerda real to'lov gateway (Payme, Click, Stripe, ... )ga ulaysan.
    const payload = {
      items: TIERS.map(t => ({ id: t.id, name: t.name, price: t.price, qty: qty.value[t.id] ?? 0 }))
                  .filter(x => x.qty > 0),
      subTotal: subTotal.value,
      discount: discount.value,
      total: total.value,
      promo: promo.value || null,
    };
    alert(`Buyurtma tayyor:\n${JSON.stringify(payload, null, 2)}`);
  });

  return (
    <section id="tickets" class="py-16 bg-white dark:bg-zinc-950">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 class="text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">Chipta & Narxlar</h2>
            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Paketni tanlang, sonini belgilang va promokod kiriting.
            </p>
          </div>
        </div>

        {/* Pricing cards */}
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TIERS.map(t => (
            <div key={t.id}
              class={`relative rounded-2xl border bg-zinc-50 dark:bg-zinc-900
                      border-zinc-200/70 dark:border-zinc-800/70 overflow-hidden ${t.best ? 'ring-2 ring-emerald-500/60' : ''}`}>
              {t.best && (
                <div class="absolute top-3 right-3 text-[11px] px-2 py-1 rounded-full bg-emerald-600 text-white">Tavsiya</div>
              )}
              <div class="p-5">
                <div class="text-sm uppercase tracking-wide text-zinc-600 dark:text-zinc-400">{t.name}</div>
                <div class="mt-1 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{fmt(t.price)}</div>

                <ul class="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {t.perks.map(p => <li key={p}>• {p}</li>)}
                </ul>

                <div class="mt-5 flex items-center justify-between">
                  <div class="inline-flex items-center rounded-xl border border-zinc-300 dark:border-zinc-700">
                    <button onClick$={() => dec$(t.id)} class="h-9 w-9 grid place-items-center">−</button>
                    <span class="px-3 text-sm min-w-[2.5ch] text-center">{qty.value[t.id] ?? 0}</span>
                    <button onClick$={() => inc$(t.id)} class="h-9 w-9 grid place-items-center">+</button>
                  </div>
                  <div class="text-sm text-zinc-600 dark:text-zinc-400">
                    Jami: <span class="font-medium text-zinc-900 dark:text-zinc-100">{fmt(t.price * (qty.value[t.id] ?? 0))}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo + Summary */}
        <div class="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Promo form */}
          <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
            <div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">Promokod</div>
            <div class="mt-3 flex gap-2">
              <input
                value={promo.value}
                onInput$={(_, el) => (promo.value = el.value)}
                placeholder="Masalan: SHAHRI10"
                class="h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 text-sm
                       text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              />
              <button
                onClick$={applyPromo$}
                class="h-10 px-4 rounded-xl text-sm border border-emerald-400/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/15 transition"
              >
                Qo‘llash
              </button>
            </div>
            {promoMsg.value && (
              <div class="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{promoMsg.value}</div>
            )}
          </div>

          {/* Summary */}
          <div class="lg:col-span-2 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="space-y-1 text-sm">
                <div class="flex justify-between"><span>Oraliq summa</span><span>{fmt(subTotal.value)}</span></div>
                <div class="flex justify-between"><span>Chegirma</span><span>− {fmt(discount.value)}</span></div>
                <div class="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
                <div class="flex justify-between text-base font-semibold"><span>Jami</span><span>{fmt(total.value)}</span></div>
              </div>

              <div class="flex items-end justify-end">
                <button
                  onClick$={checkout$}
                  disabled={total.value === 0}
                  class={`h-12 px-6 rounded-xl text-base transition
                          ${total.value === 0
                            ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                >
                  Sotib olish
                </button>
              </div>
            </div>

            {/* Yordamchi matn */}
            <p class="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              To‘lov xizmati: keyingi bosqichda (Payme/Click/Stripe) ulanishi mumkin. Buyurtma tasdiqlangach, chiptalar email orqali yuboriladi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
