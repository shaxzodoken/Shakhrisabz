import { component$ } from "@builder.io/qwik";
import Navbar from "~/components/layout/Navbar";
import MonumentsHero from "~/components/monumentsPage/MonumentsHero";
import MonumentCards from "~/components/monumentsPage/MonumentCard";
import MonumentsGallery from "~/components/monumentsPage/MonumentGallery";
import MonumentDetail from "~/components/monumentsPage/MonumentDetails";
import MonumentsTimeline from "~/components/monumentsPage/MonumentsTimeline";
import MonumentsCTA from "~/components/monumentsPage/MonumentsCTA";
import Footer from "~/components/layout/Footer";

export default component$(() => {
  return (
    <>
      <Navbar />
      <main class="pt-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <MonumentsHero />
        <MonumentCards />
        <MonumentsGallery />
        <MonumentDetail />
        <MonumentsTimeline />
        <MonumentsCTA />
      </main>
      <Footer />
    </>
  );
});
