import { component$ } from "@builder.io/qwik";
import { AboutSection } from "~/components/AboutSection";
import { Footer } from "~/components/Footer";
import { GalleryPreview } from "~/components/GalleryPreview";
import { Hero } from "~/components/Hero";
import { HighlightsSection } from "~/components/HighLight";
import Navbar from "~/components/Navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <GalleryPreview />
      <HighlightsSection />
      <Footer />
    </>
  );
});
