/** Homepage section IDs — must match `id` attributes on section elements */
export const HOME_SECTIONS = {
  home: 'home',
  services: 'services',
  about: 'about',
  location: 'location',
  transformations: 'transformations',
  system: 'system',
  calculator: 'calculator',
} as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[keyof typeof HOME_SECTIONS];

export function homeSectionHref(sectionId: HomeSectionId | 'home'): string {
  return sectionId === 'home' ? '/#home' : `/#${sectionId}`;
}

export function scrollToHomeSection(sectionId: string): void {
  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}
