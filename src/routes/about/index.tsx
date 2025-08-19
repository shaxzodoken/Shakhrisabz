import { component$ } from '@builder.io/qwik';
import Navbar from '~/components/layout/Navbar';
import Footer from '~/components/layout/Footer';
import { AboutHero } from '~/components/aboutPage/AboutHero';
import { AboutMission } from '~/components/aboutPage/AboutMission';
import { AboutTimeline } from '~/components/aboutPage/AboutTimeline';
import { AboutGallery } from '~/components/aboutPage/AboutGallery';
import { AboutTeam } from '~/components/aboutPage/AboutTeam';
import { AboutCTA } from '~/components/aboutPage/AboutCTA';

export default component$(() => {
  return (
    <>
      <Navbar />
      <main class="pt-16">
        <AboutHero />
        <AboutMission />
        <AboutTimeline />
        <AboutGallery />
        <AboutTeam />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
});
