import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Footer = component$(() => {
  return (
    <footer class="bg-black text-gray-300 border-t border-yellow-400 font-serif">
      <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo + Info */}
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-bold text-yellow-300 drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]">
            ShaharNomi
          </h2>
          <p class="mt-2 text-gray-400 max-w-xs">
            Qadimiy shahar sirlarini biz bilan birga kashf eting. Tarix, madaniyat va meros – barchasi shu yerda.
          </p>
        </div>

        {/* Navigation */}
        <nav class="flex flex-col md:flex-row gap-3 md:gap-6 text-center">
          <Link href="/" class="hover:text-yellow-300 transition">Home</Link>
          <Link href="/tarix" class="hover:text-yellow-300 transition">Tarix</Link>
          <Link href="/galereya" class="hover:text-yellow-300 transition">Galereya</Link>
          <Link href="/kontakt" class="hover:text-yellow-300 transition">Kontakt</Link>
        </nav>
      </div>

      {/* Bottom Line */}
      <div class="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Shahar Tarixi Loyihasi. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
});
