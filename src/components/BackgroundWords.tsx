import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getThemeColors } from '../lib/theme';

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

interface AnimatedWordProps {
  word: Word;
  scrollY: MotionValue<number>;
}

function AnimatedWord({ word, scrollY }: AnimatedWordProps) {
  const y = useTransform(
    scrollY,
    [0, 1000],
    [0, -word.speed * 100]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: word.x,
        top: word.y,
        fontSize: word.size,
        opacity: word.opacity,
        y,
      }}
      className="font-serif select-none"
    >
      {word.text}
    </motion.div>
  );
}

export function BackgroundWords() {
  const { state } = useApp();
  const themeColors = getThemeColors(state.theme);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const wordElements = useMemo(
    () => words.map((word, index) => (
      <AnimatedWord key={index} word={word} scrollY={scrollY} />
    )),
    [scrollY]
  );

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${themeColors.text.secondary} transition-colors duration-500`}
      style={{ zIndex: 0 }}
    >
      {wordElements}
    </div>
  );
}
