import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/TheMFcoach_LogoGreen.png';
import Button from './Button';
import { HOME_SECTIONS, homeSectionHref } from '../utils/homeSections';

const navLinks = [
  { name: 'Home', href: homeSectionHref('home') },
  { name: 'About', href: homeSectionHref(HOME_SECTIONS.about) },
  { name: 'Location', href: homeSectionHref(HOME_SECTIONS.location) },
  { name: 'Results', href: homeSectionHref(HOME_SECTIONS.transformations) },
  { name: 'System', href: homeSectionHref(HOME_SECTIONS.system) },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isCalculatorPage = location.pathname === '/calculator';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navContainerClass = isCalculatorPage
    ? 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8'
    : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  const navPaddingClass = isCalculatorPage
    ? 'bg-brand-black/90 backdrop-blur-sm border-white/10 py-2'
    : isScrolled
      ? 'bg-brand-black/95 backdrop-blur-sm border-white/10 py-2'
      : 'bg-transparent border-transparent py-4';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b ${navPaddingClass} ${
        isCalculatorPage ? 'h-[64px]' : ''
      }`}
    >
      <div className={`${navContainerClass} ${isCalculatorPage ? 'h-full' : ''}`}>
        <div className={`flex justify-between items-center ${isCalculatorPage ? 'h-full' : ''}`}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 group"
          >
            <div className={`flex items-center overflow-visible ${isCalculatorPage ? 'h-9' : 'h-8'}`}>
              <img
                src={logo}
                alt="The MF Coach — personal trainer in Ashburn VA"
                className={`object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.7)] ${
                  isCalculatorPage
                    ? 'h-24 w-24 translate-x-4 translate-y-0.5'
                    : 'h-28 w-28 translate-x-6 translate-y-1'
                }`}
              />
            </div>
            <span className="text-xl font-black italic tracking-tighter text-white uppercase">
              The <span className="text-brand-neon">MF</span> Coach
            </span>
          </Link>

          {isCalculatorPage ? (
            <>
              <div className="hidden md:flex items-center">
                <Link
                  to="/"
                  className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-brand-neon transition-colors py-2 px-1"
                >
                  Home
                </Link>
              </div>

              <div className="md:hidden flex items-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:text-brand-neon focus:outline-none p-1"
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-brand-neon transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <Link
                  to="/calculator"
                  className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-brand-neon transition-colors"
                >
                  Calculator
                </Link>
                <Link
                  to="/pricing"
                  className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-brand-neon transition-colors"
                >
                  Pricing
                </Link>
                <Button to="/form" variant="primary">
                  Book Now
                </Button>
              </div>

              <div className="md:hidden flex items-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:text-brand-neon focus:outline-none"
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className={`md:hidden absolute w-full bg-brand-gray border-b border-white/10 transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}
      >
        {isCalculatorPage ? (
          <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-center font-bold uppercase tracking-wider text-white hover:text-brand-neon py-2"
            >
              Home
            </Link>
          </div>
        ) : (
          <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-center font-bold uppercase tracking-wider text-white hover:text-brand-neon py-2"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/calculator"
              onClick={() => setIsOpen(false)}
              className="block text-center font-bold uppercase tracking-wider text-white hover:text-brand-neon py-2"
            >
              Calculator
            </Link>
            <Link
              to="/pricing"
              onClick={() => setIsOpen(false)}
              className="block text-center font-bold uppercase tracking-wider text-white hover:text-brand-neon py-2"
            >
              Pricing
            </Link>
            <div className="pt-2 flex justify-center">
              <Button to="/form" variant="primary" fullWidth onClick={() => setIsOpen(false)}>
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
