import React from 'react';
import { Instagram, Mail, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOME_SECTIONS, homeSectionHref } from '../utils/homeSections';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Dumbbell className="h-6 w-6 text-brand-neon" aria-hidden="true" />
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
            <h2 className="text-white font-bold uppercase tracking-wider mb-4 text-sm">Quick Links</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href={homeSectionHref('home')} className="hover:text-brand-neon transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href={homeSectionHref(HOME_SECTIONS.services)} className="hover:text-brand-neon transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href={homeSectionHref(HOME_SECTIONS.about)} className="hover:text-brand-neon transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href={homeSectionHref(HOME_SECTIONS.location)} className="hover:text-brand-neon transition-colors">
                  Location
                </a>
              </li>
              <li>
                <a
                  href={homeSectionHref(HOME_SECTIONS.transformations)}
                  className="hover:text-brand-neon transition-colors"
                >
                  Results
                </a>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-neon transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/form" className="hover:text-brand-neon transition-colors">
                  Apply
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-brand-neon transition-colors">
                  Calculator
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-brand-neon transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-bold uppercase tracking-wider mb-4 text-sm">Training Locations</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="text-brand-neon">On-Site:</span> 44675 Cape Ct STE 185, Ashburn VA 20147
              <br />
              <br /> <span className="text-brand-neon">Mobile:</span> Ashburn to Fairfax
            </p>
          </div>

          <div>
            <h2 className="text-white font-bold uppercase tracking-wider mb-4 text-sm">Connect</h2>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/themfcoach/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The MF Coach on Instagram"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-neon hover:text-black transition-all"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:themfcoach1@gmail.com"
                aria-label="Email The MF Coach"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-neon hover:text-black transition-all"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} The MF Coach. All rights reserved.</p>
          <p className="text-gray-700 text-xs mt-2 md:mt-0">Designed for High Performance.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
