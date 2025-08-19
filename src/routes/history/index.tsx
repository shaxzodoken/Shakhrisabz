import { component$ } from "@builder.io/qwik";
import Navbar from "~/components/layout/Navbar";
import Footer from "~/components/layout/Footer";
import HistoryHero from "~/components/historyPage/HistoryHero";
import HistoricalEvents from "~/components/historyPage/HistoricalEvents";
import HistoricalFigures from "~/components/historyPage/HistoricalFigures";
import CulturalHeritage from "~/components/historyPage/CulturalHeritage";
import HistoryGallery from "~/components/historyPage/HistoryGallery";
import HistoryCTA from "~/components/historyPage/HistoryCTA";
import InteractiveTimeline from "~/components/sections/InteractiveTimeline";
import EraMap from "~/components/sections/EraMap";

export default component$(() => {
  return (
    <>
      <Navbar />
      <main class="pt-16">
        <HistoryHero />
        <HistoricalEvents />
        <HistoricalFigures />
        <CulturalHeritage />
        <HistoryGallery />
        <InteractiveTimeline />
        <EraMap />
        <HistoryCTA />
      </main>
      <Footer />
    </>
  );
});
