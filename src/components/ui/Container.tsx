// src/components/ui/Container.tsx
// -------------------------------------------------------------
import { component$, Slot } from '@builder.io/qwik';
export const Container = component$(() => (
<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><Slot/></div>
));