import React from 'react';
import { Calculator } from 'lucide-react';
import Button from './Button';

/** Compact homepage CTA that links to the email-gated calculator landing page. */
const CalculatorTeaser: React.FC = () => {
  return (
    <section id="calculator" className="py-20 bg-brand-black relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#00FF41 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <p className="text-brand-neon font-bold tracking-widest uppercase text-sm mb-2">Free Tool</p>
        <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase mb-4">
          Not sure where to start?
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Get your personalized calorie and protein targets for free.
        </p>
        <Button to="/calculator" variant="primary" className="text-lg px-10 py-4 inline-flex items-center gap-2">
          <Calculator className="w-5 h-5" aria-hidden="true" />
          Use the Free Calculator
        </Button>
      </div>
    </section>
  );
};

export default CalculatorTeaser;
