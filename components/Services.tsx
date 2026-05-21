import React from 'react';
import { BicepsFlexed, Activity, Flame, Trophy } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Strength & Muscle",
      desc: "Hypertrophy focused programming designed to pack on lean mass and increase raw power.",
      icon: BicepsFlexed
    },
    {
      title: "Fat Loss & Conditioning",
      desc: "High-intensity metabolic conditioning to shred fat while preserving hard-earned muscle.",
      icon: Flame
    },
    {
      title: "Rehab & Mobility",
      desc: "Fix imbalances, recover from injuries, and bulletproof your joints for longevity.",
      icon: Activity
    },
    {
      title: "Powerlifting",
      desc: "Specific preparation for competition or simply maximizing your Squat, Bench, and Deadlift.",
      icon: Trophy
    }
  ];

  return (
    <section id="services" className="py-20 bg-brand-black relative">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-neon font-bold tracking-widest uppercase text-sm mb-2">My Expertise</p>
          <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase">How I Will Help You</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-brand-gray border border-white/5 p-8 rounded-2xl hover:border-brand-neon/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-neon/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-brand-neon/10"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-black rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-brand-neon group-hover:text-brand-neon text-white transition-colors">
                  <service.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-black text-white uppercase italic mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;