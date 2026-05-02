import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Truck, Warehouse, Dumbbell, HeartPulse } from 'lucide-react';
import Button from './Button';
import gymPic1 from '../images/newgympics/1.jpeg';
import gymPic2 from '../images/newgympics/2.jpeg';
import gymPic3 from '../images/newgympics/3.jpeg';
import gymPic4 from '../images/newgympics/4.jpeg';
import gymPic5 from '../images/newgympics/5.jpeg';
import gymPic6 from '../images/newgympics/6.jpeg';
import gymPic7 from '../images/newgympics/7.jpeg';
import gymVideo1 from '../images/newgympics/video1.mov';
import gymVideo2 from '../images/newgympics/video2.mov';

type MediaItem = {
  type: 'image' | 'video';
  src: string;
  label: string;
};

const media: MediaItem[] = [
  { type: 'video', src: gymVideo1, label: 'Live Session Highlight' },
  { type: 'image', src: gymPic1, label: 'Strength Floor' },
  { type: 'image', src: gymPic2, label: 'Strength Floor' },
  { type: 'image', src: gymPic3, label: 'The Turf' },
  { type: 'video', src: gymVideo2, label: 'Live Session Highlight' },
  { type: 'image', src: gymPic4, label: 'Mauy Thai' },
  { type: 'image', src: gymPic5, label: 'Chiropractic Center (CIM)' },
  { type: 'image', src: gymPic6, label: 'Coach Mike & Coach Khayri' },
  { type: 'image', src: gymPic7, label: 'Barbershop' },
];

const LocationSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % media.length);
  };

  const previous = () => {
    setActiveIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <section id="location" className="py-24 bg-[#070707] border-y border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,255,65,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(0,255,65,0.09),transparent_30%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-brand-neon uppercase tracking-[0.2em] text-xs font-bold mb-3">Enter...</p>
            <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase leading-tight mb-6">
              Our new home base!
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Introducing the new 11,000 sq ft warehouse training space built for performance. Dedicated zones
              for free weights, resistance bands, machines, and accessories keep every session precise and
              progression-focused, while recovery and finishing touches stay steps away. <br/><br/>Plus an integrated lineup on
              the same campus: chiropractic, physical therapy, massage therapy, Muay Thai, and a barber. 
            </p>

            <div className="space-y-4 mb-10">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-neon mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">On-Site Training</p>
                    <p className="text-white font-semibold">44675 Cape Ct STE 185, Ashburn, VA 20147</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-brand-neon mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Mobile Training</p>
                    <p className="text-white font-semibold">
                      I also train clients on-site from Ashburn through Fairfax.
                    </p>
                    <p className="text-gray-400 text-sm mt-1">Pricing reflects mobile travel distance and setup.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-10">
              <div className="border border-brand-neon/40 rounded-lg p-4 bg-brand-neon/10">
                <Warehouse className="w-5 h-5 text-brand-neon mb-2" />
                <p className="text-white font-black text-lg leading-none">11,000 sq ft</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Warehouse Facility</p>
              </div>
              <div className="border border-white/15 rounded-lg p-4 bg-white/5">
                <Dumbbell className="w-5 h-5 text-brand-neon mb-2" />
                <p className="text-white font-black text-lg leading-none">Hybrid Setup</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Free Weights + Machines</p>
              </div>
              <div className="border border-white/15 rounded-lg p-4 bg-white/5">
                <HeartPulse className="w-5 h-5 text-brand-neon mb-2" />
                <p className="text-white font-black text-base sm:text-lg leading-tight">
                  Integrated Structure
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-wider mt-1.5 leading-snug">
                  Chiro, PT, massage, Muay Thai & more
                </p>
              </div>
            </div>

            <Button to="/pricing" variant="primary">
              See On-Site & Mobile Pricing
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 bg-brand-neon/20 blur-3xl rounded-3xl" />
            <div className="relative bg-black/70 border border-white/10 rounded-3xl p-4">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black aspect-[4/5]">
                {activeMedia.type === 'video' ? (
                  <video
                    src={activeMedia.src}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img src={activeMedia.src} alt={activeMedia.label} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm uppercase tracking-widest text-gray-300">{activeMedia.label}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={previous}
                    className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-brand-neon hover:text-brand-neon transition-colors flex items-center justify-center"
                    aria-label="Previous media"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-brand-neon hover:text-brand-neon transition-colors flex items-center justify-center"
                    aria-label="Next media"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {media.map((item, index) => (
                  <button
                    key={`${item.label}-${index}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-16 rounded-lg overflow-hidden border transition-all ${
                      index === activeIndex ? 'border-brand-neon scale-[1.02]' : 'border-white/10 hover:border-white/40'
                    }`}
                    aria-label={`View ${item.label}`}
                  >
                    {item.type === 'video' ? (
                      <div className="h-full w-full bg-black flex items-center justify-center text-xs text-brand-neon uppercase tracking-wider">
                        Video
                      </div>
                    ) : (
                      <img src={item.src} alt={item.label} className="h-full w-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
