import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToHomeSection } from '../utils/homeSections';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  onClick?: () => void;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  onClick,
  to,
  type = 'button',
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const baseStyles =
    'font-bold tracking-wide uppercase px-6 py-3 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-black';

  const variants = {
    primary: 'bg-brand-neon text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] focus:ring-brand-neon',
    outline: 'border-2 border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-black focus:ring-brand-neon',
    ghost: 'text-gray-300 hover:text-brand-neon',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const handleAction = () => {
    if (to) {
      const hashIndex = to.indexOf('#');
      if (hashIndex !== -1) {
        const pathname = to.slice(0, hashIndex) || '/';
        const hash = to.slice(hashIndex + 1);
        navigate({ pathname, hash: hash ? `#${hash}` : '' });
        if (location.pathname === pathname && hash) {
          scrollToHomeSection(hash);
        }
        return;
      }
      navigate(to);
      window.scrollTo(0, 0);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`}
      onClick={handleAction}
    >
      {children}
    </button>
  );
};

export default Button;
