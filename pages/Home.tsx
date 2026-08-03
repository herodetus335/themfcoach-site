import React from 'react';
import { Head } from 'vite-react-ssg';
import { PAGE_META } from '../seo/pageMeta';
import { useHashScroll } from '../hooks/useHashScroll';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Services from '../components/Services';
import About from '../components/About';
import LocationSection from '../components/LocationSection';
import Gallery from '../components/Gallery';
import SuccessSystem from '../components/SuccessSystem';
import CalculatorTeaser from '../components/CalculatorTeaser';
import Button from '../components/Button';

const Home: React.FC = () => {
  useHashScroll();

  return (
    <>
      <Head>
        <title>{PAGE_META.home.title}</title>
        <meta name="description" content={PAGE_META.home.description} />
      </Head>
      <Hero />
      <TrustBar />
      <Services />
      <About />
      <LocationSection />
      <Gallery />
      <SuccessSystem />
      <CalculatorTeaser />

      <section className="py-24 bg-brand-black border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-neon/5"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase mb-8 leading-tight">
            Ready to be the next<br /> <span className="text-brand-neon">Success Story?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Stop guessing. Stop wasting time. Start training with a system that guarantees results.
          </p>
          <Button to="/form" variant="primary" className="text-xl px-12 py-5 shadow-2xl shadow-brand-neon/20">
            Secure Your Spot
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
