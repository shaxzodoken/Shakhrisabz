import { component$ } from '@builder.io/qwik';
import Footer from '~/components/layout/Footer';
import Navbar from '~/components/layout/Navbar';

import { PartnersStrip } from '~/components/roadPage/PartnersStrip';
import { RoadsHeroPro } from '~/components/roadPage/RoadHero';
import { RouteBuilder } from '~/components/roadPage/RouteBuilder';
import RouteCards from '~/components/roadPage/RouteCards';
import RouteCTA from '~/components/roadPage/RouteCTA';
import SilkRoadMap from '~/components/roadPage/SilkRoadMap';
import { StopsMarketplace } from '~/components/roadPage/StopsMarketplace';


export default component$(() => {
  return (
    <>
      <Navbar />
      <RoadsHeroPro />
      <RouteBuilder />
      <RouteCards />
      <RouteCTA />
      <StopsMarketplace />
      <PartnersStrip />
      <SilkRoadMap />
      {/* #map, #checkout bloklarini keyin ulaysiz (xarita integratsiyasi, to'lov qismi) */}
      <Footer />
    </>
  );
});
