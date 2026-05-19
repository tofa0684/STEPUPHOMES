import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Properties from '@/components/Properties';
import WhyChooseMe from '@/components/WhyChooseMe';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 font-sans text-zinc-50 selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />
      <Hero />
      <About />
      <Properties />
      <WhyChooseMe />
      <Contact />
      <Footer />
    </main>
  );
}
