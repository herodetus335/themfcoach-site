import React from 'react';
import { Head } from 'vite-react-ssg';
import { PAGE_META } from '../seo/pageMeta';
import PricingSection from '../PricingSection';

const PricingPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>{PAGE_META.pricing.title}</title>
        <meta name="description" content={PAGE_META.pricing.description} />
      </Head>
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
    </>
  );
};

export default PricingPage;
