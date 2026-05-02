import React from 'react';
import fatLossPic from '../images/FatLossPic.jpeg';
import strengthGainPic from '../images/strengthGainProgressPic.jpg';
import bigFatLossPic from '../images/BigFatLossPic.jpg';

const Gallery: React.FC = () => {
  const transformations = [
    {
      id: 1,
      goal: "Fat Loss",
      result: "Lost 35lbs in 16 Weeks",
      img: fatLossPic
    },
    {
      id: 2,
      goal: "Muscle Building",
      result: "Gained 20lbs Lean Muscle",
      img: strengthGainPic
    },
    {
      id: 3,
      goal: "Major Transformation",
      result: "Lost 60lbs in 12 Months",
      img: bigFatLossPic
    }
  ];

  return (
    <section id="transformations" className="py-20 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-neon font-bold tracking-widest uppercase text-sm mb-2">Real People. Real Results.</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase">See The Transformation</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-brand-gray border border-white/5">
              <div className="aspect-[4/5] relative">
                <img 
                  src={item.img} 
                  alt={item.result} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-2">
                    <span className="text-xs font-bold text-brand-neon uppercase tracking-wider bg-brand-neon/10 px-2 py-1 rounded">
                      {item.goal}
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-white italic uppercase leading-none">{item.result}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;