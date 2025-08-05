import { component$ } from '@builder.io/qwik';
import { Dropdown, Navbar } from 'flowbite-qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <Navbar fluid class="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-gray-700">
      <Navbar.Brand tag={Link} href="/">
        <img 
          src="https://pocketterco.com.br/images/apple-logo2.png" 
          alt="Logo" 
          class="h-8 w-auto" 
        />
        <span class="ml-2 text-xl font-serif font-bold text-yellow-300">
          Shakhrisabz
        </span>
      </Navbar.Brand>

      <div class="flex items-center md:order-2">
        <Dropdown
          as={
            <img
              class="h-8 w-8 rounded-full ring-2 ring-gray-600"
              src="https://res.cloudinary.com/dkht4mwqi/image/upload/f_auto,q_auto/v1718462568/flowbite-qwik/jpnykkz8ojq7ojgg4qta.jpg"
              alt="user photo"
            />
          }
        >
          <Dropdown.Item header>
            <span class="block text-sm font-medium">Bonnie Green</span>
            <span class="block text-xs text-gray-400">name@flowbite.com</span>
          </Dropdown.Item>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Item divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link href="/" class="text-gray-300 hover:text-yellow-300 transition">Home</Navbar.Link>
        <Navbar.Link href="/tarix" class="text-gray-300 hover:text-yellow-300 transition">Tarix</Navbar.Link>
        <Navbar.Link href="/galereya" class="text-gray-300 hover:text-yellow-300 transition">Galereya</Navbar.Link>
        <Navbar.Link href="/kontakt" class="text-gray-300 hover:text-yellow-300 transition">Kontakt</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
});
