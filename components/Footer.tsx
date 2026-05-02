import React from 'react';
import { Instagram, Facebook, Mail, Dumbbell } from 'lucide-react';

const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center space-x-2 mb-6">
                <Dumbbell className="h-6 w-6 text-brand-neon" />
                <span className="text-lg font-black italic tracking-tighter text-white uppercase">
                  The <span className="text-brand-neon">MF</span> Coach
                </span>
             </div>
             <p className="text-gray-500 text-sm leading-relaxed">
               Personal training in Northern Virginia that starts with your body, not a template. On-site in Ashburn or
               at your door.
             </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-brand-neon transition-colors cursor-pointer">Home</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-brand-neon transition-colors cursor-pointer">Services</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-brand-neon transition-colors cursor-pointer">About</a></li>
              <li><a href="#location" onClick={(e) => handleLinkClick(e, 'location')} className="hover:text-brand-neon transition-colors cursor-pointer">Location</a></li>
              <li><a href="#transformations" onClick={(e) => handleLinkClick(e, 'transformations')} className="hover:text-brand-neon transition-colors cursor-pointer">Results</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">Training Locations</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
            <span className="text-brand-neon">On-Site:</span> 44675 Cape Ct STE 185, Ashburn VA 20147<br/>
             <br/> <span className="text-brand-neon">Mobile:</span> Ashburn to Fairfax
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/the_mf_coach/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-neon hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-neon hover:text-black transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:themfcoach1@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-neon hover:text-black transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} The MF Coach. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs mt-2 md:mt-0">
            Designed for High Performance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;