import React from 'react';
import { Award, Users, Stethoscope } from 'lucide-react';

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
              <p className="text-2xl font-black text-white leading-none">4-Phase</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide font-bold">System</p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 p-4">
            <div className="bg-brand-neon/10 p-3 rounded-full">
              <Users className="w-8 h-8 text-brand-neon" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black text-white leading-none">5-star rated</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide font-bold">On google</p>
            </div>
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
