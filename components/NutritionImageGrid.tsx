import React from 'react';
import foodScale from '../images/food/pexels-leonardo-vazquez-1427877-3743169.jpg';
import foodBreakfast from '../images/food/pexels-noon-30770322.jpg';
import foodChickenRice from '../images/food/pexels-muhammad-solikin-2148932884-36853608.jpg';
import foodPlate from '../images/food/pexels-caio-niceas-2148806704-36616789.jpg';
import foodBowl from '../images/food/pexels-valeriya-28292008.jpg';

/** Decorative full-bleed mosaic — original high-resolution project photos. */
const mosaicImages = [
  {
    src: foodScale,
    objectPosition: '50% 45%',
  },
  {
    src: foodBreakfast,
    objectPosition: '50% 40%',
  },
  {
    src: foodChickenRice,
    objectPosition: '50% 35%',
  },
  {
    src: foodPlate,
    objectPosition: '50% 42%',
  },
  {
    src: foodBowl,
    objectPosition: '50% 40%',
  },
] as const;

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
        {mosaicImages.map((image, index) => (
          <div
            key={image.src}
            className={`relative min-h-0 min-w-0 overflow-hidden ${
              index === 0 ? 'col-span-2 lg:col-span-1 lg:row-span-2' : ''
            }`}
          >
            <img
              src={image.src}
              alt=""
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: image.objectPosition,
                filter: 'saturate(0.94)',
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="absolute inset-y-0 left-0 hidden w-[55%] lg:block bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[42%] lg:hidden bg-gradient-to-b from-black/65 via-black/40 to-transparent" />
    </div>
  );
};

export default NutritionImageGrid;
