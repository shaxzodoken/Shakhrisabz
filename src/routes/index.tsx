// src/routes/index.tsx — Kompozitsiya
// -------------------------------------------------------------
import { component$ } from '@builder.io/qwik';
import Navbar from '~/components/layout/Navbar';
import { Hero } from '~/components/landing/Hero';
import { Stats } from '~/components/landing/Stats';
import { Attractions } from '~/components/landing/Attractions';
import { Events } from '~/components/landing/Events';
import { RoutesBuilder } from '~/components/landing/RoutesBuilder';
import { TimelinePro } from '~/components/landing/Timeline';
import { FAQ } from '~/components/landing/FAQ';
import Footer from '~/components/layout/Footer';


export default component$(() => (
<>
<Navbar/>
<Hero/>
<Stats/>
<Attractions/>
<Events/>
<RoutesBuilder/>
<TimelinePro />
<FAQ/>
<Footer />
</>
));