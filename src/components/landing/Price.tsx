// src/components/landing/Price.tsx
import { component$ } from '@builder.io/qwik';
import { Container } from '~/components/ui/Container';
import { Card, CardHeader, CardContent } from '~/components/ui/Card';
import { Button } from '~/components/ui/Button';
export const Price = component$(() => (
  <section class="py-10">
    <Container>
      <h2 class="text-2xl font-semibold font-serif text-zinc-900 dark:text-zinc-100">Yo‘nalishlar narxlari</h2>
      <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">O‘quv markazi uchun namunaviy paketlar.</p>
      <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[{t:'Boshlang‘ich',p:'390 ming so‘m/oy'},{t:'Standart',p:'590 ming so‘m/oy'},{t:'Premium',p:'890 ming so‘m/oy'}].map((x)=> (
          <Card hover key={x.t}>
            <CardHeader>
              <div class="flex items-baseline justify-between">
                <span class="text-zinc-900 dark:text-zinc-100 font-medium">{x.t}</span>
                <span class="text-emerald-700 dark:text-emerald-400 text-sm">{x.p}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <li>• Haftasiga 3 dars</li>
                <li>• Kichik guruhlar</li>
                <li>• Uy vazifa va nazorat</li>
              </ul>
              <div class="mt-4"><Button as="a" href="#">Ro‘yxatdan o‘tish</Button></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  </section>
));