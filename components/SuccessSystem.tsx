import React from 'react';
import { MessageSquare, ScanLine, FileBarChart, Play } from 'lucide-react';

const SuccessSystem: React.FC = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "The Strategy Session",
      desc: "We discuss your history, injuries, and goals in a comprehensive initial consultation."
    },
    {
      icon: ScanLine,
      title: "Movement Assessment",
      desc: "I analyze your biomechanics to find weak points and mobility restrictions."
    },
    {
      icon: FileBarChart,
      title: "Customized Blueprint",
      desc: "I build a 100% bespoke training and nutrition plan based on your data."
    },
    {
      icon: Play,
      title: "Execution",
      desc: "We train. I guide you through every rep, ensuring perfect form and maximum intensity."
    }
  ];

  return (
    <section id="system" className="py-20 bg-brand-gray relative overflow-hidden">
      {/* Decorative large number background */}
      <div className="absolute right-0 top-0 text-[30rem] font-black text-white/5 leading-none select-none pointer-events-none -mr-20 -mt-20">MF</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <p className="text-brand-neon font-bold tracking-widest uppercase text-sm mb-2">The Process</p>
          <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase">The Success System</h2>
        </div>

        <div className="space-y-8 relative">
           {/* Connecting Line */}
           <div className="absolute left-8 top-8 bottom-8 w-1 bg-white/10 hidden md:block"></div>

           {steps.map((step, index) => (
             <div key={index} className="flex flex-col md:flex-row gap-8 relative">
               
               {/* Number/Icon Bubble */}
               <div className="flex-shrink-0 z-10">
                 <div className="w-16 h-16 rounded-full bg-brand-black border-2 border-brand-neon flex items-center justify-center text-brand-neon shadow-[0_0_20px_rgba(0,255,65,0.2)]">
                   <step.icon className="w-8 h-8" />
                 </div>
               </div>

               {/* Content */}
               <div className="bg-brand-black border border-white/5 p-8 rounded-2xl flex-1 hover:border-brand-neon/30 transition-colors">
                 <div className="flex items-center space-x-3 mb-3">
                   <span className="text-4xl font-black text-white/20 italic">0{index + 1}</span>
                   <h3 className="text-xl font-bold text-white uppercase">{step.title}</h3>
                 </div>
                 <p className="text-gray-400 pl-2 border-l-2 border-brand-neon/50">
                   {step.desc}
                 </p>
               </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessSystem;