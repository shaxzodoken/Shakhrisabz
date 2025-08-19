// src/components/history/Hero.tsx
import { component$ } from "@builder.io/qwik";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";

export const HistoryHero = component$(() => {
  return (
    <section class="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="https://i.pinimg.com/originals/2d/b4/3e/2db43e0f95c731bc7c2d1f6f3c444aaa.jpg"
        alt="Shahrisabz tarixiy manzara"
        class="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
      />

      {/* Overlay */}
      <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />

      <Container>
        <div class="relative z-10 max-w-3xl text-center text-white">
          <h1 class="text-5xl md:text-6xl font-serif font-bold animate-fade-in-up">
            Shahrisabz Tarixi
          </h1>
          <p class="mt-6 text-xl text-zinc-200 animate-fade-in delay-200">
            Amir Temurdan meros qolgan qadimiy shahar yo‘llari, madrasa va
            saroylar hikoyasi.
          </p>
          <div class="mt-8 flex gap-4 justify-center animate-fade-in delay-300">
            <Button as="a" href="#timeline" size="lg">
              Tarixiy voqealar
            </Button>
            <Button variant="outline" as="a" href="#attractions" size="lg">
              Yodgorliklar
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white opacity-80 animate-bounce">
        <span class="block text-sm">Pastga suring</span>
        <span class="block text-2xl">↓</span>
      </div>
    </section>
  );
});
