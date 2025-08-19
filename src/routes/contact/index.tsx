// routes/contact/index.tsx
import { component$, useSignal, $ } from '@builder.io/qwik';
import Navbar from '~/components/layout/Navbar';
import Footer from '~/components/layout/Footer';

export default component$(() => {
  const formData = useSignal({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const isSubmitting = useSignal(false);

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();
    isSubmitting.value = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    isSubmitting.value = false;
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  });

  const handleInput = $((field: keyof typeof formData.value, value: string) => {
    formData.value = { ...formData.value, [field]: value };
  });

  return (
    <>
      <Navbar />
      <main class="pt-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* HERO */}
        <section class="relative h-[400px] flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-primary-600 to-accent-600">
          <div class="absolute inset-0 bg-black/30"></div>
          <div class="relative z-10 text-center text-white">
            <h1 class="text-5xl md:text-7xl font-bold mb-4">Biz bilan bog'laning</h1>
            <p class="text-xl md:text-2xl opacity-90">Shahrisabz haqida savollaringiz bormi?</p>
          </div>
        </section>

        {/* CONTACT INFO */}
        <section class="max-w-7xl mx-auto px-6 py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: '📍', 
                title: 'Manzil', 
                text: 'Shahrisabz, Qashqadaryo, Oʻzbekiston',
                color: 'from-blue-500 to-blue-600'
              },
              { 
                icon: '📞', 
                title: 'Telefon', 
                text: '+998 (90) 123-45-67',
                color: 'from-green-500 to-green-600'
              },
              { 
                icon: '✉️', 
                title: 'Email', 
                text: 'info@shahrisabz.uz',
                color: 'from-purple-500 to-purple-600'
              },
              { 
                icon: '🕒', 
                title: 'Ish vaqti', 
                text: 'Du–Shan: 9:00–18:00',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((item, idx) => (
              <div key={idx} class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div class={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span class="text-2xl">{item.icon}</span>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                <p class="text-gray-600 dark:text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MAP & FORM SECTION */}
        <section class="max-w-7xl mx-auto px-6 py-16">
          <div class="grid lg:grid-cols-2 gap-12">
            {/* MAP */}
            <div class="space-y-6">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Bizning manzil</h2>
              <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11980.647975918368!2d66.8333!3d39.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4a3c3e3c3e3c3%3A0x123456789abcdef!2sShahrisabz!5e0!3m2!1suz!2s!4v1691336456234!5m2!1suz!2s"
                  width="100%"
                  height="400"
                  style="border:0;"
                  allowFullscreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div class="space-y-6">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Xabar yuborish</h2>
              <form onSubmit$={handleSubmit} class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ism</label>
                    <input 
                      type="text" 
                      value={formData.value.name}
                      onInput$={(ev) => handleInput('name', (ev.target as HTMLInputElement).value)}
                      class="w-full p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Ismingizni kiriting"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      value={formData.value.email}
                      onInput$={(ev) => handleInput('email', (ev.target as HTMLInputElement).value)}
                      class="w-full p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Email manzilingiz"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mavzu</label>
                  <input 
                    type="text" 
                    value={formData.value.subject}
                    onInput$={(ev) => handleInput('subject', (ev.target as HTMLInputElement).value)}
                    class="w-full p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200" 
                    placeholder="Xabar mavzusi"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Xabar</label>
                  <textarea 
                    value={formData.value.message}
                    onInput$={(ev) => handleInput('message', (ev.target as HTMLTextAreaElement).value)}
                    rows={6} 
                    class="w-full p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Xabaringizni yozing..."
                  ></textarea>
                </div>
                
                
              </form>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
          <div class="max-w-4xl mx-auto text-center px-6">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">Shahrisabz sizni kutmoqda!</h2>
            <p class="text-xl mb-8 opacity-90">Shahrisabzning go'zalligi va tarixini o'z ko'zingiz bilan ko'ring.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});
