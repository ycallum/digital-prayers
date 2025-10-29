import { memo, useMemo } from 'react';
import { getThemeClasses } from '../lib/theme';

interface Word {
  text: string;
  x: string;
  y: string;
  size: string;
  opacity: number;
  speed: number;
}

const words: Word[] = [
  { text: '静', x: '10%', y: '15%', size: '6rem', opacity: 0.03, speed: 0.2 },
  { text: '禅', x: '75%', y: '20%', size: '8rem', opacity: 0.04, speed: 0.3 },
  { text: '心', x: '20%', y: '35%', size: '5rem', opacity: 0.03, speed: 0.15 },
  { text: '念', x: '85%', y: '45%', size: '7rem', opacity: 0.04, speed: 0.25 },
  { text: '定', x: '5%', y: '55%', size: '6rem', opacity: 0.03, speed: 0.2 },
  { text: '慧', x: '70%', y: '65%', size: '5.5rem', opacity: 0.03, speed: 0.18 },
  { text: '觉', x: '15%', y: '75%', size: '7rem', opacity: 0.04, speed: 0.28 },
  { text: '悟', x: '80%', y: '85%', size: '6.5rem', opacity: 0.03, speed: 0.22 },
  { text: '空', x: '30%', y: '25%', size: '5rem', opacity: 0.02, speed: 0.12 },
  { text: '净', x: '60%', y: '40%', size: '6rem', opacity: 0.03, speed: 0.17 },
  { text: '如', x: '40%', y: '60%', size: '5.5rem', opacity: 0.03, speed: 0.19 },
  { text: '观', x: '50%', y: '80%', size: '7rem', opacity: 0.04, speed: 0.26 },
  { text: '自', x: '25%', y: '50%', size: '4.5rem', opacity: 0.02, speed: 0.14 },
  { text: '在', x: '65%', y: '30%', size: '5rem', opacity: 0.03, speed: 0.16 },
  { text: '法', x: '45%', y: '10%', size: '6rem', opacity: 0.03, speed: 0.21 },
];

export const BackgroundWords = memo(function BackgroundWords() {
  const theme = getThemeClasses();

  const wordElements = useMemo(
    () =>
      words.map((word, index) => (
        <div
          key={index}
          className="word-parallax"
          style={{
            position: 'absolute',
            left: word.x,
            top: word.y,
            fontSize: word.size,
            opacity: word.opacity,
            transform: `translateZ(0)`,
            willChange: 'transform',
          }}
          data-speed={word.speed}
        >
          {word.text}
        </div>
      )),
    []
  );

  return (
    <>
      <div
        className={`fixed inset-0 pointer-events-none overflow-hidden font-serif select-none ${theme.text.secondary} ${theme.transition}`}
        style={{
          zIndex: 0,
          perspective: '1000px',
        }}
      >
        {wordElements}
      </div>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @supports (animation-timeline: scroll()) {
            .word-parallax {
              animation: parallaxScroll linear;
              animation-timeline: scroll(root);
            }

            @keyframes parallaxScroll {
              to {
                transform: translateY(calc(var(--speed, 0.2) * -100px)) translateZ(0);
              }
            }

            .word-parallax[data-speed="0.12"] { --speed: 0.12; }
            .word-parallax[data-speed="0.14"] { --speed: 0.14; }
            .word-parallax[data-speed="0.15"] { --speed: 0.15; }
            .word-parallax[data-speed="0.16"] { --speed: 0.16; }
            .word-parallax[data-speed="0.17"] { --speed: 0.17; }
            .word-parallax[data-speed="0.18"] { --speed: 0.18; }
            .word-parallax[data-speed="0.19"] { --speed: 0.19; }
            .word-parallax[data-speed="0.2"] { --speed: 0.2; }
            .word-parallax[data-speed="0.21"] { --speed: 0.21; }
            .word-parallax[data-speed="0.22"] { --speed: 0.22; }
            .word-parallax[data-speed="0.25"] { --speed: 0.25; }
            .word-parallax[data-speed="0.26"] { --speed: 0.26; }
            .word-parallax[data-speed="0.28"] { --speed: 0.28; }
            .word-parallax[data-speed="0.3"] { --speed: 0.3; }
          }
        }
      `}</style>
    </>
  );
});
