import React from 'react';
import { Award, Users, Stethoscope } from 'lucide-react';

const GOOGLE_BUSINESS_URL = 'https://maps.app.goo.gl/gx63s4nMPmkZfAYa6';

const TrustBar: React.FC = () => {
  return (
    <div className="bg-brand-gray border-y border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">

          <div className="flex items-center justify-center space-x-4 p-4">
            <div className="bg-brand-neon/10 p-3 rounded-full">
              <Award className="w-8 h-8 text-brand-neon" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black text-white leading-none">4-Phase™</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide font-bold">System Approach</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-brand-neon/10 p-3 rounded-full shrink-0">
                <Users className="w-8 h-8 text-brand-neon" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-black text-white leading-none">5-star rated</p>
                <p className="text-sm text-gray-400 uppercase tracking-wide font-bold">On Google</p>
              </div>
            </div>
            <a
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-bold tracking-wide uppercase text-xs px-5 py-2 border-2 border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-brand-gray"
            >
              View on Google
            </a>
          </div>

          <div className="flex items-center justify-center space-x-4 p-4">
            <div className="bg-brand-neon/10 p-3 rounded-full">
              <Stethoscope className="w-8 h-8 text-brand-neon" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black text-white leading-none">Connected</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide font-bold">DOCTORS, SPECIALISTS & MORE</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrustBar;
