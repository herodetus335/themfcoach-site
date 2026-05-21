import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToHomeSection } from '../utils/homeSections';

/** Scrolls to a homepage section when the URL contains a hash (e.g. /#about). */
export function useHashScroll(): void {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;
    const sectionId = location.hash.replace('#', '');
    const timer = window.setTimeout(() => scrollToHomeSection(sectionId), 50);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);
}
