import React from 'react';
import Button from './Button';
import { MapPin, Zap } from 'lucide-react';
import heroImage from '../images/HeroImage_Transparent.png';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-brand-black/50 to-brand-black pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-brand-neon/10 border border-brand-neon/20 rounded-full px-4 py-1.5 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-neon"></span>
              </span>
              <span className="text-brand-neon text-xs font-bold uppercase tracking-widest">Accepting New Clients</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase leading-none text-white tracking-tighter">
              Dominate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-green-600">Goals.</span><br />
              Unleash Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Potential.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Your program should fit your body, not the other way around. On-site & Mobile personal training in NOVA built from the ground up.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button to="/form" variant="primary" className="w-full sm:w-auto text-lg px-8 py-4">Start Transformation</Button>
              <Button to="/#about" variant="outline" className="w-full sm:w-auto text-lg px-8 py-4">Learn More</Button>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 font-semibold uppercase tracking-wider">
               <div className="flex items-center space-x-1">
                 <MapPin className="w-4 h-4 text-brand-neon" />
                 <span>Ashburn to Fairfax</span>
               </div>
               <div className="flex items-center space-x-1">
                 <Zap className="w-4 h-4 text-brand-neon" />
                 <span>Engineered for you</span>
               </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full relative flex items-center justify-center">
            <div className="absolute -inset-4 bg-brand-neon/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img
              src={heroImage}
              alt="Coach Mike — personal trainer and mobile fitness coach in Ashburn VA"
              className="w-auto h-auto min-h-[500px] max-h-[900px] scale-150 -translate-x-8 object-contain object-center drop-shadow-[0_0_30px_rgba(0,255,65,0.3)]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;