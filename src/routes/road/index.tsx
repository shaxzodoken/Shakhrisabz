import { component$ } from '@builder.io/qwik';

import Navbar from '~/components/layout/Navbar';
import Footer from '~/components/layout/Footer';
import RoadHero from '~/components/roadPage/RoadHero';
import PageSection from '~/components/roadPage/PageSection';
import RouteCards from '~/components/roadPage/RouteCards';
import SilkRoadMap from '~/components/roadPage/SilkRoadMap';
import RouteCTA from '~/components/roadPage/RouteCTA';
import { HighlightCard, ImageCard, TextBlock } from '~/components/roadPage';

export default component$(() => {
  return (
    <>
      <Navbar />

      {/* 🎥 Hero Section */}
      <RoadHero />

      {/* 📊 Statistics Section */}
      <PageSection background="gray" padding="large">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div class="space-y-2">
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">6,500+</div>
            <div class="text-gray-600 dark:text-gray-300">Kilometers of Ancient Routes</div>
          </div>
          <div class="space-y-2">
            <div class="text-4xl font-bold text-green-600 dark:text-green-400">50+</div>
            <div class="text-gray-600 dark:text-gray-300">Cities & Trading Posts</div>
          </div>
          <div class="space-y-2">
            <div class="text-4xl font-bold text-yellow-600 dark:text-yellow-400">2,000+</div>
            <div class="text-gray-600 dark:text-gray-300">Years of History</div>
          </div>
          <div class="space-y-2">
            <div class="text-4xl font-bold text-purple-600 dark:text-purple-400">100+</div>
            <div class="text-gray-600 dark:text-gray-300">Cultural Exchanges</div>
          </div>
        </div>
      </PageSection>

      {/* 🛤 Ancient Trade Routes */}
      <RouteCards />

      {/* 📖 Historical Overview */}
      <PageSection background="white" padding="large">
        <div class="max-w-4xl mx-auto">
          <TextBlock
            title="The Legendary Silk Road"
            subtitle="A network of trade routes that connected the East and West for over 2,000 years"
            content="The Silk Road was not just a single road, but a vast network of trade routes that spanned over 6,500 kilometers, connecting China with the Mediterranean Sea. This ancient trade network facilitated the exchange of goods, ideas, religions, and cultures between the East and West, shaping the course of human civilization."
            alignment="center"
            size="large"
          />
          
          <div class="grid md:grid-cols-2 gap-12 mt-16">
            <HighlightCard
              title="Cultural Exchange"
              description="The Silk Road was a bridge between civilizations, facilitating the exchange of art, religion, philosophy, and technology."
              icon="🌍"
              color="blue"
              link="/history"
            />
            <HighlightCard
              title="Economic Prosperity"
              description="Trade in silk, spices, precious metals, and other goods created immense wealth and economic growth across continents."
              icon="💰"
              color="green"
              link="/trade"
            />
            <HighlightCard
              title="Technological Innovation"
              description="The spread of technologies like papermaking, gunpowder, and compass navigation revolutionized the world."
              icon="⚙️"
              color="yellow"
              link="/technology"
            />
            <HighlightCard
              title="Religious Diversity"
              description="Buddhism, Christianity, Islam, and other religions spread along these routes, creating diverse spiritual landscapes."
              icon="🕊️"
              color="purple"
              link="/religion"
            />
          </div>
        </div>
      </PageSection>

      {/* 🗺 Interactive Map */}
      <SilkRoadMap />

      {/* 🏛️ Famous Landmarks */}
      <PageSection background="gray" padding="large">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Iconic Landmarks
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the most famous and historically significant sites along the ancient Silk Road
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ImageCard
            src="/images/samarkand.jpg"
            alt="Registan Square in Samarkand"
            title="Registan Square"
            description="The heart of Samarkand, featuring stunning Islamic architecture and intricate tilework"
            overlay={true}
            aspectRatio="landscape"
          />
          <ImageCard
            src="/images/mogao-caves.jpg"
            alt="Mogao Caves in Dunhuang"
            title="Mogao Caves"
            description="Ancient Buddhist cave temples with over 1,000 years of artistic and religious history"
            overlay={true}
            aspectRatio="landscape"
          />
          <ImageCard
            src="/images/palmyra.jpg"
            alt="Ancient ruins of Palmyra"
            title="Palmyra"
            description="A once-great trading city that connected the Mediterranean with the East"
            overlay={true}
            aspectRatio="landscape"
          />
          <ImageCard
            src="/images/taklamakan.jpg"
            alt="Taklamakan Desert"
            title="Taklamakan Desert"
            description="One of the world's largest sand deserts, a formidable challenge for ancient travelers"
            overlay={true}
            aspectRatio="landscape"
          />
          <ImageCard
            src="/images/pamir-mountains.jpg"
            alt="Pamir Mountains"
            title="Pamir Mountains"
            description="The 'Roof of the World' - high mountain passes that connected Central Asia"
            overlay={true}
            aspectRatio="landscape"
          />
          <ImageCard
            src="/images/constantinople.jpg"
            alt="Ancient Constantinople"
            title="Constantinople"
            description="The gateway to Europe, where Eastern goods entered the Western world"
            overlay={true}
            aspectRatio="landscape"
          />
        </div>
      </PageSection>

      {/* 🎒 Travel Tips */}
      <PageSection background="white" padding="large">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Modern Silk Road Travel
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tips and insights for exploring the ancient routes in the modern world
            </p>
          </div>
          
          <div class="grid lg:grid-cols-2 gap-12">
            <div class="space-y-8">
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Best Time to Visit</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  Spring (March-May) and Fall (September-November) offer the most pleasant weather for exploring the Silk Road routes.
                </p>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Spring: Blooming landscapes and moderate temperatures</li>
                  <li>• Fall: Clear skies and comfortable hiking conditions</li>
                  <li>• Avoid summer: Extreme heat in desert regions</li>
                  <li>• Winter: Some mountain passes may be closed</li>
                </ul>
              </div>
              
              <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-xl">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Essential Preparations</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  Proper preparation is key to a successful Silk Road adventure.
                </p>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Research visa requirements for each country</li>
                  <li>• Pack for extreme temperature variations</li>
                  <li>• Bring water purification tablets</li>
                  <li>• Learn basic phrases in local languages</li>
                </ul>
              </div>
            </div>
            
            <div class="space-y-8">
              <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-8 rounded-xl">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cultural Etiquette</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  Respect local customs and traditions along your journey.
                </p>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Dress modestly in religious sites</li>
                  <li>• Remove shoes when entering homes</li>
                  <li>• Ask permission before taking photos</li>
                  <li>• Learn about local customs beforehand</li>
                </ul>
              </div>
              
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Safety Considerations</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  Stay informed and prepared for various challenges.
                </p>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Check travel advisories regularly</li>
                  <li>• Register with your embassy</li>
                  <li>• Carry emergency contact information</li>
                  <li>• Stay hydrated in desert regions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* 📚 Educational Resources */}
      <PageSection background="gray" padding="large">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Learn More About the Silk Road
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Dive deeper into the fascinating history and culture of the ancient trade routes
          </p>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-white text-2xl">📚</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">History & Culture</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Explore the rich history, cultural exchanges, and lasting impact of the Silk Road.
              </p>
              <a href="/history" class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Explore History →
              </a>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-16 h-16 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-white text-2xl">🏛️</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ancient Monuments</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Discover the architectural wonders and archaeological sites along the routes.
              </p>
              <a href="/ancient-monuments" class="text-green-600 dark:text-green-400 font-semibold hover:underline">
                View Monuments →
              </a>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-16 h-16 bg-purple-500 dark:bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-white text-2xl">📸</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Photo Gallery</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Browse stunning photographs of Silk Road destinations and landmarks.
              </p>
              <a href="/gallery" class="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                View Gallery →
              </a>
            </div>
          </div>
        </div>
      </PageSection>

      {/* 📣 Call to Action */}
      <RouteCTA />

      <Footer />
    </>
  );
});
