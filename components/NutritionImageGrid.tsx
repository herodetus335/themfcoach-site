import React from 'react';

import leonardoDesktopAvif from '../images/food/optimized/leonardo-desktop.avif';
import leonardoDesktopWebp from '../images/food/optimized/leonardo-desktop.webp';
import leonardoDesktopJpg from '../images/food/optimized/leonardo-desktop.jpg';
import leonardoMobileAvif from '../images/food/optimized/leonardo-mobile.avif';
import leonardoMobileWebp from '../images/food/optimized/leonardo-mobile.webp';

import noonDesktopAvif from '../images/food/optimized/noon-desktop.avif';
import noonDesktopWebp from '../images/food/optimized/noon-desktop.webp';
import noonDesktopJpg from '../images/food/optimized/noon-desktop.jpg';
import noonMobileAvif from '../images/food/optimized/noon-mobile.avif';
import noonMobileWebp from '../images/food/optimized/noon-mobile.webp';

import solikinDesktopAvif from '../images/food/optimized/solikin-desktop.avif';
import solikinDesktopWebp from '../images/food/optimized/solikin-desktop.webp';
import solikinDesktopJpg from '../images/food/optimized/solikin-desktop.jpg';
import solikinMobileAvif from '../images/food/optimized/solikin-mobile.avif';
import solikinMobileWebp from '../images/food/optimized/solikin-mobile.webp';

import caioDesktopAvif from '../images/food/optimized/caio-desktop.avif';
import caioDesktopWebp from '../images/food/optimized/caio-desktop.webp';
import caioDesktopJpg from '../images/food/optimized/caio-desktop.jpg';
import caioMobileAvif from '../images/food/optimized/caio-mobile.avif';
import caioMobileWebp from '../images/food/optimized/caio-mobile.webp';

import valeriyaDesktopAvif from '../images/food/optimized/valeriya-desktop.avif';
import valeriyaDesktopWebp from '../images/food/optimized/valeriya-desktop.webp';
import valeriyaDesktopJpg from '../images/food/optimized/valeriya-desktop.jpg';
import valeriyaMobileAvif from '../images/food/optimized/valeriya-mobile.avif';
import valeriyaMobileWebp from '../images/food/optimized/valeriya-mobile.webp';

type MosaicImage = {
  id: string;
  objectPosition: string;
  /** Intrinsic desktop dimensions (layout stability) */
  width: number;
  height: number;
  desktopAvif: string;
  desktopWebp: string;
  desktopJpg: string;
  mobileAvif: string;
  mobileWebp: string;
};

/** Decorative full-bleed mosaic — optimized AVIF/WebP with JPEG fallback. */
const mosaicImages: MosaicImage[] = [
  {
    id: 'leonardo',
    objectPosition: '50% 45%',
    width: 1400,
    height: 933,
    desktopAvif: leonardoDesktopAvif,
    desktopWebp: leonardoDesktopWebp,
    desktopJpg: leonardoDesktopJpg,
    mobileAvif: leonardoMobileAvif,
    mobileWebp: leonardoMobileWebp,
  },
  {
    id: 'noon',
    objectPosition: '50% 40%',
    width: 933,
    height: 1400,
    desktopAvif: noonDesktopAvif,
    desktopWebp: noonDesktopWebp,
    desktopJpg: noonDesktopJpg,
    mobileAvif: noonMobileAvif,
    mobileWebp: noonMobileWebp,
  },
  {
    id: 'solikin',
    objectPosition: '50% 35%',
    width: 931,
    height: 1400,
    desktopAvif: solikinDesktopAvif,
    desktopWebp: solikinDesktopWebp,
    desktopJpg: solikinDesktopJpg,
    mobileAvif: solikinMobileAvif,
    mobileWebp: solikinMobileWebp,
  },
  {
    id: 'caio',
    objectPosition: '50% 42%',
    width: 683,
    height: 1400,
    desktopAvif: caioDesktopAvif,
    desktopWebp: caioDesktopWebp,
    desktopJpg: caioDesktopJpg,
    mobileAvif: caioMobileAvif,
    mobileWebp: caioMobileWebp,
  },
  {
    id: 'valeriya',
    objectPosition: '50% 40%',
    width: 934,
    height: 1400,
    desktopAvif: valeriyaDesktopAvif,
    desktopWebp: valeriyaDesktopWebp,
    desktopJpg: valeriyaDesktopJpg,
    mobileAvif: valeriyaMobileAvif,
    mobileWebp: valeriyaMobileWebp,
  },
];

/**
 * Decorative background collage — absolute, so it never adds document height.
 * Parent must be `position: relative` and size to the content/viewport.
 */
const NutritionImageGrid: React.FC = () => {
  return (
    <div
      className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-[1.15fr_1fr_1fr] lg:grid-cols-3 lg:grid-rows-2">
        {mosaicImages.map((image, index) => {
          const isLarge = index === 0;
          // Large tile: full width on mobile, ~1/3 on desktop; supporting tiles ~50%/33%
          const sizes = isLarge
            ? '(max-width: 767px) 100vw, 34vw'
            : '(max-width: 767px) 50vw, 33vw';

          return (
            <div
              key={image.id}
              className={`relative min-h-0 min-w-0 overflow-hidden ${
                isLarge ? 'col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }`}
            >
              <picture>
                <source
                  type="image/avif"
                  media="(max-width: 767px)"
                  srcSet={image.mobileAvif}
                  sizes={sizes}
                />
                <source
                  type="image/webp"
                  media="(max-width: 767px)"
                  srcSet={image.mobileWebp}
                  sizes={sizes}
                />
                <source
                  type="image/avif"
                  media="(min-width: 768px)"
                  srcSet={image.desktopAvif}
                  sizes={sizes}
                />
                <source
                  type="image/webp"
                  media="(min-width: 768px)"
                  srcSet={image.desktopWebp}
                  sizes={sizes}
                />
                <img
                  src={image.desktopJpg}
                  alt=""
                  width={image.width}
                  height={image.height}
                  decoding="async"
                  {...(index === 0
                    ? { fetchPriority: 'high' as const }
                    : {})}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    objectPosition: image.objectPosition,
                    filter: 'saturate(0.94)',
                  }}
                />
              </picture>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="absolute inset-y-0 left-0 hidden w-[55%] lg:block bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[42%] lg:hidden bg-gradient-to-b from-black/65 via-black/40 to-transparent" />
    </div>
  );
};

export default NutritionImageGrid;
