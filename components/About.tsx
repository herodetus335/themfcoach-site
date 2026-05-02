import React from 'react';
import Button from './Button';
import { CheckCircle2 } from 'lucide-react';
import aboutImage from '../images/MyPicture_GymBackground.jpg';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
             <div className="absolute -inset-4 border-2 border-brand-neon/20 rounded-2xl translate-x-4 translate-y-4"></div>
             <img
               src={aboutImage}
               alt="Mikael Frey Training"
               className="w-full rounded-2xl relative z-10 shadow-2xl object-cover"
             />
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-brand-neon font-bold tracking-widest uppercase text-sm mb-2">The Coach</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase mb-6">Training With<br/> Coach Mike</h3>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-8">
              <p>
                I&apos;m not here to reinvent fitness, I just think Northern Virginia deserves better than
                cookie-cutter training.
              </p>
              <p>
                I&apos;ve spent the last 4 years coaching real people through real progress, and what I&apos;ve learned is
                that a program only works if it&apos;s actually built for you. That means understanding how you move,
                how you live, and what you&apos;re chasing - then building something around that and adjusting it as you
                improve.
              </p>
              <p>
                I take anatomy seriously. Before we ever touch a barbell, I need to know what&apos;s going on with your
                body. If you&apos;re sitting at a desk all day with rounded shoulders, loading up a deadlift off rip isn&apos;t
                a good move - fixing what&apos;s broken first is. Mobility and movement quality aren&apos;t optional
                extras, they&apos;re the foundation everything else gets built on.
              </p>
              <p>
                The goal is always the same: build you up the right way so the results actually last.
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "SUF/NASM CPT / CSCS Certified",
                "Functional Strength, Mobility, & Nutrition Expert",
                "100+ Success Stories Facilitated",
                "On-Site & Mobile Trainer"
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-neon flex-shrink-0" />
                  <span className="text-white font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Button to="/form" variant="primary">Work With Mikael</Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;