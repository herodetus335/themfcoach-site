import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/TheMFcoach_LogoGreen.png';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about' },
    { name: 'Location', href: '/#location' },
    { name: 'Results', href: '/#transformations' },
    { name: 'System', href: '/#system' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const sectionId = href.replace('/#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isHome = location.pathname === '/';

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-brand-black/95 backdrop-blur-sm border-white/10 py-2' : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-2 group">
            <div className="h-8 flex items-center overflow-visible">
              <img
                src={logo}
                alt="The MF Coach Logo"
                className="h-28 w-28 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.7)] translate-x-6 translate-y-1"
              />
            </div>
            <span className="text-xl font-black italic tracking-tighter text-white uppercase">
              The <span className="text-brand-neon">MF</span> Coach
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {isHome && navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-brand-neon transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/pricing"
              className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-brand-neon transition-colors"
            >
              Pricing
            </Link>
            {!isHome && (
              <Link
                to="/"
                className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-brand-neon transition-colors"
              >
                Back to Home
              </Link>
            )}
            <Button to="/form" variant="primary">Book Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-neon focus:outline-none"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-brand-gray border-b border-white/10 transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
        <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
          {isHome && navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block text-center font-bold uppercase tracking-wider text-white hover:text-brand-neon py-2 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className="block text-center font-bold uppercase tracking-wider text-white hover:text-brand-neon py-2"
          >
            Pricing
          </Link>
          {!isHome && (
             <Link
             to="/"
             onClick={() => setIsOpen(false)}
             className="block text-center font-bold uppercase tracking-wider text-white hover:text-brand-neon py-2"
           >
             Back to Home
           </Link>
          )}
          <div className="pt-2 flex justify-center">
            <Button to="/form" variant="primary" fullWidth onClick={() => setIsOpen(false)}>Book Now</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;