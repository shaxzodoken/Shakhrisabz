// src/components/ui/Button.tsx
import { component$, Slot as ButtonSlot } from '@builder.io/qwik';
export const Button = component$<{
  variant?: 'default'|'outline'|'ghost';
  size?: 'sm'|'md'|'lg';
  as?: 'button'|'a';
  href?: string;
}>(({ variant='default', size='md', as='button', href }) => {
  const base = 'inline-flex items-center justify-center rounded-xl transition active:translate-y-px';
  const sizes: Record<string,string> = { sm:'h-8 px-3 text-sm', md:'h-10 px-4 text-sm', lg:'h-12 px-6 text-base' };
  const variants: Record<string,string> = {
    default:'bg-emerald-600 text-white hover:bg-emerald-700',
    outline:'border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60',
    ghost:'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50/60 dark:hover:bg-emerald-900/20'
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]}`;
  if (as==='a' && href) { return (<a class={cls} href={href}><ButtonSlot/></a>) as any; }
  return <button class={cls}><ButtonSlot/></button>;
});