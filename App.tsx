import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import About from './components/About';
import LocationSection from './components/LocationSection';
import Gallery from './components/Gallery';
import SuccessSystem from './components/SuccessSystem';
import WeightLossCalculator from './components/WeightLossCalculator';
import FormPage from './components/FormPage';
import Button from './components/Button';
import PricingSection from './PricingSection';

// The Main Landing Page Component
const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <About />
      <LocationSection />
      <Gallery />
      <SuccessSystem />
      <WeightLossCalculator />

      {/* Final CTA Section */}
      <section className="py-24 bg-brand-black border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-neon/5"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase mb-8 leading-tight">
            Ready to be the next<br/> <span className="text-brand-neon">Success Story?</span>
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

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-brand-black relative">
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#00FF41 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic">
            Pricing <span className="text-brand-neon">Plans</span>
          </h1>
          <p className="text-gray-400 mt-2">Pick the training setup that fits your goals and schedule.</p>
        </div>
        <PricingSection />
      </div>
    </div>
  );
};

// Layout Wrapper
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-white font-sans selection:bg-brand-neon selection:text-black">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;