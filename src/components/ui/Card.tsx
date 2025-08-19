// src/components/ui/Card.tsx
// -------------------------------------------------------------
import { component$, Slot as CardSlot } from '@builder.io/qwik';
export const Card = component$<{hover?: boolean}>(({ hover }) => (
<div class={`rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm ${hover ? 'transition hover:shadow-lg hover:-translate-y-[1px]' : ''}`}>
<CardSlot/>
</div>
));
export const CardHeader = component$(() => (
<div class="p-5 border-b border-zinc-200/70 dark:border-zinc-800/70"><CardSlot/></div>
));
export const CardContent = component$(() => (<div class="p-5"><CardSlot/></div>));