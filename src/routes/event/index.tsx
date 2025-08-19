// src/routes/events/index.tsx
import { component$ } from '@builder.io/qwik';
import { EventsCalendar } from '~/components/events/EventsCalendar';
import { EventsHeroPro } from '~/components/events/EventsHero'
import { Tickets } from '~/components/events/Tickets';
import { UpcomingEvents } from '~/components/events/UpcomingEvents';

export default component$(() => {
  return (
    <main>
      <EventsHeroPro
      title="Shahrisabz Festival 2025"
      dateISO="2025-09-05T18:00:00"
      location="Oqsaroy maydoni"
      priceFrom="50 000 so'm"
      bgImage="/images/events/hero.jpg"
    />
    <UpcomingEvents />
    <Tickets />
    <EventsCalendar />
    </main>
  );
});
